import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/common/Header';
import Button from '../Components/common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import Loader from '../Components/common/Loader';
import { useParams } from 'react-router-dom';

function Profile() {

    

    const user=useSelector((state)=>state.user.user)
    //getting data from redux store by using useselector hook
    //state-global state,user-name of userslice,user-obj
    console.log("myUser",user);

    if(!user)
    {
        return <Loader/>

    }

    const handleLogout=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success("Logout successful!")
          }).catch((error) => {
            // An error happened.
            toast.error(error.message)
          });
    }
   
  return ( 
    <div>
        <Header/>
        <div className='profile-style'>
          
          <h1 >Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>UserId: {user.uid}</h1>
          <Button 
            text={"Logout"}
            onClick={handleLogout}
            />
        </div>
    </div>

  )
} 

export default Profile