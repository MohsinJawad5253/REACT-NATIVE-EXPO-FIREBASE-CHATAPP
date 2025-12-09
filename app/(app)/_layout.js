import { Stack } from 'expo-router'
import HomeHeader from '../../components/HomeHeader.js'

export default function _layout() {
  return (
    <Stack >
      <Stack.Screen
      name='Home'
      options={{
        header :()=> <HomeHeader/>
        
      }}  
      />
      </Stack>
  )
}