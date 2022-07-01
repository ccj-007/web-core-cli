const figlet = require('figlet');
const chalk = require('chalk')

const outLOGO = () => {
  console.log('\r\n' + figlet.textSync('WEB-CORE-CLI', {
    font: 'Standard',
    horizontalLayout: 'fitted',
    width: 120,
    whitespaceBreak: true
  }));
}

const outCyanLog = (info) => {
  console.log(`\n ${chalk.cyan.bold(info)} \n`);
}

const outRedLog = (info) => {
  console.log(`\n ${chalk.red.bold(info)} \n`);
}

module.exports = {
  outLOGO,
  outCyanLog,
  outRedLog
}
