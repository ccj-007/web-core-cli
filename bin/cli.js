#! /usr/bin/env node
const program = require('commander')
const log = require('../lib/log')

//quan-h5cli create my-project
program
  .on('--help', () => {
    // 新增说明信息
    log.outLOGO()
    // 新增说明信息
    log.outCyanLog(`Run  roc <command> --help show details`)
  })
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    log.outLOGO()
    //开始流程
    require('../lib/create.js')(name, options)
  })


program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program.parse(process.argv)
