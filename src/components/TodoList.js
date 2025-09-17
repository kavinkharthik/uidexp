import React, { useState, useCallback, useMemo } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const [newTodo, setNewTodo] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('medium');
    const [filter, setFilter] = useState('all');

    // Add new todo
    const addTodo = useCallback(() => {
        if (newTodo.trim()) {
            const todo = {
                id: Date.now(),
                text: newTodo.trim(),
                completed: false,
                priority: selectedPriority,
                createdAt: new Date()
            };
            setTodos(prev => [...prev, todo]);
            setNewTodo('');
        }
    }, [newTodo, selectedPriority]);

    // Toggle todo completion
    const toggleTodo = useCallback((id) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }, []);

    // Delete todo
    const deleteTodo = useCallback((id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    // Filter todos
    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]);

    // Sort todos by priority and completion
    const sortedTodos = useMemo(() => {
        return [...filteredTodos].sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }, [filteredTodos]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#e74c3c';
            case 'medium': return '#f39c12';
            case 'low': return '#27ae60';
            default: return '#95a5a6';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return '🔴';
            case 'medium': return '🟡';
            case 'low': return '🟢';
            default: return '⚪';
        }
    };

    return (
        <div className="todo-container">
            <h2 className="todo-header">📝 My Todo List</h2>
            
            {/* Add Todo Form */}
            <div className="todo-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new todo..."
                        className="todo-input"
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="priority-select"
                    >
                        <option value="low">🟢 Low</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="high">🔴 High</option>
                    </select>
                    <button onClick={addTodo} className="add-button">
                        Add Todo
                    </button>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                <button
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All ({todos.length})
                </button>
                <button
                    className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active ({todos.filter(t => !t.completed).length})
                </button>
                <button
                    className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed ({todos.filter(t => t.completed).length})
                </button>
            </div>

            {/* Todo List */}
            <div className="todo-list">
                {sortedTodos.length === 0 ? (
                    <div className="empty-state">
                        {filter === 'all' ? 'No todos yet. Add one above!' : 
                         filter === 'active' ? 'No active todos!' : 'No completed todos!'}
                    </div>
                ) : (
                    sortedTodos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`} 
                             style={{borderLeftColor: getPriorityColor(todo.priority)}}>
                            <div className="todo-content">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className="todo-checkbox"
                                />
                                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                    {todo.text}
                                </span>
                                <span className="priority-icon">
                                    {getPriorityIcon(todo.priority)}
                                </span>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Stats */}
            <div className="todo-stats">
                <span>Total: {todos.length}</span>
                <span>Completed: {todos.filter(t => t.completed).length}</span>
                <span>Active: {todos.filter(t => !t.completed).length}</span>
                <span>High Priority: {todos.filter(t => t.priority === 'high').length}</span>
            </div>
        </div>
    );
};

export default TodoList;
