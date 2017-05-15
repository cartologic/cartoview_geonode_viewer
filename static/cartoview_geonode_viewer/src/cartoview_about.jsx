import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
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
              <IconButton onTouchTap={this._handleOpen.bind(this)} tooltip="About Dialog" iconClassName="material-icons about-ico">info_outline</IconButton>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this._handleClose.bind(this)}
                    autoScrollBodyContent={true}
                    contentClassName="dialog"
                    bodyClassName="dialog_body"
                >
                    <div ><p>{abstract}</p>
                    </div>
                </Dialog>
            </div>
        );
    }
}
