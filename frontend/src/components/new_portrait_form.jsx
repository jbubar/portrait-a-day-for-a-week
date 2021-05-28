import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function NewPortraitForm() {
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
        axios.post("/api/portraits/", formData).then(res => console.log(res, res.data))
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
