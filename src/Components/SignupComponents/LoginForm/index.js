import React, { useState } from 'react'
import InputComponent from '../../common/Input'
import Button from '../../common/Button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../../slices/userSlice'
import { toast } from 'react-toastify'

function LoginForm() {

    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate() 

    const handleLogin=async ()=> 
    {
        console.log("LoggedIn");
        setLoading(true)

        if(email && password)
        {
            try{
                //creating user account
                const userCredential=await signInWithEmailAndPassword(
                    auth,//form firebase
                    email,//usestate
                    password//usestate
                );
                const user=userCredential.user;
                
                const userDoc = await getDoc(doc(db,"users",user.uid))
                const userData= userDoc.data()
                
                //getting data from firebase db
                console.log("userData",userData);
    
    
                //save data in redux ,call redux action
                dispatch(
                    setUser({
                        name:userData.name,
                        email:user.email,
                        uid:user.uid,
                    })
                );
                toast.success("Login Successfull!")
                setLoading(false)
                //navigate to profile page
                navigate('/profile')
            }
            catch(e)
            {
                console.log("error",e);
                setLoading(false)
                toast.error(e.message)
            }
        } 
        else
        {
            toast.error("Email and Password should not be Empty!")
            setLoading(false)
        }

    }
       
        
    return (
    <>

            <InputComponent
                state={email}
                setState={setEmail}
                placeholder="Email"
                type="email"
                required={true}
            />

            <InputComponent
                state={password}
                setState={setPassword}
                placeholder="password"
                type="password"
                required={true}
            />

            <Button text={loading ? "Loading...":"Login"} disabled={loading} onClick={handleLogin}/>
    </>
  )
}

export default LoginForm