import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../common/api';
const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error: any) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const markTaskCompleted = async (id: any) => {
    try {
      const response = await api.put(`/tasks/${id}/complete/`, {});

      const updatedTasks: any = tasks.map((task: any) =>
        task._id === id
          ? {
              ...task,
              status: 'completed',
              completionDate: response.data.completionDate,
            }
          : task,
      );
      setTasks(updatedTasks);
    } catch (error: any) {
      console.error('Error marking task as completed:', error.message);
    }
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Task List
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-6">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Title
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-6">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Description
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-6">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                State
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-6">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Created At
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-6">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Completed At
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-6">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>
          <ul>
            {tasks.map((task: any) => (
              <div
                key={task._id}
                className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-6"
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-6">
                  <div className="flex-shrink-0"></div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {task.name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-6">
                  <p className="text-black dark:text-white">
                    {task.description}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-6">
                  <p className="text-meta-3">{task.status}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-6">
                  <p className="text-black dark:text-white">
                    {task.creationDate instanceof Date
                      ? task.creationDate.toISOString().split('T')[0]
                      : new Date(task.creationDate).toISOString().split('T')[0]}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-6">
                  <p className="text-meta-5">
                    {task.completionDate != null
                      ? task.completionDate instanceof Date
                        ? task.completionDate.toISOString()?.split('T')[0]
                        : new Date(task.completionDate)
                            .toISOString()
                            .split('T')[0]
                      : null}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-6">
                  {task.status != 'completed' && (
                    <button
                      className="flex items-center justify-center rounded-md border border-meta-3 text-center font-small text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
                      onClick={() => markTaskCompleted(task._id)}
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
