import React, { useState } from 'react'
import InputComponent from '../../common/Input'
import Button from '../../common/Button'
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth'
import {auth,db ,storage} from "../../../firebase"
import { doc, setDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
function SignupForm() {

    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleSignup=async ()=>{
        console.log("signuped");
        setLoading(true)
        if(password == confirmPassword && password.length>=6 && fullName && email)
        {
            try{
                //creating user account
                const userCredential=await createUserWithEmailAndPassword(
                    auth,//form firebase
                    email,//usestate
                    password//usestate
                );
                const user=userCredential.user;
                console.log("user",user);
                //saving using details
                //users-->name of collection
                await setDoc(doc(db,"users",user.uid),{
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                    //profilePic:fileURL,
                })
                //save data in redux ,call redux action
                dispatch(
                    setUser({
                        name:fullName,
                        email:user.email,
                        uid:user.uid,
                    })
                );
                toast.success("User has been created!")
                setLoading(false)
                navigate('/profile')
            }
            catch(e)
            {
                console.log("error",e);
                toast.error(e.message)
                setLoading(false)
            }
        }
        else
        {
            
            if(password != confirmPassword)
            {
                toast.error(
                    "Please Make sure your password and Confirm Password matches!"
                )
            }
            else if(password.length<=6)
            {
                toast.error("Password must be more than 6 digits")
            }

            setLoading(false)
        }
        
    } 

    return (
    <>
          <InputComponent
                state={fullName}
                setState={setFullName}
                placeholder="Full Name"
                type="text"
                required={true}
            />

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

            <InputComponent
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder="Confirm password"
                type="password"
                required={true}
            />

            <Button text={loading ? "Loading...":"SignUp"}  disabled={loading} onClick={handleSignup}/>
    </>
  )
}

export default SignupForm