import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import UploadImage from "../assets/images/upload.svg";
import axios from 'axios';


export default function PotraitForm({ formType, savePortrait, prevData }) {
    const [imgSrc, setImgSrc] = useState(UploadImage);
    const { register, handleSubmit } = useForm({
        defaultValues: prevData
    });
    const loadFile = (e) => {
	    setImgSrc(URL.createObjectURL(e.target.files[0]));
    }
    const onSubmit = async (data) => {
        let { title, artist, description, funFact } = data;
        const formData = new FormData();
        if(formType === 'create') formData.append("file", data.file[0]);
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("description", description);
        formData.append("funFact", funFact);
        console.log(formData)
        if (formType === "create"){
            axios.post("/api/portraits/", formData).then(res => savePortrait(res.data))
        } else if (formType === "update"){
            console.log("update!")
            axios.patch(`/api/portraits/${prevData._id}`, formData).then(res => {console.log(res);console.log(savePortrait)})
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-container">
            {
                formType === 'create' ? ( 
                    <label className="upload-input"> Upload your self portrait:
                        <img src={imgSrc} className="upload-img" id="upload" alt="" />
                        <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/svg+xml"
                            onChange={loadFile}
                            {...register("file", { required: true })}
                        />
                    </label>    
                ) : (
                    <img src={`/api/portraits/image/${prevData?.imgName}`} alt="" />
                )
            }
            <section className="card-bottom">
                <label> <p>Title: </p>
                    <input type="text" placeholder="Title" {...register("title", { required: true})}/>
                </label>
                <label> <p>Artist: </p>
                    <input type="text"  placeholder="Artist"  {...register("artist", { required: true})}/>
                </label>
                <label> <p>Description: </p>
                    <input type="text" placeholder="Description" {...register("description", { required: true})}/>
                </label>
                <label> <p>Fun Fact: </p>
                    <input type="text" placeholder="Fun Fact" {...register("funFact", { required: true})}/>
                </label>
                <label>
                    <input type="submit" value="Share" />
                </label>
            </section>
        </form>
    )
}
