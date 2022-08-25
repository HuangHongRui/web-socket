import { useEffect, useRef, useState } from "react";
import { ONLINE_PLACEHOLDER, SYSMESSAGE_PLACEHOLDER, TLAKMESSAGE_PLACEHOLDER } from "./else";
import socket from "./socket";

const App = () => {
  const [sysMessage, setSysMessage] = useState("");
  const [talkMessage, setTalkMessage] = useState("");
  const [onlineMessage, setOnlineMessage] = useState([]);

  const inputRef = useRef<any>();
  const wsRef = useRef<any>();

  useEffect(() => {
    wsRef.current = socket();

    // 1. 连接WebSocket服务成功时触发
    wsRef.current.addEventListener("open", (e: Event) => {
      console.log("连接服务成功", e);
      // setMessage("连接服务成功");
    });

    // 3. WebSocket接收Message数据时触发
    wsRef.current.addEventListener("message", (e: Event | any) => {
      console.log("接收Message数据", e);
      const { type, message } = JSON.parse(e.data);
      switch (type) {
        case 0:
          setSysMessage((data) => message + "\n" + data);
          break;
        case 1:
          setTalkMessage((data) => message + "\n" + data);
          break;
        case 2:
          setOnlineMessage(message?.join("\n"));
          break;
      }
    });

    // 4. WebSocket断开时触发
    wsRef.current.addEventListener("close", (e: Event) => {
      console.log("WebSocket断开时触发", e);
      // setMessage("WebSocket服务断开连接");
    });
  }, []);

  const fnSend = () => {
    // 2.主动给WebSocket发送信息
    console.log("主动给WebSocket发送信息");
    wsRef.current.send(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div className="p-20 h-screen flex flex-col font-serif">
      <h1 className="text-center text-2xl mb-4">Hello Socket</h1>
      <div className="flex">
        <input
          className="flex-1 px-10 mr-2 h-10 bg-red-50"
          placeholder="Say Something..."
          ref={inputRef}
        />
        <button
          className="w-40 h-10 rounded-md bg-sky-500 hover:bg-sky-700 ..."
          onClick={fnSend}
        >
          SEND
        </button>
      </div>
      <div className="flex flex-1 mt-4 w-full">
        <textarea
          placeholder={TLAKMESSAGE_PLACEHOLDER}
          readOnly
          className="flex-1 p-10 bg-teal-100"
          value={talkMessage}
        />
        <div className="w-3/12 flex flex-col justify-between ml-4">
          <textarea
            placeholder={SYSMESSAGE_PLACEHOLDER}
            readOnly
            className="w-full p-10 flex-auto bg-indigo-300"
            value={sysMessage}
          />
          <textarea
            placeholder={ONLINE_PLACEHOLDER}
            readOnly
            className="w-full p-10 h-1/2 mt-4 bg-amber-100"
            value={onlineMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
