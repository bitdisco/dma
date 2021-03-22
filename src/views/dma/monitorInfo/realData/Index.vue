<template>
  <page-header-wrapper class="compact-page" hide-title-bar>
    <div class="compact-page-wrapper">
      <advanced-search-panel
        :showInput="false"
        v-model="searchModel"
        :fields="searchFields"
        :inputStyle="{ placeholder: '请输入关键词', style: { width: '150px' } }"
        @search="onSearch"
      >
        <div slot="actions">
          <a-button-group>
            <a-button @click="defaultHandleCreate()" icon="plus">新增</a-button>
            <a-button
              icon="edit"
              :disabled="!currentRow"
              @click.stop="defaultHandleUpdate(currentRow)"
              >修改</a-button
            >
          </a-button-group>
        </div>
      </advanced-search-panel>
      <div class="compact-page-table">
        <vxe-table
          :data="dataSource"
          :loading="loading"
          border
          highlight-current-row
          highlight-hover-row
          @cell-click="onTableCellClick"
        >
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
      @success="queryList"
    />
  </page-header-wrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SortedInfo, ToolbarActionItem, ListPageVxe } from "@cr/types";
import { ArmRealDataDto } from "@/api/dma/types";
import armRealDataApi from "@/api/dma/generatorApis/armRealData";
// import FormView from "./Form.vue";
// import { dictionaryConstants } from "@/plugins/dictionary";
import moment from "moment";
@Component({
  name: "realData"
})
export default class extends ListPageVxe<ArmRealDataDto, string> {
  /**
   * 工具栏按钮属性
   */
  private toolbar_actions: Array<ToolbarActionItem> = [
    {
      title: "刷新",
      props: { icon: "sync" },
      click: () => {
        this.queryList();
      },
    },
  ];

  /**
   * 组件创建时执行
   */
  created() {
    this.columns = [
      { field: "AddressCode", title: "代码" },
      { field: "RealValue", title: "名称"}
    ];
    this.searchFields = [
      {
        name: "Name",
        label: "名称",
        input: "a-input",
        props: { placeholder: "请输入名称" },
      },
    ];
    this.getPagination.pageSize = 10;
  }
  /**
   * 选中当前
   */
  private onTableCellClick({ row }: any) {
    this.currentRow = row;
  }
  /**
   * 组件挂载成功
   */
  mounted() {
    this.queryList();
  }

  /**
   * 查询方法
   */
  private onSearch() {
    //处理其它查询条件逻辑。。。。
    this.queryList();
  }

  /**
   * 分页查询列表
   */
  private queryList() {
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

    armRealDataApi.getQueryList(queryModel).then((res: any) => {
      this.loading = false;
      this.dataSource = res.items;
      this.getPagination.total = res.totalCount;
    });
    this.loading = true;
  }

  /**
   * 表格分页事件
   */
  private onPageChanged(current: number) {
    this.getPagination.current = current;
    this.pagination = this.getPagination;
    this.queryList();
  }

  private onShowSizeChange(current: number, size: number) {
    this.getPagination.current = current;
    this.getPagination.pageSize = size;
    this.pagination = this.getPagination;
    this.queryList();
  }

  /**
   * 删除项
   */
  private onDeleteItem(item: any) {
    armRealDataApi.delete(item.id).then((res) => {
      this.queryList();
    });
  }

  /**
   * 表格选择行事件
   * @param selectedRowKeys
   */
  private onTableSelectChange(selectedRowKeys: Array<any>) {
    this.selectedRowKeys = selectedRowKeys;
  }
}
</script>
