import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Interviewee from "../../components/IntervieweeRegister/Interviewee";
import Secondary from "../../components/IntervieweeRegister/Secondary";
import Graduation from "../../components/IntervieweeRegister/Graduation";
import SeniorSecondary from "../../components/IntervieweeRegister/SeniorSecondary";
import Skills from "../../components/IntervieweeRegister/Skills";
import Project from "../../components/IntervieweeRegister/Project";
import Jobs from "../../components/IntervieweeRegister/Jobs";
import Internship from "../../components/IntervieweeRegister/Internship";
import Courses from "../../components/IntervieweeRegister/Courses";
import Test from "../../components/IntervieweeRegister/Test";
import Certification from "../../components/IntervieweeRegister/Certification";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      secondary: "",
      seniorSecondary: "",
      after_senior_sec: [],
      jobs: [],
      internships: [],
      skills: [],
      courses: [],
      certifications: [],
      tests: [],
      projects: []
    };
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getSecondaryDetails = this.getSecondaryDetails.bind(this);
    this.getSeniorSecondary = this.getSeniorSecondary.bind(this);
    this.getGraduation = this.getGraduation.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.getinternships = this.getinternships.bind(this);
    this.getskills = this.getskills.bind(this);
    this.getcertification = this.getcertification.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.getTests = this.getTests.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  async getUserDetails(userData) {
    await this.setState({ user: userData });
    console.log(this.state);
  }

  async getSecondaryDetails(secondaryData) {
    await this.setState({ secondary: secondaryData });
    console.log(this.state);
  }

  async getSeniorSecondary(seniorData) {
    await this.setState({ seniorSecondary: seniorData });
    console.log(this.state);
  }

  async getGraduation(gradData) {
    let graduationData = this.state.after_senior_sec;
    graduationData.push(gradData);
    await this.setState({ after_senior_sec: graduationData });
    console.log(this.state);
  }
  async getJobs(jobData) {
    let jobsData = this.state.jobs;
    jobsData.push(jobsData);
    await this.setState({ jobs: jobsData });
    console.log(this.state);
  }
  async getskills(skillData) {
    let skillsData = this.state.skills;
    skillsData.push(skillsData);
    await this.setState({ skills: skillsData });
    console.log(this.state);
  }
  async getcertification(certificationData) {
    let certificationsData = this.state.certifications;
    certificationsData.push(certificationsData);
    await this.setState({ certifications: certificationsData });
    console.log(this.state);
  }
  async getinternships(internshipData) {
    let internshipsData = this.state.internships;
    internshipsData.push(internshipData);
    await this.setState({ internships: internshipsData });
    console.log(this.state);
  }

  async getProjects(projectData) {
    let projectsData = this.state.projects;
    projectsData.push(projectData);
    await this.setState({ projects: projectsData });
    console.log(this.state);
  }

  async getTests(testData) {
    let testsData = this.state.tests;
    testsData.push(testData);
    await this.setState({ tests: testsData });
    console.log(this.state);
  }

  async getCourses(courseData) {
    let coursesData = this.state.courses;
    coursesData.push(courseData);
    await this.setState({ courses: coursesData });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <center>User Details </center>
          </thead>
          <tbody>
            <tr>
              <th>1.</th>

              <td>Personal Details</td>
              <td>
                <Interviewee userCB={this.getUserDetails} />
              </td>
            </tr>
            <tr>
              <th>2.</th>

              <td>Education Details</td>
              <td>
                <div style={{ display: "flex" }}>
                  <Secondary scCB={this.getSecondaryDetails} />
                  <SeniorSecondary ssCB={this.getSeniorSecondary} />
                  <Graduation gradCB={this.getGraduation} />
                </div>
              </td>
            </tr>

            <tr>
              <th>3.</th>

              <td>Internship Details</td>
              <td>
                <Internship interCB={this.getinternships} />
              </td>
            </tr>
            <tr>
              <th>4.</th>

              <td>Project Details </td>
              <td>
                <Project projectCB={this.getProjects} />
              </td>
            </tr>
            <tr>
              <th>5.</th>

              <td>Job Details </td>
              <td>
                <Jobs jobCB={this.getJobs} />
              </td>
            </tr>
            <tr>
              <th>6.</th>

              <td>Courses Done</td>
              <td>
                <Courses coursesCB={this.getCourses} />
              </td>
            </tr>
            <tr>
              <th>7.</th>

              <td>Skills Acquired</td>
              <td>
                <Skills skillCB={this.getskills} />
              </td>
            </tr>
            <tr>
              <th>8.</th>

              <td>Certification</td>
              <td>
                <Certification certiCB={this.getcertification} />
              </td>
            </tr>
            <tr>
              <th>9.</th>

              <td>Test</td>
              <td>
                <Test testCB={this.getTests} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profile;
