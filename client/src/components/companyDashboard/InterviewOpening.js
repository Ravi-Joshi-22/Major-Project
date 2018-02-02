import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions/company';

 class InterviewOpening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "",
      responsibilities: [],
      skills: [],
      qualifications: [],
      exMin: "",
      exMax: "",
      location: "",
      salary: "",
      sDate: "",
      eDate: ""
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

  async createNewOpening(openingData){
    await this.props.newOpening(openingData);
  }
  updatePosition(e) {
    this.setState({ position: e.target.value });
    if (e.target.value == null) {
      this.refs.positionInput.className = "input is-danger";
    } else {
      this.refs.positionInput.className = "input is-success";
    }
  }
  updateMaxExp(e) {
    if (e.target.value < 50) {
      this.setState({ exMax: e.target.value });
    }
  }
  updateMinExp(e) {
    if (e.target.value < 40) {
      this.setState({ exMin: e.target.value });
    }
    if (e.target.value == null) {
      this.refs.minExpInput.className = "input is-danger";
    } else {
      this.refs.minExpInput.className = "input is-success";
    }
  }
  updateLocation(e) {
    this.setState({ location: e.target.value });
    if (e.target.value == null) {
      this.refs.locationInput.className = "input is-danger";
    } else {
      this.refs.locationInput.className = "input is-success";
    }
  }
  updateSalary(e) {
    if (e.target.value < 100000000) {
      this.setState({ salary: e.target.value });
    }
    if (e.target.value == null) {
      this.refs.salaryInput.className = "input is-danger";
    } else {
      this.refs.salaryInput.className = "input is-success";
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
    var respArr = responsibilities.split(',').map(responsibility => responsibility.trim());
    console.log(respArr);
    this.setState({responsibilities: respArr});
    }

  updateSkills(e) {
    var skills = e.target.value;
    var skillsArr = skills.split(',').map(skill => skill.trim());
    console.log(skillsArr);
    this.setState({skills: skillsArr});
  }

  updateQualification(e) {
    var qualifications = e.target.value;
    var qualArr = qualifications.split(',').map(qualification => qualification.trim());
    console.log(qualArr);
    this.setState({qualifications: qualArr});
  }

  render() {
    return (
      <div
        className="card"
        style={{ width: "80%", maxWidth: 800, margin: "auto", padding: 50, backgroundImage: "/assets/jobs.png"}}
      >
        <div className="field">
          <label className="label">Position<font color="red">*</font>
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="positionInput"
              className="input"
              type="text" required
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
          <div className="control has-icons-left has-icons-right">
            <textarea
              ref="skillsInput"
              className="textarea"
              type="text" required
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
            <label className="label">Minimum Experience<font color="red">*</font>
            </label>
            <div className="control has-icons-left has-icons-right">
              <input
                ref="minExpInput"
                className="input"
                type="number" required
                placeholder="Minimum Experience"
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
                placeholder="Maximum Experience"
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
                type="text" required
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
                type="number" required
                placeholder="Salary"
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
            <button className="button is-primary is-rounded" onClick={()=>this.createNewOpening(this.state)}>
              <span className="icon is-small is-left">
                <i className="fas fa-plus" />
              </span>
              Create Opening
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, actions)(InterviewOpening);