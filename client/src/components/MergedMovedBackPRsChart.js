import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class MergedMovedBackChart extends PureComponent {

  render() {

    let data = this.props.data;
    if (typeof(data) === "undefined")
        return <LoadingSpinner/>
    data = Object.keys(data).map(
        key => (Object.assign({
            language: key
        }, data[key]))
    )

    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="language" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="merged" stackId="a" fill="#8884d8" />
        <Bar dataKey="failed" stackId="a" fill="#82ca9d" />
      </BarChart>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        data: state.stats.LangsPRsStats

    }
}
export default connect(mapStateToProps)(MergedMovedBackChart);