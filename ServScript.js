import httpExtend from 'http';
import fsExtend from 'fs/promises';
import { fileURLToPath } from 'url';
import pathExtend from 'path';
import mime from 'mime';

class Host {
    constructor(pages, pagesDirectory, notFoundPage, mainPage, advCallback = () => {}, errorCallback = (e, req, res) => {res.end(e.message)}, host = 'localhost', port = 3000) {
        this.dirname = pathExtend.dirname(fileURLToPath(import.meta.url));
        this.host = host;
        this.port = port;
        this.pages = pages;
        this.notFoundPage = notFoundPage;
        this.mainPage = mainPage;
        this.pagesDirectory = pagesDirectory;
        this.server = httpExtend.createServer(async (req, res) => {
            try {
                let path = '';
                const addToPath = (file) => {
                    return pathExtend.resolve(this.dirname, this.pagesDirectory, file);
                }
                Object.keys(this.pages).forEach((page) => {
                    if ('/' + page == req.url && pathExtend.extname(req.url) == '') {
                        path = addToPath(this.pages[page]);
                    }
                });
                if (pathExtend.extname(req.url) != '') {
                    path = addToPath(req.url.slice(1).replaceAll('/', '\\'));
                }
                if (req.url == '/' || req.url == '') {
                    path = addToPath(this.mainPage);
                }
                advCallback(req, res, addToPath, path, (location) => {res.writeHead(301, {'Location': location}); res.end();});
                if (path != '') {
                    const file = await fsExtend.readFile(path, 'utf-8');
                    res.writeHead(200, {'Content-Type': mime.getType(pathExtend.extname(path))});
                    res.write(file);
                    res.end();
                    return;
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    const file = await fsExtend.readFile(addToPath(this.notFoundPage), 'utf-8');
                    res.write(file);
                    res.end();
                    return;
                }
            } catch (e) {
                errorCallback(e, req, res);
                return;
            }
        });
    }
    start(port = this.port, host = this.host, callback = () => {}) {
        this.server.listen(port, host, callback);
    }
    stop(callback = () => {}) {
        this.server.close(callback);
    }
    set(params) {
        Object.keys(params).forEach((param) => {
            this[param] = params[param];
        });
    }
    static createPath(path = []) {
        return path.join('/');
    }
}

export default Host;