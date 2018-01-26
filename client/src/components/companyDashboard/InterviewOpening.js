import React from "react";

export default class InterviewOpening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "",
      responsibilities: [],
      skills: [],
      qualification: [],
      minExperience: "",
      maxExperience: "",
      location: "",
      salary: "",
      startDate: "",
      endDate: ""
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
      this.setState({ maxExperience: e.target.value });
    }
  }
  updateMinExp(e) {
    if (e.target.value < 40) {
      this.setState({ minExperience: e.target.value });
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
    this.setState({ startDate: e.target.value });
  }
  updateEDate(e) {
    this.setState({ endDate: e.target.value });
  }

  updateResponsibilities(e) {
    this.setState({responsibilities: e.target.value});
    var resp = e.target.value;
    var respArr = resp.split(",");
    }

  updateSkills(e) {
    this.setState({skills: e.target.value});
    var skills = e.target.value;
    var skillsArr = skills.split(",");
  }

  updateQualification(e) {
    this.setState({qualification: e.target.value});
    var qual = e.target.value;
    var qualArr = qual.split(",");
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
                value={this.state.minExperience}
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
                value={this.state.maxExperience}
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
                value={this.state.startDate}
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
                value={this.state.endDate}
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
            <button className="button is-primary is-rounded">
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
