import React from 'react'
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Collapsible from 'react-collapsible';
export default class CollapsibleMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const collapsible_element=<MenuItem rightIcon={<i className="material-icons">keyboard_arrow_down</i>}
      leftIcon={this.props.leftIcon}
      primaryText={this.props.elementText}/>
    const collapsed_element=<MenuItem rightIcon={<i className="material-icons">keyboard_arrow_up</i>}
        leftIcon={this.props.leftIcon}
        primaryText={this.props.elementText}/>

      return(<div><Divider /><Collapsible trigger={collapsible_element} triggerWhenOpen={collapsed_element}>
        {this.props.content}
      </Collapsible></div>)
  }
}
