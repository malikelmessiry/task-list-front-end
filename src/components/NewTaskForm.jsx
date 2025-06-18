import { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const NewTaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAddTask(title.trim());
        setTitle('');
    };

    return (
        <form className="new-task-form" onSubmit={handleSubmit}>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task title"
            required
        />
        <button type="submit">Add Task</button>
        </form>
    );
    };

NewTaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
