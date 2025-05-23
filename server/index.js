const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId, Timestamp } = require('mongodb')
const jwt = require("jsonwebtoken");
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// firebase admin sdk setup
admin.initializeApp({
    credential: admin.credential.cert("./serviceKey.json")
});

// nodemailer email and password setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODE_MAILER_AUTH_GMAIL_ID, // using env variable
        pass: process.env.NODE_MAILER_AUTH_GMAIL_PASS // using env variable
    }
});


// verify Token middleware
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: "unauthorized access" })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).send({ message: 'unauthorized access' })
        }

        req.user = decoded
        next()
    })
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g8eto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

async function run() {
    try {

        // collections
        const roomCollection = client.db('grandHouse').collection("rooms");
        const userCollection = client.db('grandHouse').collection("users");

        // auth related api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '365d',
            });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            }).send({ success: true })
        })

        // Logout api
        app.get('/logout', async (req, res) => {
            try {
                res
                    .clearCookie('token', {
                        maxAge: 0,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
                    })
                    .send({ success: true })
                console.log("Logout successfully")
            }
            catch (err) {
                res.status(500).send(err)
            }
        })

        // verify email
        app.post("/send-verification-email", async (req, res) => {
            try {
                //Step-1: generate verification email
                const email = req.body.email;
                const actionCodeSettings = {
                    url: `http://localhost:5173/`,
                    handleCodeInApp: true,
                };

                const verificationLink = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);

                // Step-2: create mail
                const mailOptions = {
                    from: 'rafiqulislam4969@gmail.com',
                    to: email,
                    subject: 'Verify Your Email Address',
                    html: `
                        <p>Please click the link below to verify your email:</p>
                        <a href="${verificationLink}">Verify Email</a>
                        `,
                };

                // step-3: send mail
                await transporter.sendMail(mailOptions);

                res.status(200).send('Verification email sent');
            } catch (error) {
                console.error('Error sending verification email:', error);
                res.status(500).send('Internal Server Error');
            }
        })

        // 1. RoomCollection: rooms api

        // get all rooms from db
        app.get('/rooms', async (req, res) => {
            const { category } = req.query;
            const query = { category };
            if (!category || category === "null") delete query.category;
            const rooms = await roomCollection.find(query).toArray();
            res.send(rooms)
        })

        // save a room data in db
        app.post("/room", async (req, res) => {
            const roomData = req.body;
            const result = await roomCollection.insertOne(roomData);
            // console.log(result)
            res.send(result)
        })

        // get single room 
        app.get('/room/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const room = await roomCollection.findOne(query);
            res.send(room)
        })



        // get user myListings rooms
        app.get("/my-listings/:email", async (req, res) => {
            const { email } = req.params;
            const query = { "host.email": email };
            const result = await roomCollection.find(query).toArray();
            res.send(result)
        })

        app.delete("/my-listing/:id", async (req, res) => {
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const result = await roomCollection.deleteOne(query);
            res.send(result)
        })



        // 2. UserCollection: users api

        // user related API
        app.put('/user', async (req, res) => {
            const user = req.body;
            const query = { email: user?.email };

            const isExist = await userCollection.findOne(query);

            if (isExist) {
                const status = "Requested"
                if (user.status === status) {
                    const result = await userCollection.updateOne(query, { $set: { status: user.status } });
                    return res.send(result)
                }
                else {
                    return res.send(isExist)
                }
            }

            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    ...user,
                    timesTamp: Date.now()
                }
            }
            // console.log(user)
            // const result = await userCollection.insertOne(user);
            const result = await userCollection.updateOne(query, updateDoc, options);
            res.send(result)
        })

        app.get("/users", verifyToken, async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 })
        console.log(
            'Pinged your deployment. You successfully connected to MongoDB!'
        )
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send("hello from grand house sever")
})

app.listen(port, () => {
    console.log(`grand house is running on port ${port}`)
})
