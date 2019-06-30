import { styled } from '@material-ui/styles';
import List from '@material-ui/core/List';

const StyledList = styled(List)({
  height: "100vh",
  "background-color": "#fffcdd",
  display: "grid",
  "grid-template-rows": "2fr 1fr 1fr 8fr",
  "grid-row-gap": "1px",
  "background-size":'cover'

})

export default StyledList;