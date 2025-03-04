import { useEffect, useState } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';
import Container from '../shared/Container/Container';
import Heading from '../shared/Heading/Heading';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Rooms = () => {
  // const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      const res = await axiosSecure.get('/rooms');
      return res.data
    }
  })

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  // useEffect(() => {
  //   setLoading(true)
  //   fetch(`http://localhost:5000/rooms`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setRooms(data)
  //       setLoading(false)
  //     })
  // }, [])

  if (loading) return <LoadingSpinner />

  return (
    <Container>
      {rooms && rooms.length > 0 ? 
      (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
          {rooms.map(room => (
            <Card key={room._id} room={room} />
          ))}
        </div>
      ) : (
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