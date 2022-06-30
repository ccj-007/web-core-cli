/**
 * @description 用来处理是否s强制覆盖
*/
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const ejs = require('ejs')
const chalk = require('chalk')
const spawn = require('cross-spawn');
const ora = require('ora')
const process = require('process')
const shell = require('shelljs');

module.exports = async function (name, options) {
  const cwd = process.cwd() //node 命令执行路径 
  const projUrl = path.join(cwd, name)
  //目录下存在此项目文件夹
  if (fs.existsSync(projUrl)) {
    //是否带有-f强制创建指令
    if (options.force) {
      await fs.remove(projUrl)
    } else {
      //todo: 询问用户是否确定要覆盖
      inquirer.prompt([
        {
          name: 'action',   //boolean
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ]).then(async answer => {
        let { action } = answer
        if (!action) {
          return;
        } else if (action === 'overwrite') {
          // 移除已存在的目录
          await fs.remove(projUrl)
          createProject(name, projUrl)
        }
      })
    }
  } else {
    createProject(name, projUrl)
  }
}

/**
 * 创建项目文件
 *
 * @param {string} name
 * @param {string} projUrl
 */
const createProject = (name, projUrl) => {
  const destUrl = path.join(__dirname, '../', 'templates');
  deepCopyFiles(destUrl, projUrl, name)
  console.log(`${chalk.cyan.bold(`目录： ${projUrl} 项目名：${name} 创建成功！`)}`)


  //开始安装依赖
  const spinner = ora('开始安装依赖').start();
  spinner.color = 'yellow';
  spinner.text = 'Loading rainbows';

  startShell(name, spinner)
}

/**
 *拷贝文件夹下所有文件
 *
 * @param {string} destUrl
 * @param {string} projUrl
 * @param {string} name
 */
const deepCopyFiles = (destUrl, projUrl, name) => {
  fs.mkdir(projUrl, { recursive: true }, (err) => {
    if (err) return

    fs.readdir(destUrl, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        fs.stat(path.join(destUrl, file), (err, stats) => {
          if (err) return
          if (stats.isDirectory()) {
            deepCopyFiles(path.join(destUrl, file), path.join(projUrl, file), name)
          } else {
            // 使用 ejs 渲染对应的模版文件
            ejs.renderFile(path.join(destUrl, file), name).then(data => {
              // 生成 ejs 处理后的模版文件
              fs.writeFileSync(path.join(projUrl, file), data)
            })
          }
        })
      })
    })
  })
}

/**
 * shell命令
 */
const startShell = async (name, spinner) => {
  console.log(chalk.cyan.bold('开始安装依赖.......'))
  // let cd = `cd ${name}`
  // const cdCommend = spawn(cd, [], {
  //   stdio: 'inherit'
  // })
  // console.log(`Starting directory: ${process.cwd()}`);
  // try {
  //   process.chdir(`/${name}`);
  //   console.log(`New directory: ${process.cwd()}`);
  // } catch (err) {
  //   console.error(`chdir: ${err}`);
  // }
  shell.cd(name);

  // 执行安装
  const pnpmCommend = spawn('pnpm install', [], {
    stdio: 'inherit'
  });

  // 监听执行结果
  pnpmCommend.on('close', function (code) {
    // 执行失败
    if (code !== 0) {
      console.log(chalk.red.bold('安装依赖失败'));
      process.exit(1);
    }
    // 执行成功
    else {
      console.log(chalk.cyan.bold('安装依赖成功！！！'))
    }
    spinner.stop()
  })
}