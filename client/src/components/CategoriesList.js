import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import {TextField, Button} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CategoriesList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [langs, setLangs] = React.useState("");
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    
  };
  const handleChange = (e) => {
    setLangs(e.target.value)
}
  const categories = [
    'frontend',
    'backend',
    'embedded',
    'science',
    'scripting',
    'mobile',
    'hardware',
    'other'
  ]
  return (
    <List className={classes.root}>
      {categories.map(value => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value}`} />
          </ListItem>
        );
      })
      }
      <ListItem>
      <TextField multiline id="languages" value={langs} placeholder="type your languages sep ','" onChange={handleChange}/>;
          </ListItem>
          <Button onClick={() => {
              console.log('--------DEBUG-----');
              console.log(checked);
              return props.fetch(
              {'cats':checked.slice(1),languages:langs}
              )}}>submit</Button>
    </List>
  );
}