import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import './index.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/app';
import Steps, { Step } from 'rc-steps';

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


class IntervieweeRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
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
      projects: [],
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
    this.stepShow = this.stepShow.bind(this);
  }

  async getUserDetails(userData) {
    await this.setState({ user: userData });
    await this.props.changeCurrentStep(1);
    this.stepShow();    
  }

  async getSecondaryDetails(secondaryData) {
    await this.setState({ secondary: secondaryData });
  }

  async getSeniorSecondary(seniorData) {
    await this.setState({ seniorSecondary: seniorData });
  }

  async getGraduation(gradData) {
    let graduationData = this.state.after_senior_sec;
    graduationData.push(gradData);
    await this.setState({ after_senior_sec: graduationData });
    await this.props.changeCurrentStep(2);
    this.stepShow();
  }
  
  async getinternships(internshipData) {
    let internshipsData = this.state.internships;
    internshipsData.push(internshipData);
    await this.setState({ internships: internshipsData });
    await this.props.changeCurrentStep(3);
    this.stepShow();    
  }
  
  async getProjects(projectData) {
    let projectsData = this.state.projects;
    projectsData.push(projectData);
    await this.setState({ projects: projectsData });
    await this.props.changeCurrentStep(4);
    this.stepShow();    
  }

  async getJobs(jobData) {
    let jobsData = this.state.jobs;
    jobsData.push(jobData);
    await this.setState({ jobs: jobsData });
    await this.props.changeCurrentStep(5);
    this.stepShow();    
  }
  
  async getCourses(courseData) {
    let coursesData = this.state.courses;
    coursesData.push(courseData);
    await this.setState({ courses: coursesData });
    await this.props.changeCurrentStep(6);
    this.stepShow();    
  }

  async getskills(skillData) {
    let skillsData = this.state.skills;
    skillsData.push(skillData);
    await this.setState({ skills: skillsData });
    await this.props.changeCurrentStep(7);
    this.stepShow();    
  }

  async getcertification(certificationData) {
    let certificationsData = this.state.certifications;
    certificationsData.push(certificationData);
    await this.setState({ certifications: certificationsData });
    await this.props.changeCurrentStep(8);
    this.stepShow();    
  }

  async getTests(testData) {
    let testsData = this.state.tests;
    testsData.push(testData);
    await this.setState({ tests: testsData });
    this.callRegisterApi(this.state)
  }

  stepShow() {
    this.refs.step0.className = 'hidden';
    this.refs.step1.className = 'hidden';
    this.refs.step2.className = 'hidden';
    this.refs.step3.className = 'hidden';
    // this.refs.step4.className = 'hidden';

    switch (this.props.currentStep) {
      case 0:
        this.refs.step0.className = '';
        break;
      case 1:
        this.refs.step1.className = '';
        break;
      case 2:
        this.refs.step2.className = '';
        break;
      case 3:
        this.refs.step3.className = '';
        break;
    }
  }
  
  stepShow() {
    console.log('cureentStep' + this.props.currentStep);
    this.refs.step0.className = 'hidden';
    this.refs.step1.className = 'hidden';
    this.refs.step2.className = 'hidden';
    this.refs.step3.className = 'hidden';
    this.refs.step4.className = 'hidden';
    this.refs.step5.className = 'hidden';
    this.refs.step6.className = 'hidden';
    this.refs.step7.className = 'hidden';
    this.refs.step8.className = 'hidden';

    switch (this.props.currentStep) {
      case 0:
        this.refs.step0.className = '';
        break;
      case 1:
        this.refs.step1.className = '';
        break;
      case 2:
        this.refs.step2.className = '';
        break;
      case 3:
        this.refs.step3.className = '';
        break;
      case 4:
        this.refs.step4.className = '';
        break;
      case 5:
        this.refs.step5.className = '';
        break;
      case 6:
        this.refs.step6.className = '';
        break;
      case 7:
        this.refs.step7.className = '';
        break;
      case 8:
        this.refs.step8.className = '';
        break;
    }
  }

  async componentDidMount() {
    await this.props.fetchUser();
    if (this.props.auth.verification_status === 'in_process') {
      await this.props.changeCurrentStep(2);
    } else if (this.props.auth.verification_status === 'email_verified') {
      await this.props.changeCurrentStep(3);
    }
    this.stepShow();
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <Steps labelPlacement="vertical" current={this.props.currentStep}>
          <Step title="Personal Details" />
          <Step title="Education Details" />
          <Step title="Internship Details" />
          <Step title="Project Details" />
          <Step title="Job Details" />
          <Step title="Courses Done" />
          <Step title="Skills Acquired" />
          <Step title="Certification" />
          <Step title="Test" />
        </Steps>
        <br />
        <br />
        <div ref="step0" className="hidden">
          <Interviewee userCB={this.getUserDetails} />
        </div>
        <div ref="step1" className="hidden">
          <Secondary scCB={this.getSecondaryDetails} />
          <SeniorSecondary ssCB={this.getSeniorSecondary} />
          <Graduation gradCB={this.getGraduation} />
        </div>
        <div ref="step2" className="hidden">
          <Internship interCB={this.getinternships} />
        </div>
        <div ref="step3" className="hidden">
          <Project projectCB={this.getProjects} />
        </div>
        <div ref="step4" className="hidden">
          <Jobs jobCB={this.getJobs} />
        </div>
        <div ref="step5" className="hidden">
          <Courses coursesCB={this.getCourses} />
        </div>
        <div ref="step6" className="hidden">
          <Skills skillCB={this.getskills} />
        </div>
        <div ref="step7" className="hidden">
          <Certification certiCB={this.getcertification} />
        </div>
        <div ref="step8" className="hidden">
          <Test testCB={this.getTests} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentStep, auth }) {
  return { currentStep, auth };
}
export default connect(mapStateToProps, actions)(withRouter(IntervieweeRegister));
