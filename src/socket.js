import io from "socket.io-client";
const SOCKET_URL = 'http://localhost:5000';
console.log("socket initialised");

const mSocket = ()=>{
    return io(SOCKET_URL);
}

export default mSocket;
