<template>
  <tree-layout-page-wrapper hide-title-bar :treeWidth="260">
    <template slot="tree">
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
              :disabled="!selecteTreeData"
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
        <vxe-table
          id="vxeTable"
          :data="dataSource"
          :loading="loading"
          highlight-current-row
          highlight-hover-row
          @cell-click="onTableCellClick"
          border
          auto-resize
          height="auto"
          :seq-config="{ startIndex: getSkipCount }"
          :custom-config="{ storage: true }"
          size="small"
        >
          <vxe-table-column type="seq" width="50" align="center"></vxe-table-column>
          <vxe-table-column
            v-bind="col"
            v-for="(col, index) in columns"
            :key="index"
          ></vxe-table-column>
        </vxe-table>
      </div>
      <div class="table-pagination">
        <a-pagination
          v-bind="pagination"
          @showSizeChange="onShowSizeChange"
          @change="onPageChanged"
          v-if="!selecteTreeData"
        ></a-pagination>
      </div>
    </div>
    <!--添加修改模块-->
    <form-view
      v-if="popupModel.visible"
      :action="popupModel.action"
      v-model="popupModel.visible"
      :id="popupModel.id"
      :item="popupModel.data"
      :treeData="selecteTreeData"
      @success="queryList"
    />
  </tree-layout-page-wrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SortedInfo, ToolbarActionItem, ListPageVxe } from "@cr/types";
import api from "@/api/dma/generatorApis/areaItem";
import AreaApi from "@/api/dma/generatorApis/area";
import MonitorTree from "@/components/Tree/MonitorTree.vue";
import AreaTree from "@/components/Tree/AreaTree.vue";
import FormView from "./Form.vue";
import moment from "moment";

@Component<AreaStatisticalList>({
  name: "AreaStatisticalList",
  components: { AreaTree, MonitorTree, FormView },
})
export default class AreaStatisticalList extends ListPageVxe<any, string> {
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
  private selecteTreeData: any = null;
  private queryAreaTree() {
    AreaApi.getAreaTree({}).then((res) => {
      this.treeData = res;
      this.expandedKeys.push(res[0].id);
    });
  }

  private onExpand(expandedKeys: any) {
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  private onSelect(selectedKeys: any, info: any) {
    this.selectedKeys = selectedKeys;
    this.searchModel.AreaId = selectedKeys[0];
    this.queryList();
  }

  /**
   * 工具栏按钮属性
   */
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

  /**
   * 组件创建时执行
   */
  created() {
    this.columns = [
      {
        title: "分区名称",
        field: "areaName",
        width: 150,
      },
      {
        title: "分区编号",
        field: "areaCode",
        width: 120,
      },

      {
        title: "统计日期",
        field: "statisticalDate",
        width: 100,
      },
      {
        title: "计量售水量",
        field: "waterSale",
        width: 100,
      },
      {
        title: "未计量售水量",
        field: "waterUnsold",
        width: 120,
      },
      {
        title: "计量免费售水量",
        field: "waterFree",
        width: 120,
      },
      {
        title: "未计量免费售水量",
        field: "waterUnsoldFree",
        width: 125,
      },
      {
        title: "失窃水量",
        field: "waterStolen",
        width: 80,
      },
      {
        title: "计量误差水量",
        field: "waterError",
        width: 100,
      },
      {
        title: "渗水量",
        field: "waterSeepage",
        width: 80,
      },
      {
        title: "其他耗损水量",
        field: "waterOtherLoss",
        width: 100,
      },
      {
        title: "创建日期",
        field: "creationTime",
        width: 145,
      },
      {
        title: "创建用户",
        field: "creatorId",
        width: 85,
      },
      {
        title: "备注",
        field: "description",
        width: 85,
      },
    ];
    this.getPagination.pageSize = 10;
    this.searchFields = [
      // {
      //   name: "Keyword",
      //   label: "关键字",
      //   input: "a-input",
      //   props: {
      //     placeholder: "输入监测点名称、监测点编码、挂接表号关键词进行模糊搜索",
      //   },
      // },
      {
        name: "meterName",
        label: "分区名称",
        input: "a-input",
        props: {
          placeholder: "请输入分区名称",
        },
      },
      {
        name: "meterCode",
        label: "分区编码",
        input: "a-input",
        props: {
          placeholder: "请输入分区编码",
        },
      },
      {
        name: "StatisticalDate",
        label: "统计月份",
        input: "a-month-picker",
        props: { format: "YYYY-MM", valueFormat: "YYYY-MM" },
      },
    ];
  }

  /**
   * 组件挂载成功后执行
   */
  mounted() {
    this.queryAreaTree();
    this.queryList();
  }

  /**
   * 查询方法
   */
  private onSearch() {
    this.getPagination.current = 1;
    //处理其它查询条件逻辑。。。。
    this.queryList();
  }

  /**
   * 分页查询列表
   */
  private queryList() {
    let queryModel = Object.assign(
      {
        MaxResultCount: this.getMaxResultCount,
        SkipCount: this.getSkipCount,
      },
      this.searchModel
    );
    api.getQueryList(queryModel).then((res) => {
      this.loading = false;
      this.dataSource = res.items;
      this.getPagination.total = res.totalCount;
    });
    this.currentRow = null;
    this.loading = true;
  }

  /*树点击事件*/
  private getTreeNode(val: any) {
    this.dataSource = [];
    this.selecteTreeData = val;
    let area: any = val.area;
    if (area) {
      this.searchModel.AreaName = this.selecteTreeData.name;
      this.searchModel.AreaCode = this.selecteTreeData.code;
    }
    api.getInfoByAreaIdAsync(this.selecteTreeData.id).then((res: any) => {
      this.loading = false;
      if (res) {
        this.dataSource?.push(res);
      } else {
        this.dataSource = [];
      }
    });
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
  private onDeleteItem(row: any) {
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
