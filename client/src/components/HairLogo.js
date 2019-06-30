import React from "react";
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
const OswaldSpan = styled(Typography)({
    "font-family": "'Oswald', sans-serif",
    display: 'inline-block',
})
const SourceCodeProSpan = styled(Typography)({
    "font-family": "'Source Code Pro', monospace",
    display: 'inline-block',
    "text-decoration": "underline",
    "font-style": "bold"
})

const HairLogo = () => <div>
    <OswaldSpan variant="h2" inline="true">H</OswaldSpan>
    <SourceCodeProSpan variant="h3" inline="true">AI</SourceCodeProSpan>
    <OswaldSpan variant="h2" inline="true">R</OswaldSpan>
</div>
export default styled(HairLogo)({
    display: "grid",
    "grid-columns-gap": "50px"
});