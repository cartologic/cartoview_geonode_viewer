import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import ol from './node_modules/boundless-sdk/node_modules/openlayers';
import {IntlProvider} from 'react-intl';
global.IntlProvider = IntlProvider;
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Geocoding from 'boundless-sdk/components/Geocoding';
import AddLayerModal from 'boundless-sdk/components/AddLayerModal';
import Bookmarks from 'boundless-sdk/components/Bookmarks';
import Chart from 'boundless-sdk/components/Chart';
import Edit from 'boundless-sdk/components/Edit';
import EditPopup from 'boundless-sdk/components/EditPopup';
import FeatureTable from 'boundless-sdk/components/FeatureTable';
import GeocodingResults from 'boundless-sdk/components/GeocodingResults';
import Geolocation from 'boundless-sdk/components/Geolocation';
import Globe from 'boundless-sdk/components/Globe';
import HomeButton from 'boundless-sdk/components/HomeButton';
import InfoPopup from 'boundless-sdk/components/InfoPopup';
import LayerList from 'boundless-sdk/components/LayerList';
import LoadingPanel from 'boundless-sdk/components/LoadingPanel';
import MapPanel from 'boundless-sdk/components/MapPanel';
import Measure from 'boundless-sdk/components/Measure';
import Playback from 'boundless-sdk/components/Playback';
import QGISLegend from 'boundless-sdk/components/QGISLegend';
import QGISPrint from 'boundless-sdk/components/QGISPrint';
import QueryBuilder from 'boundless-sdk/components/QueryBuilder';
import Rotate from 'boundless-sdk/components/Rotate';
import ToolActions from 'boundless-sdk/actions/ToolActions';
import WFST from 'boundless-sdk/components/WFST';
import Zoom from 'boundless-sdk/components/Zoom';
// import ZoomSlider from 'boundless-sdk/components/ZoomSlider';
import 'boundless-sdk/dist/css/components.css';
import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import './app.css';
import CartoviewDrawer from './cartoview_drawer'

injectTapEventPlugin();
var printLayouts = [{
    name: 'Layout 1',
    width: 420.0,
    elements: [{
        name: 'Title',
        height: 40.825440467359044,
        width: 51.98353115727002,
        y: 39.25222551928783,
        x: 221.77507418397624,
        font: 'Helvetica',
        type: 'label',
        id: '24160ce7-34a3-4f25-a077-8910e4889681',
        size: 18
    }, {
        height: 167.0,
        width: 171.0,
        grid: {
            intervalX: 0.0,
            intervalY: 0.0,
            annotationEnabled: false,
            crs: ''
        },
        y: 19.0,
        x: 16.0,
        type: 'map',
        id: '3d532cb9-0eca-4e50-9f0a-ce29b1c7f5a6'
    }],
    height: 297.0
}];
var defaultFill = new ol.style.Fill({
    color: 'rgba(255,255,255,0.4)'
});
var defaultStroke = new ol.style.Stroke({
    color: '#030102',
    width: 1.25
});
var defaultSelectionFill = new ol.style.Fill({
    color: 'rgba(255,255,0,0.4)'
});
var defaultSelectionStroke = new ol.style.Stroke({
    color: '#ff7f7d',
    width: 1.25
});
class GeoNodeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            errorOpen: false
        };
    }

    componentWillMount() {
        this.updateMap(this.props);
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    componentWillReceiveProps(props) {
        this.updateMap(props);
    }

    updateMap(props) {
        if (props.config) {
            var errors = [];
            var filteredErrors = [];
            MapConfigService.load(MapConfigTransformService.transform(props.config, props.proxy, errors), map);
            for (var i = 0, ii = errors.length; i < ii; ++i) {
                // ignore the empty baselayer since we have checkbox now for base layer group
                if (errors[i].layer.type !== 'OpenLayers.Layer') {
                    if (window.console && window.console.warn) {
                        window.console.warn(errors[i]);
                    }
                    filteredErrors.push(errors[i]);
                }
            }
            this.setState({
                errors: filteredErrors,
                errorOpen: true
            });
        }
    }


    _handleRequestClose() {
        this.setState({
            errorOpen: false
        });
    }

    componentDidMount() {
        if (appConfig.showMapOverView) {
            map.addControl(new ol.control.OverviewMap({
                className: 'ol-overviewmap ol-custom-overviewmap',
                collapsed: appConfig.overview_config.collapsed,
                layers: []
            }));
        }
        if (appConfig.showMousePostion) {
            map.addControl(new ol.control.MousePosition({
                "projection": "EPSG:4326",
                "undefinedHTML": "<span style='color: red'>Out Of Map</span>",
                "coordinateFormat": ol.coordinate.createStringXY(4)
            }));
        }
        if (appConfig.showScalebar) {
            map.addControl(new ol.control.ScaleLine({
                "minWidth": appConfig.scalebar_config.width,
                "units": appConfig.scalebar_config.units
            }))
        }
        if (appConfig.showZoomSlider) {
            map.addControl(new ol.control.ZoomSlider());
        }
    }

    _toggle(el) {
        if (el.style.display === 'block') {
            el.style.display = 'none';
        } else {
            el.style.display = 'block';
        }
    }


    _toggleAboutPanel() {
        this._toggle(document.getElementById('about-panel'));
    }

    _toggleChartPanel(evt) {
        evt.preventDefault();
        this._toggle(document.getElementById('chart-panel'));
    }

    render() {
        var error;
        if (this.state.errors.length > 0) {
            var msg = '';
            for (var i = 0, ii = this.state.errors.length; i < ii; i++) {
                msg += this.state.errors[i].msg + '. ';
            }
            error = (<Snackbar
                autoHideDuration={5000}
                open={this.state.errorOpen}
                message={msg}
                onRequestClose={this._handleRequestClose.bind(this)}
            />);
        }
        /* controllers */
        let toolbarOptions = {style: {height: 71}, showMenuIconButton: false, title: ""};
        toolbarOptions.title = title;
        const globe = appConfig.show3D ?
            <div id='globe-button'><Globe tooltipPosition='left' map={map}/></div> : '';
        const print = appConfig.showPrint ?
            <div id='print-button'><QGISPrint menu={false} map={map} layouts={printLayouts}/></div> : '';
        const homeBtn = appConfig.showHome ?
            <div id='home-button'><HomeButton tooltipPosition='left' map={map}/></div> : '';
        const layerSwitcher = appConfig.showLayerSwitcher ?
            <LayerList allowFiltering={true} showOpacity={true} showDownload={true} showGroupContent={true}
                       showZoomTo={true} allowReordering={true} includeLegend={appConfig.showLegend}
                       map={map}/> : '';
        const zoomControls = appConfig.showZoomControls ?
            React.createElement("div", {id: 'zoom-buttons'},
                React.createElement(Zoom, {
                    duration: appConfig.zoom_config.duration,
                    zoomInTipLabel: appConfig.zoom_config.zoomInTipLabel,
                    zoomOutTipLabel: appConfig.zoom_config.zoomOutTipLabel,
                    delta: appConfig.zoom_config.delta,
                    map: map
                })
            ) : "";
        const query_panel = appConfig.showQuery ? React.createElement("div", {
                id: 'query-panel',
                className: 'query-panel'
            },
            <QueryBuilder map={map}/>
        ) : "";
        const measure = appConfig.showMeasure ? React.createElement(Measure, {
            toggleGroup: 'navigation',
            map: map
        }) : "";

        const edit_panel = appConfig.showEdit ? React.createElement("div", {id: 'edit-tool-panel'},
            React.createElement(Edit, {map: map, toggleGroup: 'navigation'})
        ) : "";
        const playback_panel = appConfig.showPlayback ?
            <div id="playback"><Playback map={map} minDate={appConfig.playback_config.minDate}
                                         maxDate={appConfig.playback_config.maxDate}
                                         interval={appConfig.playback_config.interval}
                                         numIntervals={appConfig.playback_config.numIntervals}
                                         autoPlay={appConfig.playback_config.autoPlay}
                                         className={"playback"}/></div> : "";
        const load = appConfig.showLoadingPanel ? React.createElement(LoadingPanel, {map: map}) : "";
        var charts = [{
            title: 'TEST',
            categoryField: 'NodeId',
            layer: "sdk-layer-4",
            valueFields: ["NodeId"],
            displayMode: 0,
            operation: 0
        }];
        const charts_button = appConfig.showCharts ? React.createElement(Chart, {
            container: 'chart-panel',
            charts: charts
        }) : "";
        const charts_panel = appConfig.showCharts ? React.createElement("div", {
                id: 'chart-panel',
                className: 'chart-panel'
            },
            React.createElement("a", {
                    href: '#',
                    id: 'chart-panel-closer',
                    className: 'chart-panel-closer',
                    onClick: this._toggleChartPanel.bind(this)
                },
                "X"
            ),
            <Chart ref='chartPanel' combo={true} charts={charts}/>
        ) : "";

        const geolocation = appConfig.showGeoLocation ? React.createElement("div", {id: 'geolocation-control'},
            React.createElement(Geolocation, {map: map})
        ) : "";
        const North = appConfig.showNorth ? React.createElement("div", {id: 'rotate-button'},
            React.createElement(Rotate, {
                autoHide: appConfig.north_config.autoHide,
                map: map
            })
        ) : "";
        const WFS_T_panel = appConfig.showWFS_T ? React.createElement("div", {id: 'wfst', ref: 'wfstPanel'},
            React.createElement(WFST, {map: map})
        ) : "";
        const table_panel = appConfig.showAttributesTable ?
            <div ref='tablePanel' id='table-panel' className='attributes-table'><FeatureTable ref='table'
                                                                                              map={map}/></div> : "";
        const geocode_search = appConfig.showGeoCoding ? <Geocoding maxResult={5}/> : "";
        const geocoding_results = appConfig.showGeoCoding ? React.createElement("div", {
            id: 'geocoding-results',
            className: 'geocoding-results-panel'
        }, <GeocodingResults map={map}/>) : "";
        const menu_bar = React.createElement("div", {id: "menu_bar"},
            React.createElement("div", {style: {display: "flex"}}, React.createElement(CartoviewDrawer), geocode_search), geocoding_results
        );
        let info_popup = appConfig.showInfoPopup ? <InfoPopup toggleGroup='navigation' toolId='nav'
                                                              infoFormat='application/vnd.ogc.gml' map={map}/> : "";
        let edit_popup = appConfig.showEditPopup ? <EditPopup map={map}/> : "";
        if (appConfig.showEditPopup && appConfig.showInfoPopup) {
            info_popup = "";
        }

        /* end controllers */
        return (
            <div id='content'>
                <AddLayerModal map={map} allowUserInput={true}
                               sources={[{
                                   url: '/cartoview_proxy/http://localhost:4041/geoserver/wms',
                                   type: 'WMS',
                                   title: 'Local GeoServer'
                               }]}/>
                {error}
                {menu_bar}
                <MapPanel useHistory={true} id='map' map={map}/>
                {globe}
                {print}
                {homeBtn}
                {layerSwitcher}
                {geolocation}
                {zoomControls}
                {load}
                {query_panel}
                {table_panel}
                {WFS_T_panel}
                {North}
                {charts_panel}
                {edit_panel}
                {playback_panel}
                <div id='popup' className='ol-popup'>
                    {info_popup}
                    {edit_popup}
                </div>
            </div>
        );
    }
}
GeoNodeViewer.props = {
    config: React.PropTypes.object,
    proxy: React.PropTypes.string,
    mode: React.PropTypes.string,
    server: React.PropTypes.string,
};

GeoNodeViewer.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default GeoNodeViewer;
global.GeoNodeViewer = GeoNodeViewer;