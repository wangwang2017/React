import React from 'react';
import {message,Table,Button, Popconfirm,Input } from 'antd';
import {del,get} from '../utils/request';

const Search = Input.Search;

class EquipList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            equipList:[],
            status:[]
        };
    }

    componentWillMount() {
        get('http://localhost:3000/equipments')
            .then(res =>{
                this.setState({
                    equipList:res
                });
            });
    }
    handleCheckStatus(equipment){
        //console.log(equipment.e_code);
        this.context.router.push('/heart/ecode/'+equipment.e_code);
    }

    handleCheckLogs(equipment){
        this.context.router.push('/logs/ecode/'+equipment.e_code);
    }

    handleEdit(equipment){
        this.context.router.push('/equipments/edit/'+equipment.id);
    }

    handleDel(equipment){
        del('http://localhost:3000/equipments/'+equipment.id)
            .then(res =>{
                this.setState({
                    equipList:this.state.equipList.filter(item =>item.id !==equipment.id)
                });
                message.success('删除设备成功')
            })
            .catch(err =>{
                console.error(err);
                message.error('删除设备失败');
            });
    }

    handleSearch(value){
        get('http://localhost:3000/equipmets?q='+ value)
            .then(res => {
                this.setState({
                    equipList:res
                });
                message.success('查找 ' + value + ' 成功');
            })
            .catch(err => {
                console.error(err);
                message.error('查找失败');
            });
    }

    render(){
        const {equipList} = this.state;
        const columns = [
            {
                title:'设备ID',
                dataIndex:'id',
                width:100,
                fixed: 'left'
            },
            {
                title:'设备编号',
                dataIndex:'e_code',
                width:100,
                fixed: 'left'
            },
            {
                title:'设备名称',
                dataIndex:'e_name'
            },
            {
                title:'所在馆号',
                dataIndex:'e_lib'
            },
            {
                title:'设备地址',
                dataIndex:'e_address'
            },
            {
                title:'设备信息',
                dataIndex:'e_info'
            },
            {
                title:'花生棒SN码',
                dataIndex:'e_sn'
            },
            {
                title:'花生棒密码',
                dataIndex:'e_pwd'
            },
            {
                title:'外网通道',
                dataIndex:'e_link'
            },
            {
                title:'设备种类',
                dataIndex:'e_kind'
            },
            {
                title:'所在区域',
                dataIndex:'e_area'
            },
            {
                title:'设备状态',
                fixed: 'right',
                width: 100,
                render:(text,record) =>(
                    <Button type="primary" size="small" icon="search" onClick={()=>this.handleCheckStatus(record)} >查询</Button>
                )
            },
            {
                title:'设备日志',
                fixed: 'right',
                width: 100,
                render:(text,record) =>(
                    <Button type="primary" size="small" icon="search" onClick={()=>this.handleCheckLogs(record)} >查询</Button>
                )
            },
            {
                title:'操作',
                fixed: 'right',
                width: 120,
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
            <div>
                <Search
                    placeholder="设备编号|设备名称|设备地址|设备信息|花生棒SN码|外网通道|设备种类|所在区域"
                    enterButton="true" size="large"
                    onSearch={value => this.handleSearch(value)}
                    style={{ width: '50%' }}
                />
                <br/>
                <Table dataSource={equipList} columns={columns} rowKey={row =>row.id} scroll={{ x: '130%' }}/>
            </div>
        );
    }
}

EquipList.contextTypes ={
    router:React.PropTypes.object.isRequired
};

export default EquipList;