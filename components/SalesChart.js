import React from 'react';
import { Line } from 'react-chartjs-2';
import { Separator } from "@/components/ui/separator"
import { TfiHelpAlt } from "react-icons/tfi";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

const SalesChart = () => {
  const data = {
    labels: ['08', '09', '10', '11', '12', '13', '14', '15'], // Assuming these are days of the month
    datasets: [
      {
        label: 'This Month',
        data: [1.5, 2.8, 2.5, 3.5, 2.9, 4.6, 2.9, 4.9], // Replace with your actual data for this month
        fill: true,
        backgroundColor: 'rgba(255, 98, 0, 0.5)', // LightGreen with opacity
        borderColor: 'rgb(143, 143, 143)', // Green
        tension: 0.3,
        borderWidth: 1, // Adjust the line width for "This Month"
        pointRadius: 0,
      },
      {
        label: 'Last Month',
        data: [2.7, 2.5, 2.8, 3.3, 3.1, 3.5, 3.2, 3.8], // Replace with your actual data for last month
        fill: false,
        borderColor: 'rgb(128, 128, 128)', // Red
        borderDash: [2, 2],
        tension: 0.3,
        borderWidth: 1, // Adjust the line width for "This Month"
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // We'll handle the legend separately
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
            font: {
              size: 10,
              style: 'normal',
            },
            color: 'gray',
          },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 6.0, // Based on the UI
        ticks: {
          stepSize: 1.5, // Based on the UI
          font: {
            size: 10,
            style: 'normal',
          },
          color: 'gray'
        },
        grid: {
          borderDash: [3, 3],
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-md border-1 border-gray-200">
        <div className='p-2 flex flex-row items-center justify-between'>
            <div className="text-gray-600 text-sm">Sales (MRP)</div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger><TfiHelpAlt /></TooltipTrigger>
                    <TooltipContent>
                    <p>This is a sample tooltip</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
        </div>
        <Separator />

      <div className="flex flex-row justify-between items-center p-2">
        <div>
          <div className="text-xl font-semibold">125.49</div>
        </div>
        <div className="text-xs flex flex-col items-end">
          <p className='text-green-500 font-semibold'>↑ 2.4%</p>
          <p className='text-gray-600 font-light'>vs 119.69 last month</p>
        </div>
      </div>

      <div className="relative h-36 px-2"> {/* Adjust height as needed */}
        <Line data={data} options={options} />
      </div>
      <Separator />
      <div className="flex items-center justify-start p-2 mb-0">
        <div className="flex items-center mr-4">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
          <div className="text-gray-700 text-xs">This Month</div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
          <div className="text-gray-700 text-xs">Last Month</div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;