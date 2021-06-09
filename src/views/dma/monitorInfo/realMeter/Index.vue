<template>
  <tree-layout-page-wrapper hide-title-bar :treeWidth="260">
    <template slot="tree">
      <!-- <address-tree :checkable="true" @getTreeNode="getTreeNode"/> -->
      <monitor-tree @getTreeNode="getTreeNode" />
    </template>
    <div class="compact-page-wrapper">
      <advanced-search-panel
        :showInput="false"
        v-model="searchModel"
        :fields="searchFields"
        :dropdownWidth="600"
        :layoutColumn="2"
        :inputStyle="{ placeholder: '请输入关键词', style: { width: '150px' } }"
        @search="onSearch"
      >
        <template slot="actions">
          <a-button-group>
            <a-button @click="queryList" icon="sync">刷新</a-button>
            <a-button
              @click="defaultHandleCreate()"
              v-auth="{ action: 'Create' }"
              icon="plus"
              >新增</a-button
            >
            <a-button
              :disabled="!currentRow"
              @click.stop="defaultHandleUpdate(currentRow)"
              v-auth="{ action: 'Update' }"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定要删除当前数据吗？"
              @confirm.stop="onDeleteItem(currentRow)"
            >
              <a-button
                type="danger"
                v-auth="{ action: 'Delete' }"
                :disabled="!currentRow"
                >删除</a-button
              >
            </a-popconfirm>
          </a-button-group>
        </template>
      </advanced-search-panel>
      <div class="compact-page-table">
        <card-list :list="dataSource" />
      </div>
      <div class="table-pagination">
        <a-pagination
          v-bind="pagination"
          @showSizeChange="onShowSizeChange"
          @change="onPageChanged"
        ></a-pagination>
      </div>
    </div>
  </tree-layout-page-wrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SortedInfo, ToolbarActionItem, ListPageVxe } from "@cr/types";
import { PaginationConfig } from "ant-design-vue/types/list/list";
import api from "@/api/dma/generatorApis/armRealData";
import AreaApi from "@/api/dma/generatorApis/area";
import AddressTree from "@/components/Tree/AddressTree.vue";
import MonitorTree from "@/components/Tree/MonitorTree.vue";
import AreaTree from "@/components/Tree/AreaTree.vue";
import { ArmRealDataDto } from "@/api/dma/types";
import CardList from "./components/CardList.vue";
import { Assembly } from "@/api/dma/types/assembly";

@Component<RealDataList>({
  name: "RealDataList",
  components: { AddressTree, AreaTree, MonitorTree,CardList },
})
export default class RealDataList extends ListPageVxe<ArmRealDataDto, string> {
  //#region 树控件相关
  private expandedKeys: string[] = [];
  private autoExpandParent: boolean = true;
  private selectedKeys: Array<string> = [];
  private replaceFields: any = {
    children: "children",
    key: "id",
    title: "areaName",
  };
  private treeData: any[] = [];

  private queryAreaTree() {
    AreaApi.getAreaTree({}).then((res) => {
      this.treeData = res;
      this.expandedKeys.push(res[0].id);
    });
  }
  private onExpand(expandedKeys: any) {
    //console.log("onExpand " + expandedKeys, expandedKeys);
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }
  private onSelect(selectedKeys: any, info: any) {
    //console.log("onSelect " + selectedKeys, info);
    this.selectedKeys = selectedKeys;
    this.searchModel.AreaId = selectedKeys[0];
    this.queryList();
  }
  //#endregion
  //#region 工具栏按钮属性

  private toolbar_actions: Array<ToolbarActionItem> = [
    {
      title: "刷新",
      props: { icon: "sync" },
      click: () => {
        this.queryAreaTree();
        this.queryList();
      },
    },
  ];
  //#endregion
  //#region 组件创建时执行
  created() {
    
    this.getPagination.pageSize = 10;
    this.searchFields = [
      {
        name: "Keyword",
        label: "关键字",
        input: "a-input",
        props: {
          placeholder: "输入监测点名称、监测点编码、挂接表号关键词进行模糊搜索",
        },
      },
      {
        name: "meterName",
        label: "监测点名称",
        input: "a-input",
        props: {
          placeholder: "请输入监测点名称",
        },
      },
      {
        name: "meterCode",
        label: "监测点编码",
        input: "a-input",
        props: {
          placeholder: "请输入监测点编码",
        },
      },
      {
        name: "addressCode",
        label: "挂接表号",
        input: "a-input",
        props: {
          placeholder: "请输入挂接表号",
        },
      },
      {
        name: "addressCode",
        label: "挂接表号",
        input: "a-input",
        props: {
          placeholder: "请输入挂接表号",
        },
      },
    ];
  }
  //#endregion
  //#region 组件挂载成功后执行

  mounted() {
    this.queryAreaTree();
    this.queryList();
  }
  //#endregion
  //#region 查询方法

  private onSearch() {
    this.getPagination.current = 1;
    //处理其它查询条件逻辑。。。。
    this.queryList();
  }
  //#endregion
  //#region 表格控件相关
  /**
   * 分页查询列表
   */
  private queryList() {
    let page = this.getPagination;
    /**
     * 查询条件
     */
    let queryModel = Object.assign(
      {
        MaxResultCount: this.getMaxResultCount,
        SkipCount: this.getSkipCount,
      },
      this.searchModel
    );

    api.getQueryList(queryModel).then((res:any) => {
      console.log("数据", res);
      this.loading = false;
      this.dataSource = res.items;
      this.getPagination.total = res.totalCount;
    });
    this.currentRow = null;
    this.loading = true;
  }

  /*树点击事件*/
  private getTreeNode(val: any) {
    console.log("点击树信息", val);
    this.searchModel.AreaName = val.areaName;
    this.searchModel.AreaCode = val.areaCode;
    this.searchModel.AreaGrade = val.areaGrade;
    this.queryList();
  }

  /**
   * 表格事件
   */
  private onTableCellClick({ row }: any) {
    this.currentRow = row;
  }

  /**
   * 表格分页事件
   */
  private onPageChanged(current: number) {
    this.getPagination.current = current;
    this.pagination = this.getPagination;
    this.queryList();
  }

  /**
   * 分页组件改变分页大小事件
   */
  private onShowSizeChange(current: number, size: number) {
    this.getPagination.current = current;
    this.getPagination.pageSize = size;
    this.pagination = this.getPagination;
    this.queryList();
  }

  /**
   * 删除选择项
   */
  private onDeleteItem(row: ArmRealDataDto) {
    api.delete(row.id).then((res) => {
      this.$message.success({ content: "删除成功~" });
      this.queryList();
    });
  }

  /** 批量删除 */
  private deleteSelectedItems() {}

  /**
   * 表格选择行事件
   * @param selectedRowKeys
   */
  private onTableSelectChange(selectedRowKeys: Array<any>) {
    this.selectedRowKeys = selectedRowKeys;
    this.columns = [{ field: "", title: "", width: "", align: "center" }];
  }
  //#endregion
}
</script>

<style scoped>
.vxetable {
  height: calc(100vh - 100px);
}
</style>
