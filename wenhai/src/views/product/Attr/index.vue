<!--
 * @Date: 2021-11-10 15:47:08
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-16 14:28:55
 * @FilePath: \wenhai\src\views\product\Attr\index.vue
-->
<template>
  <div>
    <!-- 卡片区域 一级二级菜单的导航区-->
    <el-card class="box-card" style="margin-bottom: 20px">
      <!-- 使用自定义事件来接收一下子组件传递过来的参数 自定义组件 一级二级三级的导航菜单-->
      <categorySelector @getCategoryId="getCategoryId" ref="cs" />
    </el-card>
    <!-- 展示属性值的区域 -->
    <el-card class="box-card">
      <!-- 正常展示区域 -->
      <div v-show="!ishowAddOrUpdate">
        <!-- 当前添加属性按钮是否可点,根据当前有没有 3级菜单的 id 来决定 -->
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!category3Id"
          >添加</el-button
        >
        <div class="gup-20"></div>
        <!-- 动态展示数据的表格 -->
        <el-table
          :data="attrList"
          style="width: 100%"
          border
          stripe
          v-loading="loading"
        >
          <!-- 第一列显示数字 -->
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <!-- 显示属性名称 -->
          <el-table-column prop="attrName" label="属性名称">
            <template slot-scope="{ row }">
              <!-- <el-tag class='tag'>{{row.attrName}}</el-tag> -->
              <el-badge :value="row.attrValueList.length" class="item">
                <!-- <button>{{row}}</button> -->
                <el-button size="small">{{ row.attrName }}</el-button>
              </el-badge>
            </template>
          </el-table-column>
          <!-- 显示属性值 -->
          <el-table-column label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag
                class="tag"
                type="warning"
                v-for="val in row.attrValueList"
                :key="val.id"
                >{{ val.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <!-- 显示按钮 -->
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <!-- <el-button type="primary" icon="el-icon-edit" @click="updateAttr"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button> -->
              <!-- 封装自定义组件 (修改按钮和删除按钮)-->
              <HinButton
                type="primary"
                title="修改平台属性"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              />
              <el-popconfirm
                :title="`您确定要删除${row.attrName}吗?`"
                @onConfirm="deleteAttr(row.id)"
              >
                <!-- 删除按钮 -->
                <HinButton
                  type="danger"
                  title="删除平台属性"
                  icon="el-icon-delete"
                  slot="reference"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 自定义添加属性区域 -->
      <div v-show="ishowAddOrUpdate">
        <el-form inline>
          <!-- 属性名输入框  将输入框的数据,与下边的 attrName 双向绑定-->
          <el-form-item label="属性名称">
            <el-input
              type="text"
              v-model="formData.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
          <!-- 添加和取消按钮 -->
          <div>
            <!-- 决定按钮是否显示,根据当前 输入框中有没有内容来决定 -->
            <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="formData.attrName.trim().length === 0">添加属性值</el-button
            >
            <el-button @click="ishowAddOrUpdate = false"> 取消 </el-button>
          </div>
          <div class="gup-20"></div>
        </el-form>
        <!-- 表格区域 将数据和 属性值列表绑定-->
        <el-table
          :data="formData.attrValueList"
          style="width: 100%"
          border
          stripe
        >
          <!-- 第一列显示数字 -->
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <!-- 显示属性名称 -->
          <el-table-column label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- 动态展示属性值的名称 通过作用域插槽来实现 -->
              <!-- 这里将来还要展示文本框,因为是可以编辑的状态,所以我们只单独用一个 span 标签是不好使的,所以我们这里应该再加一个 input -->
              <!-- 但是这里需要做一个判断,就是 如果有这个属性的话,就根据他的状态取反设置 因为目前我们没有这个属性,所以取反是true,所以都会显示 -->
              <!-- 为当前输入框添加 失去焦点事件和 回车事件 -->
              <el-input
                v-if="row.edit"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性名"
                @blur="toView(row)"
                @keyup.native.enter="toView(row)"
              />
              <!-- 将span 变为 文本框可以输入 -->
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: inline-block; width: 100%"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <!-- 显示按钮 -->
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`您确定要删除${row.valueName}吗?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <!-- 删除按钮 -->
                <HinButton
                  type="danger"
                  icon="el-icon-delete"
                  title="删除属性值"
                  slot="reference"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存和取消按钮 -->
        <div class="gup-20"></div>
        <div>
          <el-button type="primary" @click="saveAttr" :disabled="!isSave">保存</el-button>
          <el-button @click="ishowAddOrUpdate = false">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { attr } from '@/api';
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
// import categorySelector from "../categorySelector";
export default {
  name: "Attr",
  // components: { categorySelector },
  data() {
    return {
      category1Id: "", // 一级菜单数据
      category2Id: "", // 二级菜单数据
      category3Id: "", // 三级菜单数据
      attrList: [], // 总数据
      ishowAddOrUpdate: false, // 显示哪个区域
      loading: false, // 圆圈的加载效果
      formData: {
        // 这里可以不写,但是是个 坑 ----
        attrName: "", // 属性的名称 双向绑定给 上边的输入框
        attrValueList: [], // 属性值的数组,里边白喊了所有的属性值
      },
    };
  },
  methods: {
    // 自定义事件的回调含糊
    getCategoryId({ level, categoryId }) {
      if (level === 1) {
        // 当外部的 category1id 发生变化的时候,我们保存一下外部传入的一级菜单的 id
        this.category1Id = categoryId;
        // 将二级和三级菜单的 id 置空,清除一下数据
        this.category2Id = null;
        this.category3Id = null;
        this.attrList = [];
      } else if (level === 2) {
        // 如果外部传来的是 2 的话,就证明当前改变的是 二级数据菜单,我们先将二级菜单的 ID 保存一下
        this.category2Id = categoryId;
        // 二级菜单发生变化,我们将三级菜单的数据置空,并将数据列表清空
        this.category3Id = null;
        this.attrList = [];
      } else {
        // 如果走了这个 else 的话,就证明当前切换的是 3级菜单,我们先保存一下当前的 3 id
        this.category3Id = categoryId;
        // 然后调用获取数据的 接口函数
        this.getAttrList();
        this.loading = true; // 请求数据的时候,开启加载图标
      }
    },
    // 获取数据的回调函数
    async getAttrList() {
      // 结构出当前的 1 2 3 级菜单的 id属性
      const { category1Id, category2Id, category3Id } = this;
      // 发送请求
      let result = await this.$API.attr.getAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      // 如果成功的话
      if (result.code == 200) {
        // 如果获取数据成功的话,保存一下数据
        this.attrList = result.data;
        this.loading = false; // 数据回来以后,将加载图标关闭
      }
    },
    // updateAttr修改按钮的回调
    updateAttr(attrInfo) {
      // console.log(attrInfo);
      // 先使用浅拷贝,将attrInfo 解出来,但是有坑,注意
      // this.formData = { ...attrInfo };
      // 使用 lodash 中的深拷贝,来确保所有的值都是新的,因为这里边的值还有个数组呢,将数组也需要拷贝一份
      this.formData = cloneDeep(attrInfo);
      // 动态设置数据
      // this.formData = attrInfo
      // 显示添加或修改属性的页面
      this.ishowAddOrUpdate = true;
    },
    // 点击添加属性值按钮的回调函数(\)
    addAttrValue() {
      // 判断当前值是不是为空
      let isKong =
        this.formData.attrValueList.filter((item) => item.valueName === "")
          .length === 1;
      if (isKong) return this.$message.warning("请不要输入空内容");

      this.formData.attrValueList.push({
        // 这里为啥能够获取 formData 的 id 属性呢,是因为 点击修改按钮的时候,将一个完整的 数据对象传递给了 formData 所以
        //  我们能够直接获取 他的 id 属性
        attrId: this.formData.id,
        // 属性名应该为初始值空
        valueName: "",
        edit: true, // 标识,我们每添加一个对象就将它的 edit 的属性设置为 默认的 true,这样就可以显示 当前是编辑状态还是查看状态了
      });
      // 使用 nextTick 来保证 dom 渲染完成
      this.$nextTick(() => {
        // 动态的将数据的最后一条获取焦点就是数组的 length -1 就是最后一条数据
        this.$refs[this.formData.attrValueList.length - 1].focus();
      });
    },
    // 当文本框失去焦点的时候,执行的回调
    toView(attrValue) {
      // console.log(attrValue)
      // 当失去焦点的时候，判断一下当前文本框里是不是有内容
      if (attrValue.valueName.trim() === "") return;
      // 在判断是否输入了同名的属性
      const isIdentical =
        this.formData.attrValueList.filter(
          (val) => val.valueName === attrValue.valueName
        ).length == 2;
      // 如果返回的为 true 的话,就证明了当前用户输入了,相同的属性
      if (isIdentical) {
        // 提示不能输入重复的内容
        this.$message.warning("请不要输入重复的属性");
        // 并且将 输入的内容清空
        attrValue.valueName = "";
        return;
      } else {
        // 如果没有的话,就将当前的输入框变为展示框
        attrValue.edit = false;
      }
    },
    // 将展示模式,变为编辑模式
    toEdit(attrInfo, index) {
      // 判断当前点击的对象有没有这个 edit 这个属性
      if (!attrInfo.hasOwnProperty("edit")) {
        // 如果没有的话,就为他添加上这个属性,并设置默认值为 true
        this.$set(attrInfo, "edit", true);
      } else {
        // 如果有的话,就将它设置为 true ,变为 true 的话就是变为 input 模式
        attrInfo.edit = true;
      }
      // 并为他获取焦点
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值按钮的回调函数
    deleteAttrValue(index) {
      // 将 formData 数组中的 指定位置指定个数删除
      this.formData.attrValueList.splice(index, 1);
      // 并提示删除成功
      this.$message.success("删除成功");
    },

    saveAttr: debounce(async function () {
      // 先看一下是否有输入框是空的,最上边的那个
      if (this.formData.attrName.trim().length === 0)
        return this.$message.warning("属性名不能为空");
      // 针对属性值对象数组中的数据进行过滤操作
      this.formData.attrValueList = this.formData.attrValueList.filter(
        (attrValue) => {
          {
            // 先删除 那个 edit 这个没用的属性
            delete attrValue.edit; // 因为这个属性是自定义的所以是没用的
            // 空串取反为 true , true 再取反 为 false
            return !!attrValue.valueName.trim(); // 直接返回 布尔值类型的数据
          }
        }
      );
      // 再次将数据筛选一下
      if (this.formData.attrValueList.length === 0) {
        this.$message.error("至少添加一个属性值"); // 报错
        return; // 直接返回
      }
      // 属性名字首先得存在 , 属性值对象的数组中要有数据,至少有一个数据,且属性值不能重复
      // 上边都满足的话,才可以调用接口(将筛选过滤好的数据传递过去)
      const result = await this.$API.attr.saveAttrInfo(this.formData);
      if (result.code !== 200) {
        return this.$message.warning("操作失败");
      }
      this.$message.success("操作成功");
      // 关闭当前添加或修改页面的对话框
      this.ishowAddOrUpdate = false;
      // 然后再次获取最新的数据,更新页面
      this.getAttrList();
    }, 1000),

    // // 点击保存按钮的回调
    // async saveAttr() {

    // },
    // 点击删除按钮的删除属性的回调
    async deleteAttr(attrId) {
      // 发送请求
      let result = await this.$API.attr.deleteAttr(attrId);
      // console.log(result)
      // 如果获取失败
      if (result.code !== 200) return this.$message.error("删除失败");
      // 重新更新页面
      this.$message.success("删除成功");
      this.getAttrList();
    },
    // 点击添加按钮的回调函数
    addAttr() {
      this.formData = {
        attrName: "", // 属性名字
        attrValueList: [], // 属性值对象数组
        categoryId: this.category3Id, // 三级分类的 id
        categoryLevel: 3, // 菜单级别
      };
      // 展示添加或修改的那个页面对话框
      this.ishowAddOrUpdate = true;
    },
  },
  // 监视,添加或修改的那个对话框
  watch: {
    // 当他一变的时候,我们就将 一二三级菜单跟着变,通过 refs 来获取他的属性
    ishowAddOrUpdate(val) {
      // 控制 一二三级菜单的是否显示
      this.$refs.cs.isDisabled = val;
    },
  },
  // 计算出最后的那个保存按钮,的值
  computed: {
    isSave(){
      // 属性名必须有 并且 属性值也得必须有
      return this.formData.attrName.trim() && this.formData.attrValueList.some(item => item.valueName.trim())
    }
  }
};
</script>

<style scoped>
.tag {
  margin-right: 5px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.gup-10 {
  height: 10px;
}
.gup-20 {
  height: 20px;
}
.gup-50 {
  height: 50px;
}
</style>
