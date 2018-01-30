import React from 'react';
import CompanyDetails from './MainArea/CompanyDetails';

export default class MainArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div>
                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-8">
                        <div class="tile">
                        <div class="tile is-parent is-vertical">
                            <article class="tile is-child notification is-primary">
                                <p class="title">Company</p>
                                <p class="subtitle">Details</p>
                                <CompanyDetails />
                            </article>
                            <article class="tile is-child notification is-warning">
                                <p class="title">Current</p>
                                <p class="subtitle">Openings</p>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child notification is-info">
                                <p class="title">Unknown</p>
                                <p class="subtitle">Graph</p>
                                <figure class="image is-4by3">
                                    <img src="./Assets/graph.png" />
                                </figure>
                            </article>
                        </div>
                        </div>
                        <div class="tile is-parent">
                        <article class="tile is-child notification is-danger">
                            <p class="title">Closed</p>
                            <p class="subtitle">Openings</p>
                            <div class="content">

                            </div>
                        </article>
                        </div>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child notification is-success">
                        <div class="content">
                            <p class="title">Recent</p>
                            <p class="subtitle">Reports</p>
                            <div class="content">

                            </div>
                        </div>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}

