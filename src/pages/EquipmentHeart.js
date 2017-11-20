import React from 'react';
import {get} from '../utils/request';
import {Table} from 'antd';

export default class EquipmentHeart extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            heart:null
        };
    }

    componentWillMount() {
        const ecode = this.context.router.params.id;
        get('http://localhost:3000/heart?ecode='+ecode)
            .then(res =>{
                this.setState({
                    heart:res
                });
            });
    }

    render(){
        const {heart} = this.state;
        const columns = [
            {
                title:'心跳ID',
                dataIndex:'id',
                width:100
            },
            {
                title:'设备编号',
                dataIndex:'ecode',
                width:100
            },
            {
                title:'设备状态',
                dataIndex:'status',
                width:100,
            },
            {
                title:'发送时间',
                dataIndex:'timestamp',
                width:200
            }
        ];
        return(
            <Table  dataSource={heart} columns={columns} rowKey={row =>row.id} />
        );
    }
}

EquipmentHeart.contextTypes ={
    router:React.PropTypes.object.isRequired
};