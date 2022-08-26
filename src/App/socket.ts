const fnFun = () => {
  const ws = new WebSocket("ws://localhost:3000");
  // const ws = new WebSocket("ws://10.168.169.52:3000");
  return ws;
};

export default fnFun;
