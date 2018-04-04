import React from 'react';
import * as actions from '../../../actions/interviewee/education';
import { connect } from 'react-redux';

class Graduation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      college: '',
      start_year: '',
      end_year: '',
      degree: '',
      stream: '',
      scale: '',
      value: '',
      currentModalClass: 'modal',
    };

    this.updateCollege = this.updateCollege.bind(this);
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.updateDegree = this.updateDegree.bind(this);
    this.updateStream = this.updateStream.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateMarks = this.updateMarks.bind(this);
    this.submit = this.submit.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }
  updateCollege(e) {
    this.setState({ college: e.target.value });
  }

  updateStart(e) {
    this.setState({ start_year: e.target.value });
  }

  updateEnd(e) {
    this.setState({ end_year: e.target.value });
  }
  updateDegree(e) {
    this.setState({ degree: e.target.value });
  }
  updateStream(e) {
    this.setState({ stream: e.target.value });
  }
  updateCategory(e) {
    this.setState({ scale: e.target.value });
  }

  updateMarks(e) {
    const { scale, value } = this.state;
    if (scale === 'Percentage') {
      if (e.target.value < 100) {
        this.setState({ value: e.target.value });
        this.refs.marksInput.className = 'input is-success';
      }
    } else if (scale === 'CGPA(Scale of 10)') {
      if (e.target.value < 10) {
        this.setState({ value: e.target.value });
        this.refs.marksInput.className = 'input is-success';
      }
    } else {
      this.refs.marksInput.className = 'input is-danger';
    }
  }

  async renderModal() {
    if (this.state.currentModalClass === 'modal') {
      await this.setState({ currentModalClass: 'modal is-active' });
    } else {
      await this.setState({ currentModalClass: 'modal' });
    }
  }

  async submit() {
    await this.setState({ currentModalClass: 'modal' });
    const perfObj = {
      scale: this.state.scale,
      value: this.state.value,
    };
    const degreeobj = this.state;
    degreeobj.performance = perfObj;
    const requestObject = {
      degree: degreeobj,
    };
    this.props.addDegree(requestObject);
  }

  render() {
    return (
      <div>
        <div className={this.state.currentModalClass}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title"> Graduation Details</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              <div className="field">
                <label className="label">College</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ex: Medicaps University"
                    required
                    value={this.state.college}
                    onChange={this.updateCollege}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-university" />
                  </span>
                </div>
              </div>
              <label class="label">Year Of Course</label>
              <div style={{ display: 'flex' }}>
                <div class="field" style={{ width: '47%', marginRight: '5%' }}>
                  <label class="label">Start year</label>
                  <p class="control has-icons-left ">
                    <span class="select is-fullwidth ">
                      <select
                        required
                        value={this.state.start_year}
                        onChange={this.updateStart}
                      >
                        <option selected>Choose year</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                        <option>2009</option>
                        <option>2008</option>
                        <option>2007</option>
                        <option>2006</option>
                        <option>2005</option>
                        <option>2004</option>
                        <option>2003</option>
                        <option>2002</option>
                        <option>2001</option>
                        <option>2000</option>
                        <option>1999</option>
                        <option>1998</option>
                        <option>1997</option>
                        <option>1996</option>
                        <option>1995</option>
                        <option>1994</option>
                        <option>1993</option>
                        <option>1992</option>
                        <option>1991</option>
                        <option>1990</option>
                        <option>1889</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-calendar" />
                    </span>
                  </p>
                </div>
                <div class="field" style={{ width: '50%' }}>
                  <label class="label">End year</label>
                  <p class="control has-icons-left ">
                    <span class="select is-fullwidth">
                      <select
                        required
                        value={this.state.end_year}
                        onChange={this.updateEnd}
                      >
                        <option selected>Choose year</option>
                        <option>2016</option>
                        <option>2015</option>
                        <option>2014</option>
                        <option>2013</option>
                        <option>2012</option>
                        <option>2011</option>
                        <option>2010</option>
                        <option>2009</option>
                        <option>2008</option>
                        <option>2007</option>
                        <option>2006</option>
                        <option>2005</option>
                        <option>2004</option>
                        <option>2003</option>
                        <option>2002</option>
                        <option>2001</option>
                        <option>2000</option>
                        <option>1999</option>
                        <option>1998</option>
                        <option>1997</option>
                        <option>1996</option>
                        <option>1995</option>
                        <option>1994</option>
                        <option>1993</option>
                        <option>1992</option>
                        <option>1991</option>
                        <option>1990</option>
                        <option>1889</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-calendar" />
                    </span>
                  </p>
                </div>
              </div>

              <div class="field">
                <label class="label">Degree</label>
                <p class="control has-icons-left ">
                  <input
                    ref="nameInput"
                    className="input"
                    type="text"
                    placeholder="Degree"
                    required
                    value={this.state.degree}
                    onChange={this.updateDegree}
                  />

                  <span class="icon is-small is-left">
                    <i class="fa fa-book" aria-hidden="true" />
                  </span>
                </p>
              </div>
              <div class="field">
                <label class="label">Stream</label>
                <p class="control has-icons-left ">
                  <span class="select is-fullwidth">
                    <select
                      required
                      value={this.state.stream}
                      onChange={this.updateStream}
                    >
                      <option selected>Choose Stream</option>
                      <option>Computer Science</option>
                      <option>Information Technology</option>
                      <option>Electrical and Electronics</option>
                      <option>Electronic and Communication</option>
                      <option>Mechanical</option>
                    </select>
                  </span>
                  <span class="icon is-small is-left">
                    <i class="fa fa-folder" aria-hidden="true" />
                  </span>
                </p>
              </div>
              <div style={{ display: 'flex' }}>
                <div class="field" style={{ width: '47%', marginRight: '5%' }}>
                  <label class="label">Performance Scale</label>
                  <p class="control has-icons-left ">
                    <span class="select is-fullwidth ">
                      <select
                        required
                        value={this.state.scale}
                        onChange={this.updateCategory}
                      >
                        <option selected>Choose option</option>
                        <option>Percentage</option>
                        <option>CGPA(Scale of 10)</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-inbox" aria-hidden="true" />
                    </span>
                  </p>
                </div>

                <div class="field" style={{ width: '48%' }}>
                  <label className="label ">Performance</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="marksInput"
                      className="input"
                      type="number"
                      placeholder="0.00"
                      required
                      value={this.state.value}
                      onChange={this.updateMarks}
                    />
                    <span className="icon is-small is-left">
                      <i class="fa fa-percent" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button
                class="button is-right is-primary  is-rounded"
                onClick={this.submit}
              >
                Save changes
              </button>
            </footer>
          </div>
        </div>
        <a
          class="button is-black is-inverted  is-hovered"
          onClick={this.renderModal}
        >
          {' '}
          +Add Graduation{' '}
        </a>
      </div>
    );
  }
}
export default connect(null, actions)(Graduation);
