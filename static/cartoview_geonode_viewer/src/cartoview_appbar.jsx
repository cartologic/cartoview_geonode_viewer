import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Select from '@boundlessgeo/sdk/components/Select';
import Navigation from '@boundlessgeo/sdk/components/Navigation';
import AddLayer from './node_modules/@boundlessgeo/sdk/components/AddLayer.js';
import ImageExport from '@boundlessgeo/sdk/components/ImageExport';
import MapConfig from '@boundlessgeo/sdk/components/MapConfig';
import FeatureTable from '@boundlessgeo/sdk/components/FeatureTable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddLayerModal from '@boundlessgeo/sdk/components/AddLayerModal';
export default class CartoviewAppBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    _toggle(el) {
        if (el.style.display === 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }

    _handleOpen() {
        this.setState({open: true});
    };

    _handleClose() {
        this.setState({open: false});

    };

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

    _toggleGeocodingPanel() {
        this._toggle(document.getElementById('geocoding-results'));
    }

    _toggleEdit() {
        this._toggle(document.getElementById('edit-tool-panel'));
    }

    _toggleChartPanel(evt) {
        evt.preventDefault();
        this._toggle(document.getElementById('chart-panel'));
    }

    _toggleWidgets() {
        this._toggle(document.getElementById('float_control'));
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleClose.bind(this)}
            />,
        ];
        let style = {
            color: 'white', fontSize: '36px', padding: '0px', marginTop: 'auto',
            marginBottom: 'auto'
        };
        const about = appConfig.showAbout ? <div style={{margin: 'auto'}}>
            <IconButton tooltip="About Dialog"
                        onTouchTap={this._handleOpen.bind(this)}
                        style={style}>
                <i className="material-icons">info_outline</i>
            </IconButton>
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
            </Dialog></div> : "";

        const export_image = appConfig.showExportImage ? React.createElement(ImageExport, {map: map}) : "";
        const selection = appConfig.showSelection ? <Select toggleGroup='navigation' map={map}/> : "";
        const navigation = appConfig.showSelection ?
            <Navigation secondary={true} toggleGroup='navigation' toolId='nav'/> : "";
        const WFS_T = appConfig.showWFS_T ? <IconButton tooltip="Edit Layer"
                                                        onTouchTap={this._toggleWFST.bind(this)}
                                                        style={style}>
            <i className="material-icons">mode_edit</i>
        </IconButton> : "";
        const add_layer = appConfig.showAddLayer ? React.createElement(AddLayer, {map: map}) : "";

        const AttributesTable = appConfig.showAttributesTable ? <IconButton tooltip="Attributes Table"
                                                                            onTouchTap={this._toggleTable.bind(this)}
                                                                            style={style}>
            <i className="material-icons">grid_on</i>
        </IconButton> : "";

        const playback = appConfig.showPlayback ? <IconButton tooltip="Playback"
                                                              onTouchTap={this._togglePlayback.bind(this)}
                                                              style={style}>
            <i className="material-icons">play_arrow</i>
        </IconButton> : "";

        const edit = appConfig.showEdit ? <IconButton tooltip="Edit Graphics"
                                                      onTouchTap={this._toggleEdit.bind(this)}
                                                      style={style}>
            <i className="material-icons">format_color_fill</i>
        </IconButton> : "";

        const query = appConfig.showQuery ? <IconButton tooltip="Query"
                                                        onTouchTap={this._toggleQuery.bind(this)}
                                                        style={style}>
            <i className="material-icons">query_builder</i>
        </IconButton> : "";
        const geocoding_icon = appConfig.showGeoCoding ? <IconButton tooltip="search"
                                                                     onTouchTap={this._toggleGeocodingPanel.bind(this)}
                                                                     style={style}>
            <i className="material-icons">location_searching</i>
        </IconButton> : "";
        const save_load_control = appConfig.showMapConfig ? <MapConfig map={map}/> : "";
        const charts = appConfig.showCharts ? <IconButton tooltip="Charts"
                                                          onTouchTap={this._toggleChartPanel.bind(this)}
                                                          style={style}>
            <i className="material-icons">insert_chart</i>
        </IconButton> : "";
        const add_layer_modal = appConfig.showAddLayerModal ? <IconButton tooltip="Add Layers from Geoserver"
                                                                          onTouchTap={this._toggleAddLayerModal.bind(this)}
                                                                          style={style}>
            <i className="material-icons">layers</i>
        </IconButton> : "";
        const float_controls = (appConfig.showAddLayer || appConfig.showSelection || appConfig.showExportImage || appConfig.showMapConfig) ?
            <IconButton tooltip="Tools"
                        onTouchTap={this._toggleWidgets.bind(this)}
                        style={style}>
                <i className="material-icons">widgets</i>
            </IconButton> : "";
        const table_panel = appConfig.showAttributesTable ?
            <div ref='tablePanel' id='table-panel' className='attributes-table'><FeatureTable ref='table'
                                                                                              map={map}/></div> : "";
        const geoserver_modal = appConfig.showAddLayerModal ?
            <div><AddLayerModal ref="layerModal" map={map} allowUserInput={true}
                                sources={[{
                                    url: '/geoserver/wms',
                                    type: 'WMS',
                                    title: 'Local GeoServer'
                                }]}/></div> : "";
        return (
            <div>
                <AppBar title=''
                        showMenuIconButton={false}>
                    {add_layer_modal}
                    {float_controls}
                    {WFS_T}
                    {AttributesTable}
                    {playback}
                    {edit}
                    {query}
                    {geocoding_icon}
                    {charts}
                    {about}
                </AppBar>
                {geoserver_modal}
                {table_panel}
                <div id="float_control">

                    <fieldset>
                        <legend>Map canvas</legend>
                        {export_image}
                    </fieldset>

                    <fieldset>
                        <legend>Map action</legend>
                        {selection}
                        {navigation}
                    </fieldset>

                    <fieldset>
                        <legend>Graphic Layer</legend>
                        {add_layer}
                        {save_load_control}
                    </fieldset>


                </div>
            </div>
        );
    }
}
