const interval = 600; // ms
const indicator = document.querySelector('.indicator');
const buttons = document.querySelectorAll('[data-command]');
let pressed = false;

async function sendCommand(command) {
  const method = 'POST';
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  const payload = { command };
  const body = JSON.stringify(payload);
  try {
    const res = await fetch("/api/command", { method, headers, body });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function sendCommands(commands) {
  await Promise.all(commands.map(sendCommand));
}

buttons.forEach(button => {
  ['mousedown', 'touchstart'].forEach(type => button.addEventListener(type, async event => {
    if (pressed) return;
    pressed = true;
    setTimeout(() => pressed = false, interval);
    window.navigator.vibrate(60);
    indicator.classList.remove('active');
    setTimeout(() => indicator.classList.add('active'), 0);
    const commands = event.currentTarget.dataset.command.split(',');
    await sendCommands(commands);
  }));
});
indicator.addEventListener('animationend', () => indicator.classList.remove('active'));
