import { useState } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../Context/AuthContext';

export default function Home() {
  const {logout , user} =useAuth();
  const [users,setUsers] =useState([1,2,3])
  

  console.log('user data :', user);
  
  return (

    <View className='flex-1 bg-white'>
     <Text className='text-black'>Home Screen</Text>
    </View>
  )
}