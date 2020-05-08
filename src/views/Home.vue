<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <van-button type="warning" class="han-test">警告按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Button } from 'vant';

export default {
  name: 'home',
  components: {
    HelloWorld,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button
  }
}
</script>

<style lang="scss">
	.han-test{width:375px;}
</style>
