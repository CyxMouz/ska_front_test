import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import api from '../../common/api';
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
    categories: ['current user'],
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

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTaskRange: React.FC = () => {
  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: '',
        data: [],
      },
    ],
  });
  const [dateDebut, setDateDebut] = useState<string>('');
  const [dateFin, setDateFin] = useState<string>('');
  const fetchData = async () => {
    try {
      const response = await api.get('/tasks/task-range', {
        params: {
          dateDebut,
          dateFin,
        },
      });
      setState({
        series: [
          {
            name: 'Completed Tasks',
            data: [response.data],
          },
          { name: 'Hide Tasks', data: [''] },
        ],
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'API",
        error,
      );
    }
  };
  useEffect(() => {
    if (dateDebut && dateFin) {
      fetchData();
    }
  }, [dateDebut, dateFin]);
  const handleDateDebutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateDebut(e.target.value);
  };

  const handleDateFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFin(e.target.value);
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 ">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Task Bar Chart - Completed Tasks Range
          </h4>
        </div>
        <label className="mb-3 block text-black dark:text-white">
          Select Range
        </label>
        <div className="relative">
          <input
            type="date"
            value={dateDebut}
            onChange={handleDateDebutChange}
            className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="relative">
          <input
            type="date"
            value={dateFin}
            onChange={handleDateFinChange}
            className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
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

export default ChartTaskRange;
