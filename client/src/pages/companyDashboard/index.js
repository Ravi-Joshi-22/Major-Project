import React from 'react';
import { connect } from 'react-redux';
import Title from '../../components/companyDashboard/Title';
import MainArea from '../../components/companyDashboard/MainArea';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NavDrawer from '../../components/companyDashboard/NavDrawer';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class CompanyDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        const fabStyle = {
            marginLeft: 200,
            marginTop: 10,
          };
        console.log(this.props);
        return (
            <div className="container">
                <MuiThemeProvider>
                    <Title />
                    <RaisedButton
                        label="Toggle Drawer"
                        onClick={this.handleToggle}
                    />
                    <Drawer open={this.state.open}>
                        <div>
                            <FloatingActionButton mini={true} style={fabStyle} onClick={this.handleToggle} backgroundColor="red" iconClassName="fa fa-times-circle"/>
                            <NavDrawer close={() => this.setState({open: !this.state.open})} />
                        </div>
                    </Drawer>
                    <MainArea />
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapStateToProps({ company }) {
    return { company };
}
export default connect(mapStateToProps)(CompanyDashboard);