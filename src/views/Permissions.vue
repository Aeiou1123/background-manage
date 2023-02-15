<template>
  <el-card>
    <div class="container">
      <div>
        <el-form ref="userForm" :model="User">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="用户名"
                prop="name"
                :rules="[{ required: true, message: '请填写用户名' }]"
              >
                <el-input
                  placeholder="请输入用户名"
                  style="width: 180px"
                  v-model="User.name"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色：">
                <el-select v-model="role" @change="handleChange">
                  <el-option label="管理员" value="admin"></el-option>
                  <el-option label="普通用户" value="user"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class=" tree-wrapper">
        <el-tree
          ref="tree"
          :data="data"
          node-key="id"
          default-expand-all
          show-checkbox
          :default-checked-keys="checkedKeys"
        />
      </div>
      <el-button type="primary" @click="onSubmit">保存权限</el-button>
    </div>
  </el-card>
</template>

<script >
import { reactive, ref, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const role = ref("admin");
    const User = reactive({
      name: "羽殇",
    });
    let data = [
      {
        id: "1",
        label: "首页",
      },
      {
        id: "2",
        label: "商品分析",
      },
      {
        id: "3",
        label: "商品管理",
      },
      {
        id: "4",
        label: "用户管理",
      },
      {
        id: "5",
        label: "消息中心",
      },
      {
        id: "6",
        label: "其他",
        children: [
          {
            id: "7",
            label: "关于",
          },
          {
            id: "8",
            label: "权限管理",
          },
          {
            id: "9",
            label: "联系作者",
          },
        ],
      },
    ];

    // 默认权限
    let checkedKeys = reactive([1, 2, 3, 4, 5, 6]);

    const tree = ref();
    // 改变角色变换权限
    const handleChange = (val) => {
      if (val === "user") {
        tree.value.setCheckedKeys([1, 2, 6]);
      } else {
        tree.value.setCheckedKeys([1, 2, 3, 4, 5, 6]);
      }
    };

    const { proxy } = getCurrentInstance();
    let userForm = ref();
    //保存按钮
    const onSubmit = async () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          proxy.$refs.userForm.resetFields();
          ElMessage.success("保存成功");
        } else {
          ElMessage.error("请把信息填写完整");
        }
      });
    };

    return {
      data,
      role,
      checkedKeys,
      onSubmit,
      handleChange,
      tree,
      User,
      userForm,
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 45%;
}
.label {
  font-size: 15px;
}
.tree-wrapper {
  max-width: 45%;
  margin: 25px;
  margin-top: 0;
}
</style>
