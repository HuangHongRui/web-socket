const fnFun = () => {
  const ws = new WebSocket("ws://localhost:8080");
  return ws;
};

export default fnFun;
