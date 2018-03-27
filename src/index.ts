import conf from './conf';

import * as Koa from 'koa';
import * as debug  from 'debug';
import * as jsonMiddleware from 'koa-json';
import * as loggerMiddleware from 'koa-bunyan-logger';
import * as bodyParserMiddleware from 'koa-bodyparser';

import errorMiddleware from './middleware/error';
import requestMiddleware from './middleware/request';
import routeMiddleware from './route';

const app = new Koa();
const d = debug('kickstarter:root');

// Register middleware
app.use(jsonMiddleware());
app.use(bodyParserMiddleware());
app.use(loggerMiddleware());
app.use(requestMiddleware());
app.use(errorMiddleware());

// Registers routes via middleware
app.use(routeMiddleware());

d('current environment: %s', conf.get('env'));
d('server started at port: %d', conf.get('port'));
app.listen(conf.get('port'));
