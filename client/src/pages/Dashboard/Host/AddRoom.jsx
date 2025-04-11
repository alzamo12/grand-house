import { useState } from 'react';
import AddRoomForm from '../../../components/Form/AddRoomForm';
import useAuth from '../../../hooks/useAuth';
import { imageUpload } from '../../../api/utils';

const AddRoom = () => {
    const { user } = useAuth();
  
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

    const handleSubmit = async e => {
        e.preventDefault()
        const location = e.target.location.value;
        const category = e.target.category.value;
        const title = e.target.title.value;
        const to = '';
        const from = '';
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
    }

    return (
        <div className=''>
            <AddRoomForm
                dates={dates}
                // imagePreview={imagePreview}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
                // setImagePreview={setImagePreview} 
                />
        </div>
    );
};

export default AddRoom;