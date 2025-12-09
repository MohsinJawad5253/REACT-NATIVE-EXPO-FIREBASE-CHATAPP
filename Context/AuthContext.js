import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebaseConfig';




export const AuthContext = createContext();

export const AuthContextProvider =({children}) => {
    const [user,setUser] =useState(null)
    const [isAuthenticated,setIsAuthenticated] =useState(undefined)

    useEffect(()=>{
        
        const unsub = onAuthStateChanged(auth ,(user)=>{
            
            if(user){
                    setIsAuthenticated(true)
                    setUser(user)
                    updateUserData(user.uid);
            }else{
                    setIsAuthenticated(false)
                    setUser(null)
            }
        });
        return unsub;
    },[]);

    const updateUserData = async(userId) =>{
        const docRef = doc(db,'users', userId)
        const docSnap =await getDoc(docRef)

        if(docSnap.exists()){
            let data=docSnap.data();
            setUser({...user,username:data.username, profileUrl:data.profileUrl ,userId: data.userId})
        }
    }

    const login = async (email , password)=>{
        try {
            const response =await signInWithEmailAndPassword(auth , email ,password);
            return {success:true , data:response?.user}
            
        } catch (e) {
            let msg= e.message
            if(msg.includes('(auth/invalid-email)')) msg='Invalid Email'
            if(msg.includes('(auth/weak-password)')) msg='Weak Password'
            if(msg.includes('(auth/email-already-in-use)')) msg='Email Already In Use'
            if(msg.includes('(auth/operation-not-allowed)')) msg='Operation Not Allowed'
            if(msg.includes('(auth/too-many-requests)')) msg='Too Many Requests'
            if(msg.includes('(auth/user-disabled)')) msg='User Disabled'
            if(msg.includes('(auth/user-not-found)')) msg='User Not Found'
            if(msg.includes('(auth/wrong-password)')) msg='Wrong Password'
            if(msg.includes('(auth/invalid-credential)')) msg='Invalid Credential'
            return {success:false , msg}
            
        }
    }

    const logout = async () =>{
        try {
            await signOut(auth); 
            return {success:true}
        } catch (e) {
            return {success:false , msg:e.message ,erorr:e}
        }
    }

    const register = async (email , password , username ,profileUrl) =>{
        try {

            const response = await createUserWithEmailAndPassword(auth , email ,password);
            console.log('response.user:', response.user)


            await setDoc(doc(db,"users",response?.user?.uid),{
                username,
                profileUrl,
                userId: response?.user?.uid
            });

            return{success:true , data:response?.user}
            
        } catch (e) {
            let msg= e.message
            if(msg.includes('(auth/invalid-email)')) msg='Invalid Email'
            if(msg.includes('(auth/weak-password)')) msg='Weak Password'
            if(msg.includes('(auth/email-already-in-use)')) msg='Email Already In Use'
            
            return{success:false , msg}
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated , login , logout , register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =() =>{
    const value=useContext(AuthContext)

    if(!value){
        throw new Error('useAuth must be must be wrapped inside a AuthContextProvider')
    }

    return value;
}