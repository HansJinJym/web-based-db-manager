import React from 'react';
import {Layout, Table, Button } from 'antd';
import InfoDialog from './InfoDialog3'

const { Header, Content, Icon } = Layout;

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
      title: '成本价',
      dataIndex: 'cost_price',
      // width:"100px",
    },
    {
        title: '现价',
        dataIndex: 'current_price',
        // width:"80px",
    },
];
const columns1 = columns.slice(0);
const admin_item = {
    title: '操作',
    dataIndex: 'operation',
    render: (staff)=>(
        <span>
            <Icon type="edit" onClick={()=>this.showUpdateDialog(staff)}/>
            <Icon type="close" title="删除" style={{ color: '#ee6633', marginLeft:12}} onClick={() => this.deleteConfirm(staff)} />
        </span>
    ),
};
columns.push(admin_item)
const columns2 = columns.slice(0)    // 添加一列，即管理员页面

class HomePage3 extends React.Component{
    state = {                       // state是当前组件一些可修改的属性，props是传递给子组件的属性（一般只读）
        showInfoDialog: false,      //显示添加对话框
        editingItem: null,          //对话框编辑的内容
        my_columns:[],              //列名
        showAdmin: false,           //是否为管理员，即是否增加一列
        show_admin: 'block',        // 是否显示管理员按钮
        show_back: "none",          //是否显示“back”
    }

    componentDidMount() {
        console.log("in HomePage componentDidMount");
        this.getMyColumns(); //获取列名
    }

    showUpdateDialog(item){         // 点击“添加”按钮，调用此函数
        console.log("in showUpdateDialog");
        this.setState({
            //如果有数据，则把该条数据复制，显示在对话框中，可供修改
            showInfoDialog: true,
        });
    }
    deleteConfirm = (staff)=>{
        console.log("in deleteConfirm");
    }

    getMyColumns(){
        if(this.state.showAdmin===true){    // 管理员模式多一列操作
            this.setState({
                my_columns: columns2,
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
            showAdmin: true,
            show_admin: 'none',
            show_back: "block",
        },function(){                   //立马可以获取新的state值
            this.getMyColumns();        //重新获取列名
        });
    }
    onBack = ()=>{
        this.setState({
            showAdmin: false,           //隐藏只有管理员可见的列
            show_admin: 'block',
            show_back: "none",          //隐藏"返回"
        },function(){
            this.getMyColumns();
        });
    }
    render(){
        return (
            <Layout>
                <Header>
                    <div style={{lineHeight:'64px', fontSize:"20px", color:"white",textAlign:"center"}}> 
                        股票管理系统 by 金元明
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
                            columns={this.state.my_columns}
                            // dataSource={data} 
                            rowKey={item=>item.id}  
                            pagination={{ pageSize: 20 }} 
                            scroll={{ y: 340 }} />

                        <InfoDialog
                            visible={this.state.showInfoDialog}
                            // staff={this.state.editingItem}
                            afterClose={()=>{
                                this.setState({showInfoDialog:false});
                            }}
                            onDialogConfirm={this.handleInfoDialogClose} />

                        <div style={{position:"absolute", left:"10px", bottom:"10px", display:this.state.show_admin}}>
                            <a onClick={this.gotoAdmin}>管理员</a>
                        </div>
                        <div style={{position:"absolute", left:"70px", bottom:"10px", display:this.state.show_back}}>
                            <a onClick={this.onBack}>返回</a>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default HomePage3;