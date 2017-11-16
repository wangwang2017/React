import React from 'react';
import {Input,InputNumber,Form,Button,message} from 'antd';
import request from '../utils/request';
const FormItem = Form.Item;
const formLayout= {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
};

class EquipEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options:[]
        };
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
            if(err){
                message.warn(err);
                return;
            }
            let editType = '添加';
            let apiUrl = 'http://localhost:3000/equipments'
            let method = 'post';
            if(editTarget){
                editType = '编辑';
                apiUrl += '/'+editTarget.id;
                method = 'put';
            }
            
            request(method,apiUrl,values)
                .then((res) =>{
                    if(res.id){
                        message.success(editType+'设备成功');
                        this.context.router.push('/equipments/list');
                    }else{
                        message.error(editType +'失败');
                    }
                })
                .catch((err) => console.error(err));
        })
    }

    

    render(){
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return(
            <Form onSubmit={this.handleSubmit} style={{width:'400px'}}>
                <FormItem label="设备编号：" {...formLayout}>
                    {getFieldDecorator('e_code',{
                        rules:[
                            {
                                required:true,
                                message:'请输入设备编号'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="设备名称："{...formLayout}>
                    {getFieldDecorator('e_name',{
                        rules:[
                            {
                                required:true,
                                message:'请输入设备名称',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="所在馆号："{...formLayout}>
                    {getFieldDecorator('e_lib',{
                        rules:[
                            {
                                required:true,
                                message:'请输入设备所在馆编号',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="设备地址："{...formLayout}>
                    {getFieldDecorator('e_address',{
                        rules:[
                            {
                                required:true,
                                message:'请输入设备所在地址',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="设备信息："{...formLayout}>
                    {getFieldDecorator('e_info',{
                        rules:[
                            {
                                required:true,
                                message:'请输入设备信息',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="设备种类："{...formLayout}>
                    {getFieldDecorator('e_kind',{
                        rules:[
                            {
                                required:true,
                                message:'请输入设备信息',
                                type:'number'
                            },
                            {
                                min: 1,
                                max: 5,
                                message: '请输入1~5的设备种类编号',
                                type: 'number'
                            }
                        ]
                    })(<InputNumber/>)}
                </FormItem>
                <FormItem label="所在区域："{...formLayout}>
                    {getFieldDecorator('e_area',{
                        rules:[
                            {
                                required:true,
                                message:'请输入设备所在区域',
                                type:'number'
                            },
                            {
                                min: 1,
                                max: 3,
                                message: '请输入1~3的设备所在区域',
                                type: 'number'
                            }
                        ]
                    })(<InputNumber/>)}
                </FormItem>
                <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

EquipEditor.contextTypes = {
    router:React.PropTypes.object.isRequired
};

EquipEditor = Form.create()(EquipEditor);

export default EquipEditor;