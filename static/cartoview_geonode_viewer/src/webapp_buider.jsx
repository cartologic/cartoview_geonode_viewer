import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import ol from 'openlayers';
import './map'
import {IntlProvider} from 'react-intl';
global.IntlProvider = IntlProvider;
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CustomTheme from './theme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import ContentAdd from 'material-ui/svg-icons/action/view-list';
import MenuIcon from 'material-ui/svg-icons/image/dehaze';
import MapConfig from '@boundlessgeo/sdk/components/MapConfig';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ImageExport from '@boundlessgeo/sdk/components/ImageExport';
import Geocoding from '@boundlessgeo/sdk/components/Geocoding';
import AddLayerModal from '@boundlessgeo/sdk/components/AddLayerModal';
import CartoviewAbout from './cartoview_about';
import Bookmarks from '@boundlessgeo/sdk/components/Bookmarks';
import Chart from '@boundlessgeo/sdk/components/Chart';
import EditPopup from '@boundlessgeo/sdk/components/EditPopup';
import GeocodingResults from '@boundlessgeo/sdk/components/GeocodingResults';
import Geolocation from '@boundlessgeo/sdk/components/Geolocation';
import Globe from '@boundlessgeo/sdk/components/Globe';
import HomeButton from '@boundlessgeo/sdk/components/HomeButton';
import InfoPopup from '@boundlessgeo/sdk/components/InfoPopup';
import LayerList from '@boundlessgeo/sdk/components/LayerList';
import LoadingPanel from '@boundlessgeo/sdk/components/LoadingPanel';
import MapPanel from '@boundlessgeo/sdk/components/MapPanel';
import Measure from '@boundlessgeo/sdk/components/Measure';
import Playback from '@boundlessgeo/sdk/components/Playback';
import QGISPrint from '@boundlessgeo/sdk/components/QGISPrint';
import QueryBuilder from '@boundlessgeo/sdk/components/QueryBuilder';
import Rotate from '@boundlessgeo/sdk/components/Rotate';
import ToolActions from '@boundlessgeo/sdk/actions/ToolActions';
import DrawFeature from '@boundlessgeo/sdk/components/DrawFeature';
import Zoom from '@boundlessgeo/sdk/components/Zoom';
import BaseMapModal from '@boundlessgeo/sdk/components/BaseMapModal';
import '@boundlessgeo/sdk/dist/css/components.css';
import IconButton from 'material-ui/IconButton';
import MapConfigTransformService from '@boundlessgeo/sdk/services/MapConfigTransformService';
import MapConfigService from '@boundlessgeo/sdk/services/MapConfigService';
import './app.css';
import RaisedButton from 'material-ui/RaisedButton';
import Select from '@boundlessgeo/sdk/components/Select';
import Navigation from '@boundlessgeo/sdk/components/Navigation';
import Paper from 'material-ui/Paper';
import FeatureTable from '@boundlessgeo/sdk/components/FeatureTable';
import Header from '@boundlessgeo/sdk/components/Header';
import {lightBlue600} from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Button from '@boundlessgeo/sdk/components/Button';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
injectTapEventPlugin();

let printLayouts = [
  {
    name: 'Layout 1',
    width: 420.0,
    elements: [
      {
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
      }
    ],
    height: 297.0
  }
];
class CartoviewViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      errorOpen: false,
      addLayerModalOpen: false,
      baseMapModalOpen: false,
      infoModalOpen: false
    };
  }

  componentWillMount() {
    this.updateMap(this.props);
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(CustomTheme)};
  }

  componentWillReceiveProps(props) {
    this.updateMap(props);
  }

  updateMap(props) {
    if (props.config) {
      var tileServices = [];
      var errors = [];
      var filteredErrors = [];
      if (props.zoomToLayer && props.config.map.layers[props.config.map.layers.length - 1].bbox) {
        this._extent = props.config.map.layers[props.config.map.layers.length - 1].bbox;
      }
      MapConfigService.load(MapConfigTransformService.transform(props.config, errors, tileServices), map, this.props.proxy);
      for (var i = 0, ii = errors.length; i < ii; ++i) {
        // ignore the empty baselayer since we have checkbox now for base layer group
        // ignore the empty layer from the local source
        if (errors[i].layer.type !== 'OpenLayers.Layer' && errors[i].msg !== 'Unable to load layer undefined') {
          if (window.console && window.console.warn) {
            window.console.warn(errors[i]);
          }
          filteredErrors.push(errors[i]);
        }
      }
      this.setState({errors: filteredErrors, errorOpen: true, tileServices: tileServices});
    }
  }

  _handleRequestClose() {
    this.setState({errorOpen: false});
  }

  _handleRequestCloseModal() {
    this.setState({addLayerModalOpen: false});
  }
  _handleBaseMapCloseModal() {
    this.setState({baseMapModalOpen: false});
  }

  componentDidMount() {

    // if (appConfig.showMapOverView) {
    //     map.addControl(new ol.control.OverviewMap({
    //         className: 'ol-overviewmap ol-custom-overviewmap',
    //         collapsed: appConfig.overview_config.collapsed,
    //         layers: []
    //     }));
    // }
    if (appConfig.showMousePostion) {
      map.addControl(new ol.control.MousePosition({"projection": "EPSG:4326", "undefinedHTML": "<span style='color: black'>Out Of Map</span>", "coordinateFormat": ol.coordinate.createStringXY(4)}));
    }
    if (appConfig.showScalebar) {
      map.addControl(new ol.control.ScaleLine({"minWidth": appConfig.scalebar_config.width, "units": appConfig.scalebar_config.units}))
    }
    // if (appConfig.showZoomSlider) {
    //     map.addControl(new ol.control.ZoomSlider());
    // }
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

  _toggleAddLayerModal() {
    this.setState({addLayerModalOpen: true})
  }
  _toggleBaseMapModal() {
    this.refs.basemapmodal.getWrappedInstance().open();
  }

  _toggleChartPanel(evt) {
    // evt.preventDefault();
    this._toggle(document.getElementById('chart-panel'));
  }
  _toggleQuery() {
    this._toggle(document.getElementById('query-panel'));
  }
  _toggleFeatureTable() {
    this._toggle(document.getElementById('table'));
  }
  _toggleGeocoding() {
    this._toggle(document.getElementById('geocoding_paper'));
  }
  handleInfoOpen = () => {
    this.setState({infoModalOpen: true});
  };

  handleInfoClose = () => {
    this.setState({infoModalOpen: false});
  };
  render() {
    const actions = [< RaisedButton label = "Cancel" primary = {
        true
      }
      onTouchTap = {
        this.handleInfoClose
      } />]
    var error;
    if (this.state.errors.length > 0) {
      var msg = '';
      for (var i = 0, ii = this.state.errors.length; i < ii; i++) {
        msg += this.state.errors[i].msg + '. ';
      }
      error = (<Snackbar autoHideDuration={5000} open={this.state.errorOpen} message={msg} onRequestClose={this._handleRequestClose.bind(this)}/>);
    }
    /* controllers */
    let toolbarOptions = {
      style: {
        height: 71
      },
      showMenuIconButton: false,
      title: ""
    };
    toolbarOptions.title = title;
    const globe = appConfig.show3D
      ? <div id='globe-button'><Globe tooltipPosition='left' map={map}/></div>
      : '';
    const print = appConfig.showPrint
      ? <div id='print-button'><QGISPrint menu={false} map={map} layouts={printLayouts}/></div>
      : '';
    const homeBtn = appConfig.showHome
      ? <div id='home-button'><HomeButton tooltipPosition='left' map={map} extent={map.getView().calculateExtent(map.getSize())}/></div>
      : '';
    const layerSwitcher = appConfig.showLayerSwitcher
      ? <LayerList allowFiltering={true} showOpacity={true} allowStyling={true} downloadFormat={'GPX'} showDownload={true} allowRemove={true} showGroupContent={true} showZoomTo={true} allowLabeling={true} allowEditing={true} allowReordering={true} showTable={true} handleResolutionChange={true} includeLegend={appConfig.showLegend} map={map}/>
      : '';
    const zoomControls = appConfig.showZoomControls
      ? <div id='zoom-buttons'>
          <Zoom duration={appConfig.zoom_config.duration} zoomInTipLabel={appConfig.zoom_config.zoomInTipLabel} zoomOutTipLabel={appConfig.zoom_config.zoomOutTipLabel} delta={appConfig.zoom_config.delta} map={map}></Zoom>
        </div>
      : "";
    const query_panel = appConfig.showQuery
      ? <div id="query-panel" className='query-panel'>
          <QueryBuilder map={map}/>
          <RaisedButton label="cancel"/>
        </div>
      : "";
    const measure = appConfig.showMeasure
      ? <Measure toggleGroup='navigation' map={map}></Measure>
      : "";
    const playback_panel = appConfig.showPlayback
      ? <div id='timeline'><Playback map={map} minDate={appConfig.playback_config.minDate} maxDate={appConfig.playback_config.maxDate} interval={appConfig.playback_config.interval} numIntervals={appConfig.playback_config.numIntervals} autoPlay={appConfig.playback_config.autoPlay} className={"playback"}/></div>
      : "";
    const load = appConfig.showLoadingPanel
      ? <LoadingPanel map={map}></LoadingPanel>
      : "";
    var charts = appConfig.showCharts
      ? appConfig.charts
      : [];
    if (appConfig.showCharts && appConfig.charts.length != 0) {
      map.once('postrender', function(event) {
        for (var i = 0; i < map.getLayers().getArray().length; i++) {
          for (var j = 0; j < appConfig.charts.length; j++) {
            if (map.getLayers().item(i).get('name') == appConfig.charts[j].layer) {
              appConfig.charts[j].layer = map.getLayers().item(i).get('id')
            }

          }
        }
        for (var i = 0; i < appConfig.charts.length; i++) {
          appConfig.charts[i].displayMode = parseInt(appConfig.charts[i].displayMode);
          appConfig.charts[i].operation = parseInt(appConfig.charts[i].operation);
        }
      });
    }
    const add_layer_modal = appConfig.showAddLayerModal
      ? <Button className="sdk-component" tooltip="add layer " iconClassName='headerIcons fa fa-plus  ' style={this.props.style} buttonType='Icon' onTouchTap={(e) => this._toggleAddLayerModal(this)} mini={true}></Button>
      : "";
    const charts_button = appConfig.showCharts
      ? <FloatingActionButton className="charts_button" onTouchTap={(e) => {
          e.preventDefault();
          this._toggleChartPanel(this)
        }} mini={true}>
          <i className="fa fa-bar-chart"></i>
        </FloatingActionButton>
      : "";
    const infomodal_btn = <Button className="sdk-component" tooltip="About" iconClassName='headerIcons fa fa-info  ' style={this.props.style} buttonType='Icon' onTouchTap={this.handleInfoOpen.bind(this)} mini={true}></Button>
    const geoserver_modal = appConfig.showAddLayerModal
      ? <div><AddLayerModal open={this.state.addLayerModalOpen} onRequestClose={this._handleRequestCloseModal.bind(this)} map={map} srsName={map.getView().getProjection().getCode()} allowUserInput={true} sources={[{
            url: geoserver_url + 'wms',
            type: 'WMS',
            title: 'your GeoServer'
          }
        ]}/></div>
      : "";
    const charts_panel = (appConfig.showCharts && appConfig.charts.length != 0)
      ? <div id="chart-panel" className='chart-panel'><Chart ref='chartPanel' combo={true} charts={charts}/></div>
      : "";
    const geolocation = appConfig.showGeoLocation
      ? <div id="geolocation-control">
          <Geolocation map={map}></Geolocation>
        </div>
      : "";
    const North = appConfig.showNorth
      ? <div id="rotate-button">
          <Rotate autoHide={appConfig.north_config.autoHide} map={map}></Rotate>
        </div>
      : "";
    const WFST = appConfig.showWFS_T
      ? <DrawFeature map={map}></DrawFeature>
      : "";
    const geocoding_paper = appConfig.showGeoCoding
      ? <Paper id="geocoding_paper" zDepth={3}><Geocoding maxResult={5}/>
          <RaisedButton className="search-cancel-btn" label="canel" onTouchTap={this._toggleGeocoding.bind(this)}/><GeocodingResults map={map}/>

        </Paper>
      : "";
    let measure_tool = appConfig.showMeasure
      ? <Measure toggleGroup='navigation' map={map}/>
      : "";
    const save_load_control = appConfig.showmapconfig
      ? <MapConfig map={map}/>

      : "";
    const query_button = appConfig.showQuery
      ? <Button className="sdk-component" tooltip="add filter " iconClassName='headerIcons  fa fa-filter' style={this.props.style} buttonType='Icon' onTouchTap={this._toggleQuery.bind(this)} mini={true}></Button>
      : "";
    const search_button = appConfig.showGeoCoding
      ? <Button className="sdk-component" tooltip="Search " iconClassName='headerIcons  fa fa-search' style={this.props.style} buttonType='Icon' onTouchTap={this._toggleGeocoding.bind(this)} mini={true}></Button>
      : "";
    const basemap_button = appConfig.showBaseMapSelector
      ? <Button className="sdk-component" tooltip="select a base map" iconClassName='headerIcons  fa fa-map' style={this.props.style} buttonType='Icon' onTouchTap={this._toggleBaseMapModal.bind(this)} mini={true}></Button>
      : "";
    const base_map_modal = appConfig.showBaseMapSelector
      ? <BaseMapModal ref='basemapmodal' map={map}/>
      : "";
    const export_image = appConfig.showExportImage
      ? <ImageExport map={map}></ImageExport>
      : "";
    const about = appConfig.showAbout
      ? <CartoviewAbout/>
      : <IconButton iconClassName="fa fa-globe about-ico"></IconButton>;
    const selection = appConfig.showAttributesTable || appConfig.showCharts
      ? <Select toggleGroup='navigation' map={map}/>
      : "";
    const navigation = appConfig.showAttributesTable || appConfig.showCharts
      ? <Navigation secondary={true} toggleGroup='navigation' toolId='nav'/>
      : "";
    const infoModal = <Dialog title={title} actions={actions} modal={false} open={this.state.infoModalOpen} onRequestClose={this.handleInfoClose}>
      {abstract}
    </Dialog>
    const featuretable = <div id="table" className='row'><FeatureTable map={map} layer={map.getLayers().item(1)}/></div>
    const table_btn = appConfig.showAttributesTable
      ? <div id='table_btn'>
          <FloatingActionButton mini={true} onTouchTap={this._toggleFeatureTable.bind(this)}>
            <ContentAdd/>
          </FloatingActionButton>
        </div>
      : "";
    const app_toolbar = <Header title={title} showLeftIcon={false}>
      {infomodal_btn}
      {save_load_control}
      {query_button}
      {export_image}
      {WFST}
      {add_layer_modal}

      {search_button}
      {basemap_button}
      {measure_tool}
      {/*selection*/}
      {/*navigation*/}
    </Header>;
    let info_popup = appConfig.showInfoPopup
      ? <InfoPopup toggleGroup='navigation' toolId='nav' infoFormat='application/vnd.ogc.gml' map={map}/>
      : "";
    let edit_popup = appConfig.showEditPopup
      ? <EditPopup map={map}/>
      : "";
    if (appConfig.showEditPopup && appConfig.showInfoPopup) {
      info_popup = "";
    }
    /* end controllers */
    return (
      <div id='content'>
        {error}
        {app_toolbar}
        <MapPanel useHistory={true} id='map' map={map}/>
        <div style={{
          display: 'block',
          position: 'fixed',
          zIndex: 100,
          top: 100,
          right: 20
        }}>
          {layerSwitcher}
          {zoomControls}
          {homeBtn}
          {table_btn}
          {geolocation}
          {globe}
          {North}
          {load}
          {print}
        </div>
        {query_panel}
        {geoserver_modal}
        {base_map_modal}
        {infoModal}
        {geocoding_paper}
        <div id='popup' className='ol-popup'>
          {info_popup}
          {edit_popup}
        </div>
        {featuretable}
      </div>
    );
  }
}
CartoviewViewer.props = {
  config: React.PropTypes.object,
  proxy: React.PropTypes.string,
  mode: React.PropTypes.string,
  server: React.PropTypes.string
};
CartoviewViewer.childContextTypes = {
  muiTheme: React.PropTypes.object
};
export default CartoviewViewer;
global.CartoviewViewer = CartoviewViewer;
