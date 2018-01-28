import React from 'react';

export default class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: '',
            organization: '',
            location: '',
            home: '',
            start_date: '',
            end_date: '',
            curently_working: '',
            description: '',
            currentModalClass: 'modal',




        };
        this.updateProfile = this.updateProfile.bind(this);
        this.updateOrganization = this.updateOrganization.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateEnd = this.updateEnd.bind(this);
        this.updateOngoing = this.updateOngoing.bind(this);
        this.updatedDescription = this.updatedDescription.bind(this);
        this.submit = this.submit.bind(this);
        this.renderModal = this.renderModal.bind(this);



    }
    updateProfile(e) {
        this.setState({ profile: e.target.value });
    }
    updateOrganization(e) {
        this.setState({ organization: e.target.value });
    }
    updateLocation(e) {
        this.setState({ location: e.target.value });
    }
    updateStart(e) {
        this.setState({ start_date: e.target.value });
    }

    updateEnd(e) {
        this.setState({ end_date: e.target.value });
    }
    updateOngoing(e) {
        this.setState({ curently_working: e.target.value });
        
    }
    updatedDescription(e) {
        this.setState({ description: e.target.value });
    }
    
    async renderModal() {
        if (this.state.currentModalClass === 'modal') {
            await this.setState({ currentModalClass: 'modal is-active' });
        } else {
            await this.setState({ currentModalClass: 'modal' });
        }
    }
    async submit() {
        await this.setState({ currentModalClass: "modal" });
        this.props.userCB(this.state);
      }
    
    render() {
        return (

            <div >

                <div className={this.state.currentModalClass}>

                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Job Details</p>
                            <button class="delete" aria-label="close" onClick={this.renderModal}></button>
                        </header>
                        <section class="modal-card-body">


                            <div className="field">
                                <label className="label">Profile</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="Ex:operations" required value={this.state.profile} onChange={this.updateProfile} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-user" ></i>

                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Organization</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="Ex:TCS" required value={this.state.organization} onChange={this.updateOrganization} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-building" ></i>

                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Location</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="Ex:Indore" required value={this.state.location} onChange={this.updateLocation} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-globe" ></i>

                                    </span>
                                </div>
                            </div>

                            <label class="label">Job Duration</label>
                            <div style={{ display: 'flex' }}>
                                <div class="field" style={{ width: '47%', marginRight: '5%' }} >
                                    <label class="label">Start date</label>
                                    <p class="control has-icons-left ">
                                        <input class="input" type="date" required value={this.state.start_date} onChange={this.updateStart} />

                                        <span class="icon is-small is-left">
                                            <i class="fa fa-calendar"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="field" style={{ width: '50%' }}  >
                                    <label class="label">End day</label>
                                    <p class="control has-icons-left ">

                                        <input class="input" type="date" required value={this.state.end_date} onChange={this.updateEnd} />


                                        <span class="icon is-small is-left">
                                            <i class="fa fa-calendar"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <label class="checkbox">
                                <input type="checkbox" value={this.state.curently_working} onChange={this.updateOngoing} />
                                Currently working here
                        </label>
                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control has-icons-left has-icons-right">
                                    <textarea class="textarea is-hovered" type="text" placeholder="Job Description" value={this.state.description} onChange={this.updateDe}></textarea>


                                </div>
                            </div>


                           
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-primary is-rounded"  onClick={this.submit}>Save changes</button>
                          
                        </footer>
                    </div>
                </div>
                <a class="button is-black is-inverted  is-hovered" onClick={this.renderModal}> +Add Jobs </a>



            </div>



        );
    }
}