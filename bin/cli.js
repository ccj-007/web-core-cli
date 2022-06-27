#! /usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')

program
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('../lib/create.js')(name, options)
    //配置
    // const spinner = ora('Loading unicorns').start();
    // setTimeout(() => {
    //   spinner.color = 'yellow';
    //   spinner.text = 'Loading rainbows';

    //   setTimeout(() => {
    //     console.log(chalk.cyan.bold(`project name is ${name}`))
    //   }, 2000);
    // }, 2000);
    // 打印命令行输入的值
  })

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program.parse(process.argv)
