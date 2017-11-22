import React from 'react';
import {Select} from 'antd';
import {get} from '../utils/request';

const Option = Select.Option;
let timeout;

export default class MySelect extends React.Component{
    state = {
        data: [],
        value: '',
    }
}