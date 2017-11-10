import React from 'react';
import { message, Table, Button, Popconfirm } from 'antd';
import {del,get} from '../utils/request';

class LibList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            libList:[]
        };
    }

    componentWillMount() {
        get('http://localhost:3000/lib')
            .then(res =>{
                this.setState({
                    libList:res
                });
            });
    }

    handleEdit(lib){
        this.context.router.push('/lib/edit/'+lib.id);
    }

    handleDel(lib){
        del('http://localhost:3000/lib/' +lib.id)
            .then(res =>{
                this.setState({
                    libList:this.state.libList.filter(item =>item.id !==lib.id)//过滤不符合条件的返回一个新数组
                });
                message.success('删除图书馆成功');
            })
            .catch(err =>{
                console.error(err);
                message.error('删除图书馆失败');
            });
    }

    render(){
        const {libList} = this.state;
        const columns =[
            {
                title:'图书馆ID',
                dataIndex:'id'
            },
            {
                title:'图书馆名字',
                dataIndex:'lib_name'
            },
            {
                title:'图书馆负责人',
                dataIndex:'lib_duty'
            },
            {
                title:'馆电话',
                dataIndex:'lib_phone'
            },
            {
                title:'馆邮箱',
                dataIndex:'lib_email'
            },
            {
                title:'馆地址',
                dataIndex:'lib_address'
            },
            {
                title:'馆编号',
                dataIndex:'lib_code'
            },
            {
                title:'馆所在区',
                dataIndex:'lib_area'
            },
            {
                title:'馆收支',
                dataIndex:'lib_income'
            },
            {
                title:'操作',
                render:(text,record) =>(
                    <Button.Group type="ghost">
                        <Button size="small" onClick={()=>this.handleEdit(record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                            <Button size="small" >删除</Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ];
        return(
                <Table  columns={columns} dataSource={libList} rowKey={row =>row.id}/>
        );
    }
}

LibList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default LibList;