#! /usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const figlet = require('figlet');

//quan-h5cli create my-project
program
  .on('--help', () => {
    // 新增说明信息
    console.log('\r\n' + figlet.textSync('qunaH5', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
  })
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    //转圈圈
    const spinner = ora('Loading unicorns').start();
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';

    //开始流程
    require('../lib/create.js')(name, options)

    spinner.stop()
  })


program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program.parse(process.argv)
