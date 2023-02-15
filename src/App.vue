<template> 
  <router-view/>
</template>

<script>
import {useStore} from "vuex"
import {useRouter} from "vue-router"
export default {
  setup(){
    const store = useStore();
    const router = useRouter();
    store.commit("addMenu",router);
  }
}
</script>

<style lang="less" scoped>
#app{
  height: 100%;
}
</style>