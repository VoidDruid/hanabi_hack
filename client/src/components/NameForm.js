import React from 'react';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


class MyButton extends React.Component{
  render(){
    return <Button onClick={() => this.handleSubmit()} >{this.props.children}</Button>;
  }
}
const StyledButton = styled(MyButton)({'margin':'10px'});

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit() {
      // alert('Отправленное имя: ' + this.state.value);

      this.props.fetch(this.state.value)
      // event.preventDefault();
    }
  
    render() {
      return (
<TextField onChange={this.handleChange} value={this.state.value} onKeyDown={(e) => e.key === 'Enter'? this.handleSubmit(): ''} label="Type the user' profile" placeholder="Type the user' profile" variant="outlined"/>

      );
    }
  }

export default styled(NameForm)({
  'display':'grid',
  'align-items':'center'
})