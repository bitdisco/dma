# 基于ANTui库的业务系统VUE前端框架模版工程

## 项目安装
```
yarn install
```

### 项目配置说明

#### 修改包名及项目名称(package.json)

```
{
    "name": "vue-sr-template",
    "projectName": "后台管理平台项目前端框架",
    ...
}
```

#### 修改项目启动端口和系统名称
通过修改 src/environment/env.ts 文件的进行配置
变量proxy 用于修改默认后端接口代理地址,
变量envConfig 用于修改开发调试端口、代理配置及系统名称信息

```typescript
/** 开发代理地址 */
const proxy = {
  baseUrl: "http://36.133.33.128:3011" // 数据接口
};

/** 开发环境配置信息 */
const envConfig = {
  port: 8088, //开发调试端口
  proxy,
  appName: "平台框架示例工程", //系统名称
};
```

#### 修改开发环境系统基础配置文件地址
通过修改 src/environment/process.ts 文件的进行配置

environment变量表示当前运行环境类型（不可修改）
isProduction  变量为判断是否是开发环境：是：true/不是：false（不可修改）
devBaseConfigUrl 变量表示开发时默认配置文件URL地址

```typescript
// 获取当前运行环境变量
const environment: String | undefined = process.env.NODE_ENV;

// 判断是否是开发环境：是：true/不是：false
export const isProduction = environment === "production";

/**
 * 开发时默认配置文件
 */
export const devBaseConfigUrl =
  "http://36.133.33.128:3011/config/Platform/config.dev.json";
```

### 项目开发调试运行命令
```
yarn run dev
```

### 项目编译打包命令 
```
yarn run build
```

### 运行项目测试
```
yarn run test
```

### 运行项目语法检测和语法修复提示
```
yarn run lint
```

### 代码生成器相关命令

#### API接口生成命令
```
yarn code-api
```

#### VUE页面生成命令
```
yarn code-vue
```

#### 枚举生成命令
```
yarn code-enum
```

#### 生成器可视化命令 (暂未实现功能)
```
yarn code-ui
```

### 自定义配置说明
请参考 [CLI脚本架配置说明](https://cli.vuejs.org/config/).

### 项目目录结构说明

暂略

### 项目技术细节说明

请参考 [《前端框架技术细节说明》](https://www.yuque.com/docs/share/1d62e327-62df-49f8-8b02-55f74e162deb).
