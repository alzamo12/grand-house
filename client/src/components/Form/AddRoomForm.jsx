import { useState } from 'react';
import { categories } from '../Categories/CategoriesData'
import { DateRange } from 'react-date-range';
import { ImSpinner10 } from 'react-icons/im';

const AddRoomForm = (props) => {
    const { dates,
        loading,
        handleDates,
        handleSubmit,
        // setImagePreview, 
        // imagePreview 
    } = props;
    const [imagePreview, setImagePreview] = useState("");
    const [imageText, setImageText] = useState("Upload Image");

    const handleChangeFile = e => {
        const localURL = URL.createObjectURL(e.target.files[0]);
        setImagePreview(localURL);
        const splittedURL = localURL.split('/');
        const imageId = splittedURL[splittedURL.length - 1];
        const text = imageId.slice(0, 20);
        setImageText(text)
    }

    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    {/* 1st row */}
                    <div className='space-y-6'>
                        {/* location */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Location
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='location'
                                id='location'
                                type='text'
                                placeholder='Location'
                                required
                            />
                        </div>
                        {/* category */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600'>
                                Category
                            </label>
                            <select
                                required
                                className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                                name='category'
                            >
                                {categories.map(category => (
                                    <option value={category.label} key={category.label}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* calendar */}
                        <div className='space-y-1'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Select Availability Range
                            </label>
                            {/* Calender */}
                            <DateRange
                                editableDateInputs={true}
                                showDateDisplay={false}
                                minDate={new Date()}
                                onChange={(item) => handleDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                rangeColors={["#F6536D"]}
                            />
                        </div>
                    </div>

                    {/* 2nd row */}
                    <div className='space-y-6'>
                        {/* title */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>
                                Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='title'
                                id='title'
                                type='text'
                                placeholder='Title'
                                required
                            />
                        </div>

                        {/* image */}
                        <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
                            <div className='file_upload justify-between  flex items-center px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            name='image'
                                            onChange={handleChangeFile}
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                            {imageText}
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    {
                                        imagePreview ?
                                            <div className="avatar">
                                                <div className="w-10 md:w-14 rounded">
                                                    <img
                                                        src={imagePreview}
                                                        alt="" />
                                                </div>
                                            </div>
                                            :
                                            <span></span>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* price */}
                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Price
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='price'
                                    id='price'
                                    type='number'
                                    placeholder='Price'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='guest' className='block text-gray-600'>
                                    Total guest
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='total_guest'
                                    id='guest'
                                    type='number'
                                    placeholder='Total guest'
                                    required
                                />
                            </div>
                        </div>

                        {/* bedrooms */}
                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bedrooms' className='block text-gray-600'>
                                    Bedrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='bedrooms'
                                    id='bedrooms'
                                    type='number'
                                    placeholder='Bedrooms'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='bathrooms' className='block text-gray-600'>
                                    Bathrooms
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='bathrooms'
                                    id='bathrooms'
                                    type='number'
                                    placeholder='Bathrooms'
                                    required
                                />
                            </div>
                        </div>

                        {/* description */}
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>

                            <textarea
                                id='description'
                                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                                name='description'
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading}
                    type='submit'
                    className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
                    {loading ? <ImSpinner10 className='mx-auto animate-spin' /> : "Save & Continue"}

                </button>
            </form>
        </div>
    )
}

export default AddRoomForm