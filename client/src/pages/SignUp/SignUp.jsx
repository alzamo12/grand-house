import { Link, useNavigate } from 'react-router';
import { FaGoogle, FaUser } from 'react-icons/fa';
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useState } from 'react';
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner10 } from 'react-icons/im';

const SignUp = () => {

    const { createUser, updateUserProfile, signInWithGoogle, createGuestAccount, loading, setLoading } = useAuth();
    const [imageUrl, setImageUrl] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        createUser(data.email, data.password)
            .then(() => {
                // update user with name and image generated from image bb
                updateUserProfile(data.name, imageUrl)
                    .then(async () => {
                        try {
                            // step-1: save user in database with valid information
                            const user = {
                                name: data.name,
                                email: data.email,
                                password: data.password,
                                role: "Guest"
                            };
                            const res = await axiosSecure.post('/users', user);

                            // step-2: perform task if user saved successfully
                            if (res.data.insertedId) {
                                toast.success("Welcome to Grand House")
                                navigate('/')

                                // step-3: send custom verification email
                                const res = await axiosSecure.post('/send-verification-email', user)
                                if (res.status === 200) {
                                    Swal.fire({
                                        title: "Verification email has sent to your account",
                                        text: "You won't be able to reserve anything without verifying your email address",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Go to Gmail"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            // window.location.href = "https://mail.google.com/"
                                            window.open("https://mail.google.com/", "_blank");
                                        }
                                    });
                                }
                            }
                        }
                        catch (error) {
                            console.log(error)
                        }

                    })
            })
            .catch(error => {
                setLoading(false)
                toast.error("Please try again")
                console.log(error)
            })

    };

    const generateImageURL = (file) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            // The result is a data URL; we remove the prefix to get the pure base64 string
            const base64String = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");

            // Prepare form data
            const formData = new FormData();
            formData.append("image", base64String);

            // imagebb api key
            const apiKey = import.meta.env.VITE_imagebb_key;
            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (!response.ok) {
                    console.error("Upload failed:", data);
                    return;
                }

                // The URL of the uploaded image can be found at data.data.url
                const imagebb = data.data.url;
                setImageUrl(imagebb)
                // You can now use imageUrl as your user's photo URL
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        };
        reader.readAsDataURL(file);
    }

    // transfer file to image url via image bb
    const handleImage = (e) => {
        try {
            const file = e.target.files[0];
            // console.log(file)
            generateImageURL(file)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSocialLogin = () => {
        signInWithGoogle()
            .then(() => {
                navigate('/')
                toast.success("You've login Successfully")
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
                toast.error("Pleas try again")
            })
    };

    // singIn anonymously
    const handleGuestLogin = () => {
        createGuestAccount()
            .then(() => {
                navigate('/')
                toast.success("You've login Successfully")
            })
            .catch(error => {
                setLoading(false)
                toast.error("Please try again")
                console.error(error)
            })
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Toaster />
            <title>Sign Up</title>
            {/* page container */}
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                {/* heading of sign up form */}
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                    <p className='text-sm text-gray-400'>Welcome to StayVista</p>
                </div>
                {/* Sign up Form */}
                <form
                    noValidate=''
                    action=''
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 ng-untouched ng-pristine ng-valid h-full'
                >
                    {/* input container */}
                    <div className='space-y-3 h-full'>
                        {/* name input */}
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                {...register("name", { required: true })}
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            /> <br />
                            {/* name error */}
                            {errors.name && <span className='text-red-600 text-xs'>This field is required</span>}
                        </div>
                        {/* file input */}
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                {...register("file", { required: true })}
                                type='file'
                                id='image'
                                name='image'
                                onChange={handleImage}
                                // onChange={handleFileChange}
                                accept='image/*'
                            /> <br />
                            {/* file error */}
                            {errors.file && <span className='text-red-600 text-xs'>This field is required</span>}
                        </div>
                        {/* email input */}
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                {...register("email", { required: true })}
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {/* email error */}
                            {errors.email && <span className='text-red-600 text-xs'>This field is required</span>}
                        </div>
                        {/* password input */}
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                {...register("password", { required: true })}
                                type='password'
                                name='password'
                                autoComplete='new-password'
                                id='password'
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                            {/* password error */}
                            {errors.password && <span className='text-red-600 text-xs'>This field is required</span>}
                        </div>
                    </div>

                    {/* continue button */}
                    <div>
                        <button
                            disabled={loading}
                            type='submit'
                            className='bg-rose-500 w-full rounded-md py-3 text-white cursor-pointer'
                        >
                            {loading ? <ImSpinner10 className='mx-auto animate-spin' /> : "continue"}
                        </button>
                    </div>
                </form>
                {/* end of Sign up Form */}

                {/* social accounts */}
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>

                {/* login with google */}
                <button disabled={loading} onClick={handleSocialLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FaGoogle size={32} />

                    <p>Continue with Google</p>
                </button>

                {/* login with guest account */}
                <button disabled={loading} onClick={handleGuestLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FaUser size={32} />

                    <p>Sign in anonymously</p>
                </button>

                {/* go to sign in page */}
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignUp;