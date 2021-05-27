import React, { useState } from 'react'
import { useForm } from "react-hook-form";

export default function NewPortraitForm() {
    // const [portrait, setPortrait] = useState({
    //     title: '',
    //     artist: '',
    //     description: '',
    //     funFact: '',
    //     uploadedImageUrl: '',
    //     uploadedImage: {},
    // })
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        let { title, artist, description, funFact } = data;
        const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("description", description);
        formData.append("funFact", funFact);
        console.log(formData)
        const dataObj = {
            file: data.file[0],
            title,
            artist,
            description,
            funFact
        }
        console.log('dataObj', dataObj)
        const res = await fetch("/api/portraits/", {
            method: 'POST',
            body: formData
        }).then(res => console.log(console.log(res.json())))
        console.log('res:', await res.json())
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label> Upload your self portrait:
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg"
                    {...register("file")}
                />
            </label>    
            <label> Title: 
                <input type="text" {...register("title", { required: true})}/>
            </label>
            <label> Artist:
                <input type="text" {...register("artist")}/>
            </label>
            <label> Description:
                <input type="text" {...register("description")}/>
            </label>
            <label> Fun Fact:
                <input type="text" {...register("funFact")}/>
            </label>
            <label>
                <input type="submit" value="Share" />
            </label>
        </form>
    )
}
