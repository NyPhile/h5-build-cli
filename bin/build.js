#! /usr/bin/env node

const program = require('commander')
const download = require('download-git-repo');
const inquirer = require('inquirer')
const _ = require('lodash')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const path = require('path')

/*
 * - 项目名称
 * - 频道名称
 * - 项目描述
 * - 模板地址
 * - 上传账号
 * - 上传密码
 */

program
.command('init')
.alias('i')
.description('创建项目')
.option('-n, --name <input>', '项目名称')
.option('-c, --channel <input>', '频道名称')
.option('-d, --desc <input>', '项目描述')
.option('-t, --template <input>', '模板地址')
.option('--username <input>', '上传账号')
.option('--password <input>', '上传密码')
.action(option => {
  console.log(option)
  var config = _.assign({
    name: null,
    channel: null,
    desc: null,
    template: null,
    username: null,
    password: null
  }, option)
  var promps = []

  console.log('')
  console.log(chalk.magenta('准备创建项目'))
  console.log('')

  if(!config.name) {
    promps.push({
      type: 'input',
      name: 'name',
      message: '请输入项目名称(小写字母、数字、_)',
      validate: function (input){
        if(!input) {
          return '不能为空'
        }
        return true
      }
    })
  }

  if(!config.channel) {
    promps.push({
      type: 'input',
      name: 'channel',
      message: '请输入项目频道名(如：news)',
      validate: function (input){
        if(!input) {
          return '不能为空'
        }
        return true
      }
    })
  }

  if(!config.desc) {
    promps.push({
      type: 'input',
      name: 'desc',
      message: '请输入项目描述(可为空)'
    })
  }

  if(!config.template) {
    promps.push({
      type: 'input',
      name: 'template',
      message: '请输入模板地址(NyPhile/h5_template)',
      validate: function (input){
        if(!input) {
          return '不能为空'
        }
        return true
      }
    })
  }

  if(!config.username) {
    promps.push({
      type: 'input',
      name: 'username',
      message: '请输入邮箱前缀(上传用)',
      validate: function (input){
        if(!input) {
          return '不能为空'
        }
        return true
      }
    })
  }

  if(!config.password) {
    promps.push({
      type: 'password',
      name: 'password',
      message: '请输入邮箱密码(上传用)',
      validate: function (input){
        if(!input) {
          return '不能为空'
        }
        return true
      }
    })
  }

  inquirer.prompt(promps).then(function (answers) {
    answers = _.assign(config, answers)
    // {
    //   name: null,
    //   channel: null,
    //   desc: null,
    //   template: null,
    //   username: null,
    //   password: null
    // }
    const spinner = ora('正在下载模板').start();
    download(answers.template, './', err => {
      if (err) {
        console.log(err)
      } else {
        let packageFile = {}
        let packagePath = `./package.json`
        if (fs.existsSync(packagePath)) {
          packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
        }
        packageFile.name = answers.name
        packageFile.channel = answers.channel
        packageFile.description = answers.desc || ''
        fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2))

        let ftppass = {}
        let ftppassPath = `./.ftppass`
        if (fs.existsSync(ftppassPath)) {
          ftppass = JSON.parse(fs.readFileSync(ftppassPath, 'utf-8'))
        }
        ftppass.username = answers.username
        ftppass.password = answers.password
        fs.writeFileSync(ftppassPath, JSON.stringify(ftppass, null, 2))

        let readme = ''
        let readmePath = `./README.md`
        if (fs.existsSync(readmePath)) {
          readme = fs.readFileSync(readmePath, 'utf-8')
        }
        readme = readme.replace('# 项目标题', '# ' + answers.name)
        fs.writeFileSync(readmePath, readme)

        console.log('')
        console.log(chalk.magenta('完成'))
        console.log('')
        spinner.stop()
      }
    })
  })
})

program.parse(process.argv)