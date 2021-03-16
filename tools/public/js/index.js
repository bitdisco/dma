


var createApp = function (data) {
    // console.log("data",data)
    var app = new Vue({
        el: '#app',
        data: {
            selectedSystemName: null,
            systemName: "",
            swaggerUrl: "",
            logPanelVisible: true,
            logs: [],
            ...data
        },
        methods: {
            /**
             * swagger下拉列表事件处理逻辑
             */
            onSystemChanged() {
                if (this.selectedSystemName === '') {
                    this.swaggerUrl = '';
                    this.systemName = '';
                } else {
                    this.systemName = this.selectedSystemName;
                    this.swaggerUrl = this.swaggerUrls.find(x => x.name === this.systemName).value;
                }
            },
            /**
             * 获取API接口信息
             */
            getSwaggerInfo() {
                this.$message.info("【getSwaggerInfo】拉取接口数据调用功能开发中~~~~");
            },
            /**
             * 
             */
            getEnumInfo() {
                let callback = this.$message.loading("数据加载中……");
                setTimeout(() => {
                    callback();
                    this.$message.success("OK")
                }, 3000)
            },
            /**
             * 生成DTO类型
             */
            createDtoTypes() { },
            /**
             * 生成Api
             */
            createSwaggerApi() {
                let query = {
                    systemName: this.systemName,
                    swaggerUrl: this.swaggerUrl
                };
                if (query.systemName.trim() === '') {
                    this.$message.error("请输入模块名~");
                    return;
                } if (query.swaggerUrl.trim() === '') {
                    this.$message.error("请输入swagger接口信息地址~");
                    return;
                }
                let callback = this.$message.loading("正在生成API，请稍后……");
                this.logger(`正在生成API...`);
                this.logger(`请求接口：/api/create,请求参数：\r\n${JSON.stringify(query, null, 4)}`);
                axios.get("/api/create", { params: query }).then(res => {
                    this.logger(`接口调用成功：\r\n${JSON.stringify(res.data, null, 4)}`);
                    if (data && res.data.success) {
                        callback();
                        this.$message.success("API接口调用代码生成成功~");
                    } else {
                        this.$message.error(res.data.message || "API接口调用代码生成失败~");
                    }
                }).catch(err => {
                    this.logger(`接口调用出,错误信息：${err}`);
                    callback();
                    this.$message.error("API接口调用代码生成失败~");
                });
            },
            /**
             * 生成VUE
             */
            createSwaggerVue() {
                let query = {
                    systemName: this.systemName,
                    swaggerUrl: this.swaggerUrl
                };
                if (query.systemName.trim() === '') {
                    this.$message.error("请输入模块名~");
                    return;
                } if (query.swaggerUrl.trim() === '') {
                    this.$message.error("请输入swagger接口信息地址~");
                    return;
                }
                let callback = this.$message.loading("正在生成VUE页面，请稍后……");
                this.logger(`正在生成VUE页面...`);
                this.logger(`请求接口：/vue/create,请求参数：\r\n${JSON.stringify(query, null, 4)}`);
                axios.get("/vue/create", { params: query }).then(res => {
                    this.logger(`接口调用成功：\r\n${JSON.stringify(res.data, null, 4)}`);
                    if (data && res.data.success) {
                        callback();
                        this.$message.success("VUE页面代码生成成功~");
                    } else {
                        this.$message.error(res.data.message || "VUE页面代码生成失败~");
                    }
                }).catch(err => {
                    this.logger(`接口调用出,错误信息：${err}`);
                    callback();
                    this.$message.error("VUE页面代码生成失败~");
                });
            },
            /**
             * 生成枚举
             */
            createEnumTypes() {
                let query = {
                    enumUrl: this.enumUrl,
                };
                if (query.enumUrl.trim() === '') {
                    this.$message.error("请输入枚举数据源信息URL地址~");
                    return;
                }
                let callback = this.$message.loading("正在生成枚举类型，请稍后……");
                this.logger(`正在生成枚举...`);
                this.logger(`请求接口：/api/create,请求参数：\r\n${JSON.stringify(query, null, 4)}`);
                axios.get("/enum/create", { params: query }).then(res => {
                    this.logger(`接口调用成功：\r\n${JSON.stringify(res.data, null, 4)}`);
                    if (data && res.data.success) {
                        callback();
                        this.$message.success("生成枚举类型成功~");
                    } else {
                        this.$message.error(res.data.message || "生成枚举类型失败~");
                    }
                }).catch(err => {
                    this.logger(`接口调用出,错误信息：${err}`);
                    callback();
                    this.$message.error("生成枚举类型失败~");
                });
            },
            /**
             * 生成常量
             */
            createDictionaryConsts() { },
            logger(message) {
                this.logs.push(message)
            }
        }
    })
}