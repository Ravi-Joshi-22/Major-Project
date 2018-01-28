import React from 'react';

export default class Certification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            authority: '',
            lic_number: '',
            url: '',
            currentModalClass: 'modal',



        };
        this.updateName = this.updateName.bind(this);
        this.updateAuthority = this.updateAuthority.bind(this);
        this.updatedLic_no = this.updatedLic_no.bind(this);
        this.updateUrl = this.updateUrl.bind(this);
        this.submit = this.submit.bind(this);
        this.renderModal = this.renderModal.bind(this);

    }
    updateName(e) {
        this.setState({ name: e.target.value });
    }
    updateAuthority(e) {
        this.setState({ authority: e.target.value });
    }
    updatedLic_no(e) {
        this.setState({ lic_number: e.target.value });
    }
    updateUrl(e) {
        this.setState({ url: e.target.value });
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
        this.props.certiCB(this.state);
      }

    render() {
        return (

            <div >
                <div className={this.state.currentModalClass}>

                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Certification</p>
                            <button class="delete" aria-label="close" onClick={this.renderModal}></button>
                        </header>
                        <section class="modal-card-body">


                            <div className="field">
                                <label className="label">Certificate Name</label>
                                <div className="control has-icons-left ">
                                    <input className="input" type="text" placeholder="NGO" required value={this.state.name} onChange={this.updateName} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-certificate" ></i>

                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Authority</label>
                                <div className="control has-icons-left ">
                                    <input className="input" type="text" placeholder="Organization" required value={this.state.authority} onChange={this.updateAuthority} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-university" ></i>

                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> LIC_NO</label>
                                <div className="control has-icons-left ">
                                    <input className="input" type="number" placeholder=" Certificate LIC_NO" required value={this.state.lic_number} onChange={this.updatedLic_no} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-id-card" ></i>

                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Certificate URL</label>
                                <div className="control has-icons-left ">
                                    <input className="input" type="url" pattern="https?://.+" placeholder=" http://www.example.com" required value={this.state.url} onChange={this.updateUrl} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-envelope-open" ></i>

                                    </span>
                                </div>
                            </div>






                            

                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-primary is-rounded" onClick={this.submit}>Save changes</button>
                            
                        </footer>
                    </div>
                </div>
                <a class="button is-black is-inverted  is-hovered" onClick={this.renderModal}> +Add Certificate </a>


            </div>



        );
    }
}