const http = require('http');
const fs = require('fs');
const templ = require('art-template');
const url = require('url');
var comments = [
  {
    name: 'zhangsan1',
    message: '你好 Node'
  },
  {
    name: 'zhangsan2',
    message: '你好 Node'
  },
  {
    name: 'zhangsan3',
    message: '你好 Node'
  },
  {
    name: 'zhangsan4',
    message: '你好 Node'
  }
]

http.
  createServer((req, res) => {
    var obj = url.parse(req.url, true);
    var pathname = obj.pathname;
    if (req.url === '/') {
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          return res.end('404 Not Found');
        }
        var htmlTempl = templ.render(data.toString(), {
          comments: comments
        })
        res.end(htmlTempl);
      })
    } else if (pathname.indexOf('/public/') == 0) {
      fs.readFile('.' + pathname, (err, data) => {
        if (err) {
          return res.end(url + 'source is not found');
        }
        res.end(data);
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', (err, data) => {
        if (err) throw err;
        res.end(data);
      })
    } else if (pathname === '/pinglun') {
      var pathObj = {};
      pathObj.name = obj.query.name;
      pathObj.message = obj.query.message;
      comments.unshift(pathObj);
      res.statusCode = 302;
      res.setHeader('Location','/')
      res.end();
    } else {
      fs.readFile('./views/err.html', (err, data)=>{
        if(err) throw err;
        res.end(data);
      })
    };
  }).listen(3000, function () {
    console.log('sever is running..........');
  });
