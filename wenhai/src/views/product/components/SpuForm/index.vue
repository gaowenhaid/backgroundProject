<!--
 * @Date: 2021-11-16 14:30:00
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-16 22:12:29
 * @FilePath: \wenhai\src\views\product\components\SpuForm\index.vue
-->
<template>
  <el-form v-show="visible" lable-width="100px">
    <!-- 输入框 -->
    <el-form-item label="SPU名称">
      <el-input
        v-model="spuInfo.spuName"
        placeholder="请输入SPU名称"
        type="text"
      ></el-input>
    </el-form-item>
    <!-- spu品牌 -->
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择品牌" v-model="spuInfo.tmId">
        <el-option label="小米" value="1"> </el-option>
        <el-option label="苹果" value="2"> </el-option>
      </el-select>
    </el-form-item>
    <!-- SPU描述 -->
    <el-form-item label="SPU描述">
      <el-input
        v-model="spuInfo.description"
        placeholder="请输入描述"
        rows="4"
        type="textarea"
      ></el-input>
    </el-form-item>

    <!-- SPU图片 -->
    <el-form-item label="SPU图片">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>

    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <el-select v-model="attrIdAttrName" placeholder="清选择">
        <el-option label="颜色" value="1"></el-option>
        <el-option label="颜色" value="2"></el-option>
      </el-select>
    </el-form-item>
    <!-- 表格 -->
    <el-form-item>
      <el-table :data="[]" border stripe style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="属性名" width="150"></el-table-column>
        <el-table-column label="属性值名称列表"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row }">
            <el-popconfirm
              :title="`宁确定要删除${row.spuName}吗`"
              style="margin-left: 10px"
              @onConfirm="deleteVal(row.id)"
            >
              <HinButton
                type="danger"
                icon="el-icon-delete"
                title="删除Spu"
                slot="reference"
                size="mini"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <!-- 保存和取消按钮 -->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuForm",
  // c参数对象
  data() {
    return {
      spuId: "", // spiid 数据,是修改 spuinfo 对象的时候偶传递进来的
      spuInfo: {
        spuName: "", // spu 的名字
        description: "", // spu 的描述
        category3Id: "", // 三级菜单的id
        tmId: "", // 品牌的 id
        spuSaleAttrList: [], // 销售属性的数组
        spuImageList: [], // 图片的数组
      },
      attrIdAttrName: "", // 属性的名字
      TrademarkList: [], // 品牌的数据
      saleAttrList: [], // 销售属性的数据
      spuImageList: [], // 图片的数据
      // 上传图片的时候 需要的表达式
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [
        {
          name: "food.jpeg",
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    };
  },
  // 接收参数
  props: ["visible"],
  methods: {
    // 取消按钮的回调函数
    back() {
      // 触发 update 事件 , 将 visible 这个值变为 false
      this.$emit("update:visible", false);
    },
    // 用来接收 父组件传递过来的数据
    updateSpuData(spuId) {
      // 拿到 spuId 的值
      // console.log(spuId);
      this.spuId = spuId;
      // 拿到 id 以后发送请求,获取数据
      // 根据 spuId  获取对应的 spuInfo 的对象的数据
      this.getSpuInfo();
      // 获取所有的 品牌信息的数据
      this.getTrademarkList();
      // 获取所有的销售属性的数据
      this.getSaleAttrList();
      // 获取当前 spuInfo 对象中所有的 图片信息数据
      this.getSpuImageList();
    },

    // 根据 spuId  获取对应的 spuInfo 的对象的数据
    async getSpuInfo() {
      // 调用接口
      let result = await this.$API.spu.getSpuById(this.spuId);
      if (result.code === 200) {
        // 得到的是 当前对象的数据 skuInfo
        this.skuInfo = result.data;
      }
    },
    // 获取所有的 品牌信息的数据
    async getTrademarkList() {
      let result = await this.$API.trademark.getTrademarkList();
      if (result.code === 200) {
        // 得到的是所有品牌的数据
        this.TrademarkList = result.data;
      }
    },
    // 获取所有的销售属性的数据
    async getSaleAttrList() {
      let result = await this.$API.spu.getBaseSaleAttrList();
      if (result.code === 200) {
        // 得到的是 所有销售属性的数据
        this.saleAttrList = result.data;
      }
    },
    // 获取当前 spuInfo 对象中所有的 图片信息数据
    async getSpuImageList() {
      let result = await this.$API.sku.getSpuImageList(this.spuId);
      if (result.code === 200) {
        // 得到的是 所有图片的数据
        this.spuImageList = result.data;
      }
    },
    // 图片需要的回调
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 完成添加的确定按钮
    handleAvatarSuccess(res, file) {
      // this.logoUrl = URL.createObjectURL(file.raw);
      // 如果 响应的状态码为 200 的话,就将 data 的数据保存给 图片的 url
      if (res.code == 200) {
        // 保存一下 logoUrl
        this.formData.logoUrl = res.data;
      }
      // 图片上传成功以后将,验证规则清理一下
      this.$refs.formData.clearValidate("logoUrl");
    },
    // 完成上传以前的回调
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // 判断图片的格式
      const isJPG = ["image/jpeg", "image/png"].includes(file.type);
      // 判断图片的大小
      const isLt2M = file.size / 1024 / 1024 < 2;
      // 如果没有图片格式数组中的类型的话,就报错
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      // 如果大于 2m 的话,就报错
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 返回有一个有返回 false 必须两个都是 true 才行
      return isJPG && isLt2M;
    },
  },
};
</script>

<style></style>
