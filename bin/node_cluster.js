const cluster = require('cluster');
const http = require('http');
const numCpus = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('master start ...');
    //Fork workers
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('listening', function (worker, address) {
        console.log(`listening:worker ${worker.process.pid},Address:${address.address}:${address.port}`)
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('hello world');
    }).listen(10000);
}
