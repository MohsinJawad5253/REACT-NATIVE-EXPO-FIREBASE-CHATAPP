import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthContextProvider, useAuth } from '../Context/AuthContext';
import "../global.css";


const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();

  const router = useRouter();

  useEffect (()=>{
    //check if user is authenticated or not
    if(typeof isAuthenticated =='undefined'){
      return;
    }
    const inApp=segments[0]=='(app)';
    if(isAuthenticated && !inApp){
      //redirect to home
      router.replace('Home');
    }else if(isAuthenticated == false){
      //redirect to sign in
      router.replace('SignIn');
    }
  },[isAuthenticated])

  return <Slot />
}


export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
    </MenuProvider>
    
  )
}