import {
    MenuOption
} from 'react-native-popup-menu';

import { Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const MenuItem =({text, action , value , icon})=>{
return(
        <MenuOption onSelect={()=> action(value)}>
            <View className="px-4 py-1 flex-row justify-between items-center">
                <Text style={{fontSize:hp(1.7)}} className="font-semibold text-neutral-700">
                    {text}
                </Text>
                {icon}
            </View>
        </MenuOption>

)
}