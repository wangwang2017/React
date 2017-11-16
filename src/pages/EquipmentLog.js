import React from 'react';
import {get} from '../utils/request';
import {Table} from 'antd';

export default class EquipmentLog extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            logs:null
        };
    }

    componentWillMount() {
        const ecode = this.context.router.params.id;
        get('http://localhost:3000/logs?ecode='+ecode)
            .then(res =>{
                this.setState({
                    logs:res
                });
            });
    }

    render() {
        const {logs} = this.state;
        const columns = [
            {
                title: '日志ID',
                dataIndex: 'id'
            },
            {
                title: '设备编号',
                dataIndex: 'ecode'
            },
            {
                title: '信息类别',
                dataIndex: 'info_kind'
            },
            {
                title: '时间',
                dataIndex: 'timestamp'
            },
            {
                title: '日志信息',
                dataIndex: 'info_content'
            }
        ];
        return(
            <Table dataSource={logs} columns={columns} rowKey={row =>row.id}/>
        );
    }
}

EquipmentLog.contextTypes = {
    router:React.PropTypes.object.isRequired
};