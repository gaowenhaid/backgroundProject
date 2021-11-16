<!--
 * @Date: 2021-11-13 09:08:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-15 15:34:17
 * @FilePath: \wenhai\src\views\product\categorySelector\index.vue
-->
<template>
  <div>
    <el-form inline>
      <el-form-item label="一级分类">
        <!-- 下拉菜单中选中的那个菜单会被自动存储在 v-model 指令所需的表达式的 category1Id -->
        <!-- 这里为和 category1id绑定 因为一会要将数据传递进 change 事件中 -->
        <el-select
          v-model="category1Id"
          placeholder="请选择"
          @change="getCategory1Id"
          :disabled="isDisabled"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 二级 -->
      <el-form-item label="二级分类">
        <!-- 下拉菜单中选中的那个菜单会被自动存储在 v-model 指令所需的表达式的 category1Id -->
        <el-select
          v-model="category2Id"
          placeholder="请选择"
          @change="getCategory2Id"
          :disabled="isDisabled"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 三级 -->
      <el-form-item label="三级分类">
        <!-- 下拉菜单中选中的那个菜单会被自动存储在 v-model 指令所需的表达式的 category1Id -->
        <el-select
          v-model="category3Id"
          placeholder="请选择"
          @change="getCategory3Id"
          :disabled="isDisabled"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "categorySelector",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      category1List: [],
      category2List: [],
      category3List: [],
      isDisabled: false
    };
  },
  mounted() {
    // 调用获取一级菜单的函数
    this.getCategory1List();
  },
  methods: {
    //   获取一级菜单的动态数据
    async getCategory1List() {
      // 调用接口函数
      let result = await this.$API.category.getCategory1();
      // 如果等于200
      if (result.code == 200) {
        // 设置服务器数据
        this.category1List = result.data;
      }
    },
    //   获取二级菜单的动态数据(当一级菜单发生变化的时候)
    // 是一个 change 事件,外部会将当前改变的那个值的 id 传递进来
    async getCategory1Id(category1Id) {
      // 先将外部传入的 id 保存(将当前是哪个大类,和是哪个小类,都给父组件传递过去,使用自定义事件)
      this.$emit("getCategoryId", { level: 1, categoryId: category1Id });
      this.category1Id = category1Id;
      // 这时候,当一及菜单发生改变的时候,我们需要清空 二级菜单和三级菜单的数据,且将他们的 id 清空
      this.category2Id = this.category3Id = "";
      this.category2List = this.category3List = [];
      // 然后获取最新的二级数据
      let result = await this.$API.category.getCategory2(this.category1Id);
      // 如果成功
      if (result.code == 200) {
        // 设置最新的数据
        this.category2List = result.data;
      }
    },
    //   获取三级菜单的动态数据(当二级菜单发生变化的时候,传入二级菜单的 id)
    async getCategory2Id(category2Id) {
      // 将2级id保存一下(将当前是哪个大类,和是哪个小类,都给父组件传递过去,使用自定义事件)
      this.$emit("getCategoryId", { level: 2, categoryId: category2Id });
      // 清空三级菜单的 id
      this.category3Id = "";
      // 这清空三级菜单的 数据
      this.category3List = [];
      // 获取最新的数据
      let result = await this.$API.category.getCategory3(this.category2Id);
      // 如果成功的话
      if (result.code == 200) {
        // 设置数据
        this.category3List = result.data;
      }
    },
    // 将三级菜单的 id 传递给父组件
    getCategory3Id(category3Id) {
      // 触发自定义事件,将3级分类菜单的数据传递过去
      this.$emit("getCategoryId", { level: 3, categoryId: category3Id });
    },
  },
};
</script>

<style>
</style>