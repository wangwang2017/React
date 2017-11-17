import React from 'react';
import {Input,InputNumber,Form,Button,message} from 'antd';
import request from '../utils/request';
const FormItem = Form.Item;
const formLayout ={
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
};

class AreaEditor extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {editTarget,form} = this.props;
        if(editTarget){
            form.setFieldsValue(editTarget);
        }
    }

    handleSubmit(e){
        e.preventDefault();

        const {form,editTarget} = this.props;

        form.validateFields((err,values) =>{
            if (err){
                message.warn(err);
                return;
            }
            let editType = '添加';
            let apiUrl = 'http://localhost:3000/area';
            let method ='post';
            if (editTarget){
                editType ='编辑';
                apiUrl ='/'+editTarget.id;
                method = 'put';
            }
            request(method,apiUrl,values)
                .then((res)=>{
                    if (res.id){
                        message.success(editType+'区域成功');
                        this.context.router.push('/area/list');
                    }else{
                        message.error(editType+'失败');
                    }
                })
                .catch((err) =>console.error(err));
        })
    }

    render(){
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return(
            <Form onSubmit={this.handleSubmit} style={{width:'400px'}}>
                <FormItem label="区域名称："{...formLayout}>
                    {getFieldDecorator('a_name',{
                        rules:[
                            {
                                required:true,
                                message:'请输入区域名'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="管理人员："{...formLayout}>
                    {getFieldDecorator('a_user',{
                        rules:[
                            {
                                required:true,
                                message:'请输入管理人员名称'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="维护人员："{...formLayout}>
                    {getFieldDecorator('a_maintain',{
                        rules:[
                            {
                                required:true,
                                message:'请输入维护人员名称'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="图书馆："{...formLayout}>
                    {getFieldDecorator('a_libs',{
                        rules:[
                            {
                                required:true,
                                message:'请输入图书馆馆编号'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

AreaEditor.contextTypes = {
    router:React.PropTypes.object.isRequired
};

AreaEditor = Form.create()(AreaEditor);

export default  AreaEditor;