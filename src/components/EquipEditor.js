import React from 'react';
import {Input,Select,Form,Button,message} from 'antd';
import request,{get} from '../utils/request';
const FormItem = Form.Item;
const formLayout= {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
};
const Option = Select.Option;

class EquipEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options:[],
            areas:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKindsChange = this.handleKindsChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
    }


    componentDidMount() {
        const {editTarget,form} = this.props;
        if(editTarget){
            form.setFieldsValue(editTarget);
        }
    }




    getEquimentKinds(){
        get('http://localhost:3000/equipment_kind')
            .then((res) => {
                this.setState({
                    options:res.map((equipment_kinds) =>{
                        return(
                            <Option key={equipment_kinds.ek_name}>{equipment_kinds.ek_name}({equipment_kinds.ek_code})</Option>
                        );
                    })
                });
            });
    }


    getAreaContent(){
        get('http://localhost:3000/area')
            .then((res) => {
                this.setState({
                    areas:res.map((area) =>{
                        return(
                            <Option key={area.a_name}>{area.a_name}</Option>
                        );

                    })
                });
            });
    }

    handleKindsChange(){
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() =>{
            this.getEquimentKinds();
            this.timer = 0;
        },300);
    }

    handleAreaChange(){
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() =>{
            this.getAreaContent();
            this.timer = 0;
        },300);
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
            let apiUrl = 'http://localhost:3000/equipments';
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
        const {options,areas} = this.state;
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
                <FormItem label="花生棒SN码："{...formLayout}>
                    {getFieldDecorator('e_sn',{
                        rules:[
                            {
                                required:true,
                                message:'请输入对应设备的花生棒SN码',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="花生棒密码："{...formLayout}>
                    {getFieldDecorator('e_pwd',{
                        rules:[
                            {
                                required:true,
                                message:'请输入对应设备的花生棒密码',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="外网通道："{...formLayout}>
                    {getFieldDecorator('e_link',{
                        rules:[
                            {
                                required:true,
                                message:'请输入外网通道',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="设备种类："{...formLayout}>
                    {getFieldDecorator('e_kind',{
                        initialValue: '查询办证机' || [],
                        rules:[
                            {
                                required:true,
                                message:'请选择设备种类',
                            }
                        ]
                    })(
                        <Select
                            onChange={this.handleKindsChange()}
                        >
                            {options}
                        </Select>
                    )}
                </FormItem>
                <FormItem label="所在区域："{...formLayout}>
                    {getFieldDecorator('e_area',{
                        rules:[
                            {
                                required:true,
                                message:'请选择设备所在区域',
                            }
                        ]
                    })(<Select
                        onChange={this.handleAreaChange()}
                    >
                        {areas}
                    </Select>)}
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