// import Viewer from './viewer.jsx';
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

// addLocaleData(
//   enLocaleData
// );

var map = new ol.Map({
  controls: [new ol.control.Attribution({collapsible: false}), new ol.control.ScaleLine()],
  layers: [
    new ol.layer.Tile({title: 'OpenStreetMap', source: new ol.source.OSM()})
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
  _handleRequestClose() {
    this.setState({
      errorOpen: false
    });
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
    const globe = appConfig.show3D ? <div id='globe-button'><Globe tooltipPosition='right' map={map} /></div> : ''
    const print = appConfig.showPrint ? <div id='print-button'><QGISPrint menu={false} map={map} layouts={printLayouts} /></div> : ''
    const homeBtn = appConfig.showHome ? <div id='home-button'><HomeButton tooltipPosition='right' map={map} /></div> : ''
    const layerSwitcher = appConfig.showLayerSwitcher ? <div><LayerList allowReordering={true} includeLegend={appConfig.showLegend} allowRemove={false} tooltipPosition='left' allowStyling={false} map={map} /></div> : ''
    const zoomBar =  appConfig.showZoombar ?   <div id='zoom-buttons'><Zoom tooltipPosition='right' map={map} /></div> : ''
    const rotate = appConfig.showRotate ? <div id='rotate-button'><Rotate autoHide={true} tooltipPosition='right' map={map} /></div> : ''
    return (
       <div id='content'>
        {error}
        <MapPanel useHistory={true} id='map' map={map} />
         {globe}
         {print}
         {homeBtn}
         {layerSwitcher}
         {zoomBar}
         {rotate}
        <div id='popup' className='ol-popup'><InfoPopup toggleGroup='navigation' toolId='nav' infoFormat='application/vnd.ogc.gml' map={map} /></div>
      </div>
    );
  }
}

GeoNodeViewer.props = {
  config: React.PropTypes.object,
  proxy: React.PropTypes.string
};

GeoNodeViewer.childContextTypes = {
  muiTheme: React.PropTypes.object
};
class GeoNodeViewerDebug extends React.Component {
  constructor(props) {
    super(props);
    this.state = { config: this.props.config };
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
    for(var i=0,len=hashes.length;i<len;i++){
      var hash = hashes[i].split('=');
      vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
  }
  fetchConfigFromUrl(url) {
    fetch(url).then((response) => {
      if(response.status == 200) {
        return response.json();
      }
    }).then((json) => {
      if(json) {
        this.setState( { config: json});
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

        <GeoNodeViewer config={this.state.config} proxy={PROXY_URL} />
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
    ReactDOM.render(<IntlProvider locale='en' >
      <GeoNodeViewerDebug config={this.mapConfig} />
    </IntlProvider>, document.getElementById(this.domId));
  }
}
let viewer = new Viewer('main');
viewer.view();