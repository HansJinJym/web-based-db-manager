import { Modal, Form, Row, Input, Col, Select, Button, message, Space } from 'antd';
import React from 'react';

class InfoDialog extends React.Component {
    state = {
        visible: false,
        // staff: {},
        // can_shop_guide: true,  //是否可以选择“导购员”
    }
    componentWillReceiveProps(newProps) {
        //可以把父组件值传递进来
        if (this.state.visible !== newProps.visible) {
          this.setState({
            visible: newProps.visible       // 父组件的visible控制子组件的visible
          });
        }
    }
    handleOK = ()=>{
        console.log("OK");
        this.setState({
            visible: false,
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
                    <Form layout="horizontal" onSubmit={this.handleSubmit}
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
                        <Form.Item label="成本价"
                            name="cost_price"
                            rules={[
                            {
                                required: true,
                                message: '请输入股票成本价',
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
                        <Form.Item label="现价"
                            name="current_price"
                            rules={[
                            {
                                required: true,
                                message: '请输入股票现价',
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

export default InfoDialog;