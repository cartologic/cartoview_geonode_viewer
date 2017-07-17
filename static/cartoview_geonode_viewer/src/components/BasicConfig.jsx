import React, {Component} from 'react';
import t from 'tcomb-form';
const mapConfig = t.struct({
  title: t.String,
  abstract: t.String,
  showZoomControls: t.Boolean,
  showNorth: t.Boolean,
  showMousePostion: t.Boolean,
  showLayerSwitcher: t.Boolean,
  showHome: t.Boolean,
  showGeoLocation: t.Boolean,
  show3D: t.Boolean,
  showBasemapSwitcher: t.Boolean,
  showLegend: t.Boolean,
});
const options = {
  fields: {
    showGeoLocation: {
      // you can use strings or JSX
      label: "Show Geo Location"
    },
    show3D: {
      // you can use strings or JSX
      label: "Show 3D"
    },
    showZoomControls: {
      // you can use strings or JSX
      label: "Show Zoom Buttons"
    },
    showNorth: {
      // you can use strings or JSX
      label: "Show North Button"
    },
    showMousePostion: {
      // you can use strings or JSX
      label: "Show Mouse Location"
    },
    showLayerSwitcher: {
      // you can use strings or JSX
      label: "Show Layer Switcher Button"
    },
    showHome: {
      // you can use strings or JSX
      label: "Show Initial Extent Button"
    },
    showBasemapSwitcher: {
      // you can use strings or JSX
      label: "Show Base Switcher Button"
    },
    showLegend: {
      // you can use strings or JSX
      label: "Show Layer Legend"
    },
  }
};
const Form = t.form.Form;
export default class BasicConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultconf: {
        title: this.props.instance.title || "No Title Provided",
        abstract: this.props.instance.abstract || "No Abstract Provided",
        showZoomControls: this.props.config
          ? this.props.config.showZoomControls
          : true,
        showNorth: this.props.config
          ? this.props.config.showNorth
          : true,
        showMousePostion: this.props.config
          ? this.props.config.showMousePostion
          : true,
        showHome: this.props.config
          ? this.props.config.showHome
          : true,
        showGeoLocation: this.props.config
          ? this.props.config.showGeoLocation
          : true,
        show3D: this.props.config
          ? this.props.config.show3D
          : true,
        showGeoCoding: this.props.config
          ? this.props.config.showGeoCoding
          : true,
        showLayerSwitcher: this.props.config
          ? this.props.config.showLayerSwitcher
          : true,
        showBasemapSwitcher: this.props.config
          ? this.props.config.showBasemapSwitcher
          : true,
        showLegend: this.props.config
          ? this.props.config.showLegend
          : true
      }
    }
  }
  componentDidMount() {}
  save() {
    var basicConfig = this.refs.form.getValue();
    if (basicConfig) {
      const properConfig = {
        title: basicConfig.title,
        abstract: basicConfig.abstract,
        config: {
          showZoomControls: basicConfig.showZoomControls,
          showNorth: basicConfig.showNorth,
          showMousePostion: basicConfig.showMousePostion,
          showLayerSwitcher: basicConfig.showLayerSwitcher,
          showHome: basicConfig.showHome,
          showGeoLocation: basicConfig.showGeoLocation,
          show3D: basicConfig.show3D,
          showBasemapSwitcher: basicConfig.showBasemapSwitcher,
          showLegend: basicConfig.showLegend,
        }
      }
      this.props.onComplete(properConfig)
    }
  }
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <h2>{'General & Map Navigation'}</h2>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <button className="btn btn-primary pull-right" onClick={this.save.bind(this)}>Next</button>
          </div>

        </div>
        <hr></hr>
        <Form ref="form" value={this.state.defaultconf} type={mapConfig} options={options}/>
      </div>
    )
  }
}