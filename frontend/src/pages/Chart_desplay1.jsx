//**** */
// This chart is sample for the dashboard, latter this chart will be integrated to database
//**** */
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const ChartDisplay1 = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    let delayed;

    // Use month names for labels
    const labels = [
      'January', 
      'February', 
      'March', 
      'April', 
      'May', 
      'June', 
      'July'
    ];

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Available',
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 200 + 1)),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Under Maintenance',
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 200 + 1)),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }, 
      ],
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };

    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartDisplay1;
