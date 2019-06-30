import React from 'react';
import Switch from "@material-ui/core/Switch";
import { withStyles, styled } from '@material-ui/styles';
import {ResponsiveContainer} from 'recharts';
const styles = {root: {
    height: 500,
    width: 200,
    display: 'grid',
    'justify-items': 'center',
    '.recharts-wrapper': {
        margin : '0 auto'
      }

},
}; 


class ChartWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {chart_type : this.props.charts[0], index:0, active: true}

        this.data = this.props.data;
        this.handleToggle = (name) => {
            this.setState({ active: !this.state.active });
        };
    }
        

    
    render(){
        const classes = this.props.classes
        return <div>
            <div className="title">
                <div className="chart_type">{this.state.chart_type}</div>
                {React.Children.toArray(this.props.children).length === 2? 
                <Switch
                checked={this.state.active}
                onClick={this.handleToggle}
                value="active"
                inputProps={{ 'aria-label': 'change chart type' }}
            />:<></>
            }
                
            </div>
            <ResponsiveContainer height='100%' width='100%'>
            {React.Children.toArray(this.props.children).length === 2?
             React.Children.toArray(this.props.children)[
                 this.state.active? 0 : 1
             ]   : this.props.children
        }
        </ResponsiveContainer>
        </div>
    }
}
export default styled(ChartWrapper)({
    // display:'grid',
    // 'justify-items': 'center'
});