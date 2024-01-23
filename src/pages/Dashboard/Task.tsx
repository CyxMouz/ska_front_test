import Breadcrumb from '../../components/Breadcrumb.tsx';
import AddTask from '../Tasks/AddTask.tsx';
import ChartTaskDate from '../Tasks/ChartTaskDate.tsx';
import ChartTaskRange from '../Tasks/ChartTaskRange.tsx';
import ChartTaskSingle from '../Tasks/ChartTaskSingle.tsx';
import TaskList from '../Tasks/TaskList.tsx';

const Taks = () => {
  return (
    <>
      <Breadcrumb pageName="Add Task" />
      <AddTask />
    </>
  );
};

export default Taks;
