import React, { PureComponent } from 'react';
import {
    BarChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';
import LoadingSpinner from './LoadingSpinner'
import {connect} from 'react-redux';
class StarsChart extends PureComponent {

  render() {

    let data = this.props.data;
    if(typeof(data) === 'undefined')
        return <LoadingSpinner/>
    
    data = [{
        key: 'stars',
        'count stars': data['count']
    }]
    console.log('stars----------------------------');
    console.log(data);
    console.log('stars----------------------------');
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
              <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count stars" stackId="a" fill="#928718" />
            </BarChart>
          );

  }
}

const mapStateToProps = (state) => {
    return {
        data: state.stats.Stars

    }
}
export default connect(mapStateToProps)(StarsChart);