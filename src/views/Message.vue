<template>
  <div class="container">
    <el-tabs v-model="message">
      <el-tab-pane :label="`未读消息(${state.unread.length})`" name="first">
        <el-table :data="state.unread" :show-header="false" style="width: 100%" empty-text="全部消息已读完！">
          <el-table-column>
            <template #default="scope">
              <span class="message-title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="180"></el-table-column>
          <el-table-column width="120">
            <template #default="scope">
              <el-button size="small" @click="handleRead(scope.$index)"
                >标为已读</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="primary" @click="handleAllRead"
            >全部标为已读</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`已读消息(${state.read.length})`" name="second">
        <template v-if="message === 'second'">
          <el-table :data="state.read" :show-header="false" style="width: 100%" empty-text="可到回收站查看删除的消息">
            <el-table-column>
              <template #default="scope">
                <span class="message-title">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="170"></el-table-column>
            <el-table-column width="120">
              <template #default="scope">
                <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger" @click="handleAllDel">删除全部</el-button>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane :label="`回收站(${state.recycle.length})`" name="third">
        <template v-if="message === 'third'">
          <el-table
            :data="state.recycle"
            :show-header="false"
            style="width: 100%"
            empty-text="回收站已清空！"
          >
            <el-table-column>
              <template #default="scope">
                <span class="message-title">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" width="180"></el-table-column>
            <el-table-column width="200">
              <template #default="scope">
                <el-button @click="handleRestore(scope.$index)">还原</el-button>
                <el-button type="danger" @click="handleAlwDel(scope.$index)">永久删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger" @click="handleAllRestore">清空回收站</el-button>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElMessage,ElMessageBox } from "element-plus";

export default {
  setup() {
    const message = ref("first");
    const state = reactive({
      unread: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
          date: "2018-04-19 21:00:00",
          title: "今晚12点整发大红包，先到先得",
        },
        {
          date: "2028-03-19 20:00:00",
          title: "【系统通知】本系统明日19:23不停机更新，请注意更新时间！",
        },
        {
          date: "2018-04-19 21:00:00",
          title: "今天各品牌手机销售情况良好，继续保持",
        },
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】今日您已联系工作8小时，请注意休息",
        },
        {
          date: "2018-04-19 21:00:00",
          title: "今晚6点开始，全公司放假三天！",
        },
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】本系统将于后天推出下版本，请查收",
        },
        {
          date: "2018-04-19 21:00:00",
          title: "小米供货商已经从北京出发前往武汉，请关注行程安排",
        },
      ],
      read: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】今日您已联系工作8小时，请注意休息",
        },
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
        },
      ],
      recycle: [
        {
          date: "2018-04-19 20:00:00",
          title: "【系统通知】本系统明日19:23不停机更新，请注意更新时间！",
        },
        {
          date: "2018-04-19 21:00:00",
          title: "小米供货商已经从北京出发前往武汉，请关注行程安排",
        },
      ],
    });

    const { proxy } = getCurrentInstance();
    // let state = reactive([]);
    // const getMessageData = async () => {
    //   let res = await proxy.$api.getMessageData();
    //   state.value = res
    // };
    // onMounted(() => {
    //   getMessageData();
    // });

    // 标为已读
    const handleRead = (index) => {
      // 删除点击已读的那项，并且返回给item
      const item = state.unread.splice(index, 1);
      // 合并item和read
      state.read = item.concat(state.read);
      // 向header组件传值
      proxy.$mitt.emit('mittFn',state.unread.length)
    };
    // 全部标为已读
    const handleAllRead = () => {
      ElMessageBox.confirm(
        "确定全部标为已读？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const item = state.unread.splice(0, state.unread.length);
          state.read = item.concat(state.read);
          // 向header组件传值
          proxy.$mitt.emit('mittFn',state.unread.length)
        })
        .catch(() => {});
      
    };
    // 删除
    const handleDel = (index) => {
      const item = state.read.splice(index, 1);
      state.recycle = item.concat(state.recycle);
      ElMessage.success("删除成功");
    };
    // 全部删除
    const handleAllDel = () => {
      ElMessageBox.confirm(
        "确定删除全部？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const item = state.read.splice(0, state.read.length);
          state.recycle = item.concat(state.recycle);
          ElMessage.success("删除成功");
        })
        .catch(() => {});
      
    };
    // 还原
    const handleRestore = (index) => {
      const item = state.recycle.splice(index, 1);
      state.read = item.concat(state.read);
      ElMessage.success("已还原");
    };
    // 永久删除
    const handleAlwDel = (index) => {
      ElMessageBox.confirm(
        "删除后将无法还原！",        
        "确定永久删除？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          state.recycle.splice(index, 1);
          ElMessage.success("删除成功");
        })
        .catch(() => {});
    };
    // 清空回收站
    const handleAllRestore = () => {
      // const item = state.recycle.splice(0, state.recycle.length);
      // state.read = item.concat(state.read);
      
      ElMessageBox.confirm(
        "确定清空回收站？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          state.recycle = []
          ElMessage.success("删除成功！");
        })
        .catch(() => {});
    };

    return {
      message,
      handleRead,
      handleDel,
      handleRestore,
      state,
      handleAllRead,
      handleAllDel,
      handleAllRestore,
      handleAlwDel,
    };
  },
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>
