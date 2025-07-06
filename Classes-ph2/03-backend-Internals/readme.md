 ## http (for server)
    buildin package from node to creat server
    `
        const http = require('http')
        const server = http.createServer(req,res){
            cosole.log('req aaya')
            log(req.method)
            log(req.url)
                switch (req.method){
                    case 'GET' : {
                        if (req.url === '/') return res.end('Home')
                        if (req.url === '/contact') return res.end('Contact')
                        if (req.url === '/about') return res.end('ABOUT')
                    } break;
                    case 'POST' : {} break;
                }
            res.end('res gaya')
        }
        server.listen('8000', function() {
                console.log('server strted')
        })
    `
    node index.js // for start the server
    curl http://localhost:8000 // check the http req or you can check on browser
    curl -X POST http://localhost:8000 // check the http req or you can check on browser

### handler functions

    npm i express
    
    const http = require('http')
    const express = require('express)
    const handlerFunction = express()
        handlerFunction((req,res,next) => { next()}) // express give the solution with next
    handlerFunction.get('/' (req,res) => res.end ('Home))
    handlerFunction.get('/about' (req,res) => res.end ('ABout))
    handlerFunction.get('/contact' (req,res) => res.end ('Contact))
    handlerFunction.listen('8000', function() { // also gives the solution the listions
                console.log('server strted')
        })
    // just update the handlerfunction to app


## Express, Koa, hono, fastify (wrapper for middleware)

// http module
// create basic express
// get and post
// req.method or req.url (node)