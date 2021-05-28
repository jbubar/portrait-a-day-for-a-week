import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import UploadImage from "../assets/images/upload.svg";
import axios from 'axios';

export default function NewPortraitForm({ addPortrait }) {
    const [imgSrc, setImgSrc] = useState(UploadImage);
    const { register, handleSubmit } = useForm();
    const loadFile = (e) => {
	    setImgSrc(URL.createObjectURL(e.target.files[0]));
    }
    const onSubmit = async (data) => {
        let { title, artist, description, funFact } = data;
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("description", description);
        formData.append("funFact", funFact);
        console.log(formData)
        axios.post("/api/portraits/", formData).then(res => addPortrait(res.data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-container">
            <label className="upload-input"> Upload your self portrait:
                <img src={imgSrc} className="upload-img" id="upload" alt="" />
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={loadFile}
                    {...register("file", { required: true})}
                />
            </label>    
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
