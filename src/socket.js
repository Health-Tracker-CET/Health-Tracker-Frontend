import io from "socket.io-client";
const SOCKET_URL = 'https://health-tracker-cet.herokuapp.com/';
console.log("socket initialised");

const mSocket = ()=>{
    return io(SOCKET_URL);
}

export default mSocket;
