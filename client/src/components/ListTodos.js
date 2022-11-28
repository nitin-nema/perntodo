import React,{useEffect} from 'react';


function ListTodos() {
    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = response.json();
            console.log(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    },[]);
    return (
        <div>
           <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    
                        <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    
                </tbody>
            </table>

        </div>
    )
}

export default ListTodos
