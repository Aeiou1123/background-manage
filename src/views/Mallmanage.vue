<template>
  <el-table :data="tableData" style="width: 100%" height="530">
    <el-table-column fixed prop="name" label="商品名称" width="150" />
    <el-table-column prop="price" label="价格¥" width="120" />
    <el-table-column prop="number" label="数量" width="120" />
    <el-table-column prop="images" label="图片(查看大图)" width="140" >
      <div class="demo-image__preview">
        <el-image
          style="width: 80px; height: 80px"
          :src="require(`@/assets/images/mi12.png`)"
          :zoom-rate="1.2"
          :preview-src-list="srcList"
          fit="cover"
          :preview-teleported="true"
        />
      </div>
    </el-table-column>
    <el-table-column prop="address" label="发货地址" width="480" />
    <el-table-column label="状态" align="center">
					<template #default="scope">
						<el-tag
							:type="scope.row.state === '已出售' ? 'success' : scope.row.state === '已取消' ? 'danger' : ''"
						>
							{{ scope.row.state }}
						</el-tag>
					</template>
				</el-table-column>
    <el-table-column fixed="right" label="清除" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="add"  @click="onAddItem"  type="primary">添加</el-button>
  <!-- 添加商品弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    title="添加商品"
    width="37%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm" >
      <el-row>
        <el-col :span="12">
          <el-form-item 
            label="商品名称" 
            prop="name" 
            :rules="[{required:true,message:'商品名称是必填项'}]"
          >
            <el-input v-model="formUser.name" placeholder="请输入商品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item 
            label="价格" 
            prop="price"
            :rules="[{required:true,message:'价格是必填项'},{type:'number',message:'价格必须是数字'}]"
            >
            <el-input v-model.number="formUser.price" placeholder="请输入价格" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item 
            label="数量" 
            prop="number" 
            :rules="[{required:true,message:'数量是必填项'},{type:'number',message:'数量必须是数字'}]"
          >
            <el-input v-model.number="formUser.number" placeholder="请输入商品数量" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item 
            label="商品状态" 
            prop="state"
            :rules="[{required:true,message:'商品状态是必填项'},]"
            >
            <el-select v-model="formUser.state" placeholder="请选择商品状态">
              <el-option label="已出售" value="已出售" />
              <el-option label="未出售" value="未出售" />
              <el-option label="已取消" value="已取消" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item 
          label="发货地址" 
          prop="address"
          :rules="[{required:true,message:'发货地址是必填项'},]"
        >
          <el-input style="width: 420px"  v-model="formUser.address" placeholder="请输入发货地址" clearable />         
        </el-form-item>
        <el-upload
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          :limit="3"
        >
          <el-button type="primary">点击上传图片</el-button>
        </el-upload>
      </el-row>
      <el-row style="justify-content: center; margin-top: 20px;">
        <el-form-item >
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>  
    </el-form>
  </el-dialog>
</template>

<script >
import { ref,reactive,getCurrentInstance,onMounted } from "vue";
import { ElMessage,ElMessageBox } from 'element-plus';

export default {
  setup() {
    const now = new Date();
    const {proxy} = getCurrentInstance()
    // const tableData = ref([
    //   {
    //     name: "小米12",
    //     price: "2300",
    //     number: "1200",
    //     images: "Los Angeles",
    //     address: "广东省广州市黄埔区红山街道红山二路111号",
    //     state: "已出售",
    //   },
    //   {
    //     name: "华为p40",
    //     price: "4300",
    //     number: "2200",
    //     images: "Los Angeles",
    //     address: "新疆维吾尔自治区 昌吉回族自治州 木垒哈萨克自治县",
    //     state: "已取消",
    //   },
    //   {
    //     name: "红米k50",
    //     price: "2300",
    //     number: "5200",
    //     images: "Los Angeles",
    //     address: "贵州省 黔西南布依族苗族自治州 普安县 绘图街道42号",
    //     state: "已出售",
    //   },
    //   {
    //     name: "苹果13",
    //     price: "8300",
    //     number: "1100",
    //     images: "Los Angeles",
    //     address: "广东省广州市黄埔区红山街道红山二路111号广州交通大学宿舍楼",
    //     state: "已出售",
    //   },
    //   {
    //     name: "vivo",
    //     price: "1300",
    //     number: "2354",
    //     images: "Los Angeles",
    //     address: "新疆维吾尔自治区 昌吉回族自治州 木垒哈萨克自治县超级大草原",
    //     state: "未出售",
    //   },
    //   {
    //     name: "小米2",
    //     price: "4300",
    //     number: "1200",
    //     images: "Los Angeles",
    //     address: "广东省广州市黄埔区红山街道红山二路111号黄埔区红山街道",
    //     state: "已取消",
    //   },
    //   {
    //     name: "OPPO",
    //     price: "3400",
    //     number: "1342",
    //     images: "Los Angeles",
    //     address: "青海省 海北藏族自治州 祁连县褡裢镇大海街道121号",
    //     state: "已出售",
    //   },
    //   {
    //     name: "一加",
    //     price: "2300",
    //     number: "1200",
    //     images: "Los Angeles",
    //     address: "香港特别行政区 九龙 观塘区巅峰街道动画协会",
    //     state: "未出售",
    //   },
    // ]);

    const tableData = ref([])
    const getMallData = async () => {
      let res = await proxy.$api.getMallData();
      tableData.value = res;
    };
    onMounted(() => {
      getMallData();
    });

    const deleteRow = (index) => {
      tableData.value.splice(index, 1);
      ElMessage.success('删除成功')
    };

    const srcList = [
      'https://pic4.zhimg.com/50/v2-d7b0523a7963c60c758a8fa9e08446d7_720w.jpg?source=54b3c3a5',
      'https://n.sinaimg.cn/sinakd20210817ac/200/w1080h720/20210817/fb92-f77e481af5d5e9e16d9320a9b6e73ff0.jpg',]

    // 添加按钮
    const onAddItem = () => {
      // now.setDate(now.getDate() + 1);
      // tableData.value.push({
      //   name: "888钛合金手机",
      //   price: "8888",
      //   number: "8888",
      //   images: "假装有图",
      //   address: "地球村黄土高原原住民",
      //   state: "已出售",
      // });
      // ElMessage.success('添加成功')
      dialogVisible.value = true;
    };

    // 控制弹出对话框的显示/隐藏
    const dialogVisible = ref(false);
    // 添加用户的form数据
    const formUser = reactive({
      name:"",
      price:"",
      number:"",
      address:"",
      state:"",
    });
    let userForm = ref()   
    // 关闭按钮
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
    
    // 取消添加按钮
    const handleCancel = () => {
      // 重置表单
      proxy.$refs.userForm.resetFields();
      // 关闭对话框
      dialogVisible.value = false
    }
    // 确定添加按钮
    const onSubmit = async () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if(valid){
          // console.log(formUser)
          now.setDate(now.getDate() + 1);
          tableData.value.unshift({
            name: formUser.name,
            price: formUser.price,
            number: formUser.number,
            images: "假装有图",
            address: formUser.address,
            state: formUser.state,
          });
          proxy.$refs.userForm.resetFields();
          dialogVisible.value = false
          ElMessage.success('添加成功')

        }else{
          ElMessage({
            showClose:true,
            message:"请输入正确的内容",
            type:"error",
          });
        }
      })
    }

    return{
      tableData,
      deleteRow,
      onAddItem,
      srcList,
      dialogVisible,
      formUser,
      handleCancel,
      userForm,
      handleClose,
      onSubmit
    }
  },
};
</script>

<style lang="less" scoped>

.add{
  margin-top: 20px;
}
/deep/.el-upload-list{
  float: right;
  // width: 60%;
  margin-left: 10px;
}
</style>
