import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';

const INITIAL_FORM_DATA = {
    title: 'New Task',
    description: 'Task Desc'
};

const NewTaskForm = (props) => {
    console.log('here');
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const handleChange = (e) => {
        console.log(e.target.name);
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        };
        setFormData(newFormData);
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        //call a callback function, pass in formData
        props.addTaskCallback(formData);

        setFormData({
            title: 'New Task',
            description: 'Task Desc',
        });
    };


    return(
    <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Task Title</label>
        <input
            type = "text"
            id="title"
            name = "title"
            value={formData.title}
            onChange={handleChange}
            onFocus = {(e) => e.target.value = ''}
        />
        <label htmlFor="desciption">Task Description</label>
        <input
            type = "text"
            id="description"
            name = "description"
            value={formData.description}
            onChange={handleChange}
            onFocus = {(e) => e.target.value = ''}
        />

        <input
            type = "submit"
            value="Add Task"
        />
    </form>
    );
};
NewTaskForm.propTypes = {
    addTaskCallback: PropTypes.func.isRequired
};

export default NewTaskForm;