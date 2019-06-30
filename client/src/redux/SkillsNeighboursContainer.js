import React from 'react';
import NameForm from '../components/NameForm';
import LoadingSpinner from '../components/LoadingSpinner';
import NeighboursView from '../components/NeighboursView';
import {connect} from 'react-redux';
import {getStatsError, getNeighbours, getStatsPending} from '../redux/reducer';
import {fetchNeighbours} from '../redux/fetchNeighbours';
import { bindActionCreators } from 'redux';
import ExtendedForm from '../components/ExtendedForm';
class SkillsNeighboursContainer extends React.Component{
    constructor(props) {
        super(props);
        console.log('SkillsNeighbours');
        console.log(props);
        this.state = {

        }

    }

    render() {
        
        const {neighbours, error, pending} = this.props;
        let isEmpty;
        console.log('neighbours RENDER');
        console.log(neighbours);


        return (<div>
                <NameForm fetch={(name) => this.props.fetchNeighbours(name)} />
                <ExtendedForm fetch={(options)=> this.props.fetchNeighbours(options)} />
            
                {typeof(neighbours) !== 'undefined' && neighbours.length!==0?<NeighboursView /> : this.props.pending? <LoadingSpinner /> : <></>}
                </div>
        )
    }
}


const mapStateToProps = state => ({
    error: getStatsError(state),
    neighbours: getNeighbours(state),
    pending: getStatsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchNeighbours:  fetchNeighbours,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SkillsNeighboursContainer);
