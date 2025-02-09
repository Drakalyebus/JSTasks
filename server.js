import Host from './ServScript.js';

const PORT = 3000;

// function fileDir(name, type = 'html') {
//     return path.resolve(__dirname, 'pages', `${name}.${type}`);
// }

// async function check404(fileDirection) {
//     return (await fs.readdir(path.dirname(fileDirection), {withFileTypes: true})).some((file) => file.name == path.basename(fileDirection));
// }

// const server = http.createServer(async (req, res) => {
//     console.log(req.url);
//     let dir = fileDir(req.url.slice(1), path.extname(req.url.slice(1)));
//     if (req.url == '/') {
//         dir = fileDir('index');
//     }
//     if (!(await check404(dir))) {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         await res.write(await fs.readFile(fileDir('404'), 'utf-8'));
//     } else {
//         if (path.extname(dir) == '.css') {
//             console.log('css');
//             res.writeHead(200, {'Content-Type': 'text/css'});
//             dir = fileDir(req.url.slice(1), 'css');
//             console.log(dir);
//         } else if (path.extname(dir) == '.js') {
//             res.writeHead(200, {'Content-Type': 'text/javascript'});
//             dir = fileDir(req.url.slice(1), 'js');
//         } else if (path.extname(dir) == '.html') {
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             if (path.basename(dir) == 'redir') {
//                 res.writeHead(302, {'Location': ''});
//             }
//         }
//         await res.write(await fs.readFile(dir, 'utf-8'));
//     }
//     res.end();
// });

// server.listen(3000, 'localhost', () => {})

const host = new Host({
    'index': 'index.html',
    'page1': 'index.html',
    'page': 'index.html',
    'page2': 'page2.html',
    'page3': 'page3.html',
    'page4': 'page4.html'
}, 'pages', '404.html', 'index.html', (req, res, addToPath, path, redir) => {
    if (req.url == '/page5') {
        redir('index');
    }
}, () => {}, 'localhost', PORT);

host.start();