import React from 'react';
export default class Skills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            currentModalClass: 'modal',
            rate: 'Intermediate',


        };
        this.updateSkills = this.updateSkills.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.submit = this.submit.bind(this);

    }
    updateSkills(e) {
        this.setState({ name: e.target.value });
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
        this.props.skillCB(this.state);
      }

    render() {
        return (
            <div >
                <div className={this.state.currentModalClass}>

                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Skills Acquired </p>
                            <button class="delete" aria-label="close" onClick={this.renderModal}></button>
                        </header>
                        <section class="modal-card-body">

                            <div className="field">
                                <label className="label">Skills</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input ref="nameInput" className="input" type="text" placeholder="Skills" value={this.state.name} onChange={this.updateSkills} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-tags"></i>
                                    </span>
                                </div>
                            </div>


                           
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-primary is-rounded" onClick={this.submit}>Save changes</button>
                            
                        </footer>
                    </div>
                </div>
                <a class="button is-black is-inverted  is-hovered" onClick={this.renderModal}> +Add Skills </a>


            </div>
        );
    }
}