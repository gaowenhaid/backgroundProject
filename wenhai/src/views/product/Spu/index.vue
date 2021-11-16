<!--
 * @Date: 2021-11-10 15:47:08
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-16 15:18:46
 * @FilePath: \wenhai\src\views\product\Spu\index.vue
-->
<template>
  <div>
    <!-- 一二三级菜单的数据展示 -->
    <el-card>
      <categorySelector @getCategoryId="getCategoryId" />
    </el-card>
    <div class="gup-20"></div>
    <!-- 刚开始展示数据的区域 start -->
    <div v-show="!isShowUpdateOrAdd">
      <el-card>
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id"
          >添加SPU</el-button
        >
        <div class="gup-20"></div>
        <!-- 动态展示数据的表格 -->
        <el-table
          :data="spuList"
          style="width: 100%"
          border
          stripe
          v-loading="loding"
        >
          <!-- 第一列显示数字 -->
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <!-- 显示spu名字 -->
          <el-table-column prop="spuName" label="Spu名称"></el-table-column>
          <!-- 显示spu描述 -->
          <el-table-column label="Spu描述" prop="description"></el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <!-- <el-button type="primary" icon="el-icon-plus"></el-button> -->
              <HinButton size="mini" type="primary" icon="el-icon-plus" title="添加Sku" />
              <!-- <el-button type="primary" icon="el-icon-edit"></el-button> -->
              <HinButton size="mini" type="primary" icon="el-icon-edit" title="修改spu" @click="updateShow(row.id)"/>
              <!-- <el-button type="info" icon="el-icon-info"></el-button> -->
              <HinButton size="mini" type="info" icon="el-icon-info" title="查看SPU" />

              <el-popconfirm
                :title="`宁确定要删除${row.spuName}吗`"
                style="margin-left: 10px"
                @onConfirm="deleteSpu(row.id)"
              >
                <HinButton
                  type="danger"
                  icon="el-icon-delete"
                  title="删除Spu"
                  slot="reference"
                  size="mini"
                />
              </el-popconfirm>

              <!-- <el-button type="danger" icon="el-icon-delete"></el-button> -->
            </template>
          </el-table-column>
          <!-- 分页器 -->
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          style="text-align: center"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </div>
    <!-- 刚开始展示数据的区域 end -->

    <!-- 更新或者添加页面的展示区域 start-->
    <div v-show="isShowUpdateOrAdd">
      <!-- 添加或修改展示页面的组件 -->
      <SpuForm :visible.sync="isShowUpdateOrAdd" ref="SpuForm"/>
    </div>
    <!-- 更新或者添加页面的展示区域 end-->

  </div>
</template>

<script>
import SpuForm from '@/views/product/components/SpuForm'
export default {
  name: "Spu",
  components:{SpuForm},
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      spuList: [],
      page: 1,
      limit: 3,
      total: 0,
      loding: false,
      isShowUpdateOrAdd:false
    };
  },
  methods: {
    // 发请求的回调函数
    async getSpuList(page = 1) {
      this.page = page;
      const { category3Id, limit } = this;
      let result = await this.$API.spu.getSpuByPage(page, limit, category3Id);
      // console.log(result);
      if (result.code === 200) {
        this.loding = false;
        this.spuList = result.data.records;
        this.total = result.data.total;
      } else {
        this.$message.error("获取数据失败");
      }
    },
    // 自定义属性,得到当前显示的是那哪一个分类菜单
    getCategoryId({ level, categoryId }) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = this.category3Id = null;
        this.spuList = [];
      } else if (level === 2) {
        this.category3Id = null;
        this.spuList = [];
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        // 有三级菜单的时候,在发送请求
        this.getSpuList();
        this.loding = true;
      }
    },
    // 分页器方法
    handleSizeChange(val) {
      this.limit = val;
      this.getSpuList();
    },
    // 分页器方法
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList(page);
    },
    // 删除属性的按钮的回调函数
    async deleteSpu(spuId) {
      // 删除的方法
      let result = await this.$API.spu.deleteSpu(spuId);
      if (result.code !== 200) return this.$message.error("删除失败");
      this.$message.success("删除成功");
      this.getSpuList(b);
    },
    // 单击修改按钮的回调,这里为啥不传递 row  因为 row 里边的数据,没有图片的列表,所以我们需要拿到 id 值,去发请求,获取数据来展示
    updateShow(spuId){
      // 将数据传递给子组件(通过 refs 的方式来传递数据))
      this.$refs.SpuForm.updateSpuData(spuId)
      // console.log(spuId)
      // 显示修改页面
      this.isShowUpdateOrAdd = true;
    }
  },
};
</script>

<style>
.gup-20 {
  height: 20px;
}
.gup-10 {
  height: 10px;
}
.gup-50 {
  height: 50px;
}
</style>
