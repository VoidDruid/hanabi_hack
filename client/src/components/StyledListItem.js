import React from "react";
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/styles';
const StyledListITem = styled(ListItem) ({
    display: "grid",
    "grid-template-columns": "1fr 2fr",
    "justify-items": "center"
})


export default (props) => (<StyledListITem button>{props.children}</StyledListITem>)