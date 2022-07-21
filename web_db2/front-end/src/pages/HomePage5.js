import React from 'react';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Layout, Table, Button, Modal, message } from 'antd';
import InfoDialog from './SingleDialog';
import PathDialog from './PathDialog';
import AdminDialog from './AdminDialog5';
import ApiUtil from '../utils/ApiUtil';
import HttpUtil from '../utils/HttpUtil';

const { Header, Content } = Layout;

const columns = [
    {
      title: '代码',
      dataIndex: 'code',
      // width:"80px",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      // width:"80px",
    },
    {
        title: '买卖',
        dataIndex: 'trade',
        // width:"80px",
    },
    {
      title: '价格',
      dataIndex: 'price',
      // width:"100px",
    },
    {
        title: '数量',
        dataIndex: 'amount',
        // width:"80px",
    },
];
const columns1 = columns.slice(0);
// const admin_item = {
//     title: '操作',
//     dataIndex: 'operation',
//     render: (stock)=>(
//         <span>
//             <EditOutlined onClick={()=>this.showUpdateDialog(stock)}/>
//             <DeleteOutlined onClick={() => this.deleteConfirm(stock)} />
//         </span>
//     ),
// };
// columns.push(admin_item)
// const columns2 = columns.slice(0)    // 添加一列，即管理员页面

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
}

class HomePage5 extends React.Component{
    state = {                       // state是当前组件一些可修改的属性，props是传递给子组件的属性（一般只读）
        showInfoDialog: false,      // 显示添加对话框
        showAdminDialog: false,     // 显示管理员登录框
        showPathDialog: false,      // 显示输入路径对话框
        editingItem: null,          // 对话框编辑的内容
        mData: [],                  // table里的数据
        my_columns: [],             // 列名
        showAdmin: false,           // 是否为管理员，即是否增加一列
        show_admin: 'block',        // 是否显示管理员按钮
        show_back: "none",          // 是否显示“back”
        current_admin: false,       // 当前是否是管理员状态
        dynamic_col_names: [],
        dynamic_columns1: [],
        dynamic_columns2: [],
    };
    admin_item = {
        title: 'operation',
        // dataIndex: 'operation',
        render: (stock)=>(
            <span>
                <EditOutlined onClick={()=>this.showUpdateDialog(stock)}/>
                <DeleteOutlined onClick={() => this.deleteConfirm(stock)} />
            </span>
        ),
    };
    d_columns = [];
    colums2 = [];

    componentDidMount() {
        this.getData();
        console.log("in HomePage componentDidMount");
        columns.push(this.admin_item); //加了一列的
        this.columns2 = columns;
        // const dd_columns = this.d_columns.slice(0);
        // dd_columns.push(this.admin_item);
        // this.columns2 = dd_columns
        sleep(100)                  // 调用两次导致线程冲突
        this.getMyColumns();        //获取列名
    }

    getData(){
        HttpUtil.get(ApiUtil.API_STOCK_LIST+0)      // 0表示获取所有数据
            .then(
                stockList =>{
                    // console.log(stockList)  // 接收到的字典
                    var col_n = Object.keys(stockList[0]);
                    console.log('接收到key: ', col_n);
                    this.mAllData = stockList;
                    this.setState({
                        mData: stockList,
                        showInfoDialog: false,
                        dynamic_col_names: col_n,
                    });
                    // console.log(this.state.mData)
                    var tmp_lst = [];
                    for (const key in col_n){
                        if (col_n[key] === 'id' || col_n[key] === 'create_time' || col_n[key] === 'modify_time'){
                            continue;
                        }
                        tmp_lst.push({title: col_n[key], dataIndex: col_n[key]});
                    }
                    this.setState({
                        dynamic_columns1: tmp_lst,
                    })
                    tmp_lst.push(this.admin_item)
                    this.setState({
                        dynamic_columns2: tmp_lst,
                    })
                    // this.d_columns = tmp_lst;
                    // console.log(this.state.dynamic_columns);
                }
            ).catch(error=>{
                message.error(error.message);
        });
    }

    showUpdateDialog(item){         // 点击“添加”按钮，调用此函数
        if (this.state.current_admin){
            console.log("in showUpdateDialog");
            if(item===undefined){
                //如果item未定义，则表示新增
                item = {};
            }
            console.log(item); //可以通过它来打印查看item
            this.setState({
                //如果有数据，则把该条数据复制，显示在对话框中，可供修改
                showInfoDialog: true,
                editingItem: item, 
            });
        }
        else{
            message.info('请登陆后进行操作');
        }
    }
    showAdminDialog(){
        console.log("in showAdminDialog");
        this.setState({
            showAdminDialog: true,
        });
    }
    showPathDialog(){
        console.log("in showPathDialog");
        this.setState({
            showPathDialog: true,
        });
    }

    deleteConfirm = (stock)=>{
        if (this.state.current_admin){
            var that = this;  // 下面的内嵌对象里面，this就改变了，这里在外面存一下。
            const modal = Modal.confirm({
                title: '确认',
                content: '确定要删除这条记录吗？',
                okText: '确认',
                cancelText:'取消',
                onOk(){
                    that.removeData(stock.id);
                    modal.destroy();
                },
                onCancel(){},
            });
        }
        else{
            message.info('请登陆后进行操作');
        }
    }
    removeData(id){
        HttpUtil.get(ApiUtil.API_STOCK_DELETE + id)
            .then(
                x =>{console.log('已删除');
                    message.info(x.message);
                    this.getData();}
            )
    }

    getMyColumns(){
        if(this.state.showAdmin===true){    // 管理员模式多一列操作
            this.setState({
                my_columns: this.columns2.slice(0, -1),  // 去掉多的一列
            });
        }else{                              // 一般用户模式
            this.setState({
                my_columns: columns1,
            });
        }
    }

    gotoAdmin = ()=>{
        //点击后，应该进入管理员模式
        console.log("进入管理员模式");
        this.setState({                 // 管理员按钮隐藏，显示返回按钮
            showAdminDialog: false,
            showAdmin: true,
            show_admin: 'none',
            show_back: "block",
            current_admin: true,
        },function(){                   //立马可以获取新的state值
            this.getMyColumns();        //重新获取列名
        });
    }
    onBack = ()=>{
        this.setState({
            showAdmin: false,           //隐藏只有管理员可见的列
            show_admin: 'block',
            show_back: "none",          //隐藏"返回"
            current_admin: false,
        },function(){
            this.getMyColumns();
        });
    }
    handlePathDialogClose = ()=>{
        this.setState({
            showPathDialog: false,
        });
        this.getData();
    }

    handleInfoDialogClose = (stock)=>{
        if(stock){
            if(stock.id){
                //修改
                let datas = [...this.state.mData];
                for(let i=0;i<datas.length;i++){
                    if(datas[i].id === stock.id){
                        //如果相等，表示更新该条数据
                        datas[i] = stock;
                        this.setState({
                            mData: datas,
                            showInfoDialog: false,
                        });
                        break; //找到了，就不必后面的了
                    }
                }
            }else{
                //新增 staff.id为0
                console.log("新增数据");
                this.getData();
            }
        }else{
            //删除
            this.getData();
        }
    }

    render(){
        return (
            <Layout>
                <Header>
                    <div style={{lineHeight:'64px', fontSize:"20px", color:"white",textAlign:"center"}}> 
                        数据库管理系统 by 金元明
                    </div>
                </Header>

                <Content >
                    <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                        <Button 
                            style={{position:"absolute", right:"70px", top:"20px", // 按钮位置
                            display:this.state.show_back}}                         // 是否显示
                            onClick={()=>this.showUpdateDialog()}                  // 点击触发
                            >                 
                                添加
                        </Button>
                        <Table 
                            columns={this.state.dynamic_columns2}
                            dataSource={this.state.mData}           // 从后端数据库获取数据并显示
                            rowKey={item=>item.id}  
                            pagination={{ pageSize: 20 }} 
                            scroll={{ y: 340 }} />

                        <InfoDialog
                            visible={this.state.showInfoDialog}
                            stock={this.state.editingItem}
                            afterClose={()=>{
                                this.setState({showInfoDialog:false});
                            }}
                            onDialogConfirm={this.handleInfoDialogClose} />

                        <div style={{position:"absolute", left:"10px", bottom:"10px", display:this.state.show_admin}}>
                            <a onClick={()=>this.showAdminDialog()}>管理员</a>
                        </div>

                        <AdminDialog
                            visible={this.state.showAdminDialog}
                            afterClose={()=>{
                                this.setState({showAdminDialog:false});
                            }}
                            onDialogConfirm={this.gotoAdmin} />

                        <div style={{position:"absolute", left:"70px", bottom:"10px", display:this.state.show_back}}>
                            <a onClick={this.onBack}>返回</a>
                        </div>

                        <div style={{position:"absolute", left:"130px", bottom:"10px", display:true}}>
                            <a onClick={()=>this.showPathDialog()}>路径</a>
                        </div>

                        <PathDialog
                            visible={this.state.showPathDialog}
                            afterClose={()=>{
                                this.setState({showPathDialog:false});
                            }}
                            onDialogConfirm={this.handlePathDialogClose} />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default HomePage5;