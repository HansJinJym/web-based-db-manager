import React from 'react';
import {Layout, Table } from 'antd';
 
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
const data = [
    {code:'600030', name:'中信证券', cost_price:'20.00', current_price:'21.34'},
    {code:'002594', name:'比亚迪', cost_price:'296.00', current_price:'329.20'},
    {code:'002709', name:'天赐材料', cost_price:'63.10', current_price:'62.78'},
    {code:'601012', name:'隆基绿能', cost_price:'60.44', current_price:'64.89'},
    {code:'603259', name:'药明康德', cost_price:'102.24', current_price:'102.80'},
    {code:'300347', name:'泰格医药', cost_price:'115.30', current_price:'115.30'},
    {code:'603486', name:'科沃斯', cost_price:'124.45', current_price:'124.45'},
    {code:'603229', name:'奥翔药业', cost_price:'39.02', current_price:'39.02'},
    {code:'002129', name:'TCL中环', cost_price:'59.17', current_price:'59.17'}
]
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
const columns2 = columns.slice(0)   // 添加一列，即管理员页面
 
class HomePage2 extends React.Component{
    //columns2 = []; //定义
    state = {
        my_columns:[],     //列名
        showAdmin: false,  //是否为管理员，即是否增加一列
        show_admin: 'block',
        show_back: "none", //是否显示“back”
    }
    
 
    componentDidMount() {
        console.log("in componentDidMount")     // todo：会调用两次，暂未找到原因
        this.getMyColumns();                    //获取列名
    }
 
    showUpdateDialog(item){
        console.log("in showUpdateDialog");
    }
    deleteConfirm = (staff)=>{
        console.log("in deleteConfirm");
    }
 
    getMyColumns(){
        if(this.state.showAdmin===true){    // 管理员模式
            this.setState({                 // 构造体外只能用setState方法
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
        this.setState({
            showAdmin: true,
            show_admin: 'none',
            show_back: "block",
        },function(){ //立马可以获取新的state值
            this.getMyColumns(); //重新获取列名
        });
    }
    onBack = ()=>{
        this.setState({
            showAdmin: false, //隐藏只有管理员可见的列
            show_admin: 'block',
            show_back: "none", //隐藏"返回"
        },function(){
            this.getMyColumns();
        });
    }
    render(){
        return (
            <Layout>
                <Header>
                    <div style={{lineHeight:'64px', fontSize:"20px", color:"white",textAlign:"center"}}> 
                        股票管理系统
                    </div>
                </Header>
 
                <Content >
                    <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                        <Table 
                            columns={this.state.my_columns}
                            // dataSource={data} 
                            rowKey={item=>item.id}  
                            pagination={{ pageSize: 20 }} 
                            scroll={{ y: 340 }} />
 
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
 
export default HomePage2;

