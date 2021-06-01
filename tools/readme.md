# tools 相关工具使用说明

### API 接口生成说明

#### 脚本说明

用于生成项目的 api 接口调用 JS 及相关 dto 类型定义 JS

#### 使用方法

1. 修改 config.js 文件，将对应远程接口的 swagger 接口定义地址配置到变量 swaggerUrls 值上,代码如下

```js
const swaggerUrls = {
  platform: "http://36.133.33.128:4000/swagger/v1/swagger.json",
  message: "http://36.133.33.128:3026/swagger/v1/swagger.json"
};

/**
 * 包含要生成的控制器名，为空则生成全部
 */
const generateConfig = {
  /**
   * 要生成的API模块
   */
  api: {
    /**
     * 是否生成全部模块
     */
    generateAll: false,
    /**
     * 生成所有带控制器注解的模块
     */
    allAnnotation: true,
    /**
     * 要排除生成的模块名配置集合（后端控制器名称）
     * 键值对格式，键名同swaggerUrls配置的键名称一致及
     */
    excludes: {
      platform: [],
      message: []
    },
    /**
     * 要包含生成的模块名配置集合（后端控制器名称）
     * 键值对格式，键名同swaggerUrls配置的键名称一致及
     */
    includes: {
      platform: [],
      message: []
    }
  },
  /**
   * 要生成的VUE模块
   */
  vue: {
    /**
     * 是否生成全部模块
     */
    generateAll: false,
    /**
     * 生成所有带控制器注解的模块
     */
    allAnnotation: true
    /**
     * 要排除生成的模块名配置集合（后端控制器名称）
     * 键值对格式，键名同swaggerUrls配置的键名称一致及
     */,
    excludes: {
      charge: [],
      platform: [],
      message: []
    },
    /**
     * 要排除生成的模块名配置集合（后端控制器名称）
     * 键值对格式，键名同swaggerUrls配置的键名称一致及
     */
    includes: {
      platform: [],
      message: []
    }
  }
};
```

swaggerUrls 配置为键值对格式，键名为系统名称(systemName)，键值为 swagger 接口数据信息地址、生成器将根键名作为目录或文件部分标识生成对应代码。
generateConfig.api 配置用于控制生成全部API模块还是按控制器名称生成部分模块。
generateConfig.vue 配置用于控制生成全部页面模块还是按控制器名称生成部分模块。

2. 执行生成

在开发工具或 CMD 命令行中，进入到项目根目录，然后执行以下命令及可完成 API 相关的接口生成及配置文档生成。

```shell
node tools -api
```

执行成功将会在项目 src/api/{systemName}/目录下生成以下文件

src/api/{systemName}/types.ts 业务系统接口 DTO 定义文件
src/api/{systemName}/generatorUrls.ts 接口地址配置文件
src/api/{systemName}/generatorApis/\*.ts 接口 API 调用方法代码文件

注：重新生成会覆盖以上文件，主谨慎操作。

### VUE 页面生成说明

#### 脚本说明

用于根据 Swagger 地址生成项目的 VUE 模块列表及表单页面、测试路由及测试菜单信息

#### 使用方法

1. 修改 config.js 文件，将对应远程接口的 swagger 接口定义地址配置到变量 swaggerUrls 值上,代码如下

```js
const swaggerUrls = {
  platform: "http://36.133.33.128:4000/swagger/v1/swagger.json",
  message: "http://36.133.33.128:3026/swagger/v1/swagger.json"
};
```

swaggerUrls 配置为键值对格式，键名为系统名称(systemName)，键值为 swagger 接口数据信息地址、生成器将根键名作为目录或文件部分标识生成对应代码。

2. 安装依赖

VUE 页面生成使用到 ejs 模版引擎，需要安装 ejs 后生成器才能正常执行,如果之前已全局安装过 ejs 则跳过此步骤.

```bash
npm install ejs -g
```

3. 执行生成

在开发工具或 CMD 命令行中，进入到项目根目录，然后执行以下命令及可完成 VUE 模块列表页、修改页、测试路由配置、测试菜单配置。

```shell
node tools -vue
```

执行成功将会在项目 src/目录下生成以下文件

src/views/generators/{systemName}/\*\* VUE 页面文件
src/router/generators*{systemName}.ts 测试路由配置文件
src/config/generator*{systemName}\_menu.ts 测试菜单文件

注：重新生成会覆盖以上文件，主谨慎操作。

### 系统枚举生成说明

#### 脚本说明

脚本用于生成项目的枚举定义

#### 使用方法

1. 修改 config.js 文件，将对应远程枚举信息调用接口定义地址配置到变量 enumUrl 值上,代码如下

```js
const enumUrl = "http://36.133.33.128:4000/api/utils/enum";
```

2. 执行生成

在开发工具或 CMD 命令行中，进入到项目根目录，然后执行以下命令及可完成系统枚举接口约束及实现常量定义。

```shell
node tools -enum
```

执行成功将会在项目中生成以下文件

src/types/generator_enums.ts 枚举常量接口约束
src/plugins/enums/generators.ts 枚举定义文件

注：重新生成会覆盖以上文件，主谨慎操作。

### 系统字典常量生成说明

#### 脚本说明

脚本用于生成项目的字典常量类型约束及常量值定义

#### 使用方法

1. 修改 config.js 文件，将对应远程枚举信息调用接口定义地址配置到变量 dictionaryUrl 值上,代码如下

```js
/**
 * 字典接口地址
 */
const dictionaryUrl = {
  /**
   * 接口地址
   */
  url: "http://36.133.33.128:4000/api/dictionary/dictionaryItems",
  /**
   * 要生成的模块名
   */
  moduleName: "Module.Charge"
};
```

url 表示字典常量生成信息获取接口地址
moduleName:表示要生成的字典对应的子系统模块名

2. 执行生成

在开发工具或 CMD 命令行中，进入到项目根目录，然后执行以下命令及可完成系统字典常量对应的类型约束及实现常量定义。

```shell
node tools -dict
```

执行成功将会在项目中生成以下文件

src/types/generator_dictionarys.ts 字典常量接口约束
src/plugins/dictionary/generators.ts 字典常量值定义文件

注：重新生成会覆盖以上文件，主谨慎操作。

### 启动可视化生成器

```shell
node tools -ui
```
