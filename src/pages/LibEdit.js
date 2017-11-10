import React from 'react';
import LibEditor from '../components/LibEditor';
import  {get} from '../utils/request';

class LibEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lib:null
        };
    }

    componentWillMount() {
        const libId = this.context.router.params.id;
        get('http://localhost:3000/lib/'+libId)
            .then(res =>{
                this.setState({
                    lib:res
                });
            });
    }

    render(){
        const {lib} = this.state;
        return(
            lib ? <LibEditor editTarget = {lib}/> :<span>加载中...</span>
        );
    }
}

LibEdit.contextTypes ={
    router:React.PropTypes.object.isRequired
};

export default LibEdit;