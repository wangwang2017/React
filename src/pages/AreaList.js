import React from 'react';
import {message,Table,Button,Popconfirm} from 'antd';
import {del,get} from '../utils/request';

export default class AreaList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            areaList:[],
        };
    }

    componentWillMount() {
        get('http://localhost:3000/area')
            .then(res=>{
                this.setState({
                    areaList:res
                });
            });
    }

    handleEdit(area){
        this.context.router.push('/area/edit/'+area.id);
    }

    getUserName(area){
        console.log(area.a_user);
        get('http://localhost:3000/user?user_area='+area.a_user)
            .then(res => {

            });

    }

    handleDel(area){
        del('http://localhost:3000/area/'+area.id)
            .then(res =>{
                this.setState({
                    areaList:this.state.areaList.filter(item=>item.id !==area.id)
                });
                message.success('删除区域成功')
            })
            .catch(err=>{
                console.error(err);
                message.error('删除区域失败');
            });
    }

    render(){
        const {areaList} = this.state;
        const columns =[

            {
                title:'区域ID',
                dataIndex:'id'
            },
            {
                title:'区域名称',
                dataIndex:'a_name'
            },
            {
                title:'管理人员',
                dataIndex:'a_user'
            },
            {
                title:'维护人员',
                dataIndex:'a_maintain'
            },
            {
                title:'图书馆',
                dataIndex:'a_lib'
            },
            {
             title:'操作',
             render:(text,record) =>(
                 <Button.Group type="ghost">
                     <Button size="small" onClick={()=>this.handleEdit(record)}>编辑</Button>
                     <Button size="small" onClick={()=>this.getUserName(record)}>查看</Button>
                     <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                         <Button size="small" >删除</Button>
                     </Popconfirm>
                 </Button.Group>
                )
            }
        ];
        return(
            <Table  columns={columns} dataSource={areaList} rowKey={row =>row.id}/>
        );
    }
}

AreaList.contextTypes ={
  router:React.PropTypes.object.isRequired
};