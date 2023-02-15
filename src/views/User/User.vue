<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item class="user-search">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名"  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width:100%; height:500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180"  >
        <template #default="scope">
          <!-- 通过插槽把数据拿到(scope.row) -->
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>       
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      :page-size="config.size"
      class="mt-4 pager"
      @current-change="changePage"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户' "
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm" >
      <el-row>
        <el-col :span="12">
          <el-form-item 
            label="姓名" 
            prop="name" 
            :rules="[{required:true,message:'姓名是必填项'}]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item 
            label="年龄" 
            prop="age"
            :rules="[{required:true,message:'年龄是必填项'},{type:'number',message:'年龄必须是数字'}]"
            >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择性别">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请输入日期"
              style="width:100%"
              value-format='YYYY-MM-DD'
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item 
          label="地址" 
          prop="addr"
          :rules="[{required:true,message:'地址是必填项'}]"
          >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: center;">
        <el-form-item >
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>      
    </el-form>
  </el-dialog>
</template>

<script>
import { getCurrentInstance,onMounted,reactive,ref } from 'vue';
import { ElMessageBox,ElMessage} from 'element-plus'

export default {
  setup(){
    const {proxy} = getCurrentInstance()
    const list = ref([])
    const config = reactive({
      total:0,  //展示数据的总数
      size:0,   //每页展示多少条数据
      page:1,  //当前页
      name:'',
    })
    const tableLabel = reactive([
      {
        prop:"name",
        label:"姓名",
      },
      {
        prop:"age",
        label:"年龄",
      },
      {
        prop:"sexLabel",
        label:"性别",
      },
      {
        prop:"birth",
        label:"出生日期",
        width:200,
      },
      {
        prop:"addr",
        label:"地址",
        width:320,
      },
    ])

    onMounted(() => {
        getUserData(config);
        // console.log(config)
    });
    const getUserData = async (config) => {
        let res = await proxy.$api.getUserData(config);
        config.total = res.count;
        config.size = res.list.length
        list.value = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item;
        })     
    };
    const changePage = (page) => {
      config.page = page;
      getUserData(config)
    };
    const formInline = reactive({
      keyword:"",
    });
    const handleSearch = () => {
      config.name = formInline.keyword;
      getUserData(config);      
    };
    // 控制弹出对话框的显示/隐藏
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      ElMessageBox.confirm('确定关闭吗?',
      {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          done();
          proxy.$refs.userForm.resetFields();
        })
        .catch(() => {
          // catch error
    })
    }
    // 添加用户的form数据
    const formUser = reactive({
      name:"",
      age:"",
      sex:"",
      birth:"",
      addr:"",
    });
    // 确定添加用户
    const onSubmit = async () => {
      // 使用validate必须在el-form中绑定ref="userForm"
      proxy.$refs.userForm.validate(async (valid) => {
        if(valid){ //如果有值也就是校验通过才能进行提交
          if(action.value == "add"){ //如果是新增就调用新增的接口
            let res = await proxy.$api.addUser(formUser)
            // console.log(res)
            if(res){
              // 重置表单，注意resetFields方法在使用时，其表单元素需要添加prop属性
              proxy.$refs.userForm.resetFields();
              // 提交完让表单消失
              dialogVisible.value = false;
              // 重新获取一下数据
              getUserData(config)
              ElMessage.success('新增成功')
            }
          }else{ //编辑就调用编辑的接口
            // formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
            let res = await proxy.$api.editUser(formUser)
            // console.log(res)
            if(res){
              proxy.$refs.userForm.resetFields();
              dialogVisible.value = false;
              getUserData(config)
              ElMessage.success('编辑成功')
            }
          }          
        }else{
          ElMessage({
            showClose:true,
            message:"请输入正确的内容",
            type:"error",
          });
        }
      })     
    }
    // 取消添加用户
    const handleCancel = () => {
      proxy.$refs.userForm.resetFields();
      dialogVisible.value = false;
    }
    // 区分编辑和新增
    const action = ref('add')
    // 编辑用户按钮，编辑用户的弹窗复用新增用户同一个弹窗
    const handleEdit = (row) =>{
      action.value = 'edit'
      dialogVisible.value = true;
      // console.log(row)
      row.sex == 1 ? (row.sex = '男') : (row.sex = '女');
      // 使用浅拷贝把数据赋值到弹窗里,并且通过事件循环机制的时间差来清空新增弹窗的数据
      proxy.$nextTick(() => {
        Object.assign(formUser,row);
      });     
    }
    // 新增按钮
    const handleAdd = () => {
      action.value = 'add'
      dialogVisible.value = true;
    }
    // 删除用户
    const handleDelete = (row) => {
      ElMessageBox.confirm("确定删除吗？",
      {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          await proxy.$api.deleteUser(row)
        
          ElMessage({
            showClose:true,
            message:'删除成功',
            type:'success',
          });
          getUserData(config);
        })
        .catch(() => {
          //catch error
        })
    }


    return{
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      handleCancel,
      action,
      handleEdit,
      handleAdd,
      handleDelete,
    }
  }    
}
</script>

<style lang="less" scoped>
.table{
  position: relative;
  .pager{
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 50%);
  }
}
.user-header{
  display: flex;
  justify-content: space-between;
}
.user-search{
  margin-right:20px;
}
</style>