import { useState } from 'react';
import AddRoomForm from '../../../components/Form/AddRoomForm';
import useAuth from '../../../hooks/useAuth';
import { imageUpload } from '../../../api/utils';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from "react-hot-toast";

const AddRoom = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const [loading, setLoading] = useState(false);
    // console.log(imagePreview)

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleDates = item => {
        console.log(item)
        setDates(item)
    };

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (roomData) => {
            const { data } = await axiosSecure.post("/room", roomData);
            return data
        },
        onSuccess: (data) => {
            // setLoading(false)
            toast.success("Successful on uploading room data")
            console.log(data)
        }
    })

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            // setLoading(true)
            const location = e.target.location.value;
            const category = e.target.category.value;
            const title = e.target.title.value;
            const to = dates[0].endDate;
            const from = dates[0].startDate;
            const image = e.target.image.files[0];
            const price = e.target.price.value;
            const bedrooms = e.target.bedrooms.value;
            const description = e.target.description.value;
            const host = {
                name: user?.displayName,
                image: user?.photoURL,
                email: user?.email
            };

            const image_url = await imageUpload(image);
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                bedrooms,
                description,
                host,
                image: image_url
            };
            console.log(roomData)
            await mutateAsync(roomData);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=''>
            <AddRoomForm
                dates={dates}
                loading={isPending}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddRoom;