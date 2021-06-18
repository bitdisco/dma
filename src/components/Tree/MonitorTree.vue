<!--
 * @Descripttion:
 * @version:
 * @Author: 李星
 * @Date: 2021-03-21 14:42:23
 * @LastEditors: 张小凡
 * @LastEditTime: 2021-06-03 14:53:09
-->
<template>
  <div class="tree-cont">
    <div class="tree-aside-header">
        <div class="header-search">
          <a-input-search
            class="input-search"
            placeholder="输入关键字过滤"
            v-model="treeSearchKey"
            @change="onSearchChanged"
          />
          <div class="clear-button">
            <a-button @click="clearSelectItem">清除已选</a-button>
          </div>
        </div>
    </div>
    <div class="tree-aside-wrapper">
      <div class="example" v-if="isLoadingBooks">
        <a-spin />
      </div>
      <a-tree
        v-if="!isLoadingBooks"
        :treeData="treeData"
        :checkable="checkable"
        :replaceFields="replaceFields"
        @select="onSelect"
        @check="onCheck"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        :load-data="onLoadData"
        @expand="onExpand">
      </a-tree>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import OwnsOrginzesApi from "@/api/platform/config";
import AreaMeterApi from "@/api/dma/generatorApis/areaMeter";
import { UserModule } from "@cr/utils";

@Component<Tree>({ name: "Tree", components: {  } })
export default class Tree extends Vue {
  @Prop({ default: false }) private checkable!: boolean;

  protected treeSearchKey: string = "";
  private treeItems: Array<any> = [];
  private isLoadingBooks: boolean = false;
  private treeData: Array<any> = [];
  private expandedKeys: Array<any> = [];
  private backupsExpandedKeys: Array<any> = [];
  private autoExpandParent: boolean = false;
  private replaceFields: any = {
    key:'id', title:'name',isLeaf:'isLeaf'
  }

  /**
   * 组件创建时执行
   */
  created() {

  }

  /**
   * 组件挂载成功
   */
  mounted() {
    // this.getOwnsOrginzes();
    this.$nextTick(()=>{
      this.queryAreaTree();
    })

    // this.getWriteBooks();
  }

  /**
   * 树  搜索
   */
  private onSearchChanged() {
    let vm:any = this;
    //如果搜索值为空，则不展开任何项，expandedKeys置为空
    //如果搜索值不为空，则expandedKeys的值要为搜索值的父亲及其所有祖先
    if(vm.treeSearchKey === ''){
      vm.expandedKeys = [];
    } else {
      //首先将展开项与展开项副本置为空
      vm.expandedKeys = [];
      vm.backupsExpandedKeys = [];
      //获取所有存在searchValue的节点
      let candidateKeysList = vm.getkeyList(vm.treeSearchKey,vm.treeData,[]);
      //遍历满足条件的所有节点
      candidateKeysList.map(
        (item:any)=>{
          //获取每个节点的母亲节点
          var key = vm.getParentKey(item,vm.treeData);
          //当item是最高一级，父key为undefined，将不放入到数组中
          //如果母亲已存在于数组中，也不放入到数组中
          if(key && !vm.backupsExpandedKeys.some((item:any)=>item===key))
            vm.backupsExpandedKeys.push(key);
        }
      )
      let length = vm.backupsExpandedKeys.length;
      for(let i=0;i<length;i++){
        vm.getAllParentKey(vm.backupsExpandedKeys[i],vm.treeData)
      }
      vm.expandedKeys = vm.backupsExpandedKeys.slice();
    }
  }

  /**
   * 获取节点中含有value的所有key集合
   */
  private getkeyList(value:any,tree:any,keyList:any){
    //遍历所有同一级的树
    for(let i=0;i<tree.length;i++){
      let node = tree[i];
      // console.log(node, value)
      //如果该节点存在value值则push
      if (node.bookName) {
        if(node.bookName.indexOf(value)>-1){
          keyList.push(node.id);
        }
      } else {
        if(node.name.indexOf(value)>-1){
          keyList.push(node.id);
        }
      }

      //如果拥有孩子继续遍历

      if(node.children){
        if (node.children.length>0) {
          this.getkeyList(value,node.children,keyList);
        } else {
          let treeNode: any = {
            dataRef: {
              children: node.children,
              id: node.id
            }
          };
          this.onLoadData(treeNode);
          this.isLoadingBooks = true;
          setTimeout(() => {
            this.getkeyList(value,node.children,keyList);
            this.isLoadingBooks = false;
          }, 1500)
        }
      }
    }
    //因为是引用类型，所有每次递归操作的都是同一个数组
    return keyList;
  }

  /**
   * 该递归主要用于获取key的父亲节点的key值
   */
  private getParentKey(key:any,tree:any){
    let parentKey,temp:any;
    //遍历同级节点
    for(let i=0;i<tree.length;i++){
      const node=tree[i];
      if(node.children){
        //如果该节点的孩子中存在该key值，则该节点就是我们要找的父亲节点
        //如果不存在，继续遍历其子节点
        if(node.children.some((item:any)=>item.id===key)){
          parentKey = node.id;
        }else if(temp=this.getParentKey(key,node.children)){
          //parentKey = this.getParentKey(key,node.children)
          //改进，避免二次遍历
          parentKey = temp;
        }
      }
    }
    return parentKey;
  }

  /**
   * 获取该节点的所有祖先节点
   */
  private getAllParentKey(key:any,tree:any){
    let parentKey:any;
    if(key){
      //获得父亲节点
      parentKey = this.getParentKey(key,tree);
      if(parentKey){
        //如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
        if(!this.backupsExpandedKeys.some(item=>item===parentKey)){
          this.backupsExpandedKeys.push(parentKey);
        }
        //继续向上查找祖先节点
        this.getAllParentKey(parentKey,tree)
      }
    }
  }

  /**
   * 树型节点展开事件
   */
  private onExpand(expandedKeys:any, {expanded, node}:any) {
    //用户点击展开时，取消自动展开效果
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

   /**
   * 加载地区，组装基本树数据
   */
  private queryAreaTree() {
    AreaMeterApi.tree({}).then((res) => {
      // this.clearDeep(res);
      // console.log("结果",res);
      this.treeData = res;
      this.expandedKeys.push(res[0].id);
    });
  }


  private clearDeep(obj:any) {
    if (!obj) return
    const keys = Object.keys(obj)
    for (var key of keys) {
      const val = obj[key]
      if (
        typeof val === 'undefined' ||
        ((typeof val === 'object' || typeof val === 'string') && !val)
      ) {
        // 如属性值为null或undefined或''，则将该属性删除
        delete obj[key]
      } else if (typeof val === 'object') {
        // 属性值为对象，递归调用
        this.clearDeep(obj[key])

        if (Object.keys(obj[key]).length === 0) {
          // 如某属性的值为不包含任何属性的独享，则将该属性删除
          delete obj[key]
        }
      }
    }
  }

  /**
   * 表册树数据
   */
  // private getWriteBooks() {
  //   // this.isLoadingBooks = true;
  //   AreaMeterApi.getAreaTree({UserId: UserModule().userId}).then((res) => {
  //     this.treeItems = res;
  //     // setTimeout(() => {
  //     //   this.isLoadingBooks = false;
  //     // }, 300);
  //   });
  // }

  /**
   * 清除树节点选中
   */
  private clearSelectItem() {
    this.treeSearchKey = '';
    this.onSearchChanged();
  }

  /**
   * 树型节点点击事件
   */
  private onSelect(info: any) {
    this.$emit('getTreeNode' ,info.node.dataRef)
  }

  /**
   * 树型节点复选框勾选事件
   */
  private onCheck(key:any, info:any){
    this.$emit('checkTreeNode' ,info.checkedNodes)
  }

  /**
   * 点击加载下级数据节点  (模拟异步)
   */
  private onLoadData(treeNode: any) {
    return new Promise((resolve:any) => {
      if (treeNode.dataRef.children) {
        if (treeNode.dataRef.children.length<1) {
          setTimeout(() => {
            this.treeItems.map((item) => {
              if (treeNode.dataRef.id === item.organizeId) {

                // let treeNodeObj:any = {
                //   title: item.bookName + '('+ item.bookCode +')' + '('+ item.orderNo +')',
                //   key: item.id,
                //   bookCode: item.bookCode,
                //   encode: item.organizeCode,
                //   isLeaf: true,
                //   scopedSlots: { title: "book", icon: 'database', isLeaf: true }
                // }
                // treeNode.dataRef.children.push(treeNodeObj);
                // this.treeData = [...this.treeData];

                let obj:any = item;
                obj.isLeaf = true;
                obj.scopedSlots = { title: "book", icon: 'file', isLeaf: true };
                treeNode.dataRef.children.push(obj);
                this.treeData = [...this.treeData];
              }
            })
            resolve();
          }, 1000);
        } else {
          resolve();
          return;
        }
      } else {
        resolve();
        return;
      }
    });
  }
}
</script>
<style lang="less" scoped>
// /deep/ .ant-tabs-nav .ant-tabs-tab {
//     margin-right: 0;
// }
.book-or-no {
  display: inline-block;
  // position: absolute;
  // right: 5%;
  padding: 0 4px;
  margin-top: 3px;
  color: whitesmoke;
  font-size: 14px;
  border-radius: 2px;
}
.tree-aside {
  padding: 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: rgb(250, 251, 252);
  border: 1px solid #e6e6e6;

  &-header {
    .header-search {
      display: flex;
      .input-search {
        flex: 1;
        margin-bottom: 8px;
      }
      .clear-button {
        margin-left: 5px;
      }
    }
  }
  &-wrapper {
    flex: 1;
    overflow: auto;
    .example {
      text-align: center;
      border-radius: 4px;
      padding: 30px 0;
    }
  }
  .lable-type {
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 0 24px;
    .lable-box {
      i {
        color: rgb(255 151 184);
        margin-right: 5px;
        font-size: 16px;
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
      }
      .should-write {
        margin-right: 15px;
        i {
          color: #bae9ff;
          margin-right: 5px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
