# ubike-service
An application server based on real-time open data of Taipei YouBike.
- _A demo server on Heroku_ -> https://ubike-service.herokuapp.com
- _check out_ [API docs](https://ubike-service.herokuapp.com/docs#!/v1/find2Nearest).
#### APIs 
 - _Find2Nearest_ ->  Find 2 nearest ubike station (with available bikes)
 - ...

#### Built on
* [Node.js](https://nodejs.org/en/) (requires v7.6.0 or higher)
* [Koa 2.x](https://github.com/koajs/koa)
* [Docker](https://www.docker.com/)
* [Swagger](http://swagger.io/),  [(swagger2-koa)](https://github.com/carlansley/swagger2-koa)
* [Gulp](http://gulpjs.com/)
* [Mocha](https://mochajs.org/), [Chai](https://github.com/chaijs/chai)

## Install
```
$ git clone git@github.com:ctc316/ubike-service.git
$ cd ubike-service
$ npm install
```
## Getting started
```
$ node app.js
```

or run on Docker
```
$ docker-compose up
```

see API document on browser
```
localhost:3000/docs
```
## Tests
```
$ npm test
```


## License
[MIT](https://github.com/ctc316/ubike-service/blob/master/LICENSE)
