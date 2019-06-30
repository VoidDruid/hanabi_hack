import React from 'react';
import {Grid} from '@material-ui/core';
import NameForm from '../components/NameForm';
import OffersView from '../components/OffersView';
import LoadingSpinner from '../components/LoadingSpinner';
import {connect} from 'react-redux';

import {fetchOffers} from './fetchOffers';
import { bindActionCreators } from 'redux';
import {getOffers,getStatsError, getStatsPending} from './reducer';
class RecomendationsContainer extends React.Component{
    render() {
        
        const {offers, error, pending} = this.props;
        let isEmpty;
        if (typeof(offers) !== 'undefined' && offers !== null)
            isEmpty = Object.entries().length === 0 && offers.constructor === Object
        else
            isEmpty = false;

        return (<div>
            <Grid container justify="center" spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={4}>
                <NameForm fetch={(name) => this.props.fetchOffers(name)} /></Grid>
                </Grid>
                {!isEmpty?<OffersView {...offers} /> : this.props.pending? <LoadingSpinner /> : <></>}
                </div>
        )
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOffers:  fetchOffers,
}, dispatch)

export default connect(
    mapDispatchToProps
)(RecomendationsContainer);
