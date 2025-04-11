import Container from '../../components/shared/Container/Container'
import RoomReservation from '../../components/RoomDetails/RoomReservation'
import Heading from '../../components/shared/Heading/Heading'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/shared/LoadingSpinner/LoadingSpinner'
import 'react-date-range/dist/styles.css';  // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme styles


// single room object (Fake Data)
const room = {
    location: 'Pattaya, Thailand',
    category: 'Beach',
    title: 'A15 thebase Sky Pool 1 Bedroom 1/1/Downtown Direct Beach',
    to: '2024-05-21T18:00:00.000Z',
    from: '2024-05-19T18:00:00.000Z',
    price: '100',
    guests: '2',
    bathrooms: '1',
    bedrooms: '1',
    host: {
        name: 'Shakil Ahmed Atik',
        image:
            'https://lh3.googleusercontent.com/a/ACg8ocJL_MZYn95fgATgHT_bWH8Em42gc8quAT57rhhHo4w9-lc-x8G-=s96-c',
        email: 'shakilatik.ph@gmail.com',
    },
    description:
        'Seamlessly evisculate frictionless e-markets through tactical interfaces. Holisticly visualize viral potentialities without mission-critical services.',
    image: 'https://i.ibb.co/BsLQWH6/992ceffe-86d2-42b0-93b8-c24427806cca.webp',
}
const RoomDetails = () => {

    const params = useParams();
    const axiosSecure = useAxiosSecure();
  

    const { data: roomData = [], isLoading } = useQuery({
        queryKey: ['roomData', params],
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:5000/room/${params.id}`);
            return res.data
        }
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <Container>
            <link rel="icon" type="image/svg+xml" href="../../../public/favicon.png" />
            <title>Grand House &nbsp;| |&nbsp; Room Details</title>

            {roomData && (
                <div className='max-w-screen-lg mx-auto'>
                    {/* Header */}
                    <div className='flex flex-col gap-6'>
                        <div>
                            <Heading title={roomData?.title} subtitle={roomData?.location} />
                            <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
                                <img
                                    className='object-cover w-full'
                                    src={roomData?.image}
                                    alt='header image'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        {/* roomData Info */}
                        <div className='col-span-4 flex flex-col gap-8'>
                            <div className='flex flex-col gap-2'>
                                <div
                                    className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
                                >
                                    <div>Hosted by {roomData?.host?.name}</div>

                                    <img
                                        className='rounded-full'
                                        height='30'
                                        width='30'
                                        alt='Avatar'
                                        src={roomData?.host?.image}
                                    />
                                </div>
                                <div
                                    className='
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              '
                                >
                                    <div>{roomData?.guests} guests</div>
                                    <div>{roomData?.bedrooms} rooms</div>
                                    <div>{roomData?.bathrooms} bathrooms</div>
                                </div>
                            </div>

                            <hr />
                            <div
                                className='
          text-lg font-light text-neutral-500'
                            >
                                {roomData?.description}
                            </div>
                            <hr />
                        </div>

                        <div className='md:col-span-3 order-first md:order-last mb-10'>
                        
                            {/* RoomReservation */}
                            <RoomReservation room={roomData} />
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default RoomDetails
