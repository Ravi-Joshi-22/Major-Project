import React from "react";
import ElligibleTitle from "./Home/elligibleTitle";
import PrefsCard from "./Home/preferencesCard";
import FilterCard from "./Home/filterCard";
import ElligibleOpenings from "./Home/elligibleOpenings";
import Card from "material-ui/Card";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div className="columns">
                    <div className="column is-8">
                        <ElligibleTitle muiTheme={this.props.muiTheme} />
                        <Card style={{ padding: 5, margin: 20 }}>
                            <ElligibleOpenings muiTheme={this.props.muiTheme} />
                        </Card>
                    </div>
                    <div className="column is-4">
                        <PrefsCard muiTheme={this.props.muiTheme} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
