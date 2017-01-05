import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerTabs from './tabs';
export default class Components_drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    _handleToggle() {
        this.setState({open: !this.state.open})
    };

    render() {
        return (
            <div>
                <RaisedButton
                    label="Toggle Drawer"
                    onTouchTap={this._handleToggle.bind(this)}
                />
                <Drawer open={this.state.open}>
                    {React.createElement(DrawerTabs)}
                </Drawer>
            </div>
        );
    }
}