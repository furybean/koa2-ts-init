import * as convict from 'convict';
import * as debug from 'debug';
import * as fs from 'fs';

const conf = convict({
  env: {
    doc: 'The application environment.',
    format: ['alpha', 'beta', 'prod'],
    default: 'alpha',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The ip address to bind.',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'PORT'
  }
});
const d = debug('kickstarter:conf');
const env = conf.get('env');
try {
  const path = `${__dirname}/${env}.json`;

  d('trying to access %s', path);
  fs.accessSync(path, fs.constants.F_OK);

  conf.loadFile(path);
} catch (error) {
  d('file doesn\'t exist, loading defaults');
}

conf.validate({ strict: true });

export default conf;
