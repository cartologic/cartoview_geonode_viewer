import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FeatureTable from 'boundless-sdk/components/FeatureTable';
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

export default class DrawerTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    _handleChange(value) {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <div id="tabs-panel" style={{display: 'inline-block'}}>
                <Tabs
                    value={this.state.value}
                    onChange={this._handleChange.bind(this)}
                >
                    <Tab label="Tab A" value="a">
                        <div id="attributes-table-tab"><FeatureTable ref='table' resizeTo='tabs-panel'
                                                                     map={map}/></div>
                    </Tab>
                    <Tab label="Tab B" value="b">
                        <div>
                            <h2 style={styles.headline}>Controllable Tab B</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you
                                use controllable Tabs, you need to give all of your tabs values or else
                                you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}