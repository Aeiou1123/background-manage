<template>
  <el-card class="container" shadow="always">
    <div class="img">
      <img src="../assets/images/wechat.jpg" />
      如果本作品对你有帮助，或者你想提
      <p>出修改意见请联系作者哦~</p>
    </div>
    <div class="card">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        ref="userForm"
        style="max-width: 440px"
        
      >
        <el-form-item label="Name" prop="name" :rules="[{required:true,message:'姓名是必填项'}]">
          <el-input v-model="formLabelAlign.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="Address" prop="address" :rules="[{required:true,message:'地址是必填项'}]">
          <el-input v-model="formLabelAlign.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="Email" prop="email" :rules="[{required:true,message:'邮箱是必填项'}]">
          <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="Suggestion" prop="suggestion" :rules="[{required:true,message:'请填写你的建议'}]">
          <el-input v-model="formLabelAlign.suggestion" type="textarea" placeholder="请提出你的建议"  :autosize="{ minRows: 4, maxRows: 6 }"/>
        </el-form-item>
      </el-form>
      <el-row class="my-4 submit">
        <el-button type="primary" round @click="onSubmit(formEl)">提交</el-button>
      </el-row>
    </div>
  </el-card>
</template>


<script >
import { reactive, ref, getCurrentInstance} from "vue";
import { ElMessage, } from 'element-plus'


export default {
  setup() {
    const labelPosition = ref("top");

    const formLabelAlign = reactive({
      name: "",
      address: "",
      email: "",
      suggestion:""
    });
   
    
    const {proxy} = getCurrentInstance()
    let userForm = ref()
    const onSubmit =async () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if(valid){
          proxy.$refs.userForm.resetFields();
          ElMessage.success('提交成功')
        }else{
          ElMessage.error('请把信息填写完整')
        }
      })
    }

    return { labelPosition, formLabelAlign ,onSubmit,userForm};
  },
};
</script>


<style lang="less" scoped>
.container {
  padding: 20px;
  width: 70%;
  height: auto;
  margin: 50px auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-image: url('../assets/images/bg.jpg');

  .img {
    float: left;
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    img{
      width: 250px;
      height: 250px;
      padding-bottom: 20px;

    }
    
    
  }
  .card {
    width: 60%;
    float: right;
    
    .submit{
      width: 100px;
    }
  }
}
</style>>

