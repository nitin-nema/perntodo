import React, { useState } from 'react';

function InputTodos() {
    const [description, setDescription] = useState("What's on your todo list ..");
    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <h1 className="text-center mt-5">Todo List</h1>
            <form className="d-flex mt-5" onSubmit={ onSubmitForm}>
                <input type="text" className="form-control" value={description}
                    onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add Todo</button>
            </form>
        </div>
    )
}

export default InputTodos
