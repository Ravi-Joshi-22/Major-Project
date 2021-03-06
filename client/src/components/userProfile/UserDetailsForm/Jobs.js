import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/interviewee/experience';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      organization: '',
      location: '',
      home: '',
      start_date: '',
      end_date: '',
      currently_working: 'false',
      description: '',
      currentModalClass: 'modal',
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.updateOrganization = this.updateOrganization.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.updateOngoing = this.updateOngoing.bind(this);
    this.updatedDescription = this.updatedDescription.bind(this);
    this.submit = this.submit.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }
  updateProfile(e) {
    this.setState({ profile: e.target.value });
  }
  updateOrganization(e) {
    this.setState({ organization: e.target.value });
  }
  updateLocation(e) {
    this.setState({ location: e.target.value });
  }
  updateStart(e) {
    this.setState({ start_date: e.target.value });
  }

  updateEnd(e) {
    this.setState({ end_date: e.target.value });
  }
  updateOngoing(e) {
    this.setState({ curently_working: e.target.value });
  }
  updatedDescription(e) {
    this.setState({ description: e.target.value });
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
    const requestObject = {
      jobs: this.state,
    };
    this.props.addProfession(requestObject);
  }

  render() {
    return (
      <div>
        <div className={this.state.currentModalClass}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Jobs Details</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              {' '}
              <div className="field">
                <label className="label">Profile</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ex:operations"
                    required
                    value={this.state.profile}
                    onChange={this.updateProfile}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-user" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Organization</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ex:TCS"
                    required
                    value={this.state.organization}
                    onChange={this.updateOrganization}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-building" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Location</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ex:Indore"
                    required
                    value={this.state.location}
                    onChange={this.updateLocation}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-globe" />
                  </span>
                </div>
              </div>
              <label class="label">Job Duration</label>
              <div style={{ display: 'flex' }}>
                <div class="field" style={{ width: '47%', marginRight: '5%' }}>
                  <label class="label">Start date</label>
                  <p class="control has-icons-left ">
                    <input
                      class="input"
                      type="date"
                      required
                      value={this.state.start_date}
                      onChange={this.updateStart}
                    />

                    <span class="icon is-small is-left">
                      <i class="fa fa-calendar" />
                    </span>
                  </p>
                </div>
                <div class="field" style={{ width: '50%' }}>
                  <label class="label">End day</label>
                  <p class="control has-icons-left ">
                    <input
                      class="input"
                      type="date"
                      required
                      value={this.state.end_date}
                      onChange={this.updateEnd}
                    />

                    <span class="icon is-small is-left">
                      <i class="fa fa-calendar" />
                    </span>
                  </p>
                </div>
              </div>
              <label class="checkbox">
                <input
                  type="checkbox"
                  value={this.state.curently_working}
                  onChange={this.updateOngoing}
                />
                Currently working here
              </label>
              <div className="field">
                <label className="label">Description</label>
                <div className="control has-icons-left has-icons-right">
                  <textarea
                    class="textarea is-hovered"
                    type="text"
                    placeholder="Job Description"
                    value={this.state.description}
                    onChange={this.updatedDescription}
                  />
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
        <FloatingActionButton
          mini={true}
          onClick={this.renderModal}
          style={{ marginTop: 5, padding: 2 }}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default connect(null, actions)(Jobs);
