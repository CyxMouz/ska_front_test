import Breadcrumb from '../../components/Breadcrumb';
import ChartTaskDate from '../Tasks/ChartTaskDate';
import ChartTaskRange from '../Tasks/ChartTaskRange';
import ChartTaskSingle from '../Tasks/ChartTaskSingle';

const Stats = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-2 gap-4 md:gap-6 ">
        <div className="col-span-12">
          <ChartTaskDate />
        </div>
        <ChartTaskRange />
        <ChartTaskSingle />
      </div>
    </>
  );
};

export default Stats;
