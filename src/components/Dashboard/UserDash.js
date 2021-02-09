import './UserDash.css';
import mSocket from '../../socket';
import React, { useEffect, useState, useContext } from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import  Chart  from 'chart.js';
import { useHistory,Router } from 'react-router-dom';
import {LoginContext }from '../../context/context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserDash = () => {
  const history = useHistory();
  let socket;
  const xAxis = [];
  const yAxisTemp = [];
  const yAxisPulse = [];
  const [maxTemp, setMaxTemp] = useState('');
  const [maxPulse, setMaxPulse] = useState('');
  let myTempChart;
  let myPulseChart;
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
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
        fill: false,
        backgroundColor: 'rgb(0,72,186)',
        borderColor: 'rgb(0,72,186,0.2)',
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
    maintainAspectRatio : false
  }

  useEffect(() => {
    
    socket = mSocket();
    // if(!isLoggedIn) {
    //   // User not logged in
    //   console.log("I am not logged in");
    //   history.replace('/login')
    // }
  }, [])


  useEffect(() => {
    if (myTempChart==null) {
      console.log("I am null");
      myTempChart = new Chart(document.getElementById('myTempChart'),{
        type:'line',
        data,
        options
      });
      }
    if (myPulseChart==null) {
      myPulseChart = new Chart(document.getElementById('myPulseChart'),{
        type:'line',
        data:pulseData,
        options
      });
    }

    console.log("component mount");
    socket.on('Temp', (posts) => {
      console.log(posts);
      xAxis.push(new Date(posts.createdAt).toLocaleTimeString());

      yAxisTemp.push(posts.bodyTemp);
      
      let currentMaxTemp = maxTemp;
      if(Math.max(...yAxisTemp) >= currentMaxTemp) {
        setMaxTemp(Math.max(...yAxisTemp));
        
      }

      yAxisPulse.push(posts.bodyPulse);
      
      let currentMaxPulse = maxPulse;
      if(Math.max(...yAxisPulse) >= currentMaxPulse) {
        setMaxPulse(Math.max(...yAxisPulse));
      }
      
      if (myTempChart) {
        // console.log("setting data in myTempChart");
        if (myTempChart.data.labels.length === 10) {
          myTempChart.data.labels.shift();  
        }

        myTempChart.data.labels.push(xAxis[xAxis.length-1]);
          
        

        myTempChart.data.datasets.forEach(dataset => {
          if (dataset.data.length===10) {
            dataset.data.shift();
          } 
          dataset.data.push(yAxisTemp[yAxisTemp.length-1]);
          
        });
        myTempChart.update();  
      }

      if (myPulseChart) {
        // console.log("setting data in myPulseChart");
        if (myPulseChart.data.labels.length === 10) {
          myPulseChart.data.labels.shift();  
        }

        myPulseChart.data.labels.push(xAxis[xAxis.length-1]);
          
        

        myPulseChart.data.datasets.forEach(dataset => {
          if (dataset.data.length===10) {
            dataset.data.shift();
          } 
          dataset.data.push(yAxisPulse[yAxisPulse.length-1]);
          
        });
        myPulseChart.update();  
      }
      
      setData({
        labels: xAxis,
        datasets: [
          {
            label: 'Body Temperature',
            data: yAxisTemp,
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
      console.log("socket disconnected");
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
    <div className="user-page">
      {/* <div className="temp-graph graph">
        <Line data={data} options={options} />
      </div> */}
      <div className="pulse-graph graph">
      <canvas id="myPulseChart" width="400" height="400"></canvas>
      </div>

      <div className="temp-graph graph">
      <canvas id="myTempChart" width="400" height="400"></canvas>
      </div>
      
      
      <ToastContainer/>
    </div>
  )
  
  
  
}

export default UserDash;
