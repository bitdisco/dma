<template>
  <page-header-wrapper  class="compact-page" hide-title-bar>
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
import { Component, Watch, Prop } from "vue-property-decorator";
import {ListPageVxe} from "@cr/types";
import api from "@/api/<%=model.systemName %>/generatorApis/<%=model.apiModule %>";
import { SortedInfo, ToolbarActionItem } from "@cr/types";
import { PaginationConfig } from "ant-design-vue/types/list/list";
import { <%=model.dtoType%> } from "@/api/<%=model.systemName %>/types";
import FormView from "./Form.vue";

/**
 * 列表页测试
 */
@Component<<%=model.className %>>({ name: "<%=model.className %>", components: { FormView } })
export default class <%=model.className %> extends ListPageVxe<<%=model.dtoType%>, <%=model.idType%>> {
  /**
   * 组件创建时执行
   */
  created() {
    this.getPagination.pageSize = 10;
    this.columns = [
      <% model.fields.forEach(function(item){ %>{
        field: "<%=item.name%>",
        width: "100",
        title: "<%=item.description%>"
      },
      <% }); %>
     
    ];

    this.searchFields = [
      <% model.fields.forEach(function(item){ %>{
        name: "<%=item.name %>",
        label: "<%=item.description || item.name %>",
        input: "<%=model.getInputType(item.type) %>",
        // input: "a-input",
        props: { placeholder: "请输入<%=item.description %>~" },
      },
      <% }); %>
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

  private onShowSizeChange(current: number, size: number) {
    this.getPagination.current = current;
    this.getPagination.pageSize = size;
    this.pagination = this.getPagination;
    this.queryList();
  }

  /**
   * 删除项
   */
  private onDeleteItem(item: <%=model.dtoType%>) {
    api.delete(item.id).then((res) => {
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
  }

  /**
   * 导出数据
   */
  private onExport() {

    this.$message.info("导出功能请查看代码注释说明~~~");
    /** 本地导出 */
    // this.exportExcel(this.dataSource, "测试导出.xls"); //导出当前表格显示的数据

    /** 远程调用导出 */
    // let url =this.$api.getUrl("baseConfigInfo/getPageList"); // 导出数据源地址
    // let params = {}; // 导出数据请求参数
    // this.exportExcelForUrl(url ,params,"导出.xls");

  }
}
</script>
