<template>
    <div id="wrap">
        <div id="top_content">
            <div id="header">
                <div id="rightheader">
                    <p>
                        2009/11/20
                        <br/>
                    </p>
                </div>
                <div id="topheader">
                    <h1 id="title">
                        <a href="#">Main</a>
                    </h1>
                </div>
                <div id="navigation">
                </div>
            </div>
            <div id="content">
                <p id="whereami">
                </p>
                <h1>
                    update Emp info:
                </h1>
                    <table cellpadding="0" cellspacing="0" border="0"
                           class="form_table">
                        <tr>
                            <td valign="middle" align="right">
                                id:
                            </td>
                            <td valign="middle" align="left">
                                {{$route.params.id}}
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                name:
                            </td>
                            <td valign="middle" align="left">
                                <input type="text" class="inputgri" name="name" v-model="emp_name"/>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                photo:
                            </td>
                            <td valign="middle" align="left">
                                <input type="file" name="photo" ref="photo"/>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                salary:
                            </td>
                            <td valign="middle" align="left">
                                <input type="text" class="inputgri" name="salary" v-model="salary"/>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" align="right">
                                age:
                            </td>
                            <td valign="middle" align="left">
                                <input type="text" class="inputgri" name="age" v-model="age"/>
                            </td>
                        </tr>
                    </table>
                    <p>
                        <input type="submit" class="button" value="确定更新" @click="update_emp()"/>
                    </p>
            </div>
        </div>
        <div id="footer">
            <div id="footer_bg">
                ABC@126.com
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Update",
        data() {
            return {
                id:'',
                emp_name: "",
                // photo: "",
                age: "",
                salary: "",
            }
        },
        methods: {
            // 获取所有用户信息
            findOneEmp(){
                let id = this.$route.params.id
                this.id = id

                console.log(id,'111')
                // 根据id更新员工
                this.$axios({
                        url: "http://127.0.0.1:8000/empapp/emp/"+this.id+"/",
                        method: "get",
                        // params: {
                        //     id:id
                        // },
                }).then(response=>{
                    console.log(response.data)
                    this.emp_name = response.data.results.emp_name;
                    this.age = response.data.results.age;
                    this.salary = response.data.results.salary;
                }).catch(error=>{
                    this.$message.error('获取用户失败');
                })
            },
            // 添加员工的请求
            update_emp() {

                // 获取的页面的文件信息
                let file = this.$refs.photo.files[0]

                // ajax请求上传文件借助于FormData, 方法是post  enctype是multipart/form-data
                let formData = new FormData();
                formData.append("emp_name", this.emp_name);
                formData.append("salary", this.salary);
                formData.append("age", this.age)
                formData.append("img", this.$refs.photo.files[0])

                this.$axios({
                    url: "http://127.0.0.1:8000/empapp/emp/"+this.id+"/",
                    method: "patch",
                    data: formData,
                    headers: {
                        "content-type": "multipart/form-data"
                    },
                }).then(response => {
                    console.log(response.data);
                    if (response.data.message) {

                        this.$message({
                            message: '恭喜你，修改成功',
                            type: 'success',
                            duration: 1000,
                            showClose: true,
                        })
                        // 跳转到列表页
                        this.$router.push("/index");
                    }
                }).catch(error => {
                    console.log(error.message);
                })
            },


        },
        // vue的生命周期钩子
        created() {
            // 在页面加载完成前获取员工数据并把值赋值给 data
            console.log('11111111')
            this.findOneEmp();
        },
    }
</script>

<style scoped>

</style>
