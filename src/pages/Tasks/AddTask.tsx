import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../common/api';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const goToList = () => {
    navigate('/List');
  };

  const handleAddTask = async () => {
    try {
      const response = await api.post('/tasks', {
        name: taskName,
        description: taskDescription,
      });

      setMessage(response.data.message);
      goToList();
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-end sm:justify-start">
          <div>
            <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
              Tasks
            </h3>
          </div>
        </div>
        <label className="mb-3 pl-3 block text-black dark:text-white ">
          Task Name:
        </label>
        <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-end sm:justify-between">
          <input
            type="text"
            placeholder="Task name"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <label className="mb-3 pl-3 block text-black dark:text-white">
          Task Description:
        </label>
        <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-start sm:justify-between">
          <input
            className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            id="taskDescription"
            placeholder="Task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <Link
            onClick={handleAddTask}
            to="#"
            className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80"
          >
            <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
                fill=""
              />
            </svg>
            Add task
          </Link>
        </div>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
};

export default AddTask;
