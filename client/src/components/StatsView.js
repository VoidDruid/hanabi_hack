import React from "react";
import { List } from "@material-ui/core";
import ChartListItem from "./ChartListItem";
import { bindActionCreators } from "redux";
import { getStatsError, getStats, getStatsPending } from "../redux/reducer";
import { connect } from 'react-redux';
import ChartWrapper from "./ChartWrapper";
import PRSHistoryChart from './PRSHistoryChart';
import PRLangsChart from './PRLangsChart';
import PRLangsRadarChart from "./PRLangsRadarChart";
import MergedMovedBackChart from './MergedMovedBackPRsChart';
import StarsChart from "./StarsChart";
class StatsView extends React.Component{
    constructor(props){
        super(props);
        console.log('stats view constructor');
        this.state = {
            charts_count: 3,
            extra_charts: null,
            stats: this.props.stats
        };
    }
    shouldComponentUpdate(){
        return true;
    }
    render(){
        if (this.state.stats) 
        return (
            <List>
                <ChartListItem name="Pull requests used languages">
                <ChartWrapper charts={["Pie chart","Radar chart"]}>
                <PRLangsChart data={this.state.stats.PRLangs}/>
                <PRLangsRadarChart data={this.state.stats.PRLangs}/>
                </ChartWrapper>
                </ChartListItem>
                <ChartListItem name="Count of repositories grouped by language">
                <ChartWrapper charts={["Pie chart","Radar chart"]}>
                <PRLangsChart data={this.state.stats.LangsRepoCount}/>
                </ChartWrapper>
                
                    

                </ChartListItem>
                <ChartListItem name="Pull requests merged and moved back">
                <ChartWrapper charts={[]}>
                        <MergedMovedBackChart data={this.state.stats.LangsPRsStats} />
                    </ChartWrapper>
                
                </ChartListItem>
                <ChartListItem name="Pull requests' history">
                    <ChartWrapper charts={[]}>
                        <PRSHistoryChart data={this.state.stats.PRHistory} />
                    </ChartWrapper>
                </ChartListItem>
                <ChartListItem name="User repository stars' statistics">
                    <ChartWrapper charts={[]}>
                        <StarsChart data={this.state.stats.Stars} />
                    </ChartWrapper>
                </ChartListItem>
            </List>
        );
        else
            return <p> blank</p>
    }
}

const mapStateToProps = state => ({
    error: getStatsError(state),
    stats: getStats(state),
    pending: getStatsPending(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatsView);
