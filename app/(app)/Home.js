import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import { useAuth } from '../../Context/AuthContext';

export default function Home() {
  const {logout , user} =useAuth();
  const [users,setUsers] =useState([1,2,3])
  
  useEffect(()=>{
    if(user?.uid)
    getUsers();
  },[])

  const getUsers =async () => {
 // fetch users
  }
  
  return (
    <View className='flex-1 bg-white'>
      <StatusBar style="light"/>
      {
        users.length>0? (
          <ChatList users={users} />
        ):(
          <View className="flex items-center " style={{top:hp(30)}} >
            <ActivityIndicator size="large" />
            
          </View>
        )
      }
     
    </View>
  )
}