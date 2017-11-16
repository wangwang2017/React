import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import style from '../styles/home-layout.less';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class HomeLayout extends React.Component{
    render(){
        const{children} = this.props;
        return(
            <div>
                <header className={style.header}>
                    <Link to="/">ReactManager</Link>
                </header>
                <main className={style.main}>
                    <div className={style.menu}>
                        <Menu mode="inline" theme="dark" style={{width:'240px'}}>
                            <SubMenu key="user" title={<span><Icon type="user"/><span>用户管理</span></span>}>
                                <MenuItem key="user-list">
                                    <Link to="/user/list">用户列表</Link>
                                </MenuItem>
                                <MenuItem key="user-add">
                                    <Link to="/user/add">添加用户</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="lib" title={<span><Icon type="appstore"/><span>区域管理</span></span>}>
                                <MenuItem key="lib-list">
                                    <Link to="/lib/list">图书馆列表</Link>
                                </MenuItem>
                                <MenuItem key="lib-add">
                                    <Link to="/lib/add">添加图书馆</Link>
                                </MenuItem>
                            </SubMenu>
                            <SubMenu key="equipment" title={<span><Icon type="appstore"/><span>设备管理</span></span>}>
                                <MenuItem key="equipment-list">
                                    <Link to="/equipments/list">设备列表</Link>
                                </MenuItem>
                                <MenuItem key="equipment-add">
                                    <Link to="/equipments/add">添加设备</Link>
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    </div>

                    <div className={style.content}>
                        {children}
                    </div>
                </main>
            </div>
        );
    }
}
export default HomeLayout;