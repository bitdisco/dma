<template>
  <page-header-wrapper class="compact-page" hide-title-bar>
    <div class="compact-page-wrapper">
      <advanced-search-panel
        :showInput="false"
        v-model="searchModel"
        :fields="searchFields"
        :dropdownWidth="380"
        :layoutColumn="1"
        :inputStyle="{ placeholder: '请输入关键词', style: { width: '150px' } }"
        @search="onSearch"
      >
        <template slot="actions">
          <a-button-group>
            <a-button @click="queryList" icon="sync">刷新</a-button>
          </a-button-group>
        </template>
      </advanced-search-panel>

      <div class="compact-panel-table">
        <div class="tree-table">
          <vxe-table
            id="vxeTable"
            :data="dataSource"
            :loading="loading"
            highlight-current-row
            highlight-hover-row
            @cell-click="onTableCellClick"
            border
            size="small"
            auto-resize
            height="auto"
            :seq-config="{ startIndex: getSkipCount }"
            :custom-config="{ storage: true }"
            :tree-config="{ children: 'children', expandAll: true }"
          >
            <vxe-table-column
              title="DMA分区名称"
              field="areaName"
              width="300"
              tree-node
            ></vxe-table-column>
            <vxe-table-column
              v-bind="col"
              v-for="(col, index) in columns"
              :key="index"
            ></vxe-table-column>
          </vxe-table>
        </div>

        <div class="statistic-table">
          <!-- <h1>4444</h1> -->
          <WaterBalance />
        </div>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ToolbarActionItem, ListPageVxe } from "@cr/types";
import api from "@/api/dma/generatorApis/area";
import { AreaDto } from "@/api/dma/types";
import moment from "moment";
import WaterBalance from "./components/WaterBalanceTable.vue";

@Component<AreaList>({
  name: "AreaList",
  components: { WaterBalance },
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
        width: 100,
      },
      {
        title: "分区级别",
        field: "areaGrade",
        width: 100,
      },
      {
        title: "建设年代",
        field: "constructionYear",
        width: 100,
      },
      {
        title: "创建时间",
        field: "creationTime",
        width: 150,
      },
    ];
    this.searchFields = [
      {
        name: "chargeTime",
        label: "日期",
        wholeLine: true,
        input: "a-range-picker",
        props: {
          style: {
            width: "100%",
          },
          valueFormat: "YYYY-MM-DD",
          format: "YYYY-MM-DD",
          ranges: {
            近7天: [moment().subtract(7, "days"), moment()],
            近1个月: [moment().subtract(1, "months"), moment()],
            近3个月: [moment().subtract(3, "months"), moment()],
          },
        },
        events: {
          change: (dates: any, dateStrings: any) => {
            console.log();
          },
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

<style lang="less" scoped>
.compact-panel-table {
  display: flex;
  height: 100%;

  .statistic-table {
    flex: 1;
    height: 100%;
  }
  .tree-table {
    height: 100%;
    width: 50%;
  }
}
</style>
