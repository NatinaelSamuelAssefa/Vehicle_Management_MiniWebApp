//**** */
// This chart is sample for the dashboard, latter this chart will be integrated to database
//**** */
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartDisplay2 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: ['Toyota', 'Ford', 'Honda', 'Chevrolet'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [45, 25, 15, 15], // Example data
          backgroundColor: [
            'rgba(255, 159, 64, 0.5)', // Orange
            'rgba(255, 205, 86, 0.5)', // Yellow
            'rgba(75, 192, 192, 0.5)', // Green
            'rgba(54, 162, 235, 0.5)', // Blue
          ],
        },
      ],
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Brand of Vecheles',
          },
        },
      },
    };

    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy(); // Cleanup chart instance on component unmount
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartDisplay2;
