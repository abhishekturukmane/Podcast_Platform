import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputComponent from '../common/Input'
import { toast } from 'react-toastify'
import Button from '../common/Button'
import FileInput from '../common/Input/FileInput'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../../firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

function CreatePodcastForm() {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [displayImage,setDisplayImage]=useState()
    const [bannerImage,setBannerImage]=useState()
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleSubmit=async ()=>{
        toast.success("Handling form")
        if(title && desc && displayImage && bannerImage)
        {
            setLoading(true)
            //upload files->get downloadable links
            try{
                //bannerImg
                const bannerImageRef= ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(bannerImageRef,bannerImage);
                
                const bannerImageUrl=await getDownloadURL(bannerImageRef)
               
            
                //displayImg
                const displayImageRef= ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(displayImageRef,displayImage);
                
    
                const displayImageUrl=await getDownloadURL(displayImageRef)
               // console.log("bannerImgUrl: ", displayImageUrl); 
           
                //setDoc
                const podcastData={
                    title:title,
                    description:desc,
                    bannerImage:bannerImageUrl,
                    displayImage:displayImageUrl,
                    createdBy:auth.currentUser.uid,
                };

                const docRef=await addDoc(collection(db,"podcasts"),podcastData);
                setTitle("");
                setDesc("");
                setDisplayImage(null);
                setBannerImage(null);
                
                toast.success("Podcast Created!")
                setLoading(false)
            }
            catch(e){

                toast.error(e.message)
                console.log(e);
                setLoading(false)
            }
            
        }

        else
        {
            toast.error("please Enter All Values")
            setLoading(false)
        }
    }

    const displayImageHandle=(file)=>{
        setDisplayImage(file)
    }

    const bannerImageHandle=(file)=>{
        setBannerImage(file)
    }

    return (
    <div>

            <InputComponent
                state={title}
                setState={setTitle}
                placeholder="Title"
                type="text"
                required={true}
            />

            <InputComponent
                state={desc}
                setState={setDesc}
                placeholder="Description"
                type="email"
                required={true}
            />
            <FileInput accept={"image/*"}
                    id="display-image-input"
                    fileHandleFnc={displayImageHandle}
                    text={"Display Image Upload"}
             />

           
            <FileInput accept={"image/*"} 
                    id="banner-image-input" 
                    fileHandleFnc={bannerImageHandle}
                    text={"Banner Image Upload"}
            />

            <Button text={loading ? "Loading...":"Create Podcast"}  disabled={loading} onClick={handleSubmit}/>

    </div>
  )
}

export default CreatePodcastForm