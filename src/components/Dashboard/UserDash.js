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
      
      if (myTempChart) {
        // console.log("setting data in myTempChart");
        if (myTempChart.data.labels.length===0) {
          myTempChart.data.labels.push(...xAxis)
        } else {
          myTempChart.data.labels.push(xAxis[9]);
          myTempChart.data.labels.shift();
  
        }
        

        myTempChart.data.datasets.forEach(dataset => {
          if (dataset.data.length===0) {
            dataset.data.push(...yAxis);
            
          } else {
            dataset.data.push(yAxis[9]);
            dataset.data.shift();  
          }
          
        });
        myTempChart.update();  
      }

      if (myPulseChart) {
        // console.log("setting data in myPulseChart");
        if (myPulseChart.data.labels.length===0) {
          myPulseChart.data.labels.push(...xAxis)
        } else {
          myPulseChart.data.labels.push(xAxis[9]);
          myPulseChart.data.labels.shift();
  
        }
        

        myPulseChart.data.datasets.forEach(dataset => {
          if (dataset.data.length===0) {
            dataset.data.push(...yAxisPulse);
            
          } else {
            dataset.data.push(yAxisPulse[9]);
            dataset.data.shift();  
          }
          
        });
        myPulseChart.update();  
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
