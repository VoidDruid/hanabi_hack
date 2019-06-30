import React from 'react';
import { Grid } from '@material-ui/core';

export default class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        fetch("http://localhost/resources/wordcloud/IgorBeschastnov").then(
            (resp) => (resp.json())
        ).then(
            (resp) => (this.setState(resp))
        );
    }
    render(){
        if (typeof(this.state["img"])!=="undefined")
        return <Grid><img alt={"wordcloud"} src={"data:image/jpeg;base64,"+this.state["img"]}/></Grid>
        return <p>index</p>
    }
}