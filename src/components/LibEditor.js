import React from 'react';
import { Input, InputNumber, Form, Button, message } from 'antd';
import AutoComplete from '../components/AutoComplete';
import request from '../utils/request';

const Option = AutoComplete.Option;
const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
};

class LibEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            recommendUsers: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
//        this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
    }

    componentDidMount () {
        // 在componentWillMount里使用form.setFieldsValue无法设置表单的值
        // 所以在componentDidMount里进行赋值
        // see: https://github.com/ant-design/ant-design/issues/4802
        const {editTarget, form} = this.props;
        if (editTarget) {
            form.setFieldsValue(editTarget);
        }
    }

    handleSubmit (e) {
        e.preventDefault();

        const {form, editTarget} = this.props;

        form.validateFields((err, values) => {
            if (err) {
                message.warn(err);
                return;
            }

            let editType = '添加';
            let apiUrl = 'http://localhost:3000/lib';
            let method = 'post';
            if (editTarget) {
                editType = '编辑';
                apiUrl += '/' + editTarget.id;
                method = 'put';
            }

            request(method, apiUrl, values)
                .then((res) => {
                    if (res.id) {
                        message.success(editType + '图书馆成功');
                        this.context.router.push('/lib/list');
                    } else {
                        message.error(editType + '失败');
                    }
                })
                .catch((err) => console.error(err));
        });
    }

    // getRecommendUsers (partialUserId) {
    //     get('http://localhost:3000/user?id_like=' + partialUserId)
    //         .then((res) => {
    //             if (res.length === 1 && res[0].id === partialUserId) {
    //                 return;
    //             }
    //
    //             this.setState({
    //                 recommendUsers: res.map((user) => {
    //                     return {
    //                         text: `${user.id}（${user.name}）`,
    //                         value: user.id
    //                     };
    //                 })
    //             });
    //         });
    // }
    //
    // timer = 0;
    //
    // handleOwnerIdChange (value) {
    //     this.setState({recommendUsers: []});
    //
    //     if (this.timer) {
    //         clearTimeout(this.timer);
    //     }
    //
    //     if (value) {
    //         this.timer = setTimeout(() => {
    //             this.getRecommendUsers(value);
    //             this.timer = 0;
    //         }, 200);
    //     }
    // }

    render () {
        //const {recommendUsers} = this.state;
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Form onSubmit={this.handleSubmit} style={{width: '400px'}}>
                <FormItem label="馆名字：" {...formLayout}>
                    {getFieldDecorator('lib_name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入图书馆名字'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>

                <FormItem label="馆负责人：" {...formLayout}>
                    {getFieldDecorator('lib_duty', {
                        rules: [
                            {
                                required: true,
                                message: '请输入馆负责人名字',
                            },
                            {
                                pattern:/^.{1,4}$/,
                                message:'用户名最多4个字符'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>

                <FormItem label="馆电话：" {...formLayout}>
                    {getFieldDecorator('lib_phone', {
                        rules: [
                            {
                                required: true,
                                message: '请输入图书馆负责人的电话'
                            },
                            {
                                pattern:/^1(3|4|5|7|8)\d{9}$/,
                                message: '请输入正确的电话号码',
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="馆邮箱：" {...formLayout}>
                    {getFieldDecorator('lib_email', {
                        rules: [
                            {
                                required: true,
                                message: '请输入馆负责人邮箱',
                            },
                            {
                                pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                message: '请输入正确的邮箱'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="馆地址：" {...formLayout}>
                    {getFieldDecorator('lib_address', {
                        rules: [
                            {
                                required: true,
                                message: '请输入图书馆的地址'
                            },
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="馆编号：" {...formLayout}>
                    {getFieldDecorator('lib_code', {
                        rules: [
                            {
                                required: true,
                                message: '请输入图书馆的编号'
                            },
                        ]
                    })(<Input type="text"/>)}
                </FormItem>
                <FormItem label="馆所在区：" {...formLayout}>
                    {getFieldDecorator('lib_area', {
                        rules: [
                            {
                                required: true,
                                message: '请输入图书馆的所在区域',
                                type:'number'
                            },
                            {
                                pattern: /^\d*$/,
                                message:'请输入正确的ID'
                            }
                        ]
                    })(<InputNumber disabled="false"/>)}
                </FormItem>
                <FormItem label="馆收支：" {...formLayout}>
                    {getFieldDecorator('lib_income', {
                        rules: [
                            {

                                required: true,
                                message: '请输入图书馆的收支情况',
                                type:'number'
                            }

                        ]
                    })(<InputNumber disabled="false"/>)}
                </FormItem>
                <FormItem wrapperCol={{span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span}}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

LibEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
};

LibEditor = Form.create()(LibEditor);

export default LibEditor;
