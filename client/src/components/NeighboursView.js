import React from 'react';
import Graph from 'vis-react';
import {connect} from 'react-redux';



class NeighboursView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            neighbours: this.props
        };
    }
    render(){

        const neighbours = this.state.neighbours.data;
        console.log('render neibors');
        console.log(neighbours);
        let nodes = neighbours.map(
            (e,i) => ({id:i+1, label:e}))
        nodes.unshift({'id':0, 'label':'current profile'});
        let edges = [];
        for( let i = 1 ; i < nodes.length; i++)
        edges.push({
            from: 0,
            to: i
        })
        var graph = {nodes,edges};
         
        var options = {
            height: '100%',
            width: '100%',
            shadow: true,
            layout: {
                hierarchical: false
            },
            color: '#eadf6e',
            shape: 'square',
            edges: {
                color: '#000FF0'
            }
        };


        var events = {
            select: function(event) {
                var { nodes, edges } = event;
            }
        };

        return (
        <div style={{
            height: '600px'
        }}>
        <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={this.getNetwork}
        getEdges={this.getEdges}
        getNodes={this.getNodes}
        vis={vis => (this.vis = vis)}/>
        </div>    
        );
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.stats.neighbours

    }
}

export default connect(mapStateToProps)(NeighboursView);