const fnFun = () => {
  // 创建socket对象
  const socket = new WebSocket("wss://ws.postman-echo.com/raw");
  socket.addEventListener('open', (e: Event) =>{
    console.log(e);
  })
  let a = 1;
  console.log(a + 1);
}

export default fnFun;