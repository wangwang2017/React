import React from 'react';
import AreaEditor from '../components/AreaEditor';
import {get} from '../utils/request';

class AreaEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            area:null
        };
    }

    componentWillMount() {
        const areaId = this.context.router.params.id;
        get('http://localhost:3000/area/'+areaId)
            .then(res =>{
                this.setState({
                    area:res
                });
            });
    }

    render(){
        const {area} = this.state;
        return(
            area ? <AreaEditor editTarget = {area}/>: <span>加载中...</span>
        );
    }
}

AreaEdit.contextTypes = {
    router:React.PropTypes.object.isRequired
};

export default AreaEdit;