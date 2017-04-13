import React from 'react';
import ReactDOM from 'react-dom';
import ol from 'openlayers';
import {IntlProvider} from 'react-intl';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MapConfig from 'boundless-sdk/components/MapConfig';
import AddLayer from './node_modules/boundless-sdk/components/AddLayer.js';
import Bookmarks from 'boundless-sdk/components/Bookmarks';
import Button from 'boundless-sdk/components/Button';
import Chart from 'boundless-sdk/components/Chart';
import Edit from 'boundless-sdk/components/Edit';
import EditPopup from 'boundless-sdk/components/EditPopup';
import FeatureTable from 'boundless-sdk/components/FeatureTable';
import Geocoding from 'boundless-sdk/components/Geocoding';
import GeocodingResults from 'boundless-sdk/components/GeocodingResults';
import Geolocation from 'boundless-sdk/components/Geolocation';
import Globe from 'boundless-sdk/components/Globe';
import HomeButton from 'boundless-sdk/components/HomeButton';
import ImageExport from 'boundless-sdk/components/ImageExport';
import InfoPopup from 'boundless-sdk/components/InfoPopup';
import LayerList from 'boundless-sdk/components/LayerList';
import LoadingPanel from 'boundless-sdk/components/LoadingPanel';
import MapPanel from 'boundless-sdk/components/MapPanel';
import Measure from 'boundless-sdk/components/Measure';
import Navigation from 'boundless-sdk/components/Navigation';
import Playback from 'boundless-sdk/components/Playback';
import QGISLegend from 'boundless-sdk/components/QGISLegend';
import QGISPrint from 'boundless-sdk/components/QGISPrint';
import QueryBuilder from 'boundless-sdk/components/QueryBuilder';
import Rotate from 'boundless-sdk/components/Rotate';
import Select from 'boundless-sdk/components/Select';
import ToolActions from 'boundless-sdk/actions/ToolActions';
import WFST from 'boundless-sdk/components/WFST';
import Zoom from 'boundless-sdk/components/Zoom';
import ZoomSlider from 'boundless-sdk/components/ZoomSlider';
import 'boundless-sdk/dist/css/components.css';
import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
injectTapEventPlugin();
export default class IconMenuExampleControlled extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSingle: '3',
            valueMultiple: ['3', '5'],
        };
    }

    handleChangeSingle(event, value) {
        this.setState({
            valueSingle: value,
        });
    };

    handleChangeMultiple(event, value) {
        this.setState({
            valueMultiple: value,
        });
    };

    handleOpenMenu() {
        this.setState({
            openMenu: true,
        });
    };

    handleOnRequestChange(value) {
        this.setState({
            openMenu: value,
        });
    };

    render() {
        return (
            <div>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    onChange={this.handleChangeSingle}
                    value={this.state.valueSingle}
                >
                    <MenuItem value="1" primaryText="Refresh"/>
                    <MenuItem value="2" primaryText="Send feedback"/>
                    <MenuItem value="3" primaryText="Settings"/>
                    <MenuItem value="4" primaryText="Help"/>
                    <MenuItem value="5" primaryText="Sign out"/>
                </IconMenu>
                <IconMenu
                    iconButtonElement={<IconButton><ContentFilter /></IconButton>}
                    onChange={this.handleChangeMultiple}
                    value={this.state.valueMultiple}
                    multiple={true}
                >
                    <MenuItem value="1" primaryText="Blu-ray"/>
                    <MenuItem value="2" primaryText="Cassette"/>
                    <MenuItem value="3" primaryText="CD"/>
                    <MenuItem value="4" primaryText="DVD Audio"/>
                    <MenuItem value="5" primaryText="Hybrid SACD"/>
                    <MenuItem value="6" primaryText="Vinyl"/>
                </IconMenu>
                <IconMenu
                    iconButtonElement={<IconButton><FileFileDownload /></IconButton>}
                    open={this.state.openMenu}
                    onRequestChange={this.handleOnRequestChange}
                >
                    <MenuItem value="1" primaryText="Windows App"/>
                    <MenuItem value="2" primaryText="Mac App"/>
                    <MenuItem value="3" primaryText="Android App"/>
                    <MenuItem value="4" primaryText="iOS App"/>
                </IconMenu>
                <RaisedButton onTouchTap={this.handleOpenMenu} label="Downloads"/>
            </div>
        );
    }
}
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

var map = new ol.Map({
    controls: [new ol.control.Attribution({collapsible: false}), new ol.control.ScaleLine()],
    layers: [
        new ol.layer.Tile({title: 'OSM Streets', type: 'base', source: new ol.source.OSM()})
    ],
    view: new ol.View({center: [0, 0], zoom: 3})
});
class GeoNodeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            errorOpen: false
        };
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    componentWillMount() {
        this.updateMap(this.props);
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

    _toggleWFST() {
        this._toggle(document.getElementById('wfst'));
    }

    _toggleQuery() {
        this._toggle(document.getElementById('query-panel'));
    }

    _toggleEdit() {
        this._toggle(document.getElementById('edit-tool-panel'));
    }

    _togglePlayback() {
        this._toggle(document.getElementById('playback'));
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
            <div id='globe-button'><Globe tooltipPosition='right' map={map}/></div> : '';
        const print = appConfig.showPrint ?
            <div id='print-button'><QGISPrint menu={false} map={map} layouts={printLayouts}/></div> : '';
        const homeBtn = appConfig.showHome ?
            <div id='home-button'><HomeButton tooltipPosition='right' map={map}/></div> : '';
        const layerSwitcher = appConfig.showLayerSwitcher ?
            <div><LayerList allowFiltering={true} showOpacity={true} showDownload={true} showGroupContent={true}
                            showZoomTo={true} allowReordering={true} includeLegend={appConfig.showLegend}
                            map={map}/>
            </div> : '';
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
        const rotate = appConfig.showRotate ?
            <div id='rotate-button'><Rotate autoHide={true} tooltipPosition='right' map={map}/></div> : '';
        const about = appConfig.showAbout ?
            <div id='about-panel'>
                <div><h1>{title}</h1><p>{abstract}</p>
                </div>
            </div> : '';
        const add_layer = appConfig.showAddLayer ? React.createElement(AddLayer, {map: map}) : "";
        const save_load_control = appConfig.showMapConfig ? <MapConfig map={map}/> : "";
        const query_panel = appConfig.showQuery ? React.createElement("div", {
                id: 'query-panel',
                className: 'query-panel'
            },
            React.createElement(QueryBuilder, {map: map})
        ) : "";
        const query_button = appConfig.showQuery ? React.createElement(Button, {
            label: 'Query',
            onTouchTap: this._toggleQuery.bind(this)
        }) : "";
        const measure = appConfig.showMeasure ? React.createElement(Measure, {
            toggleGroup: 'navigation',
            map: map
        }) : "";
        const export_image = appConfig.showExportImage ? React.createElement(ImageExport, {map: map}) : "";
        const edit_button = appConfig.showEdit ? React.createElement(Button, {
            label: 'Edit',
            onTouchTap: this._toggleEdit.bind(this)
        }) : "";

        const edit_panel = appConfig.showEdit ? React.createElement("div", {id: 'edit-tool-panel'},
            React.createElement(Edit, {map: map, toggleGroup: 'navigation'})
        ) : "";
        const geocoding = appConfig.showGeoCoding ? React.createElement("div", {
                id: 'geocoding',
                className: 'pull-right'
            },
            React.createElement(Geocoding, {})) : "";
        const geocoding_results = appConfig.showGeoCoding ? React.createElement("div", {
                id: 'geocoding-results',
                className: 'geocoding-results-panel'
            },
            React.createElement(GeocodingResults, {map: map})
        ) : "";
        const selection = appConfig.showSelection ? <Select toggleGroup='navigation' map={map}/> : "";
        const zoom_slider = appConfig.showZoomSlider ? <div id="zoom-slider-div"><ZoomSlider map={map}/></div> : "";
        const playback_button = appConfig.showPlayback ? React.createElement(Button, {
            label: 'Playback',
            onTouchTap: this._togglePlayback.bind(this)
        }) : "";
        const playback_panel = appConfig.showPlayback ?
            <div id="playback"><Playback map={map} minDate={appConfig.playback_config.minDate}
                                         maxDate={appConfig.playback_config.maxDate}
                                         interval={appConfig.playback_config.interval}
                                         numIntervals={appConfig.playback_config.numIntervals}
                                         autoPlay={appConfig.playback_config.autoPlay}
                                         className={"playback"}/></div> : "";
        const navigation = appConfig.showSelection ?
            <Navigation secondary={true} toggleGroup='navigation' toolId='nav'/> : "";
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
        /**
         * With the `maxHeight` property set, the Select Field will be scrollable
         * if the number of items causes the height to exceed this limit.
         */
        const North = appConfig.showNorth ? React.createElement("div", {id: 'rotate-button'},
            React.createElement(Rotate, {
                autoHide: appConfig.north_config.autoHide,
                map: map
            })
        ) : "";
        const WFS_T = appConfig.showWFS_T ? React.createElement(Button, {
            label: 'WFS-T',
            onTouchTap: this._toggleWFST.bind(this)
        }) : "";
        const WFS_T_panel = appConfig.showWFS_T ? React.createElement("div", {id: 'wfst', ref: 'wfstPanel'},
            React.createElement(WFST, {map: map})
        ) : "";
        const AttributesTable = appConfig.showAttributesTable ? React.createElement(Button, {
            label: 'Table',
            onTouchTap: this._toggleTable.bind(this)
        }) : "";
        const table_panel = appConfig.showAttributesTable ? React.createElement("div", {
                id: 'table-panel',
                className: 'attributes-table'
            },
            <FeatureTable ref='table' map={map}/>,
        ) : "";
        let m = React.createElement(IconMenuExampleControlled);
        let appbar_elements = React.createElement(AppBar, toolbarOptions, m, WFS_T, add_layer, AttributesTable, playback_button, measure, selection, navigation, edit_button, save_load_control, export_image, query_button, charts_button, geocoding);
        const Scalebar = appConfig.showScalebar ? map.addControl(new ol.control.ScaleLine({
            "minWidth": appConfig.scalebar_config.width,
            "units": appConfig.scalebar_config.units
        })) : "";
        /* end controllers */
        return (
            <div id='content'>

                {appbar_elements}
                {error}
                <MapPanel useHistory={true} id='map' map={map}/>
                {globe}
                {print}
                {homeBtn}
                {layerSwitcher}
                {geolocation}
                {zoomControls}
                {rotate}
                {about}
                {load}
                {geocoding_results}
                {query_panel}
                {table_panel}
                {WFS_T_panel}
                {North}
                {charts_panel}
                {edit_panel}
                {zoom_slider}
                {playback_panel}
                <div id='popup' className='ol-popup'><InfoPopup toggleGroup='navigation' toolId='nav'
                                                                infoFormat='application/vnd.ogc.gml' map={map}/>
                </div>
            </div>
        );
    }
}
// GeoNodeViewer.props = {
//     config: React.PropTypes.object,
//     proxy: React.PropTypes.string
// };
GeoNodeViewer.props = {
    config: React.PropTypes.object,
    proxy: React.PropTypes.string,
    mode: React.PropTypes.string,
    server: React.PropTypes.string,
};

GeoNodeViewer.childContextTypes = {
    muiTheme: React.PropTypes.object
};
class GeoNodeViewerDebug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {config: this.props.config};
        this.config = JSON.stringify(this.props.config);
        const qry = this.uriVars();

        this.fetchConfigFromUrl(configURL);
        this.configUrl = configURL;

    }

    proxyUrl(url) {
        return url;
        // return ('https://cors-anywhere.herokuapp.com/'+url);
    }

    uriVars(str) {
        let vars = {};
        str = str || window.location.href;
        var hashes = str.slice(str.indexOf('?') + 1).split('&');
        for (var i = 0, len = hashes.length; i < len; i++) {
            var hash = hashes[i].split('=');
            vars[hash[0]] = decodeURIComponent(hash[1]);
        }
        return vars;
    }

    fetchConfigFromUrl(url) {
        fetch(url).then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        }).then((json) => {
            if (json) {
                this.setState({config: json});
            }
        });
    }

    // configUrlChange(config) {
    //   this.configUrl = config;
    //   this.fetchConfigFromUrl(this.proxyUrl(config));
    //   window.location.search = '?config='+config;
    // }
    render() {
        return (
            <div>

                <GeoNodeViewer config={this.state.config} proxy={PROXY_URL}/>
            </div>
        )
    }
}
class Viewer {
    constructor(domId, config) {
        this.domId = domId;
        this.mapConfig = config;
    }

    set config(value) {
        this.mapConfig = config;
    }

    view() {
        ReactDOM.render(<IntlProvider locale='en'>
            <GeoNodeViewerDebug config={this.mapConfig}/>
        </IntlProvider>, document.getElementById(this.domId));
    }
}

let viewer = new Viewer('main');
viewer.view();