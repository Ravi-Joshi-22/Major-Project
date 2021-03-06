import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/company';

class InterviewOpening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      responsibilities: [],
      skills: [],
      qualifications: [],
      exMin: 0,
      exMax: '',
      location: '',
      salary: '',
      sDate: '',
      eDate: '',
    };
    this.updatePosition = this.updatePosition.bind(this);
    this.updateResponsibilities = this.updateResponsibilities.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.updateQualification = this.updateQualification.bind(this);
    this.updateMinExp = this.updateMinExp.bind(this);
    this.updateMaxExp = this.updateMaxExp.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateSalary = this.updateSalary.bind(this);
    this.updateSDate = this.updateSDate.bind(this);
    this.updateEDate = this.updateEDate.bind(this);
    this.createNewOpening = this.createNewOpening.bind(this);
  }

  async createNewOpening(openingData) {
    var trimmedResponsibilities = openingData.responsibilities.map(
      responsibility => responsibility.trim()
    );
    var trimmedSkills = openingData.skills.map(skill => skill.trim());
    var trimmedQualifications = openingData.qualifications.map(qualification =>
      qualification.trim()
    );
    this.setState({ responsibilities: trimmedResponsibilities });
    this.setState({ skills: trimmedSkills });
    this.setState({ qualifications: trimmedQualifications });

    if (this.state.position == null) {
      this.refs.positionInput.className = 'input is-danger';
    } else {
      this.refs.positionInput.className = 'input is-success';
      if (this.state.exMax < 50) {
        if (this.state.exMax < this.state.exMin) {
          this.refs.maxExpInput.className = 'input is-danger';
          this.refs.minExpInput.className = 'input is-danger';
        } else {
          this.refs.maxExpInput.className = 'input';
          this.refs.minExpInput.className = 'input';
          await this.props.newOpening(openingData);
        }
      }
    }
  }
  updatePosition(e) {
    if (e.target.value == null) {
      this.refs.positionInput.className = 'input is-danger';
    } else {
      this.setState({ position: e.target.value });
      this.refs.positionInput.className = 'input is-success';
    }
  }
  updateMaxExp(e) {
    if (e.target.value < 50) {
      console.log(e.target.value);
      if (e.target.value < this.state.exMin) {
        this.refs.maxExpInput.className = 'input is-danger';
        this.refs.minExpInput.className = 'input is-danger';
        this.setState({ exMax: e.target.value });
      } else {
        this.setState({ exMax: e.target.value });
        this.refs.maxExpInput.className = 'input';
        this.refs.minExpInput.className = 'input';
      }
    }
  }
  updateMinExp(e) {
    if (e.target.value < 40) {
      this.setState({ exMin: e.target.value });
    }
  }
  updateLocation(e) {
    this.setState({ location: e.target.value });
    if (e.target.value == null) {
      this.refs.locationInput.className = 'input is-danger';
    } else {
      this.refs.locationInput.className = 'input is-success';
    }
  }
  updateSalary(e) {
    if (e.target.value < 100000000) {
      this.setState({ salary: e.target.value });
    }
    if (e.target.value == null) {
      this.refs.salaryInput.className = 'input is-danger';
    } else {
      this.refs.salaryInput.className = 'input is-success';
    }
  }
  updateSDate(e) {
    this.setState({ sDate: e.target.value });
  }
  updateEDate(e) {
    this.setState({ eDate: e.target.value });
  }

  updateResponsibilities(e) {
    var responsibilities = e.target.value;
    var respArr = responsibilities.split(',');
    this.setState({ responsibilities: respArr });
  }

  updateSkills(e) {
    var skills = e.target.value;
    var skillsArr = skills.split(',');
    this.setState({ skills: skillsArr });
  }

  updateQualification(e) {
    var qualifications = e.target.value;
    var qualArr = qualifications.split(',');
    this.setState({ qualifications: qualArr });
  }

  render() {
    return (
      <div>
        <div className={this.props.currentModalClass}>
          <div className="modal-background" />
          <div className="modal-card" style={{ marginTop: 80 }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Create Opening</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => {
                  this.props.openingCallback();
                }}
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">
                  Position<font color="red">*</font>
                </label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    ref="positionInput"
                    className="input"
                    type="text"
                    required
                    placeholder="Job Position"
                    value={this.state.position}
                    onChange={this.updatePosition}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-id-card" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Responsibilities</label>
                <label className="label">
                  <p>
                    <font color="#00d1b2">
                      (Enter each responsibility comma separated)
                    </font>
                  </p>
                </label>
                <div className="control has-icons-left has-icons-right">
                  <textarea
                    ref="responsibilitiesInput"
                    className="textarea"
                    type="text"
                    placeholder="Job Profile"
                    value={this.state.responsibilities}
                    onChange={this.updateResponsibilities}
                  />
                  <span className="icon is-small is-right">
                    <i className="fas fa-briefcase" />
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">
                  Skills<font color="red">*</font>
                </label>
                <label className="label">
                  <p>
                    <font color="#00d1b2">
                      (Enter each skill comma separated)
                    </font>
                  </p>
                </label>
                <div className="control has-icons-left has-icons-right">
                  <textarea
                    ref="skillsInput"
                    className="textarea"
                    type="text"
                    required
                    placeholder="Enter the Skills Required"
                    value={this.state.skills}
                    onChange={this.updateSkills}
                  />
                  <span className="icon is-small is-right">
                    <i className="fas fa-tasks" />
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Qualification</label>
                <label className="label">
                  <p>
                    <font color="#00d1b2">
                      (Enter each qualification comma separated)
                    </font>
                  </p>
                </label>
                <div className="control has-icons-left has-icons-right">
                  <textarea
                    ref="qualificationInput"
                    className="textarea"
                    type="text"
                    placeholder="Expected Qualification"
                    value={this.state.qualification}
                    onChange={this.updateQualification}
                  />
                  <span className="icon is-small is-right">
                    <i className="fas fa-graduation-cap" />
                  </span>
                </div>
              </div>

              <div className="columns">
                <div className="field column">
                  <label className="label">
                    Minimum Experience<font color="red">*</font>
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="minExpInput"
                      className="input"
                      type="number"
                      required
                      placeholder="Minimum Experience(in years)"
                      value={this.state.exMin}
                      onChange={this.updateMinExp}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-edit" />
                    </span>
                  </div>
                </div>
                <div className="field column">
                  <label className="label">Maximum Experience</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="maxExpInput"
                      className="input"
                      type="number"
                      placeholder="Maximum Experience(in years)"
                      value={this.state.exMax}
                      onChange={this.updateMaxExp}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-edit" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="field column">
                  <label className="label">
                    Location<font color="red">*</font>
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="locationInput"
                      className="input"
                      type="text"
                      required
                      placeholder="Location"
                      value={this.state.location}
                      onChange={this.updateLocation}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-location-arrow" />
                    </span>
                  </div>
                </div>

                <div className="field column">
                  <label className="label">
                    Salary<font color="red">*</font>
                  </label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="salaryInput"
                      className="input"
                      type="number"
                      required
                      placeholder="Salary(in lakhs)"
                      value={this.state.salary}
                      onChange={this.updateSalary}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-credit-card" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="field column">
                  <label className="label">Opening Start Date</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="startDateInput"
                      className="input"
                      type="date"
                      placeholder="Start Date"
                      value={this.state.sDate}
                      onChange={this.updateSDate}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-calendar" />
                    </span>
                  </div>
                </div>

                <div className="field column">
                  <label className="label">Opening End Date</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="endDateInput"
                      className="input"
                      type="date"
                      placeholder="End Date"
                      value={this.state.eDate}
                      onChange={this.updateEDate}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-calendar" />
                    </span>
                  </div>
                </div>
              </div>

              <br />
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-primary is-rounded"
                    onClick={() => this.createNewOpening(this.state)}
                  >
                    <span className="icon is-small is-left">
                      <i className="fas fa-plus" />
                    </span>
                    Create Opening
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, actions)(InterviewOpening);
