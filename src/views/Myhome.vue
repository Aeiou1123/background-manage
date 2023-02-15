<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card shadow="hover" style="background-color: #87ceeb">
        <template #header>
          <div class="clearfix">
            <span>个人信息</span>
          </div>
        </template>
        <div class="img">
          <el-avatar :size="180" :src="require(`@/assets/images/user.jpg`)" />
        </div>
        <el-form label-width="82px" label-position="left" class="form">
          <el-form-item label="用户名："> 羽殇 </el-form-item>
          <el-form-item label="职位："> 管理员 </el-form-item>
          <el-form-item label="部门："> 信息与安全部 </el-form-item>
          <el-form-item label="个人简介：" class="Biography">
            &emsp;本人性格开朗、稳重、有活力，待人热情、真诚;工作认真负责,
            积极主动，能吃苦耐劳，用于承受压力，勇于创新;有很强的组织能力和团队协作精神，意志坚强，具有较强的无私奉献精神。
            对待工作认真负责，善于沟通、协调有较强的组织能力与团队精神;活泼开朗、乐观上进、有爱心并善于施教并行;
            上进心强、勤于学习能不断提高自身的能力与综合素质。
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover" style="background-color: #ffc0cb" class="edit">
        <template #header>
          <div class="clearfix">
            <span>账户编辑</span>
          </div>
        </template>
        <el-form label-width="90px" class="editcounter" ref="userForm" :model="formLabelAlign">
          <el-form-item label="用户名" prop="name" :rules="[{required:true,message:'请填写用户名'}]" >
            <el-input  
              :prefix-icon="User" 
              v-model="formLabelAlign.name" 
              placeholder="请输入姓名"              
            />
          </el-form-item>
          <el-form-item label="旧密码" prop="oldpassword" :rules="[{required:true,message:'请填写密码'}]">
            <el-input 
              :prefix-icon="Lock" 
              type="password" 
              v-model="formLabelAlign.oldpassword" 
              placeholder="请输入旧密码" 
              show-password             
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword" :rules="[{required:true,message:'请输入新密码'}]">
            <el-input 
              :prefix-icon="Lock" 
              type="password" 
              v-model="formLabelAlign.newpassword" 
              placeholder="请输入新密码"
              show-password             
            />
          </el-form-item>
          <el-form-item>
							<el-button type="primary" @click="onSubmit">保存</el-button>
					</el-form-item>
        </el-form>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px;" class="log">
        <template #header>
          <div class="clearfix">
            <span>事务日志</span>
          </div>
        </template>
        <el-table :data="tableData" height="173" stripe style="width: 100% ;" :show-header="false" >
          <el-table-column type="index" width="50" />
          <el-table-column prop="date"  width="120" />
          <el-table-column prop="event"  />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, ref,getCurrentInstance } from "vue";
import { Lock,User} from '@element-plus/icons-vue'
import { ElMessage} from 'element-plus'

export default {
  setup(){
    const labelPosition = ref("top");

    const formLabelAlign = reactive({
      name: "羽殇",
      oldpassword:"",
      newpassword:"",
    });
   
    const {proxy} = getCurrentInstance()
    let userForm = ref()
    const onSubmit =async () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if(valid){
          proxy.$refs.userForm.resetFields();
          ElMessage.success('保存成功')
        }else{
          ElMessage.error('请把信息填写完整')
        }
      })
    }

    const tableData = [
      {
        date: '2022-05-03',
        event: '处理了用户管理页面性别无法切换的问题 ',
      },
      {
        date: '2023-05-02',
        event: '添加了商品管理页面的添加商品功能,修复了删除商品异常',
      },
      {
        date: '2023-03-22',
        event: '增加了权限管理',
      },
      {
        date: '2023-04-02',
        event: '处理了登陆以后密码丢失的问题',
      },
      {
        date: '2023-05-02',
        event: '添加了商品管理页面的添加商品功能，并且修复了删除商品异常和图片显示问题',
      },
      {
        date: '2023-09-04',
        event: '添加了登陆校验功能',
      },
      
    ]

    return { labelPosition, formLabelAlign ,onSubmit,Lock,User,userForm,tableData};
  }
}
</script>

<style lang="less" scoped>
.img {
  display: flex;
  justify-content: center;
}
.el-card{
  border-radius: 10px;
}
.form {
  .el-form-item {
    font-weight: bold;
    margin-bottom: 9px;
    margin-left: 15px;
  }
  .Biography {
    /deep/.el-form-item__content {
      font-weight: normal;
    }
  }
}
.el-card{
  /deep/.el-card__body{
    padding-bottom: 0;
    .editcounter{
      width: 400px;
    }
  }
}
.log{
  /deep/.el-card__body{
    padding: 12px 20px;
  }
}
</style>