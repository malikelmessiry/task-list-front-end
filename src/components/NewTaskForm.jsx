import { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const kDefaultFormState = { title: '' };

const NewTaskForm = ({ onAddTask }) => {
    const [formData, setFormData] = useState(kDefaultFormState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        onAddTask(formData.title.trim());
        setFormData(kDefaultFormState);
    };

    return (
        <form className="new-task-form" onSubmit={handleSubmit}>
        <input
            type="text"
            name="title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
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
