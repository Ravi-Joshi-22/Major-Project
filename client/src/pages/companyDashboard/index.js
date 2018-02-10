import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import Title from '../../components/companyDashboard/Title';
import MainArea from '../../components/companyDashboard/MainArea';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import NavDrawer from '../../components/companyDashboard/NavDrawer';
import InterviewOpening from '../../components/companyDashboard/DrawerArea/InterviewOpening';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class CompanyDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentModalClass: "modal"
        };
        this.openingForm = this.openingForm.bind(this);
    }

    handleToggle = () => this.setState({open: !this.state.open});
    
    async openingForm(){
        if (this.state.currentModalClass === "modal") {
            this.handleToggle();
            await this.setState({ currentModalClass: "modal is-active" });
          } else {
            await this.setState({ currentModalClass: "modal" });
          }
    }

    render() {
        const fabOpenStyle = {
            marginLeft: -80,
            marginTop: 10,
          };
        const blackiconcolor = {
            color: "#4a4a4a",
          };
        const contentStyle = {
            marginTop: -60,
          };
        return (
            <div>
                <MuiThemeProvider>
                    <FloatingActionButton onClick={this.handleToggle} backgroundColor="white" iconClassName="fa fa-bars" iconStyle={blackiconcolor} style={fabOpenStyle}/>
                    <div style={contentStyle}>
                        <InterviewOpening currentModalClass={this.state.currentModalClass} openingCallback={this.openingForm}  />
                        <Title />
                        <Drawer 
                            docked={false}
                            width={300}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({open})}>
                            <div>
                                <NavDrawer close={() => this.setState({open: !this.state.open})} openingCallback={this.openingForm} />
                            </div>
                        </Drawer>
                        <MainArea />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapStateToProps({ company }) {
    return { company };
}
export default connect(mapStateToProps)(CompanyDashboard);
