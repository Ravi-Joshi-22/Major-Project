import React from 'react';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Payment from './payment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderContent() {
        if (this.props.company) {
            return <div>{this.props.company.credits}</div>;
        } else {
            return <div>0</div>;
        }
    }

    render() {
        return (
            <div>
            <MuiThemeProvider>
                <nav class="navbar is-transparent">
                    <div class="navbar-brand">
                        <a class="" href="#">
                        <img src="./Assets/image.svg" alt="SmartHyre"  width="112" height="28"/>
                        </a>
                    </div>

                    <div id="navbarExampleTransparentExample" class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item" href="">
                                Home
                            </a>
                        </div>

                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="field is-grouped">
                                    <p class="control">
                                        <span class="tag is-large">{this.renderContent()} &nbsp;
                                            <Payment />
                                        </span>
                                    </p>

                                    <p class="control">
                                        <div class="navbar-item has-dropdown is-hoverable">
                                            <a class="navbar-link" href="#">
                                                <Avatar
                                                src="./Assets/Employee.svg"
                                                size={30}
                                                />
                                            </a>
                                            <div class="navbar-dropdown is-boxed">
                                                <a class="navbar-item" href="#">
                                                    Profile
                                                </a>
                                                <hr class="navbar-divider"/>
                                                <a class="navbar-item is-active" href="#">
                                                    Logout
                                                </a>
                                            </div>
                                        </div>
                                    </p>
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

