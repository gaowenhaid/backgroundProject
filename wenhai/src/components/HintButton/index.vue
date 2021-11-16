<!--
 * @Date: 2021-11-13 15:15:59
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-14 12:20:29
 * @FilePath: \wenhai\src\components\HintButton\index.vue
-->
<template>
  <el-tooltip :content="title" placement="top">
    <el-button v-bind="$attrs" v-on="$listeners"> </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'HinButton',
  props: {
    title: String
  }
}
</script>

<style>
</style>
