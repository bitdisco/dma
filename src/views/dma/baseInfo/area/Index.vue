<template>
  <page-header-wrapper class="compact-page" hide-title-bar>
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
          size="small"
          height="auto"
          :seq-config="{ startIndex: getSkipCount }"
          :custom-config="{ storage: true }"
          :tree-config="{ children: 'children',expandAll: true }"
        >
          <vxe-table-column
            title="DMA分区名称"
            field="areaName"
            width="400"
            tree-node
          ></vxe-table-column>
          <vxe-table-column
            v-bind="col"
            v-for="(col, index) in columns"
            :key="index"
          ></vxe-table-column>
        </vxe-table>
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
      :treeData="dataSource"
    />
  </page-header-wrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SortedInfo, ToolbarActionItem, ListPageVxe } from "@cr/types";
import { PaginationConfig } from "ant-design-vue/types/list/list";
import api from "@/api/dma/generatorApis/area";
import { AreaDto } from "@/api/dma/types";
import FormView from "./Form.vue";

@Component<AreaList>({
  name: "AreaList",
  components: { FormView },
})
export default class AreaList extends ListPageVxe<AreaDto, string> {
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

  private treeData: any = [];

  /**
   * 组件创建时执行
   */
  created() {
    this.columns = [
      {
        title: "分区编码",
        field: "areaCode",
        width: 150,
      },
      {
        title: "分区级别",
        field: "areaGrade",
        width: 150,
      },
      {
        title: "建设年代",
        field: "constructionYear",
        width: 150,
      },
      {
        title: "创建时间",
        field: "creationTime",
      },
    ];
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
    //处理其它查询条件逻辑。。。。
    this.queryList();
  }

  /**
   * 查询列表
   */
  private queryList() {
    /**
     * 查询条件
     */
    let queryModel = Object.assign(
      {
        // MaxResultCount: this.getMaxResultCount,
        MaxResultCount: 1000,
        SkipCount: this.getSkipCount,
      },
      this.searchModel
    );

    api.getPageList(queryModel).then((res: any) => {
      this.loading = false;
      this.dataSource = this.createDataSource(res.items) || [];
    });
    this.currentRow = null;
    this.loading = true;
  }
  /**
   * 表格数据处理
   */
  protected createDataSource(items: Array<any>, parentId?: string): Array<any> {
    let list = items
      .filter((x) => {
        return (!parentId && !x.parentId) || x.parentId == parentId;
      })
      .map((x) => {
        let item = { ...x };
        item.children = this.createDataSource(items, item.id);
        return item;
      });
    return list;
  }

  /**
   * 表格事件
   */
  private onTableCellClick({ row }: any) {
    this.currentRow = row;
  }

  /**
   * 删除选择项
   */
  private onDeleteItem(row: AreaDto) {
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
