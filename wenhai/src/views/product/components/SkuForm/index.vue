<!--
 * @Date: 2021-11-18 20:07:05
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-18 21:05:28
 * @FilePath: \wenhai\src\views\product\components\SkuForm\index.vue
-->
<template>
  <el-form label-width="100px">
    <!-- 名称显示区域 -->
    <el-form-item label="SPU名称">
      <span>楠哥小背心</span>
    </el-form-item>
    <!-- 名称输入区域 -->
    <el-form-item label="SKU名称">
      <el-input v-model="skuInfo.skuName"></el-input>
    </el-form-item>
    <!-- 价格输入区域 -->
    <el-form-item label="价格(元)">
      <el-input v-model="skuInfo.price"></el-input>
    </el-form-item>
    <!-- 重量输入区域 -->
    <el-form-item label="重量(kg)">
      <el-input v-model="skuInfo.weight"></el-input>
    </el-form-item>
    <!-- 描述区域 -->
    <el-form-item label="规格描述">
      <el-input type="textarea" v-model="skuInfo.skuDesc" rows="4"></el-input>
    </el-form-item>
    <!-- 品平台属性区域 -->
    <el-form-item label="品台属性">
      <el-form inline>
        <!-- 品台属性第一个 -->
        <el-form-item label="适用人群">
          <el-select value="1" placeholder="请选择">
            <el-option label="老年人" value="1"></el-option>
            <el-option label="老年人" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 品台属性第二个 -->
        <el-form-item label="风格">
          <el-select value="1" placeholder="请选择">
            <el-option label="老年风" value="1"></el-option>
            <el-option label="休闲风" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 销售属性区域 -->
    <el-form-item label="销售属性">
      <el-form inline>
        <!-- 品台属性第一个 -->
        <el-form-item label="颜色">
          <el-select value="1" placeholder="请选择">
            <el-option label="白色" value="1"></el-option>
            <el-option label="黑色" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 品台属性第二个 -->
        <el-form-item label="尺码">
          <el-select value="1" placeholder="请选择">
            <el-option label="大" value="1"></el-option>
            <el-option label="小" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!-- 图片展示列表 先展示个表格 -->
    <el-form-item label="图片列表">
      <!-- 动态展示数据的表格 -->
      <el-table :data="[]" border stripe style="width: 100%" @selection-change="handleSelectionChange">
        <!-- 选择框 -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- 图片展示区域 -->
        <el-table-column label="图片">
          <template slot-scope="{row}">
            <img src="javascript:;" alt="">
          </template>
        </el-table-column>
        <!-- 名称 -->
        <el-table-column label="名称">

        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="primary">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!-- 按钮组 -->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back"> 取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 准备 sku 需要的数据
      skuInfo: {
        category3Id: 0, // 那一页的 categoty3Id
        createTime: "", // 创建时间
        isSale: 0, // 是否上架
        price: 0, // 价格
        skuAttrValueList: [], // 品台属性的数组数据
        skuDefaultImg: "", // 默认展示的图片
        skuDesc: "", // sku描述
        skuImageList: [], // sku 的图片列表
        skuName: "", // skuName
        skuSaleAttrValueList: [], // 销售属性的数组数据
        spuId: 0, // 添加的 skuInfo 给哪个 spu 添加 , 所以我们需要 spuId
        tmId: 0, // 添加到哪个品牌, 所以我们也需要 tmId
        weight: "", // 重量
      },
    };
  },
  methods: {
    // 点击返回按钮的回调函数
    back() {
      this.$emit("back");
    },
    // 选择图片的时候需要的回调函数
    handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },
};
</script>

<style></style>
