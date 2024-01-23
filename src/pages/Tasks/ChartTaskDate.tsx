import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import api from '../../common/api';

interface ChartSeriesData {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTaskDate: React.FC = () => {
  const [taskDate, setTaskDate] = useState<{ dates: string[] }>({
    dates: [],
  });
  const [state, setState] = useState<ChartSeriesData>({
    series: [
      {
        name: '',
        data: [],
      },
      {
        name: '',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get Data
        const response = await api.get('/tasks/count-tasks-grouped');

        const dates = response.data.map((item: any) => item._id);
        setTaskDate({
          dates: dates,
        });

        const counts = response.data.map((item: any) => item.count);
        setState({
          series: [
            {
              name: 'Completed Tasks',
              data: counts,
            },
          ],
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API",
          error,
        );
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '15%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: taskDate.dates,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Task Bar Chart - Completed Tasks by Date
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTaskDate;
