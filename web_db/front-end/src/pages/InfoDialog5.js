import { Modal, Form, Row, Input, Col, Select, Button, message, Space } from 'antd';
import React from 'react';
import ApiUtil from '../utils/ApiUtil';
import HttpUtil from '../utils/HttpUtil';

const { Option } = Select;

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
}

class InfoDialog5 extends React.Component {
    state = {
        visible: false,
        stock: {},
        // can_shop_guide: true,  //是否可以选择“导购员”
    }
    formRef = React.createRef(); 
    componentWillReceiveProps(newProps) {
        //可以把父组件值传递进来
        if (this.state.visible !== newProps.visible) {
          this.setState({
            visible: newProps.visible       // 父组件的visible控制子组件的visible
          });
        }
        this.setState({
            stock: newProps.stock
        })
    }
    handleOK = ()=>{
        this.formRef.current.validateFields()
            .then(values=>{
                console.log("填写正确！");
                if ('id' in this.state.stock){
                    values['id'] = this.state.stock.id
                    console.log('判断为修改数据')
                }
                else{
                    console.log('判断为新增数据')
                }
                console.log(values);

                HttpUtil.post(ApiUtil.API_STOCK_UPDATE, values)  // 将values发送给后端
                    .then(
                        re=>{
                            console.log("返回结果：",re);         // 接收后端返回过来的结果
                            message.info(re.message);
                        }
                    )
                    .catch(error=>{
                        message.error(error.message);
                    });

                this.setState({
                    visible: false,
                });

                sleep(100)                                  // 防cursor冲突
                this.props.onDialogConfirm(values);         // 调用父组件，点击保存后可以把新增数据显示出来
            })
            .catch(info=>{
                message.error('表单数据有误，请根据提示填写！');
                console.log('Validate Failed:', info);
            });
    }
    handleCancel = ()=>{
        console.log("Cancel");
        this.setState({
            visible: false,
        });
    }
    render(){
        const {visible } = this.state;
        const onFinish = (values) => {
            console.log(values);
        };
        // const {
        //     getFieldDecorator
        // } = this.props.form;

        return(
            <Modal                              // 模态对话框组件
            title="添加股票"
            okText="保存"
            style={{top:20}}
            width={500}
            afterClose={this.props.afterClose}
            onCancel={this.handleCancel}
            cancelText="取消"
            visible={visible}
            onOk={this.handleOK}
            >
                <div>
                    <Form layout="horizontal" 
                    //onFinish={onFinish}
                    ref={this.formRef}
                    name="InfoDialogBasicForm"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{
                      remember: true,
                    }}>
                        <Form.Item label="代码"
                            name="code"
                            rules={[
                            {
                                required: true,
                                message: '请输入股票代码',
                            },
                            ]}
                        >
                            <Input
                            style={{
                                width: 160,
                            }}
                            placeholder="请输入"
                            />
                        </Form.Item>
                        <Form.Item label="名称"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: '请输入股票名称',
                            },
                            ]}
                        >
                            <Input
                            style={{
                                width: 160,
                            }}
                            placeholder="请输入"
                            />
                        </Form.Item>
                        <Form.Item label="买卖"
                            name="trade"
                            rules={[
                            {
                                required: true,
                                message: '请选择',
                            },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 160,
                                }}
                                //onChange={handleChange}
                                >
                                <Option value="buy">买入</Option>
                                <Option value="sell">卖出</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="价格"
                            name="price"
                            rules={[
                            {
                                required: true,
                                message: '请输入股票价格',
                            },
                            ]}
                        >
                            <Input
                            style={{
                                width: 160,
                            }}
                            placeholder="请输入"
                            />
                        </Form.Item>
                        <Form.Item label="数量"
                            name="amount"
                            rules={[
                            {
                                required: true,
                                message: '请输入股票数量',
                            },
                            ]}
                        >
                            <Input
                            style={{
                                width: 160,
                            }}
                            placeholder="请输入"
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
                
    );}
}

const styles = {
    formItemLayout:{
        labelCol: {span: 4},
        wrapperCol: {span: 15},
    },
    formItem2Col:{
        labelCol: {span: 4},
        wrapperCol: {span: 8},
    },
    my_name:{
        labelCol: {span:4},
        wrapperCol: {span:15},
    },
    my_card:{
        labelCol: {span: 4},
        wrapperCol: {span: 16},
    },
};

// 数据进行传递
// InfoDialog = Form.create()(InfoDialog);

export default InfoDialog5;