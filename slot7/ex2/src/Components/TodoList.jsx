import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState(['Học lập trình .NET', 'Học lập trình Java']);
    const [task, setTask] = useState('');

    const handleAddTodo = () => {
        if (task.trim() !== '') {
            setTodos([...todos, task]);
            setTask('');
        }
    };

    const handleDelete = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div style={{ display: 'flex', gap: '50px', padding: '40px', backgroundColor: '#282c34', color: 'white', minHeight: '300px' }}>
            {/* Phần nhập liệu */}
            <div>
                <input
                    type="text"
                    placeholder="Please input a Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    style={{ padding: '8px', width: '250px', borderRadius: '4px', border: 'none' }}
                />
                <button
                    onClick={handleAddTodo}
                    style={{ marginLeft: '10px', padding: '8px 15px', backgroundColor: '#d63031', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Add Todo
                </button>
            </div>

            {/* Phần hiển thị danh sách */}
            <div style={{ backgroundColor: '#f5f5f5', color: 'black', padding: '20px', borderRadius: '8px', minWidth: '250px' }}>
                <h3 style={{ textAlign: 'center', marginTop: 0 }}>Todo List</h3>
                {todos.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '8px', marginBottom: '5px', borderRadius: '4px' }}>
                        <span>{item}</span>
                        <button
                            onClick={() => handleDelete(index)}
                            style={{ backgroundColor: '#d63031', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;