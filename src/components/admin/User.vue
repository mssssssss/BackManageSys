<template>
  <el-card style="margin-top: 10px; margin-right: 15px">
    <el-dialog
      title="新增用户"
      :visible.sync="isShowAddDialog"
      width="35%"
    >
      <el-form
        ref="form"
        :rules="Rules"
        :model="addUserForm"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="addUserForm.name"
            clearable
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="年纪" prop="age">
          <el-input type="Integer"
            v-model="addUserForm.age"
            clearable
            placeholder="请输入年纪"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="addUserForm.sex" label="男">男</el-radio>
          <el-radio v-model="addUserForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            v-model="addUserForm.address"
            clearable
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="date">
          <el-date-picker
            style="width: 100% !important"
            v-model="addUserForm.date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择出生日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="isShowAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="更新用户"
      :visible.sync="isShowUpdateDialog"
      width="35%"
    >
      <el-form ref="form2" :rules="Rules" :model="updateUserForm" label-width="70px">
        <el-form-item label="姓名"  prop="name">
          <el-input
            v-model="updateUserForm.name"
            clearable
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="年纪"  prop="age">
          <el-input
            v-model="updateUserForm.age"
            clearable
            placeholder="请输入年纪"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别"  prop="sex">
          <el-radio v-model="updateUserForm.sex" label="男">男</el-radio>
          <el-radio v-model="updateUserForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="地址"  prop="address">
          <el-input
            v-model="updateUserForm.address"
            clearable
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期"  prop="date">
          <el-date-picker
            style="width: 100% !important"
            v-model="updateUserForm.date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择出生日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="isShowUpdateDialog = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 操作区域 -->
    <el-form :inline="true" :model="operateForm" class="operateForm">
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="medium"
          @click="addUser"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-input
            v-model="operateForm.keyword"
            size="medium"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="medium"
            @click="search"
            >查询</el-button
          >
        </el-form-item>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="userTable"
      :data="tableData"
      stripe
      style="width: 100%"
      size="mini"
    >
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="80"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="80"> </el-table-column>

      <el-table-column
        prop="address"
        label="地址"
        width="230"
      ></el-table-column>
      <el-table-column prop="date" label="出生日期" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :currentPage="currentPage"
      :page-size="PageSize"
      :page-sizes="sizeList"
      :total="totalCount"
    >
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      isShowAddDialog: false,
      isShowUpdateDialog: false,
      // 操作区域表单的信息
      operateForm: {
        keyword: "",
      },
      // 添加用户表单
      addUserForm: {
        name: "",
        age: "",
        sex: "男",
        date: "",
        address: "",
      },
      //更新用户表单
      updateUserForm: {
        name: "",
        age: "",
        sex: "男",
        date: "",
        address: "",
      },
      //  全部表格数据
      allTableData: [],
      //当前页
      currentPage: 1,
      // 总的数据条数
      totalCount: 100,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      sizeList: [1, 2, 5, 10, 20], // 每页显示个数选择器的选项设置
      curIndex: 0,

      Rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年纪", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        date: [{required: true, message: "请选择出生日期", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 表格实时刷新还有问题
    //点击搜索按钮（根据名字模糊查找）
    // list[i].match(keyWord) != null  模糊匹配
    search() {
      if (this.operateForm.keyword.trim() == "") {
        // 如果什么都不搜索，则通过请求获取所有用户信息
        this.$axios.get("/getUserList").then((response) => {
          //  表格的所有数据allTableData
          this.allTableData = response.data.data.userInfo;
        });
      } else {
        this.allTableData = this.allTableData.filter((item) =>
          item.name.match(this.operateForm.keyword)
        );
      }
      this.totalCount = this.allTableData.length;
    },
    // 修改每页显示的条数
    handleSizeChange(val) {
      this.PageSize = val;
      //  注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    //修改当前页码
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    //点击新增按钮
    addUser() {
      this.isShowAddDialog = true;
    },

    //执行添加用户的操作
    add() {
      //如果添加用户的表单通过了表单验证
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        else {
          this.allTableData.push(this.addUserForm);
          this.$alert("添加用户成功", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              // console.log(action);
              // this.$refs.userTable.doLayout();  // 重新渲染表格
              // this.$forceUpdate()  // 强制刷新
              // this.totalCount = this.allTableData.length;
              //重新请求赋值
              this.allTableData = Object.assign([], this.allTableData); // 赋值一个新的对象
              this.totalCount = this.allTableData.length; // 赋值一个新的对象
              this.isShowAddDialog = false;
              console.log(this.allTableData);
            },
          });
        }
      });
    },

    // 点击编辑按钮
    handleEdit(index, row) {
      this.isShowUpdateDialog = true;
      this.updateUserForm = JSON.parse(JSON.stringify(row)); // 注意这里要进行 深度拷贝 防止编辑的时候表格的数据没等确认更新就同步更新了
      //当前编辑的行的索引
      this.curIndex = (this.currentPage - 1) * this.PageSize + index;
    },

    //执行更新用户的操作
    update() {
      //如果添加用户的表单通过了表单验证
      this.$refs.form2.validate(async (valid) => {
        if (!valid) return;
        else {
          //重新请求赋值
          this.allTableData[this.curIndex] = this.updateUserForm;
          this.allTableData = Object.assign([], this.allTableData); // 赋值一个新的对象
          this.$alert("更新用户成功", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              // console.log(action);
              this.isShowUpdateDialog = false;
            },
          });
        }
      });
    },

    //   点击删除按钮
    // 删除这个用户
    handleDelete(index, row) {
      const index2 = (this.currentPage - 1) * this.PageSize + index;
      this.allTableData.splice(index2, 1);
      this.allTableData = Object.assign([], this.allTableData);
      this.totalCount = this.allTableData.length;
    },
  },

  created() {
    // 得到表格的用户信息
    this.$axios.get("/getUserList").then((response) => {
      console.log(response);
      //   表格的所有数据allTableData
      this.allTableData = response.data.data.userInfo;
      this.totalCount = this.allTableData.length; //数据总条目
    });
    console.log("totalCount", this.totalCount);
  },

  computed: {
    tableData() {
      //当前分页对应的表格需要显示的数据
      return this.allTableData.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
    },
  },
};
</script>
<style>
.operateForm {
  display: flex;
  justify-content: space-between; /*左右对齐*/
}

.pager {
  width: 100%;
  text-align: right;
  margin-top: 15px;
}
</style>