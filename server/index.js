const express = require("express");

const cors = require("cors");
const pool = require("./db");
const app = express();

//midlleware 
app.use(cors());
app.use(express.json());

//Routes

//create a todo
app.post("/todos", async (req,res) => {
   try {
    //    console.log(req.body);   // description -- body
       const { description } = req.body;
       const newTodo = await pool.query(
           "INSERT INTO todo (description) VALUES($1) RETURNING *", [description]
       );

       res.json(newTodo.rows[0]);

   } catch (error) {
       console.error(error.message);
   } 
});

//get all a todo
app.get("/todos", async (req,res) => {
    try {
        
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json((await allTodos).rows);
        
    } catch (error) {
        console.log(error.message);
    }
})


//get a todo --id
app.get("/todos/:id", async (req, res) => {
    try {
       const { id } = req.params;
       const singletodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(singletodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});


//update a todo 

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]
        );

        res.json("Successful update");   
    } catch (error) {
        console.log(error.message);
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",[id]
        );
         res.json("Successful deleted"); 
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
})