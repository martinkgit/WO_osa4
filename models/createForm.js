import React from 'react'

const CreateForm = ({
    handleSubmit,
    handleTitleChange,
    handleUrlChange,
    handleAuthorChange,
    title,
    author,
    url

}) =>{
    return(
        <div>
            <h2>create new</h2>

            <form onSubmit={handleSubmit}>

            </form>
        </div>
    )
}

export default CreateForm