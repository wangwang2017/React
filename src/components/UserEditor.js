import React from 'react';
import request from '../utils/request';
import { Form, Input, Select, Button, message } from 'antd';

const FormItem = Form.Item;

const formLayout = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
};

class UserEditor extends React.Component{
    //在componentWillMount里使用form.setFieldsValue无法设置表单的值
    //所以在componentDidMount里进行复制
    //see: https://github.com/ant-design/ant-design/issues/4802
    componentDidMount() {
        const {editTarget,form} = this.props;
        if(editTarget){
            form.setFieldsValue(editTarget);
        }
    }

    handleSubmit(e){
        //阻止表单submit时间自动跳转页面的action
        e.preventDefault();
        const {form,editTarget} = this.props;
        form.validateFields((err,values)=>{
            if(!err) {
                let editType = '添加';
                let apiUrl = 'http://localhost:3000/user';
                let method = 'post';
                if (editTarget) {
                    editType = '编辑';
                    apiUrl += '/' + editTarget.id;
                    method = 'put';
                }
                request(method, apiUrl, values)
                    .then((res) => {
                        //当添加成功时，返回的json对象中包含一个有效的id字段
                        //所以可以使用res.id来判断添加是否成功
                        if (res.id) {
                            message.success(editType + '用户成功');
                            this.context.router.push('/user/list');
                        } else {
                            message.error(editType + '失败')
                        }
                    })
                    .catch((err) => console.error(err))
            }else{
                message.warn(err)
            }
        });
    }

    render(){
        const{ form } = this.props;
        const {getFieldDecorator} = form;
        return(
            <div style={{width: '400px'}}>
            <Form onSubmit={(e) =>this.handleSubmit(e)}>
               <FormItem label="姓名：" {...formLayout}>
                   {getFieldDecorator('user_name',{
                       rules:[
                           {
                               required:true,
                               message:'请输入姓名'
                           },
                           {
                               pattern:/^.{1,4}$/,
                               message:'用户名最多4个字符'
                           }
                       ]
                   })(
                       <Input type="text"/>
                   )}
               </FormItem>
                <FormItem label="性别：" {...formLayout}>
                    {getFieldDecorator('user_gender',{
                        rules:[
                            {
                                required:true,
                                message:'请选择性别'
                            }
                        ]
                    })(
                        <Select placeholder="请选择">
                            <Select.Option value="male">男</Select.Option>
                            <Select.Option value="female">女</Select.Option>
                        </Select>
                    )}
               </FormItem>
                <FormItem label="账号：" {...formLayout}>
                    {getFieldDecorator('user_account',{
                        rules:[
                            {
                                required:true,
                                message:'请输入账号'
                            },
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem label="密码：" {...formLayout}>
                    {getFieldDecorator('user_password',{
                        rules:[
                            {
                                required:true,
                                message:'请输入密码',
                                type: 'string'
                            },
                        ]
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem label="邮箱：" {...formLayout}>
                    {getFieldDecorator('user_email',{
                        rules:[
                            {
                                required:true,
                                message:'请输入邮箱',
                            },
                            {
                                pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                message:'请输入正确的电子邮箱'

                            }
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem label="电话：" {...formLayout}>
                    {getFieldDecorator('user_phone',{
                        rules:[
                            {
                                required:true,
                                message:'请输入手机号码',
                            },
                            {
                                pattern:/^1(3|4|5|7|8)\d{9}$/,
                                message:'请输入正确的手机号码'

                            }
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem label="权限：" {...formLayout}>
                    {getFieldDecorator('user_role',{
                        rules:[
                            {
                                required:true,
                                message:'请选择权限',
                            }
                        ]
                    })(
                        <Select placeholder="请选择">
                            <Select.Option value="0">超级管理员</Select.Option>
                            <Select.Option value="1">财务管理员</Select.Option>
                            <Select.Option value="2">区域管理员</Select.Option>
                            <Select.Option value="3">区域维护员</Select.Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="区域：" {...formLayout}>
                    {getFieldDecorator('user_area',{
                        rules:[
                            {
                                required:true,
                                message:'请输入区域号',
                            },
                        ]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <br/>
                <br/>
                <FormItem wrapperCol ={{...formLayout.wrapperCol,offset:formLayout.labelCol.span}}>
                    <Button type="primary"  htmlType="Submit" >提交</Button>
                </FormItem>
            </Form>
            </div>
        );
    }
}

UserEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
};

UserEditor = Form.create()(UserEditor);

export default UserEditor;