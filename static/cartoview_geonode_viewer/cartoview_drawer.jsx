import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Select from 'boundless-sdk/components/Select';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ol from './node_modules/boundless-sdk/node_modules/openlayers';
import Navigation from 'boundless-sdk/components/Navigation';
import AddLayer from './node_modules/boundless-sdk/components/AddLayer.js';
import ImageExport from 'boundless-sdk/components/ImageExport';
import AppBar from 'material-ui/AppBar';
import MapConfig from 'boundless-sdk/components/MapConfig';
import CartoviewAbout from './cartoview_about'

let map = new ol.Map({
    controls: [new ol.control.Attribution({collapsible: false})],
    layers: [
        new ol.layer.Tile({title: 'OSM Streets', type: 'base', source: new ol.source.OSM()})
    ],
    view: new ol.View({
        center: [0, 0], zoom: 3, minZoom: 3, maxZoom: 19
    })
});
export default class CartoviewDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    _toggle(el) {
        this.setState({open: !this.state.open});
        if (el.style.display === 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }

    _handleToggle() {
        this.setState({open: !this.state.open})
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
        const about = appConfig.showAbout ? React.createElement(CartoviewAbout) : ""
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
        const hide = <MenuItem
            rightIcon={<i className="material-icons" onTouchTap={this._handleToggle.bind(this)}
                          style={{color: 'black'}}>close</i>}
            primaryText={title}
        />;
        const edit = appConfig.showEdit ? <MenuItem
            onTouchTap={this._toggleEdit.bind(this)}
            primaryText="Edit"
        /> : "";
        const query = appConfig.showQuery ? <MenuItem
            onTouchTap={this._toggleQuery.bind(this)}
            primaryText="Query"
        /> : "";
        const save_load_control = appConfig.showMapConfig ? <MapConfig map={map}/> : "";


        return (

            <div>
                <IconButton tooltip="Toggle Drawer"
                            onTouchTap={this._handleToggle.bind(this)}
                            style={{color: 'black', fontSize: '36px', padding: '0px'}}
                >
                    <i className="material-icons">menu</i>
                </IconButton>
                <Drawer width={280} open={this.state.open}>
                    <AppBar title={title} showMenuIconButton={false} style={{height: 71}}
                            iconElementRight={<IconButton onTouchTap={this._handleToggle.bind(this)}><NavigationClose /></IconButton>}/>
                    {WFS_T}
                    {AttributesTable}
                    {playback}
                    {edit}
                    {query}
                    {about}
                    <div style={{display: "flex"}}>
                        {selection}
                        {navigation}
                    </div>

                    {save_load_control}
                    <div style={{display: "flex"}}>
                        {add_layer}
                        {export_image}
                    </div>
                </Drawer>
            </div>
        );
    }
}
global.map = map;