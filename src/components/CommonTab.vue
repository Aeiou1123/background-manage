<template>
  <div class="tags">
    <!-- 对tag栏的配置可查看elementplus官网 -->
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain' "
      @click="changeMenu(tag)"
      @close="handleClose(tag,index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import {useRouter,useRoute} from "vue-router"
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const tags = store.state.tabsList;

    const changeMenu = (item) => {
      router.push({name:item.name});
    };
    // 关闭tag栏的操作：
    const handleClose = (tag,index) => {
      let length = tags.length -1; 
      store.commit("closeTab",tag);
      // 如果你在当前页面关闭其他页面时(即你要关闭的那个tag和你当前的路由不一样时)，那么关闭其他tag时不做跳转
      if(tag.name !== route.name){
        return;
      }
      // 如果你关闭的是最后一个tag(即索引值等于所有tags栏的长度减一时)，那么就跳转到上一个tag
      if(index === length){
        router.push({
          name:tags[index-1].name,
        })
      }else{  //如果关闭的不是最后一个tag，那么就跳转到下一个tag
        router.push({
          name:tags[index].name,
        })
      }
    }

    return{
      tags,
      changeMenu,
      handleClose,
    };
  },
}
</script>

<style lang="less" scoped>
.tags{
  padding: 15px 15px 0 15px;
  width: 100%;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>