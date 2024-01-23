import Breadcrumb from '../../components/Breadcrumb';
import TaskList from '../Tasks/TaskList';

const List = () => {
  return (
    <>
      <Breadcrumb pageName="List" />
      <TaskList />
    </>
  );
};

export default List;
