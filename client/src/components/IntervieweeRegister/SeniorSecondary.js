import React from "react";

export default class SeniorSecondary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year_of_comp: "",
      board: "",
      performance: "",
      value: "",
      stream: "",
      school: "",
      currentModalClass: "modal"
    };
    this.updateYearOfCompletion = this.updateYearOfCompletion.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateMarks = this.updateMarks.bind(this);
    this.updateStream = this.updateStream.bind(this);
    this.updateSchool = this.updateSchool.bind(this);
    this.submit = this.submit.bind(this);
    this.renderModal = this.renderModal.bind(this);
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
    const { performance, value } = this.state;
    if (performance === "Percentage") {
      if (e.target.value < 100) {
        this.setState({ value: e.target.value });
        this.refs.marksInput.className = "input is-success";
      }
    } else if (performance === "CGPA(Scale of 10)") {
      if (e.target.value < 10) {
        this.setState({ value: e.target.value });
        this.refs.marksInput.className = "input is-success";
      }
    } else {
      this.refs.marksInput.className = "input is-danger";
    }
  }

  updateStream(e) {
    this.setState({ stream: e.target.value });
  }
  updateSchool(e) {
    this.setState({ school: e.target.value });
  }

  async renderModal() {
    if (this.state.currentModalClass === "modal") {
      await this.setState({ currentModalClass: "modal is-active" });
    } else {
      await this.setState({ currentModalClass: "modal" });
    }
  }
  async submit() {
    await this.setState({ currentModalClass: "modal" });
    this.props.ssCB(this.state);
  }

  render() {
    return (
      (
        <div
          className="card"
          style={{ width: '80%', maxWidth: 800, margin: 'auto', padding: 50 }}
        >
                <div class="field ">
                  <label class="label">Year Of Completion</label>
                  <p class="control has-icons-left ">
                    <span class="select is-fullwidth ">
                      <select
                        value={this.state.year_of_comp}
                        onChange={this.updateYearOfCompletion}
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
                      <i class="fa fa-graduation-cap" />
                    </span>
                  </p>
                </div>

                <div className="field">
                  <label className="label">Board</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="Ex: CBSE"
                      value={this.state.board}
                      onChange={this.updateBoard}
                    />
                    <span className="icon is-small is-left">
                      <i class="fa fa-book" />
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    class="field"
                    style={{ width: "47%", marginRight: "5%" }}
                  >
                    <label class="label">Performance Scale</label>
                    <p class="control has-icons-left ">
                      <span class="select is-fullwidth ">
                        <select
                          value={this.state.performance}
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

                  <div class="field" style={{ width: "47%" }}>
                    <label className="label ">Performance</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        ref="marksInput"
                        className="input"
                        type="number"
                        placeholder="0.00"
                        value={this.state.value}
                        onChange={this.updateMarks}
                      />
                      <span className="icon is-small is-left">
                        <i class="fa fa-percent" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Stream</label>
                  <p class="control has-icons-left ">
                    <span class="select is-fullwidth">
                      <select
                        value={this.state.stream}
                        onChange={this.updateStream}
                      >
                        <option selected>Choose Stream</option>
                        <option>Maths</option>
                        <option>Science</option>
                        <option>Commerce</option>
                        <option>Arts</option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-folder" aria-hidden="true" />
                    </span>
                  </p>
                </div>

                <div className="field">
                  <label className="label">School</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="nameInput"
                      className="input"
                      type="text"
                      placeholder="Ex: Delhi public School"
                      value={this.state.school}
                      onChange={this.updateSchool}
                    />
                    <span className="icon is-small is-left">
                      <i class="fa fa-university" aria-hidden="true" />
                    </span>
                  </div>
                </div>
    
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="button is-link is-rounded"
                      onClick={this.submit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
      )
    );
  }
}
