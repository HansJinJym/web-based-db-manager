// import React from 'react';
// import {Layout, Table } from 'antd';
 
// const { Header, Content, Icon } = Layout;

// class HomePage1 extends React.Component{
//     componentDidMount() {
//         console.log('11112222')
//     }

//     render(){
//         return('in return')
//     }
// }

// export default HomePage1;

import React from 'react';
import {Layout, Table } from 'antd';
 
const { Header, Content } = Layout;
 
var columns = [
    {
      title: '代码',
      dataIndex: 'code',
      width:"80px",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width:"80px",
    },
    {
      title: '成本价',
      dataIndex: 'cost_price',
      width:"100px",
    },
    {
        title: '现价',
        dataIndex: 'current_price',
        width:"80px",
    },
];
 
var tmp = {code:'600030', name:'中信证券', cost_price:'20.00', current_price:'21.34'};
var data1 = [];
for(var i = 0; i < 30; i++){
    data1.push(tmp);
}
var data2 = [
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
 
class HomePage1 extends React.Component{
    render(){
        return (
            <Layout>
                <Header>
                    <div style={{lineHeight:'64px', fontSize:"20px", color:"white",textAlign:"center"}}> 
                        股票管理系统
                    </div>
                </Header>
 
                <Content > {/* style={{"border":"solid red"}} */}
                    <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                        <Table 
                            columns={columns} 
                            dataSource={data2} 
                            rowKey={item=>item.id}  //现阶段，写不写效果一样
                            pagination={{ pageSize: 20 }} 
                            scroll={{ y: 340 }} />
                    </div>
                </Content>
            </Layout>
        );
    }
}
 
export default HomePage1;

