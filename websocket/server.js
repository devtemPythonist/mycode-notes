const WebSocket = require("ws");
const wss = new WebSocket.Server({ host: "10.142.47.223", port: 3000 });

// Ulanuvchilarni saqlayuvchi ro'yxat
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("Connected");

  // Yangi ulanuvchini ro'yxatga qo'shamiz
  clients.add(ws);

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Barcha ulanuvchilarga xabar yuborish
    for (const client of clients) {
      if (client != ws) client.send(`Broadcast: ${message}`);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");

    // Ulanuvchi ulanishni to'xtatganda ro'yxatdan o'chiramiz
    clients.delete(ws);
  });
});
