import React from 'react';
import { connect } from 'react-redux';
import  {PieChart, Pie, Legend, Tooltip} from  'recharts';
import LoadingSpinner from './LoadingSpinner';

class PRLangsChart extends React.Component{
    render(){
        let data = this.props.data;
        if (typeof(data) === "undefined")
        return <LoadingSpinner/>
        data = Object.keys(data).map(
            key => ({name:key, value: data[key]})
        )
        console.log(data);
        return <PieChart  width={800} height={400}>
        <Pie dataKey="value" nameKey="name" isAnimationActive={true} data={data} cx={400} cy={200} outerRadius={80} fill="#8884d8" label/>
        <Tooltip/>
       </PieChart>
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.stats.PRLangs

    }
}
export default connect(mapStateToProps)(PRLangsChart);