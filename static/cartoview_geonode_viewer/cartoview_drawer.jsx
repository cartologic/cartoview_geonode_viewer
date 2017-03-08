import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Select from 'boundless-sdk/components/Select';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Navigation from 'boundless-sdk/components/Navigation';
import AddLayer from './node_modules/boundless-sdk/components/AddLayer.js';
import AddLayerModal from 'boundless-sdk/components/AddLayerModal';
import ImageExport from 'boundless-sdk/components/ImageExport';
import AppBar from 'material-ui/AppBar';
import MapConfig from 'boundless-sdk/components/MapConfig';
import CartoviewAbout from './cartoview_about';
import FlatButton from 'material-ui/FlatButton';
import Measure from 'boundless-sdk/components/Measure';
import Collapsible from 'react-collapsible';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
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

    _toggleChartPanel() {
        this._toggle(document.getElementById('chart-panel'));
    }

    render() {
        const about = appConfig.showAbout ? React.createElement(CartoviewAbout) : "";
        const export_image = appConfig.showExportImage ? React.createElement(ImageExport, {map: map}) : "";
        const selection = <Select toggleGroup='navigation' map={map}/>;
        const navigation = <Navigation secondary={true} toggleGroup='navigation' toolId='nav'/>;
        const WFS_T = appConfig.showWFS_T ? <MenuItem leftIcon={<i className="material-icons">mode_edit</i>}
                                                      onTouchTap={this._toggleWFST.bind(this)}
                                                      primaryText="Edit Layer"
            /> : "";
        const measure = appConfig.showMeasure ? React.createElement(Measure, {
                toggleGroup: 'navigation',
                map: map
            }) : "";
        const add_layer = appConfig.showAddLayer ? <AddLayer map={map} style={{marginLeft: '4em'}}/> : '';
        const AttributesTable = appConfig.showAttributesTable ?
            <MenuItem leftIcon={<i className="material-icons">grid_on</i>}
                      onTouchTap={this._toggleTable.bind(this)}
                      primaryText="Attributes Table"
            /> : "";
        const playback = appConfig.showPlayback ? <MenuItem leftIcon={<i className="material-icons">play_arrow</i>}
                                                            onTouchTap={this._togglePlayback.bind(this)}
                                                            primaryText="Playback"
            /> : "";
        const hide = <MenuItem
            rightIcon={<i className="material-icons" onTouchTap={this._handleToggle.bind(this)}
                          style={{color: 'black'}}>close</i>}
            primaryText={title}
        />;
        const edit = appConfig.showEdit ?
            <RaisedButton
                style={{paddingRight: 10, paddingLeft: 10, display: 'flex', paddingTop: 10, boxShadow: 'none'}}
                className="HishamKaram" onTouchTap={this._toggleEdit.bind(this)} label="Create Layer"
                primary={true}/> : "";
        const query = appConfig.showQuery ? <MenuItem leftIcon={<i className="material-icons">query_builder</i>}
                                                      onTouchTap={this._toggleQuery.bind(this)}
                                                      primaryText="Query"
            /> : "";
        const save_load_control = appConfig.showEdit ? <MapConfig map={map}/> : "";
        const chartsMenuItem = appConfig.showCharts ?
            <MenuItem leftIcon={<i className="material-icons">insert_chart</i>}
                      onTouchTap={this._toggleChartPanel.bind(this)}
                      primaryText="Charts"
            /> : "";
        let select_navigate = '';
        if (appConfig.showAttributesTable || appConfig.showCharts) {
            select_navigate = <div style={{display: "flex"}}>
                {selection}
                {navigation}
            </div>;
        }
        const collapsed_element = <span style={{padding: '15px !important', fontWeight: 'inherit !important'}}><i
            className='material-icons'>format_color_fill</i>\<span style={{paddingLeft: 30}}>Graphics</span></span>
        const collapsible_edit = appConfig.showEdit ? <span><Divider /><Collapsible trigger={collapsed_element}>
              {edit}
                <div style={{display: "flex"}}>
                  {save_load_control}
              </div>
                {add_layer}
          </Collapsible></span> : '';

        return (

            <div>
                <IconButton tooltip="Toggle Drawer"
                            onTouchTap={this._handleToggle.bind(this)}
                            style={{color: 'black', fontSize: '36px', padding: '0px'}}
                >
                    <i className="material-icons">menu</i>
                </IconButton>
                <Drawer width={280} open={this.state.open}>
                    <AppBar title={title}
                            showMenuIconButton={false}
                            style={{height: 71}}
                            iconElementRight={<IconButton onTouchTap={this._handleToggle.bind(this)}><NavigationClose /></IconButton>}/>
                    {select_navigate}
                    <Divider />
                    <div style={{display: "flex", paddingBottom: 20}}>
                        {measure}
                        {export_image}
                    </div>

                    {collapsible_edit}

                    <Divider />
                    {WFS_T}
                    {AttributesTable}
                    {playback}
                    {chartsMenuItem}
                    {query}
                    {about}

                </Drawer>

            </div>
        );
    }
}
