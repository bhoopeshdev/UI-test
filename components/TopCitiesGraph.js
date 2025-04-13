import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend } from 'chart.js';
import { Separator } from "@/components/ui/separator"
import { TfiHelpAlt } from "react-icons/tfi";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

// Register the necessary Chart.js components
Chart.register(ArcElement, Legend);

const TopCitiesGraph = () => {
    const data = {
        labels: ['New Delhi', 'Mumbai', 'West Bengal', 'Others'],
        datasets: [
            {
                label: 'Total',
                data: [26.5, 36.4, 12.2, 24.3], // Values from the screenshot (in 'L')
                backgroundColor: [
                    '#3b82f6', // Blue for New Delhi
                    '#ef4444', // Red for Mumbai
                    '#84cc16', // Green for West Bengal
                    '#d1d5db', // Gray for Others
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '80%', // Adjust for the donut hole size
        rotation: -90, // Start from the top
        circumference: 180, // Draw only half the circle
        plugins: {
            legend: {
                display: false, // We'll handle the legend separately
              },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + 'L'; // Add 'L' to the value
                        }
                        return label;
                    },
                },
            },
        },
        layout: { // Added layout options
            padding: {
                top: 0,    // Remove top padding
                bottom: 0, // Remove bottom padding
            },
        },
    };

    return (
        <div className="bg-white rounded-md border-1 border-gray-200">
            <div className='p-2 flex flex-row items-center justify-between'>
                <p>Top Cities</p>
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
            <div className="flex flex-col items-center p-4">
                <div className="w-full max-w-[200px] relative flex flex-row justify-center my-[-40px]">
                    <Doughnut data={data} options={options} />
                    {/* Center Label */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%', // Adjusted position.  The donut is now on top half.
                            left: '50%',
                            transform: 'translate(-50%, -30%)',
                            textAlign: 'center',
                            pointerEvents: 'none', // Allows clicks to go through
                            marginBottom: 0,
                        }}
                    >
                        <div className="text-xs text-gray-500">
                            Total
                        </div>
                        <div className="font-medium">
                            ₹68.2L
                        </div>
                        <div className="text-xs text-gray-500">
                            ↑ 2.2%
                        </div>
                    </div>
                </div>

                {/* List of Cities with Values and Percentages */}
                <div className="mt-2 w-full flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                                <span className='text-xs'>New Delhi</span>
                            </div>
                            <div>
                                <span className="font-medium ">₹26.5L</span>
                                <span className="text-gray-500 ml-2 text-xs">35%</span>
                                <span className="text-green-500 ml-2 text-xs">↑ 1.2%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                                <span className='text-xs'>Mumbai</span>
                            </div>
                            <div>
                                <span className="font-medium text-xs">₹36.4L</span>
                                <span className="text-gray-500 ml-2 text-xs">23%</span>
                                <span className="text-red-500 ml-2 text-xs">↓ 3.3%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                <span className='text-xs'>West Bengal</span>
                            </div>
                            <div>
                                <span className="font-medium text-xs">₹12.2L</span>
                                <span className="text-gray-500 ml-2 text-xs">21%</span>
                                <span className="text-red-500 ml-2 text-xs">↓ 2.3%</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-gray-400"></span>
                                <span className='text-xs'>Others</span>
                            </div>
                            <div>
                                <span className="font-medium text-xs">₹24.3L</span>
                                <span className="text-gray-500 ml-2 text-xs">9%</span>
                                <span className="text-green-500 ml-2 text-xs">↑ 1.09%</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default TopCitiesGraph;
