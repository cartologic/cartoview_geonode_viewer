import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
export default class CartoviewAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    _handleOpen() {
        this.setState({open: true});
    };

    _handleClose() {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleClose.bind(this)}
            />,
        ];

        return (
            <div>
                <MenuItem
                    onTouchTap={this._handleOpen.bind(this)}
                    primaryText="Show About Dialog"
                />
                <Dialog
                    title="Map Information"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this._handleClose.bind(this)}
                >
                    <div><h1>{title}</h1><p>{abstract}</p>
                    </div>
                </Dialog>
            </div>
        );
    }
}