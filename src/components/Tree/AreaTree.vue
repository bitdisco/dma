<!--
 * @Descripttion: 
 * @version: 
 * @Author: 李星
 * @Date: 2021-03-21 14:42:23
 * @LastEditors: 李星
 * @LastEditTime: 2021-03-23 17:00:51
-->
<template>
  <div class="tree-aside">
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
        <nav class="navbar lable-type">
          <div class="lable-box">
            <span class="should-write"><i style="background-color: #00D099;"></i>应抄月 </span>
            <span><i style="background-color: #B0B0B0;"></i>非抄月 </span>
          </div>
        </nav>
      </div>
      <div class="tree-aside-wrapper">
        <div class="example" v-if="isLoadingBooks">
          <a-spin />
        </div>
        <a-tree 
           v-if="!isLoadingBooks"
          :treeData="treeData" 
          :replaceFields="replaceFields" 
          @select="onSelect" 
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          :load-data="onLoadData" 
          @expand="onExpand">
          <div class="books" slot="books" slot-scope="{ name, expanded }">
            <template v-if="expanded">
              <a-icon type="folder-open" style="margin-right: 5px;" />{{ name }} 
            </template>
            <template v-else>
              <a-icon type="folder" style="margin-right: 5px;" />{{ name }}
            </template>
          </div>
          <div class="book" style="display: flex;" slot="book" slot-scope="{ bookName, bookCode, orderNo, nextWriteMon }">
            <span 
              style="
              overflow: hidden;
              display: inline-block;
              white-space: nowrap;
              padding-right: 10px;
              width: 150px;
              text-overflow: ellipsis;"
              :title="bookName" 
            ><a-icon type="file" style="margin-right: 5px;" />{{ bookName }}</span>
            <span style="display: inline-block;width: 80px;">({{ bookCode }})</span>
            <span class="book-or-no" :style="{
              background: nextWriteMon > 0 ? '#00D099' : '#B0B0B0',
            }">{{ orderNo || 1 }}</span>
          </div>
        </a-tree>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import OwnsOrginzesApi from "@/api/platform/config";
import AreaApi from "@/api/dma/generatorApis/area";
import { UserModule } from "@cr/utils";

@Component<Tree>({ name: "Tree", components: {  } })
export default class Tree extends Vue {
  protected treeSearchKey: string = "";
  private treeItems: Array<any> = [];
  private isLoadingBooks: boolean = false;
  private treeData: Array<any> = [];
  private expandedKeys: Array<any> = [];
  private backupsExpandedKeys: Array<any> = [];
  private autoExpandParent: boolean = false;
  private replaceFields: any = {
    children:'children', key:'id', title:'name',
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
    this.getOwnsOrginzes();
    this.getWriteBooks();
  }

  /**
   * 树  搜索
   */
  private onSearchChanged() {
    let vm:any = this;
    //如果搜索值为空，则不展开任何项，expandedKeys置为空
    //如果搜索值不位空，则expandedKeys的值要为搜索值的父亲及其所有祖先
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
    // console.log(expandedKeys, expanded, node)
    //用户点击展开时，取消自动展开效果
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }
  
  /**
   * 加载组织数据（本用户），组装基本树数据
   */
  private getOwnsOrginzes() {
    this.treeData = [];
    OwnsOrginzesApi.getOwnsOrginzes().then((res) => {
      if (res?.length) {
        let parentId:string = '';
        let node1Obj:any = {};
        res.forEach((node1:any, index1:any) => {
          if (node1.type === 0) {
            parentId = node1.id;

            // node1Obj.title = node1.name;
            // node1Obj.key = node1.id;
            // node1Obj.encode = node1.encode;
            // node1Obj.type = node1.type;
            // node1Obj.scopedSlots = { title: "books", };
            // node1Obj.children = [];

            this.treeData.push(node1);
            this.$set(this.treeData[0], 'children', []);
            this.$set(this.treeData[0], 'scopedSlots', { title: "books", icon: 'folder' });
          }
          if (node1.type === 1 && node1.parentId === parentId) {
            
            // let node2Obj:any = {
            //   title: node1.name, 
            //   key: node1.id,
            //   type: node1.type,
            //   encode: node1.encode,
            //   children: [],
            //   scopedSlots: { title: "books", icon: 'database' }
            // };
            // node1Obj.children.push(node2Obj)

            this.treeData[0].children.push(node1);
            this.treeData[0].children.map((item:any) => {
              if (!item.children) {
                this.$set(item, 'children', []);
                this.$set(item, 'scopedSlots', { title: "books", icon: 'folder' });
              }
            })
          }
        }); 
        
        // if (node1Obj.children) {
        //   if (node1Obj.children?.length) {
        //     node1Obj.children.map((item:any)=>{
        //       res.map((it:any)=>{
        //         if (item.key === it.parentId) {
        //           let node3Obj:any = {
        //             title: it.name, 
        //             key: it.id,
        //             type: it.type,
        //             encode: it.encode,
        //             children: [],
        //             scopedSlots: { title: "books", icon: 'database' }
        //           };
        //           item.children.push(node3Obj);
        //         }
        //       })
        //     })
        //   }
        // }
        // this.treeData.push(node1Obj);

        if (this.treeData.length>0) {
          if (this.treeData[0].children && this.treeData[0].children.length>0) {
            this.treeData[0].children.map((item:any) => {
              res.map((val:any)=>{
                if (item.id === val.parentId) {
                  item.children.push(val);
                }
              })
              if (item.children.length>0) {
                item.children.map((it:any) => {
                  this.$set(it, 'children', []);
                  this.$set(it, 'scopedSlots', { title: "books", icon: 'folder' });
                })
              }
            })
          } 
        }
      }
    });
  }

  /**
   * 表册树数据
   */
  private getWriteBooks() {
    // this.isLoadingBooks = true;
    AreaApi.getAreaTree({UserId: UserModule().userId}).then((res) => {
      this.treeItems = res;
      // setTimeout(() => {
      //   this.isLoadingBooks = false;
      // }, 300);
    });
  }

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
  private onSelect(selectedKeys: any, info: any) {
    // console.log(info)
    this.$emit('getTreeNode', info.node.dataRef)
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