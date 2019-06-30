import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchStats from './fetchStats';
import {getStatsError, getStats, getStatsPending} from './reducer';
import {Grid} from '@material-ui/core';
import LoadingSpinner from "../components/LoadingSpinner";
import StatsView from '../components/StatsView';

import NameForm from '../components/NameForm';

class StatsContainer extends Component {
    constructor(props) {
        super(props);
        console.log('StatsContainer');
        console.log(props);
    }

    render() {
        
        const {stats, error, pending} = this.props;
        let isEmpty;
        if (typeof(stats) !== undefined && stats !== null)
            isEmpty = Object.entries(stats.stats).length === 0 && stats.stats.constructor === Object
        else
            isEmpty = false;
        console.log('StatsContainer RENDER');
        console.log(stats);


        return (<div>
            <Grid container justify="center" spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={4}>
                <NameForm fetch={(name) => this.props.fetchStats(name)} /></Grid>
                </Grid>
                {!isEmpty?<StatsView {...stats} /> : this.props.pending? <LoadingSpinner /> : <></>}
                </div>
        )
    }
}


const mapStateToProps = state => ({
    error: getStatsError(state),
    stats: getStats(state),
    pending: getStatsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStats:  fetchStats,

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatsContainer);
