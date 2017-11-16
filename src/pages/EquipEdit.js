import React from 'react';
import EquipEditor from '../components/EquipEditor';
import {get} from '../utils/request';

class EquipEdit extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            equipment:null
        };
    }

    componentWillMount() {
        const equipmentId = this.context.router.params.id;
        get('http://localhost:3000/equipments/'+equipmentId)
            .then(res =>{
                this.setState({
                    equipment:res
                });
            });
    }

    render(){
        const{equipment} = this.state;
        return(
            equipment ?<EquipEditor editTarget ={equipment}/> :<span>加载中...</span>
        );
    }
}

EquipEdit.contextTypes ={
    router:React.PropTypes.object.isRequired
};

export default EquipEdit;