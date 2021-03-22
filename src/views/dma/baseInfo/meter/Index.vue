<template>
  <page-header-wrapper hide-title-bar>
    <div class="compact-page-wrapper">
      <advanced-search-panel
        :showInput="false"
        v-model="searchModel"
        :fields="searchFields"
        :dropdownWidth="350"
        :layoutColumn="1"
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
              >新增
            </a-button>
            <a-button
              :disabled="!currentRow"
              @click.stop="defaultHandleUpdate(currentRow)"
              v-auth="{ action: 'Update' }"
              >编辑
            </a-button>
            <a-popconfirm
              title="确定要删除当前数据吗？"
              @confirm.stop="onDeleteItem(currentRow)"
            >
              <a-button
                type="danger"
                v-auth="{ action: 'Delete' }"
                :disabled="!currentRow"
                >删除
              </a-button>
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
          height="auto"
          :seq-config="{ startIndex: getSkipCount }"
          :custom-config="{ storage: true }"
        >
          <vxe-table-column
            type="seq"
            width="40"
            align="center"
          ></vxe-table-column>
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
import { PaginationConfig } from "ant-design-vue/types/list/list";
import api from "@/api/dma/generatorApis/meter";
import { MeterDto } from "@/api/dma/types";
import FormView from "./Form.vue";

@Component<MeterList>({
  name: "CaliberList",
  components: { FormView },
})
export default class MeterList extends ListPageVxe<
  MeterDto,
  string
> {
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
      {
        title: "编号",
        field: "meterCode",
        width: 120,
      },
      {
        title: "水表名称",
        field: "meterName",
        width: 180,
      },
      {
        title: "水表编号",
        field: "meterNumber",
        width: 240,
      },
      {
        title: "安装地址",
        field: "installAddress",
      }
    ];
    this.getPagination.pageSize = 10;
    this.searchFields = [
      {
        name: "Keyword",
        label: "关键字",
        input: "a-input",
        props: {
          placeholder: "请输入编号/名称",
        },
      },
    ];
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
    this.getPagination.current = 1;
    //处理其它查询条件逻辑。。。。
    this.queryList();
  }

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

    api.getPageList(queryModel).then((res) => {
      this.loading = false;
      this.dataSource = res.items;
      this.getPagination.total = res.totalCount;
    });
    this.currentRow = null;
    this.loading = true;
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
  private onDeleteItem(row: MeterDto) {
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
}
</script>

<style scoped>
.vxetable {
  height: calc(100vh - 100px);
}
</style>