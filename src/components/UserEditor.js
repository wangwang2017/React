import React from 'react';
import request from '../utils/request';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';

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
               <FormItem label="用户名：" {...formLayout}>
                   {getFieldDecorator('name',{
                       rules:[
                           {
                               required:true,
                               message:'请输入用户名'
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

                <FormItem label="年龄：" {...formLayout}>
                    {getFieldDecorator('age',{
                        rules:[
                            {
                                required:true,
                                message:'请输入年龄',
                                type:'number'
                            },
                            {
                                min:1,
                                max:100,
                                message:'请输入1~100的年龄',
                                type:'number'
                            }
                        ]
                    })(
                        <InputNumber/>
                    )}
               </FormItem>
                <FormItem label="性别：" {...formLayout}>
                    {getFieldDecorator('gender',{
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