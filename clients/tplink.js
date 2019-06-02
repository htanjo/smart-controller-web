const { Client } = require('tplink-smarthome-api');
const client = new Client();

async function send({ host, value }) {
  const device = await client.getDevice({ host });
  return device.setPowerState(value);
}

module.exports = {
  send
};
