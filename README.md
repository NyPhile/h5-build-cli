# H5模板构建工具

## `注意！由于package名过长&覆盖面低，已经切换至 https://g.hz.netease.com/f2e/component/ne-build`

![version](https://img.shields.io/github/package-json/v/NyPhile/h5-build-cli.svg)
![commit](https://img.shields.io/github/last-commit/NyPhile/h5-build-cli.svg)
![new feature](https://img.shields.io/badge/author-wang__zhen-orange)

<p align="center">
  <img src="https://raw.githubusercontent.com/NyPhile/h5-build-cli/master/assets/logo.png">
</p>

### 命令

```bash
$ npx ne-build h5
# 请使用ne-build创建项目

$ npx h5-build-cli init -t NyPhile/h5_template
# node版本大于5.2
# 参数可在命令行输入，也可以输入命令后按交互提示输入
```

### 参数

以下参数均可交互式输入

```bash
-n or --name
# 项目名称，必须
# 用于替换模板项目中package.json的{name}

-c or --channel
# 频道名称，必须
# 用于替换模板项目内上传路径中的频道路径

-d or --desc
# 项目描述，可选
# 用于替换模板项目中package.json的{description}

-t or --template
# 模板地址，必选
# 使用download-git-repo下载模板
# H5模板地址 NyPhile/h5_template

--username
# 上传工具账号，必须，即邮箱前缀

--password
# 上传工具密码，必须，即邮箱密码
```

### 流程

1. 使用 `npx` 执行包命令
2. 输入相应参数（`name`、`channel`、`desc`、`template`、`username`、`password`）
3. 使用 `download-git-repo` 在当前目录下载对应模板内容
4. 替换 `package.json` 中的内容，`{name}` -> `name`，`{channel}` -> `channel`，`{desc}` -> `description`
5. 替换 `.ftppass` 中的内容，`{username}` -> `username`，`{password}` -> `password`
6. 替换 `README.md` 中的内容，`# {name}` -> `# 项目标题`

```bash
$ npx ne-build init
# 创建项目，可同时输入参数，如 npx ne-build init -t NyPhile/h5_template

$ npx ne-build h5
# 使用 NyPhile/h5_template 作为模板创建项目，等同于 npx ne-build init -t NyPhile/h5_template

$ npx ne-build post
# 使用 NyPhile/post_template 作为模板创建项目，等同于 npx ne-build init -t NyPhile/post_template
```




