import './App.css';
import io from 'socket.io-client';
import Chart from 'chart.js';
import { useEffect, useState } from 'react'
function App() {
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Temperature"],
        datasets: [
          {
            label: "Body Temperature",
            data: temp.map(data => data.bodyTemp),
            backgroundColor: [
              "Red",
              "Blue",
              "Yellow",
              "Green",
              "Purple",
              "Orange"
            ],
            borderColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            borderWidth: 1
          }
        ]
      }
    });
  });



  const socket = io.connect('http://127.0.0.1:5000/');
  
  socket.on('Temp', (data) => {
    const arr = temp;
    arr.push(data);
    setTemp(arr);
    console.log(temp.length);
  })

  return (
    <div className="App">
      <canvas id="myChart" width="200" height="200">

      </canvas>
    </div>
  );
}

export default App;
