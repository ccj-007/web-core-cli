const http = require("http");
const fs = require('fs');
const path = require('path');

// 虚拟 SQL 读取出来的数据
var items = [];

http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json;');
  res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  console.log(req.url);
  console.log(req.method);
  if (req.method == 'OPTIONS') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
    });
    res.end('');
  }

  if (req.method === 'GET' && req.url === '/api/setJSON') {
    let data = JSON.stringify(items);
    res.write(data);
    res.end();
  }

  //本地模拟直接用client-admin.json
  if (req.method === 'POST' && req.url === '/api/getJSON') {
    let item = '';
    // 读取每次发送的数据
    req.on('data', function (chunk) {
      item += chunk.toString();
    });
    // 数据发送完成
    req.on('end', function () {
      let item = '';
      // 读取每次发送的数据
      req.on('data', function (chunk) {
        item += chunk;
      });
      // 数据发送完成
      req.on('end', function () {
        // 存入
        item = JSON.parse(item);
        items.push(item.item);
        // 将数据返回到客户端
        let data = JSON.stringify(items);
        res.write(data);
        res.end();
      });
    });
  }

}).listen(3001); // 监听的端口
