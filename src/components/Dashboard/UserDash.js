import '../../App.css';
import {socket} from '../../socket';
import React, { useEffect, useState } from 'react';
import { Line } from '@reactchartjs/react-chart.js'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserDash = () => {
  const [maxTemp, setMaxTemp] = useState('');
  const [maxPulse, setMaxPulse] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Body Temperature',
        data: [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  });

  const [pulseData, setPulseData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Body Pulse',
        data: [],
        fill: true,
        backgroundColor: 'rgb(0,72,186)',
        borderColor: 'rgb(0,72,186)',
      }
    ],
  });

  const notify = (message) => {
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose : 3000
    });
  };
  
  const notifyPulse = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose : 3000
    });
  }

  
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }


  useEffect(() => {
    
    socket.on('Temp', (posts) => {
      
      const xAxis = posts.reverse().map((post) => {
          
          return new Date(post.createdAt).toLocaleTimeString();
      })
      const yAxis = posts.reverse().map(post => {
        
        return post.bodyTemp;
      });
      let currentMaxTemp = maxTemp;
      if(Math.max(...yAxis) >= currentMaxTemp) {
        setMaxTemp(Math.max(...yAxis));
        
      }

      const yAxisPulse = posts.reverse().map(post => {
        return post.bodyPulse;
      });
      let currentMaxPulse = maxPulse;
      if(Math.max(...yAxisPulse) >= currentMaxPulse) {
        setMaxPulse(Math.max(...yAxisPulse));
      }
      

      setData({
        labels: xAxis,
        datasets: [
          {
            label: 'Body Temperature',
            data: yAxis,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      });

      setPulseData({
        labels: xAxis,
        datasets: [
          {
            label: 'Body Pulse',
            data: yAxisPulse,
            fill: false,
            backgroundColor: 'rgb(0,72,186)',
            borderColor: 'rgb(0,72,186, 0.2)',
          },
        ],
      });

      
    })

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    }
  },[]);


  useEffect(() => {
    if(maxTemp >= 38) {
      notify("Alert, Body Temp " + maxTemp + '℃');
    }

    if(maxPulse >= 90) {
      notifyPulse("Alert, High Body Pulse - " + maxPulse);
    }

  }, [maxTemp, maxPulse]);

  return (
    <div className="App">
      <Line data={data} options={options} />
      <Line data={pulseData} options={options}/>
      <ToastContainer/>
    </div>
  )
  
  
  
}

export default UserDash;
