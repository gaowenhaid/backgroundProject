<!--
 * @Date: 2021-11-10 15:47:08
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-12 16:28:44
 * @FilePath: \wenhai\src\views\product\Trademark\index.vue
-->
<template>
  <div>
    <!-- 添加品牌的按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 20px"
      @click="addShowTrademark"
      >添加</el-button
    >
    <!-- 动态展示数据的表格 -->
    <el-table :data="trademarkList" style="width: 100%" border stripe>
      <!-- 第一列显示数字 -->
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <!-- 显示品牌名字 -->
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <!-- 显示品牌logo -->
      <el-table-column label="品牌logo">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" width="100" height="100" alt="" />
        </template>
      </el-table-column>
      <!-- 显示按钮 -->
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="updateShowTrademark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      style="text-align: center"
      :total="total"
    >
    </el-pagination>
    <!-- 用户上传新增加和修改 -->
    <el-dialog
      :title="`${formData.id ? '修改' : '添加'}品牌`"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="formData"
        style="width: 80%"
        :rules="rules"
        ref="formData"
      >
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input v-model="formData.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 第二项内容 -->
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formData.logoUrl"
              :src="formData.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  // 动态数据
  data() {
    return {
      // 页数
      page: 1,
      // 一页显示多少条数据
      limit: 3,
      // 总数据
      trademarkList: [],
      // 总条数
      total: 0,
      // 是否显示对话框,默认不显示
      dialogFormVisible: false,
      formLabelWidth: "120px",
      formData: {
        // 品牌名称
        tmName: "",
        // 图片地址
        logoUrl: "",
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "change" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
      },
    };
  },
  mounted() {
    // 在页面挂载的时候调用一下函数
    this.getTrademarkList();
  },
  methods: {
    // 获取数据的方法
    async getTrademarkList(page = 1) {
      // 将动态数据 page 更新
      this.page = page;
      // 调用 全局api 的方法注意是 trademark 上的方法,需要传入两个参数,一个是页数另一个是一页显示多少数据
      const result = await this.$API.trademark.getTrademarkList(
        this.page,
        this.limit
      );
      // 如果返回的数据的状态码 不等于 200 的话
      if (result.code !== 200) {
        // 就弹出错误信息获取失败
        this.$message.error("获取品牌信息失败");
        // 然后将函数返回
        return;
      }
      // 将总条数和数据列表结构出来
      const { total, records } = result.data;
      // 更新vue组件上的数据
      this.total = total;
      // 更新数据
      this.trademarkList = records;
    },
    // 分页器方法
    handleSizeChange(val) {
      this.limit = val;
      this.getTrademarkList();
    },
    // #region
    // // 分页器方法
    // handleCurrentChange(page) {
    //   this.page = page
    //   this.getTrademarkList(page)
    // },
    // #endregion

    // 点击新增按钮的方法
    addShowTrademark() {
      // 清空一下原有的内容
      this.formData = {
        // 品牌名称
        tmName: "",
        // 图片地址
        logoUrl: "",
      };
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.formData.clearValidate();
      });
    },
    // 点击修改的方法
    updateShowTrademark(trademark) {
      // 解构所有的数据(浅拷贝,不然会出现双向绑定的小错误)
      this.formData = { ...trademark };
      // 显示对话框
      this.dialogFormVisible = true;
      console.log(this.formData);
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
    // 点击确定以后
    addOrUpdate() {
      // 点击确定的时候再次进行表单验证
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          // 发送请求,这个接口函数,里边自动判断了 是修改还是添加,所以我们在这里就不需要 判断了
          let result = await this.$API.trademark.addOrUpdateTrademark(
            this.formData
          );
          // 如果不等于 200 的话
          if (result.code !== 200) {
            // 弹出失败提示
            this.$message.error("操作失败");
          } else {
            // 如果成功的话
            this.$message.success("操作成功");
            // 更新页面,更新的页面根据是添加还是修改来决定的
            this.getTrademarkList(this.formData.id ? this.page : 1);
          }
          // 关闭对话框
          this.dialogFormVisible = false;
        } else {
          console.log("失败 ");
          return false;
        }
      });
    },
    // 点击删除按钮的操作
    deleteTrademark(trademark) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "删除操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 如果点击确定的话,调用删除的接口函数
          await this.$API.trademark.deleteTrademark(trademark.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getTrademarkList(this.trademarkList.length===1&&this.page>1?this.page-1:this.page)
        })
        // 用户点击了取消按钮,或者是删除失败
        .catch((error) => {
          if(error == 'cancel'){
            // 用户点击的是删除
            this.$message.info("已取消删除")
            return
          }else{
            this.$message.error('删除失败')
          }
        });
      
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
