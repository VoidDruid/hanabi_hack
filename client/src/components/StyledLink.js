import {NavLink} from "react-router-dom";
import { styled } from '@material-ui/styles';

export const StyledLink = styled(NavLink)({
    "text-decoration": "none",
    color: "#757575",
    "&:focus, &:hover, &:visited, &:active": {
        "text-decoration": "none",
        color: "#5fba7d"
    },
    "&.is-active":{
        "text-decoration": "none",
        color: "#5fba7d"
    }
});

