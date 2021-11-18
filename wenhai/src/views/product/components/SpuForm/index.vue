<!--
 * @Date: 2021-11-16 14:30:00
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-18 19:43:19
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
        <el-option
          :label="tm.tmName"
          value="1"
          v-for="(tm, idnex) in TrademarkList"
          :key="tm.id"
        >
        </el-option>
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
        action="/dev-api/admin/product/fileUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>

    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <!-- 遍历我们计算出来的那个数据数组 -->
      <el-select
        v-model="attrIdAttrName"
        :placeholder="`${
          unSaleAttrValueList.length > 0
            ? `还有${unSaleAttrValueList.length}个没选中`
            : '没有了'
        }`"
      >
        <el-option
          :label="attr.name"
          :value="attr.id + ':' + attr.name"
          v-for="(attr, index) in unSaleAttrValueList"
          :key="attr.id"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 10px"
        @click="addSaleValue"
        :disabled="!attrIdAttrName"
        >添加属性值</el-button
      >
    </el-form-item>
    <!-- 表格 -->
    <el-form-item>
      <el-table
        :data="spuInfo.spuSaleAttrList"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="属性名"
          width="150"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值名称列表" prop="spuSaleAttrValueList">
          <template slot-scope="{ row }">
            <el-tag
              :key="saleAttr.id"
              v-for="(saleAttr, index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(row.spuSaleAttrValueList, index)"
            >
              {{ saleAttr.saleAttrValueName }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="row.edit"
              v-model="row.saleAttrValueName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput(row)"
              >添加属性值</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="{ row, $index }">
            <el-popconfirm
              :title="`宁确定要删除吗`"
              style="margin-left: 10px"
              @onConfirm="deleteVal($index)"
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
      <el-button type="primary" @click="save">保存</el-button>
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
      // spuId: "", // spiid 数据,是修改 spuinfo 对象的时候偶传递进来的
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
      // tag 标签需要的参数
      // dynamicTags: ["标签一", "标签二", "标签三"],
      // inputVisible: false,
      // inputValue: "",
    };
  },
  // 接收参数
  props: ["visible"],
  methods: {
    // 取消按钮的回调函数
    back() {
      // 触发 update 事件 , 将 visible 这个值变为 false
      this.$emit("update:visible", false);
      // 重置数据
      this.resetDate();
    },
    // 用来接收 父组件传递过来的数据
    updateSpuData(spuId) {
      // 拿到 spuId 的值
      // console.log(spuId) ;
      // 直接将 spuId 挂载到 this 上,也就是 vc 上边,上边 data 里的 spuId 就不用写了
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
        // 得到的是 当前对象的数据 spuInfo
        this.spuInfo = result.data;
        console.log(this.spuInfo);
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
        // console.log(result)
      }
    },
    // 获取当前 spuInfo 对象中所有的 图片信息数据
    async getSpuImageList() {
      let result = await this.$API.sku.getSpuImageList(this.spuId);
      if (result.code === 200) {
        // 得到的是 所有图片的数据
        const spuImageList = result.data;
        // 饿了么ui 需要的是 name 和 url 而我们返回的数据是 imgName 和 imgUrl 所以我们需要手动为他添加上这两个属性
        spuImageList.map((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });

        this.spuImageList = spuImageList;
        // console.log(spuImageList)
      }
    },
    // 图片需要的回调: 点击删除后,删除图片的回调函数
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // fileList 就是删除一个图片以后,还剩下的图片的集合数组
      // 更新页面展示的图片数组列表
      this.spuImageList = fileList;
    },
    // 点击图片,图片放大的回调函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 完成添加的确定按钮
    handleAvatarSuccess(res, file, fileList) {
      this.spuImageList = fileList;
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
    // 点击删除按钮的回调函数
    deleteVal(index) {
      // 删除一个属性,从数组中
      this.spuInfo.spuSaleAttrList.splice(index, 1);
    },
    // tag 标签需要的回调函数
    handleClose(valueList, index) {
      valueList.splice(index, 1);
    },
    // 失去焦点和 点击回车的时候的回调函数
    handleInputConfirm(row) {
      // 失去焦点以后先判断当前输入框中有没有值
      const saleAttrValueName = row.saleAttrValueName;
      // 如果没有值的话,或者去除空格以后h还是没有值的话
      if (!saleAttrValueName || !saleAttrValueName.trim()) {
        // 取消他的可编辑模式,变为查看模式
        row.edit = false;
        // 提示错误
        this.$message.warning("请不要输入空值");
        // 返回
        return;
      }
      // console.log(row)
      // 此时来到这里的话,就证明当前有值,我们就需要进行去重操作
      const isRepet = row.spuSaleAttrValueList.some((item) => {
        // console.log(item)
        return item.saleAttrValueName === saleAttrValueName.trim();
      });
      // console.log(isRepet)
      if (!isRepet) {
        // 如果没重复的话,添加
        row.spuSaleAttrValueList.push({
          baseSaleAttrId: row.baseSaleAttrId,
          saleAttrValueName,
        });
        // return
      } else {
        this.$message.warning("重复");
      }
      // 变为 查看模式
      row.edit = false;
      // 清除数据
      row.saleAttrValueName = "";
    },
    // 点击 tag+ 标签的时候,将 tag 标签变为 input 输入框的回调函数
    showInput(row) {
      // 判断当前点击的这个有没有 edit 这个属性
      if (!row.hasOwnProperty("edit")) {
        // 如果没有的话,就为他设置一个响应式属性 edit
        this.$set(row, "edit", true);
      } else {
        // 如果有的话,就将他的值,设置为 true
        row.edit = true;
      }
      // 获取光标
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    // 点击添加销售属性按钮的时候执行的回调函数
    addSaleValue() {
      // 先将 名字和 id 拿到 通过切割来切割拼接好的字符串
      const [baseSaleAttrId, saleAttrName] = this.attrIdAttrName.split(":");
      // 然后往数据中推入一个对象
      this.spuInfo.spuSaleAttrList.push({
        // id 外部结构出来
        baseSaleAttrId,
        // 外部结构出来的名字
        saleAttrName,
        // 定义一个空数组
        spuSaleAttrValueList: [],
      });
      // 推完以后,将名字 id 的拼接串,清空
      this.attrIdAttrName = "";
    },
    // 重置数据的函数
    resetDate() {
      (this.spuInfo = {
        spuName: "", //   重置spu 的名字
        description: "", //   重置spu 的描述
        category3Id: "", //   重置三级菜单的id
        tmId: "", //    重置品牌的 id
        spuSaleAttrList: [], //   重置销售属性的数组
        spuImageList: [], //    重置图片的数组
      }),
        (this.attrIdAttrName = ""); // 重置属性的名字
      this.TrademarkList = []; // 重置品牌的数据
      this.saleAttrList = []; // 重置销售属性的数据
      this.spuImageList = []; // 重置图片的数据
    },
    // 点击保存的按钮的回调函数
    async save() {
      // 先拿到数据
      const { spuInfo, spuImageList } = this;
      // 首先需要过滤数据
      // 过滤图片数据,因为我们使用 饿了么ui 的话,图片的名字为 name  地址为 url,
      // 而我们服务器需要的数据是 imgUrl 和 imgName 所以我们需要过滤一下数据(将过滤好的数据,直接放进 spuInfo 中去)
      spuInfo.spuImageList = spuImageList.map((item) => ({
        imgName: item.name,
        imgUrl: item.response ? item.response.data : item.url,
      }));

      // 过滤完图片以后,我们还需要过滤一下,展示的销售属性
      // 因为我们在做那个编辑模式和查看模式切换的是偶,为 row 添加了两个自定义的属性,这两个属性,是没用的属性,所以我们需要删除这两个属性

      // 使用 filter 方法来过滤数据
      spuInfo.spuSaleAttrList = spuInfo.spuSaleAttrList.filter((item) => {
        // 如果 每一个对象的 spuSaleAttrValueList长度 大于 0 的话,就证明他当前是有数据的
        if (item.spuSaleAttrValueList.length > 0) {
          // 这时候我们就清除一下自定义数据
          delete item.edit;
          delete item.saleAttrValueName;
          // 清除完成以后 返回 true 将数据保留
          return true;
        }
        // 否则就返回 false 不要数据
        return false;
      });

      // 调用接口返回成功与失败(将过滤完成的数据,传递给服务器)
      try {
        // 周这里的话就一定是成功
        await this.$API.spu.addOrUpdateSpu(spuInfo);
        // 提示成功
        this.$message.success("操作成功");
        // 将数据清空,并关闭页面
        // 清空数据
        this.resetDate();
        // 通知父组件修改成功,刷新数据
        this.$emit("saveSuccess");
        // 关闭页面
        this.back();
      } catch (error) {
        this.$$message.error(error.message || "操作失败");
      }
    },
    // 外部点击添加 spu 属性显示的页面
    addSpuData(category3Id){
      // 先保存一下当前的 category3Id
      this.spuInfo.category3Id = category3Id
      // 或品牌数据
      this.getTrademarkList()
      // 获取所有的销售属性的数据
      this.getSaleAttrList()
    }
  },
  // 通过计算属性,将销售属性那块计算出来
  computed: {
    unSaleAttrValueList() {
      // 先将 两个数组结构出来
      const {
        saleAttrList,
        spuInfo: { spuSaleAttrList },
      } = this;
      // 返回 saleAttrList筛选出 每一项 sa  然后再 再里边筛选出 ssa 判断 ssa的 saleAttrName 是否和 sa的name 相同
      // 这样就是返回的 相同的数据，所以我们取个返 得到的是不相同的 ，然后将 他返回给 我们计算的那个属性
      return saleAttrList.filter(
        (sa) => !spuSaleAttrList.some((ssa) => ssa.saleAttrName === sa.name)
      );
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
