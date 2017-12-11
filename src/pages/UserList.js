import React from 'react';
import { message, Table, Button, Popconfirm,Input } from 'antd';
import {del,get} from '../utils/request';

const Search = Input.Search;

class UserList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userList: []
        };
    }

    componentWillMount () {
        get('http://localhost:3000/user')
            .then(res => {
                this.setState({
                    userList: res
                });
            });
    }

    handleEdit (user) {
        this.context.router.push('/user/edit/' + user.id);
    }

    handleDel (user) {
        del('http://localhost:3000/user/' + user.id)
            .then(res => {
                this.setState({
                    userList: this.state.userList.filter(item => item.id !== user.id)
                });
                message.success('删除用户成功');
            })
            .catch(err => {
                console.error(err);
                message.error('删除用户失败');
            });

    }

    handleSearch(value){
        get('http://localhost:3000/user?q='+ value)
            .then(res => {
                this.setState({
                  userList:res
                });
                message.success('查找 ' + value + ' 成功');
            })
            .catch(err => {
                    console.error(err);
                    message.error('查找失败');
                });
    }

    render () {
        const {userList} = this.state;
        const columns =[
            {
                title:'用户名ID',
                dataIndex:'id'
            },
            {
                title:'姓名',
                dataIndex:'user_name'
            },
            {
                title:'性别',
                dataIndex:'user_gender'
            },
            {
                title:'账号',
                dataIndex:'user_account'
            },
            {
                title:'密码',
                dataIndex:'user_password'
            },
            {
                title:'邮箱',
                dataIndex:'user_email'
            },
            {
                title:'电话',
                dataIndex:'user_phone'
            },
            {
                title:'权限',
                dataIndex:'user_role'
            },
            {
                title:'区域',
                dataIndex:'user_area'
            },
            {
                title:'操作',
                render:(text,record) =>{
                    return(
                        <Button.Group type="ghost">
                            <Button size="small" onClick={() =>this.handleEdit(record)}>编辑</Button>
                            <Popconfirm title="确定要删除吗？" onConfirm={()=>this.handleDel(record)}>
                                <Button size="small">删除</Button>
                            </Popconfirm>
                        </Button.Group>
                    );
                }
            }
        ];

        return (
            <div>
                <Search
                    placeholder="姓名|区域|邮箱|电话|性别"
                    enterButton="true" size="large"
                    onSearch={value => this.handleSearch(value)}
                    style={{ width: '50%' }}
                />
                <br/>
                <Table dataSource={userList} columns={columns} rowKey={row=>row.id}>
                </Table>
            </div>
        );
    }
}

UserList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default UserList;