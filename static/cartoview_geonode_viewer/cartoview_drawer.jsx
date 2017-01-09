import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Select from 'boundless-sdk/components/Select';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Navigation from 'boundless-sdk/components/Navigation';
import FeatureTable from 'boundless-sdk/components/FeatureTable';
import AddLayer from './node_modules/boundless-sdk/components/AddLayer.js';
import AddLayerModal from 'boundless-sdk/components/AddLayerModal';
import ImageExport from 'boundless-sdk/components/ImageExport';
import AppBar from 'material-ui/AppBar';
import MapConfig from 'boundless-sdk/components/MapConfig';
import CartoviewAbout from './cartoview_about'
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

    _toggleAddLayerModal() {
        this.refs.layerModal.getWrappedInstance().open();

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
        const selection = appConfig.showSelection ? <Select toggleGroup='navigation' map={map}/> : "";
        const navigation = appConfig.showSelection ?
            <Navigation secondary={true} toggleGroup='navigation' toolId='nav'/> : "";
        const WFS_T = appConfig.showWFS_T ? <MenuItem leftIcon={<i className="material-icons">mode_edit</i>}
                                                      onTouchTap={this._toggleWFST.bind(this)}
                                                      primaryText="Edit Layer"
        /> : "";
        const add_layer = appConfig.showAddLayer ? React.createElement(AddLayer, {map: map}) : "";
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
        const edit = appConfig.showEdit ? <MenuItem leftIcon={<i className="material-icons">format_color_fill</i>}
                                                    onTouchTap={this._toggleEdit.bind(this)}
                                                    primaryText="Edit Graphics"
        /> : "";
        const query = appConfig.showQuery ? <MenuItem leftIcon={<i className="material-icons">query_builder</i>}
                                                      onTouchTap={this._toggleQuery.bind(this)}
                                                      primaryText="Query"
        /> : "";
        const save_load_control = appConfig.showMapConfig ? <MapConfig map={map}/> : "";
        const chartsMenuItem = appConfig.showCharts ?
            <MenuItem leftIcon={<i className="material-icons">insert_chart</i>}
                      onTouchTap={this._toggleChartPanel.bind(this)}
                      primaryText="Charts"
            /> : "";
        const table_panel = appConfig.showAttributesTable ?
            <div ref='tablePanel' id='table-panel' className='attributes-table'><FeatureTable ref='table'
                                                                                              map={map}/></div> : "";

        const add_layer_modal = appConfig.showAddLayerModal ?
            <MenuItem leftIcon={<i className="material-icons">layers</i>}
                      onTouchTap={this._toggleAddLayerModal.bind(this)}
                      primaryText="Add Layers(Geoserver)"
            /> : "";
        const geoserver_modal = appConfig.showAddLayerModal ?
            <div><AddLayerModal ref="layerModal" map={map} allowUserInput={true}
                                sources={[{
                                    url: '/cartoview_proxy/http://localhost:4041/geoserver/wms',
                                    type: 'WMS',
                                    title: 'Local GeoServer'
                                }]}/></div> : "";

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
                            iconElementLeft={<IconButton><i className="material-icons">map</i></IconButton>}
                            style={{height: 71}}
                            iconElementRight={<IconButton onTouchTap={this._handleToggle.bind(this)}><NavigationClose /></IconButton>}/>
                    {add_layer_modal}
                    {WFS_T}
                    {AttributesTable}
                    {playback}
                    {chartsMenuItem}
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
                {table_panel}
                {geoserver_modal}
            </div>
        );
    }
}
