import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import React from 'react';
import ApiUtil from '../utils/ApiUtil';
import HttpUtil from '../utils/HttpUtil';

class PathDialog extends React.Component{
    state = {
        visible: false,
    }
    formRef = React.createRef(); 
    componentWillReceiveProps(newProps) {
        //可以把父组件值传递进来
        if (this.state.visible !== newProps.visible) {
          this.setState({
            visible: newProps.visible       // 父组件的visible控制子组件的visible
          });
        }
    }
    handleOK = ()=>{
        this.formRef.current.validateFields()
            .then(values=>{
                console.log('输入路径: ', values)

                HttpUtil.post(ApiUtil.API_PATH, values)  // 将values发送给后端
                    .then(
                        re=>{
                            console.log("返回结果：",re);         // 接收后端返回过来的结果
                            // message.info(re.message);
                            if (re.message){
                                message.info('切换路径成功')
                                this.setState({
                                    visible: false,
                                });
                                this.props.onDialogConfirm();
                            }
                            else{
                                message.info('路径有误，请重新输入')
                            }
                        }
                    )
                    .catch(error=>{
                        message.error(error.message);
                    });
            })
            .catch(info=>{
                message.error('表单数据有误，请重新填写！');
                console.log('Validate Failed:', info);
            });
    }
    handleCancel = ()=>{
        console.log("取消输入路径");
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
            title="输入数据库路径"
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
                    name="PathDialogBasicForm"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{
                      remember: true,
                    }}>
                        <Form.Item
                            name="db_path"
                            rules={[
                            {
                                required: true,
                                message: '请输入路径',
                            },
                            ]}
                        >
                            <Input placeholder="路径" />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
                
    );}
}

export default PathDialog;
