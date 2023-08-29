import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
    const [inputData, setInputData] = useState({ name: '', semester: '', grade: '', rollno: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigat = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        if (!inputData.name || !inputData.semester || !inputData.grade || !inputData.rollno) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        axios.post('http://localhost:2000/api/stud', inputData)
            .then(res => {
                alert('Data Added Successfully!');
                navigat('/allocate');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Add Student Details</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            className='form-control'
                            onChange={e => setInputData({ ...inputData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='name'>Roll NO:</label>
                        <input
                            type='text'
                            name='rollno'
                            className='form-control'
                            onChange={e => setInputData({ ...inputData, rollno: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='semester'>Semester:</label>
                        <input
                            type='text'
                            name='semester'
                            className='form-control'
                            onChange={e => setInputData({ ...inputData, semester: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor='grade'>Grade:</label>
                        <input
                            type='text'
                            name='grade'
                            className='form-control'
                            onChange={e => setInputData({ ...inputData, grade: e.target.value })}
                        />
                    </div>
                    <br />
                    <p className='text-danger'>{errorMessage}</p>
                    <button className='btn btn-info'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Add;
