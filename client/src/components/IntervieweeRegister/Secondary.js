import React from 'react';

export default class Secondary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year_of_comp: '',
            board: '',
            performance: '',
            value: '',
            school: '',
            currentModalClass: 'modal',

        };
        this.updateYearOfCompletion = this.updateYearOfCompletion.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateMarks = this.updateMarks.bind(this);
        this.updateSchool = this.updateSchool.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.submit = this.submit.bind(this);


    }

    updateYearOfCompletion(e) {
        this.setState({ year_of_comp: e.target.value });
    }

    updateBoard(e) {
        this.setState({ board: e.target.value });
    }


    updateCategory(e) {
        this.setState({ performance: e.target.value });

    }

    updateMarks(e) {
       
        const {
        scale,
            value
      } = this.state;
        if (performance === 'Percentage') {
            if ( e.target.value< 100) {
                this.setState({ value: e.target.value });
                this.refs.marksInput.className = "input is-success";
            }
        }
        else if (performance=== 'CGPA(Scale of 10)') {

            if ( e.target.value< 10) {
                this.setState({ value: e.target.value });
                this.refs.marksInput.className = "input is-success";
            }

        }
        else {
            this.refs.marksInput.className = "input is-danger";
        }
    }



    updateSchool(e) {
        this.setState({ school: e.target.value });

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
        this.props.scCB(this.state);
      }

    render() {
        return (
            <div>

                <div className={this.state.currentModalClass}>

                    <div class="modal-background">
                        
                           
                        
                    </div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Secondary Education Details</p>
                            <button class="delete" aria-label="close" onClick={this.renderModal}></button>
                        </header>
                        <section class="modal-card-body">
                        
                            <div class="field ">
                                <label class="label">Year Of Completion</label>
                                <p class="control has-icons-left ">
                                    <span class="select is-fullwidth ">
                                        <select required value={this.state.year_of_comp} onChange={this.updateYearOfCompletion}>
                                            <option selected>Choose year</option>
                                            <option>2016</option><option>2015</option><option>2014</option>
                                            <option>2013</option><option>2012</option><option>2011</option><option>2010</option><option>2009</option>
                                            <option>2008</option><option>2007</option><option>2006</option><option>2005</option><option>2004</option>
                                            <option>2003</option><option>2002</option><option>2001</option><option>2000</option><option>1999</option>
                                            <option>1998</option><option>1997</option><option>1996</option><option>1995</option><option>1994</option>
                                            <option>1993</option><option>1992</option><option>1991</option><option>1990</option><option>1889</option>

                                        </select>
                                    </span>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-graduation-cap"></i>
                                    </span>
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Board</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="Ex: CBSE" required value={this.state.board} onChange={this.updateBoard} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-book" ></i>

                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div class="field" style={{ width: '47%', marginRight: '5%' }}>
                                    <label class="label">Performance Scale</label>
                                    <p class="control has-icons-left ">
                                        <span class="select is-fullwidth ">
                                            <select value={this.state.performance} onChange={this.updateCategory}>
                                            <option selected>Choose option</option>
                                                <option>Percentage</option>
                                                <option>CGPA(Scale of 10)</option>
                                            </select>
                                        </span>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-inbox" aria-hidden="true"></i>
                                        </span>

                                    </p>
                                </div>

                                <div class="field" style={{ width: '47%' }}>
                                    <label className="label ">Performance</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input ref="marksInput" className="input" type="number" placeholder="0.00" value={this.state.value} onChange={this.updateMarks} />
                                        <span className="icon is-small is-left">
                                            <i class="fa fa-percent" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">School</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input ref="nameInput" className="input" type="text" placeholder="Ex: Delhi public School" required value={this.state.school} onChange={this.updateSchool} />
                                    <span className="icon is-small is-left">
                                        <i class="fa fa-university" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>

                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-primary is-rounded " onClick={this.submit}>Save changes</button>
                           
                        </footer>
                    </div>
                </div>
                <a class="button is-black is-inverted  is-hovered" onClick={this.renderModal}> +Add Secondary </a>


            </div>

        );
    }
}