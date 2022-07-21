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

class SingleDialog5 extends React.Component {
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
                var jv = JSON.parse(values['info'])

                console.log("填写正确！");
                if ('id' in this.state.stock){
                    jv['id'] = this.state.stock.id
                    console.log('判断为修改数据')
                }
                else{
                    console.log('判断为新增数据')
                }
                console.log(jv);

                HttpUtil.post(ApiUtil.API_STOCK_UPDATE, jv)  // 将values发送给后端
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
            title="添加"
            okText="保存"
            style={{top:20}}
            width={1000}
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
                        <Form.Item label="info"
                            name="info"
                            rules={[
                            {
                                required: true,
                                message: '请输入',
                            },
                            ]}
                        >
                            <Input
                            style={{
                                width: 640,
                            }}
                            placeholder="请输入"
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
                
    );}
}


// 数据进行传递
// InfoDialog = Form.create()(InfoDialog);

export default SingleDialog5;