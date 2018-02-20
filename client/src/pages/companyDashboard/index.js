import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/company';
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
        this.renderMain = this.renderMain.bind(this);
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

    async componentDidMount(){
        await this.props.fetchDash();
    }

    renderTitle(){
        if(this.props.companyDash){
            return this.props.companyDash.credits;
        }else{
            return 0;
        }
    }

    renderMain(){
        if(this.props.companyDash){
            console.log("3" + this.props.companyDash.company_name + this.props.companyDash.address.city);
            let companyDetails = {
                name: this.props.companyDash.company_name,
                cin: this.props.companyDash.company_cin,
                phone: this.props.companyDash.company_phone,
                website: this.props.companyDash.company_website,
                logo: this.props.companyDash.company_logo,
                country: this.props.companyDash.address.country,
                line: this.props.companyDash.address.address_line,
                city: this.props.companyDash.address.city,
                pin: this.props.companyDash.address.pin,
                state: this.props.companyDash.address.state,
            };
            return companyDetails;
        }else{
            let companyDetails = {
                name: "",
                cin: "",
                phone: "",
                website: "",
                logo: "",
                country: "",
                line: "",
                city: "",
                pin: "",
                state: "",
            };
            return companyDetails;   
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
                    <div>
                        <FloatingActionButton onClick={this.handleToggle} backgroundColor="white" iconClassName="fa fa-bars" iconStyle={blackiconcolor} style={fabOpenStyle}/>
                        <div style={contentStyle}>
                            <InterviewOpening currentModalClass={this.state.currentModalClass} openingCallback={this.openingForm}  />
                            <Title credits={this.renderTitle()} />
                            <Drawer 
                                docked={false}
                                width={300}
                                open={this.state.open}
                                onRequestChange={(open) => this.setState({open})}>
                                <div>
                                    <NavDrawer close={() => this.setState({open: !this.state.open})} openingCallback={this.openingForm} />
                                </div>
                            </Drawer>
                            <MainArea dashData={this.renderMain()}/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapStateToProps({ company, companyDash }) {
    return { company, companyDash };
}
export default connect(mapStateToProps, actions)(CompanyDashboard);