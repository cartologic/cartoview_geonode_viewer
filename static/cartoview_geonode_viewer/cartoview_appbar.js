import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Select from 'boundless-sdk/components/Select';
import Navigation from 'boundless-sdk/components/Navigation';
import AddLayer from './node_modules/boundless-sdk/components/AddLayer.js';
import ImageExport from 'boundless-sdk/components/ImageExport';
import MapConfig from 'boundless-sdk/components/MapConfig';
import CartoviewAbout from './cartoview_about'
import DrawerTabs from './tabs'

export default class CartoviewAppBar extends React.Component {
    constructor(props) {
        super(props);
    }

    _toggle(el) {
        if (el.style.display === 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }

    _toggleTable() {
        this._toggle(document.getElementById('table-panel'));
        this.refs.table.getWrappedInstance().setDimensionsOnState();

    }

    _toggleQuery() {
        this._toggle(document.getElementById('query-panel'));
    }

    _toggleWFST() {
        this._toggle(document.getElementById('wfst'));
    }

    _togglePlayback() {
        this._toggle(document.getElementById('playback'));
    }

    _toggleEdit() {
        this._toggle(document.getElementById('edit-tool-panel'));
    }

    render() {
        const about = appConfig.showAbout ? React.createElement(CartoviewAbout) : "";
        const export_image = appConfig.showExportImage ? React.createElement(ImageExport, {map: map}) : "";
        const selection = appConfig.showSelection ? <Select toggleGroup='navigation' map={map}/> : "";
        const navigation = appConfig.showSelection ?
            <Navigation secondary={true} toggleGroup='navigation' toolId='nav'/> : "";
        const WFS_T = appConfig.showWFS_T ? <MenuItem
            onTouchTap={this._toggleWFST.bind(this)}
            primaryText="WFST"
        /> : "";
        const add_layer = appConfig.showAddLayer ? React.createElement(AddLayer, {map: map}) : "";
        const AttributesTable = appConfig.showAttributesTable ? <MenuItem
            onTouchTap={this._toggleTable.bind(this)}
            primaryText="Attributes Table"
        /> : "";
        const playback = appConfig.showPlayback ? <MenuItem
            onTouchTap={this._togglePlayback.bind(this)}
            primaryText="Playback"
        /> : "";
        const edit = appConfig.showEdit ? <MenuItem
            onTouchTap={this._toggleEdit.bind(this)}
            primaryText="Edit"
        /> : "";
        const query = appConfig.showQuery ? <MenuItem
            onTouchTap={this._toggleQuery.bind(this)}
            primaryText="Query"
        /> : "";
        const save_load_control = appConfig.showMapConfig ? <MapConfig map={map}/> : "";
        const icon_menu = <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            {WFS_T}
            {AttributesTable}
            {playback}
            {edit}
            {query}
            {about}
        </IconMenu>;
        return (
            <div>
                <AppBar
                    title={''}
                    showMenuIconButton={false}
                    iconElementRight={icon_menu}
                />
                {React.createElement(DrawerTabs)}
            </div>
        );
    }
}
