# WEB_SOCKET

1. 是一种网络通讯协议，RFC6455定义了它的通讯标准
2. 是HTML5开始提供的一种单个TCP连接进行全双工通讯的协议

流程：
  - 握手
  - 前后端互相发送讯息

客户端握手请求：
  ```
    GET ws://localhost/chat HTTP/1.1
    HOST: localhost
    Upgrade: websocket
    Connection: Upgrade
    Sec-webSocket-Key: -
    Sec-webSocket-Extensions: -(Base64编码的24位随机字符序列)
    Sec-webSocket-Version: -(扩展类型)
  ```

服务端握手响应：
  ```
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-webSocket-Accept: -
    Sec-webSocket-Extensions: -
  ```

---

## 客户端实现

1. 创建WebSocket对象：
`let ws = new WebSocket(url)`
> 参数url格式：ws://ip:port/resource

2. **事件**
`onopen`: 连接建立时触发
`onmessage`: 接收服务端数据时触发
`onerror`: 发生错误时触发
`onclose`: 连接关闭时触发

3. 方法
`send`: 发送数据