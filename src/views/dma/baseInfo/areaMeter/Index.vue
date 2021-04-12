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
              @click="handleCreate(currentRow, 0)"
              v-auth="{ action: 'Create' }"
              icon="plus"
              :disabled="!currentRow"
              >挂接出水口
            </a-button>
            <a-button
              @click="handleCreate(currentRow, 1)"
              v-auth="{ action: 'Create' }"
              icon="plus"
              :disabled="!currentRow"
              >挂接进水口
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
          :tree-config="{ children: 'children', expandAll: true }"
        >
          <vxe-table-column
            title="名称"
            field="name"
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
    <cr-popup-table
      v-if="popupVisible"
      :visible="popupVisible"
      :dialogOptions="dialogOptions"
      :tableOptions="tableOptions"
      @success="onAreaPopupSuccess"
      @close="popupVisible = false"
      :emptyMessage="emptyMessage"
    ></cr-popup-table>
  </page-header-wrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { SortedInfo, ToolbarActionItem, ListPageVxe } from "@cr/types";
import { PaginationConfig } from "ant-design-vue/types/list/list";
import api from "@/api/dma/generatorApis/areaMeter";
import { AreaMeterDto } from "@/api/dma/types";
// import FormView from "./Form.vue";
import { CrPopupTable } from "@cr/components/index";
import MeterInfoUrl from "@/api/dma/generatorUrls";

@Component<AreaList>({
  name: "AreaList",
  components: { CrPopupTable },
})
export default class AreaList extends ListPageVxe<AreaMeterDto, string> {
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
  private popupVisible: boolean = false;
  private direction: number = 0;
  private areaId: string = "";
  private emptyMessage: string = "请选择需要保存的监测点！";

  private modelData: any = [];
  private dialogOptions: any = {
    title: "添加",
    centered: true,
    maskClosable: false,
    keyboard: false,
    width: 1000,
    height: 500,
  };
  private tableOptions: any = {
    columns: [
      {
        title: "监测点编码",
        field: "meterCode",
        width: 100,
      },
      {
        title: "监测点名称",
        field: "meterName",
        width: 200,
      },

      {
        title: "管径直径",
        field: "diameter",
        width: 100,
      },
      {
        title: "管线材质",
        field: "material",
        width: 100,
      },
      {
        title: "安装地址",
        field: "installAddress",
      },
    ],
    remote: {
      url: MeterInfoUrl.meter.getQueryList,
    },
    showSearch: true,
    multiple: true,
    searchFields: [
      {
        name: "Name",
        label: "管道类型",
        input: "a-select",
        props: {
          options: [
            { text: "出水口", value: 0 },
            { text: "进水口", value: 1 },
          ],
        },
      },
      {
        name: "Keyword",
        label: "关键字",
        input: "a-input",
        props: {
          placeholder: "输入监测点名称、监测点编码、挂接表号关键词进行模糊搜索",
        },
      },
    ],
    showPagination: true,
  };

  /**
   * 组件创建时执行
   */
  created() {
    this.columns = [
      {
        title: "编码",
        field: "code",
        width: 150,
      },
      {
        title: "类型",
        field: "title",
        width: 150,
      },
      {
        title: "标题",
        field: "type",
        width: 150,
        align: "center",
        cellRender: {
          name: "area-meter-tag",
        },
      },
      {
        title: "创建时间",
        field: "addTime",
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

    api.tree(queryModel).then((res: any) => {
      this.loading = false;
      //   this.dataSource = this.createDataSource(res) || [];
      this.dataSource = res;
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
  private onDeleteItem(row: AreaMeterDto) {
    api.delete(row.id).then((res) => {
      this.$message.success({ content: "删除成功~" });
      this.queryList();
    });
  }

  private handleCreate(row: any, type: number) {
    this.direction = type;
    this.areaId = row.id;
    if (row.title == "DMA分区") {
      this.popupVisible = true;
    } else {
      this.$message.warning({
        content: "设备挂接请选择需要配置的【DMA分区】！",
      });
    }
  }

  private onAreaPopupSuccess(currentRow: any) {
    if (currentRow.length) {
      console.log(currentRow, "currentRow");
      let params:any={
          areaId:this.areaId,
          direction:this.direction,
          data:currentRow
      }

        // api
        //   .create(params)
        //   .then((res) => {
        //     this.submitLoading = false;
        //     this.$emit("input", false);
        //     this.$emit("success");
        //   })
        //   .catch((err: any) => {
        //     this.submitLoading = false;
        //   });
    }
  }

  /** 删除 */
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
