import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/Home';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import LibAddPage from './pages/LibAdd';
import LibListPage from './pages/LibList';
import LibEditPage from './pages/LibEdit';
import EquipAddPage from './pages/EquipAdd';
import EquipListPage from './pages/EquipList';
import EquipEditPage from './pages/EquipEdit';
import AreaAddPage from './pages/AreaAdd';
import AreaListPage from './pages/AreaList';
import AreaEditPage from './pages/AreaEdit';
import EquipmentHeartPage from './pages/EquipmentHeart';
import EquipmentLogPage from './pages/EquipmentLog';
import LoginPage from './pages/Login';
import HomeLayout from './layouts/HomeLayout'

ReactDOM.render((
    <Router history={hashHistory}>
            <Route component={HomeLayout}>
                <Route path="/" component={HomePage}/>
                <Route path="/user/add" component={UserAddPage}/>
                <Route path="/user/list" component={UserListPage}/>
                <Route path="/user/edit/:id" component={UserEditPage}/>
                <Route path="/lib/add" component={LibAddPage}/>
                <Route path="/lib/list" component={LibListPage}/>
                <Route path="/lib/edit/:id" component={LibEditPage}/>
                <Route path="/equipments/add" component={EquipAddPage}/>
                <Route path="/equipments/list" component={EquipListPage}/>
                <Route path="/equipments/edit/:id" component={EquipEditPage}/>
                <Route path="/area/add" component={AreaAddPage}/>
                <Route path="/area/list" component={AreaListPage}/>
                <Route path="/area/edit/:id" component={AreaEditPage}/>
                <Route path="/heart/ecode/:id" component={EquipmentHeartPage}/>
                <Route path="/logs/ecode/:id" component={EquipmentLogPage}/>
            </Route>
            <Route path="/login" component={LoginPage}/>
    </Router>

), document.getElementById('app'));