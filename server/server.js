const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("Andandooooooooooooooooooooooooooooooooooo");
});

server.listen(PORT, () => {
  console.log(`server andando en puerto ${PORT}`);
});
