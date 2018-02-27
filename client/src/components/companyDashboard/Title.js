import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Payment from './payment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderContents(){
        if(this.props.company){
            return this.props.company.credits;
        }else{
            return this.props.credits;
        }
    }

    render() {
        return (
            <div>
            <MuiThemeProvider>
                <nav className="navbar is-transparent">
                    <div className="navbar-brand">
                        <a className="" href="#">
                        <img src="./Assets/image.svg" alt="SmartHyre"  width="112" height="28"/>
                        </a>
                    </div>

                    <div id="navbarExampleTransparentExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item" href="">
                                Home
                            </a>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="field is-grouped">
                                    <p className="control">
                                        <span className="tag is-large">{this.renderContents()} &nbsp;
                                            <Payment />
                                        </span>
                                    </p>

                                    <div className="control">
                                        <div className="navbar-item has-dropdown is-hoverable">
                                            <a className="navbar-link" href="#">
                                                <Avatar
                                                src="./Assets/Employee.svg"
                                                size={30}
                                                />
                                            </a>
                                            <div className="navbar-dropdown is-boxed">
                                                <a className="navbar-item" href="#">
                                                    Profile
                                                </a>
                                                <hr className="navbar-divider"/>
                                                <a className="navbar-item is-active" href="#">
                                                    Logout
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </MuiThemeProvider>
            </div>
        );
    }
}


function mapStateToProps({ company }) {
    return { company };
}
export default connect(mapStateToProps)(Title);