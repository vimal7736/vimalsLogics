import React, { useState } from 'react'
import { CircleX } from 'lucide-react'

const Todo = () => {

  const [input, setInput] = useState("")
  const [todo, setTodo] = useState([])
  console.log(todo, "todo");



  const addTodo = () => {
    if (input.trim() !== "") {
      setTodo([...todo, { id: Date.now(), text: input, completed: true }])
      setInput("")
    }
  }


  const toggleCompleted = (id) => {
    setTodo(todo.map((item) => (
      item.id === id ? { ...item, completed: !item.completed } : item
    )));
  }

  const deleteTask = (id) => {
    setTodo(todo.filter((item) => (item.id !== id)))
  }

  return (
    <div className='p-4'>
      <h2 className="text-xl font-bold mb-2">Todo List</h2>
      <div className='mb-2' >
        <input
          value={input}
          placeholder='add todo'
          onChange={(e) => {
            setInput(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key == "Enter") {
              addTodo();
            }
          }}
        />
      </div>
      <div>
        {todo.map(({ id, text, completed }) => (
          <div key={id} >
            <div>
              <div>{id}</div>
              <div>{text}</div>
              <div>{!completed ? "todo" : "completed"}</div>
              <button className='border w-[40%] cursor-pointer'
                onClick={() => toggleCompleted(id)}
              >completed</button>
              <CircleX onClick={() => { deleteTask(id) }} />
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Todo