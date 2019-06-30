import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { connect } from 'react-redux';
import {RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Legend, PolarGrid} from 'recharts';
class PRLangsRadarChart extends React.Component{
    render(){
        let data = this.props.data;
        if (typeof(data) === 'undefined')
            return <LoadingSpinner />
        let _max = -1;
        data = Object.keys(data).map(
            key => {
                if (data[key] > _max)
                    _max = data[key];
                return {subject:key, value: data[key]}
            }
        )
        data = data.map(
            elem => Object.assign(elem,{fullMark:_max})
        )
        return <RadarChart outerRadius={90} width={730} height={250} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, _max]} />

                <Radar name="user's statistics" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
          </RadarChart>

    }
}

const mapStateToProps = (state) => {
    return {
        data: state.stats.PRLangs

    }
}
export default connect(mapStateToProps)(PRLangsRadarChart);









// const data = [
//     {
//       "subject": "Math",
//       "A": 120,
//       "B": 110,
//       "fullMark": 150
//     },
//     {
//       "subject": "Chinese",
//       "A": 98,
//       "B": 130,
//       "fullMark": 150
//     },
//     {
//       "subject": "English",
//       "A": 86,
//       "B": 130,
//       "fullMark": 150
//     },
//     {
//       "subject": "Geography",
//       "A": 99,
//       "B": 100,
//       "fullMark": 150
//     },
//     {
//       "subject": "Physics",
//       "A": 85,
//       "B": 90,
//       "fullMark": 150
//     },
//     {
//       "subject": "History",
//       "A": 65,
//       "B": 85,
//       "fullMark": 150
//     }
//   ]
    
                              
//   <RadarChart outerRadius={90} width={730} height={250} data={data}>
//     <PolarGrid />
//     <PolarAngleAxis dataKey="subject" />
//     <PolarRadiusAxis angle={30} domain={[0, 150]} />
//     <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//     <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
//     <Legend />
//   </RadarChart>