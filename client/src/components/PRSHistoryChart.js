import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis , Tooltip} from 'recharts';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
class PRSHistoryChart extends React.Component{
    render(){
        console.log('-------------------------');
        console.log(this.props);
        console.log('-------------------------');
        let data = this.props.data;
        if (typeof(data) === "undefined"){
            return <LoadingSpinner />
        }
        const result = {}

        data.map(
            (date) => {
                date = new Date(date);
                date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
                console.log(date);
                console.log(result);
                if (typeof(result[date]) === "undefined"){
                    result[date] = 1
                }else{
                    console.log(result[date])
                    result[date] += 1;
                }
            }
        );
        data = Object.keys(result).map(
            key => ({date:[key], prs: result[key]})
        )

        console.log(data);
        
        return <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="prs" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.stats.PRHistory

    }
}
export default connect(mapStateToProps)(PRSHistoryChart);