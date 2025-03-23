import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';
import Container from '../shared/Container/Container';
import Heading from '../shared/Heading/Heading';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Rooms = () => {
  const axiosSecure = useAxiosSecure();

  // get data of all the rooms
  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      const res = await axiosSecure.get('/rooms');
      return res.data
    }
  });

  // show spinner if data is loading 
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <Container>
      {rooms && rooms.length > 0 ?
        // show cards if data is found
        (
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            {rooms.map(room => (
              <Card key={room._id} room={room} />
            ))}
          </div>
        ) :
        // show something if data is not there
        (
          <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
            <Heading
              center={true}
              title='No Rooms Available In This Category!'
              subtitle='Please Select Other Categories.'
            />
          </div>
        )}
    </Container>
  )
}

export default Rooms;