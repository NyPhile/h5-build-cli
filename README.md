# H5模板构建工具

### 使用方式

```bash
# node版本大于5.2
$ npx h5-build-cli init -t NyPhile/h5_template
```

### 参数

以下参数均可交互式输入

```bash
-n or --name      # 项目名称，必须，用于替换模板项目中package.json的{name}
-c or --channel   # 频道名称，必须，用于替换模板项目内上传路径中的频道路径
-d or --desc      # 项目描述，可选，用于替换模板项目中package.json的{description}
-t or --template  # 模板地址，使用download-git-repo下载模板，H5模板地址 NyPhile/h5_template
--username        # easeftp上传工具账号，即邮箱前缀
--password        # easeftp上传工具密码，即邮箱密码
```