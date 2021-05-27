import React from 'react'

export default function NewPortraitForm() {

    return (
        <form>
            <label> Upload your self portrait:
                <input type="file"/>
            </label>
            <label> Title: 
                <input type="text"/>
            </label>
            <label> Artist:
                <input type="text"/>
            </label>
            <label> Description:
                <input type="text"/>
            </label>
            <label> Fun Fact:
                <input type="text"/>
            </label>
        </form>
    )
}
