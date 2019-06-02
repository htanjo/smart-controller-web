const ratocClient = require('./ratoc');
const tplinkClient = require('./tplink');
const config = require('../config');

async function sendCommand(commandName) {
  const command = config.commands[commandName];
  if (!command) return false;
  switch (command.client) {
    case 'ratoc':
      return await ratocClient.send(command.params);
    case 'tplink':
      return await tplinkClient.send(command.params);
    default:
      return false;
  }
}

module.exports = {
  sendCommand
};
