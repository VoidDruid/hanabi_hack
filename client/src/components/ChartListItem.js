import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class ChartListItem extends React.Component{

    render(){
        // const open = this.state.isOpen
        // return <Collapse in={open} onClick={() => {this.setState({isOpen: !this.state.isOpen})}}>
        // {this.props.children}
        // </Collapse>
        return (<ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expanded={true} expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{this.props.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {this.props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>)
    }
}