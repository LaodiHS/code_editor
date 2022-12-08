











// const WebSocket = require("ws")
// // "Cookie":"<cookie data noted earlier>",
// const ws = new WebSocket("wss://data.tradingview.com/socket.io/websocket?from=chart%2FylNlt7bc%2F&date=2020_09_11-12_19",null,{
//     headers: {
//         "Accept-Encoding": "gzip, deflate, br",
//         "Accept-Language": "en-US,en;q=0.9",
       
//         Host: "data.tradingview.com",
//         "Sec-WebSocket-Key": "ykKe7JCT3qG7pGyuz9iVsg==",
//         origin:"https://www.tradingview.com",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
//     },
//     origin: "https://example.com",
// })
// const opening_message = `~m~427~m~{"m":"set_auth_token","p":["eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJ1c2VyX2lkIjo5Mzk0MzI4LCJleHAiOjE1OTk5NjAyNjIsImlhdCI6MTU5OTk0NTg2MiwicGxhbiI6IiIsImV4dF9ob3VycyI6MSwicGVybSI6IiIsInN0dWR5X3Blcm0iOiIiLCJtYXhfc3R1ZGllcyI6MywibWF4X2Z1bmRhbWVudGFscyI6MH0.HBPpp9WQQLqzHrH_U8mBUAem2SfIpnJxpeJkfOrKdrVppnQ0slLNtbyvqgVeXxo9MQvdOTw3k2PLBPNUurv7_MS4iiwGf15VsYe1iSXdF5HlvOcwOxNYd5WbkbCm8oGO_ZFmjyQGoWuXKNEhpqMzdYti4pDdls90NSO4yfkVuGA"]}`
// ws.on('open', function open() {
//     console.log("opened");
// });

// ws.on('message', function incoming(data) {
//     if (data == "o" || data == "h") {
//         console.log("sending opening message")
//         ws.send(opening_message)
//     }
//     else {
//         console.log("Received", data)

//     }
// });