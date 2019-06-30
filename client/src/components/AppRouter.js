import React from "react";
import {StyledLink} from "./StyledLink";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from './MainPage';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StyledListItem from "./StyledListItem";
import StyledList from "./StyledList";
import HairLogo from "./HairLogo";
import StatsContainer from "../redux/StatsContainer";
import SkillsNeighboursContainer from '../redux/SkillsNeighboursContainer';
import RecomendationsContainer from '../redux/RecomendationsContainer';
export default () => {
    return (<Router>
        
        <StyledList>
        <HairLogo />
        <StyledLink exact to="/" button="true" activeClassName='is-active'>
            <StyledListItem>
                    <InboxIcon />
                    <ListItemText primary={"Main Page"} />
            </StyledListItem>
        </StyledLink>
        <StyledLink exact to="/github_analysis" activeClassName='is-active'>
        <StyledListItem button="true">
                    <MailIcon />
                    <ListItemText primary={"Github Analysis"} />
            </StyledListItem>
        </StyledLink>
        <StyledLink exact to="/skills_neighbours" activeClassName='is-active'>
        <StyledListItem button="true">
                    <MailIcon />
                    <ListItemText primary={"Skills Neighbours"} />
            </StyledListItem>
        </StyledLink>
        <StyledLink exact to="/recomendation_system" activeClassName='is-active'>
        <StyledListItem button="true">
                    <MailIcon />
                    <ListItemText primary={"Recomendation system"} />
            </StyledListItem>
        </StyledLink>
        </StyledList>
            
            
        <div style={{ 'backgroundColor':'#faf3a8'}}>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/github_analysis" component={StatsContainer} />
            <Route exact path="/skills_neighbours" component={SkillsNeighboursContainer} />
            <Route exact path="/recomendation_system" component={RecomendationsContainer} />
        </div>
    </Router>);
}