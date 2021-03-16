<template>
  <page-header-wrapper>
    <template slot="content">
      <search-view-bar
        :fields="searchFields"
        canExpand
        @search="onSearch"
        v-model="searchModel"
        :rules="searchRules"
      />
    </template>
    <a-card>
      <table-action-bar>
        <template slot="right">
          <a-button-group>
            <a-button @click="queryList" icon="sync">刷新</a-button>
            <a-button @click="onExport" icon="export" type="primary"
              >导出</a-button
            >
            <a-popconfirm
              title="确定要删除当前选择项的数据吗？"
              @confirm="deleteSelectedItems"
              :disabled="!hasSelected"
            >
              <a-button icon="delete" type="danger" :disabled="!hasSelected"
                >删除选择</a-button
              ></a-popconfirm
            >
          </a-button-group>
        </template>
        <a-button type="primary" @click="defaultHandleCreate()">新增</a-button>
      </table-action-bar>
      <a-table
        rowKey="id"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        bordered
        size="small"
        @change="onTableChanged"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onTableSelectChange,
        }"
      >
        <template slot="action" slot-scope="val, row">
          <a-button type="link" size="small" @click="defaultHandleUpdate(row)"
            >修改</a-button
          >
          <a-popconfirm
            title="确定要删除当前选择行吗？"
            @confirm="onDeleteItem(row)"
          >
            <a-button size="small" type="danger">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
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
import {ListPageVue} from "@cr/types";
import api from "@/api/<%=model.systemName %>/generatorApis/<%=model.apiModule %>";
import { SortedInfo, ToolbarActionItem } from "@cr/types";
import { PaginationConfig } from "ant-design-vue/types/list/list";
import { <%=model.dtoType%> } from "@/api/<%=model.systemName %>/types";
import FormView from "./Form.vue";

/**
 * 列表页测试
 */
@Component({ name: "<%=model.className %>", components: { FormView } })
export default class <%=model.className %> extends ListPageVue<<%=model.dtoType%>, <%=model.idType%>> {
  /**
   * 组件创建时执行
   */
  created() {
    this.getPagination.pageSize = 10;
    this.columns = [
      <% model.fields.forEach(function(item){ %>{
        key: "<%=item.name%>",
        dataIndex: "<%=item.name%>",
        title: "<%=item.description%>"
      },
      <% }); %>
      {
        key: "action",
        width: 180,
        align: "center",
        title: "操作",
        scopedSlots: { customRender: "action" },
      },
    ];

    this.searchFields = [
      <% model.searchFields.forEach(function(item){ %>{
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
   * 表格分页事件
   */
  private onTableChanged(
    pagination: PaginationConfig,
    filters: any,
    sorter: SortedInfo
  ) {
    this.defaultHandlerTableChanged(pagination, filters, sorter);
    this.queryList();
  }

  /**
   * 删除项
   */
  private onDeleteItem(item: <%=model.dtoType%>) {
    api.delete(item.id).then((res) => {
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
