const net = require('net');

const host = '192.168.11.11';
const port = 60001;

async function send({ data }) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.connect(port, host, () => {
      console.log(`Connected: ${host}:${port}`);
      const buffer = new Buffer.from(data, 'hex');
      client.write(buffer);
      console.log(`Send: ${buffer.toString('hex')}`);
    });
    client.on('data', data => console.log(`Data: ${data.toString('hex')}`));
    client.on('close', () => {
      console.log('Closed');
      resolve();
    });
  });
}

module.exports = {
  send
};
