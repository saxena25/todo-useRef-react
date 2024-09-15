import {useState,useRef,useEffect} from 'react';

function Todo() {
    let inputRef = useRef("");
    let[todos,setTodos] = useState([]);
    let[newTodo,setNewTodo] = useState({
        todo: "",
        user: ""
    })

    
    const handleChange = (e) =>{
        const value = e.target.value;
        setNewTodo({
            ...newTodo,
            [e.target.name]: value,
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const obj = {
            id: Date.now() + Math.random(),
            ...newTodo
        }
        setTodos((prevTodos)=>[...prevTodos,obj])
        setNewTodo({
            todo: "",
            user: "",
        })
    }

    const handleDelete = (id) =>{
        let newList = todos.filter((todo)=>todo.id!==id);
        setTodos(newList);
    }

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    return ( 
        <>
            <div>
                <h1>Todo</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="todo">
                        Todo: <input type="text"  name="todo" id="" ref={inputRef} value={newTodo.todo} onChange={handleChange} />
                    </label>
                    <label htmlFor="user">
                        User: <input type="text"  name='user' value={newTodo.user} onChange={handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {
                    todos.map((ele)=>(
                        <div key={ele.id}>
                            <p><b>ID:</b> {ele.id}</p>
                            <p><b>Todo: </b>{ele.todo}</p>
                            <p><b>User: </b>{ele.user}</p>
                            <button onClick={()=>handleDelete(ele.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </>
     );
}

export default Todo;