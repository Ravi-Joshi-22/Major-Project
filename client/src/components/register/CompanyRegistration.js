import React from 'react';

export default class CompanyRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      companyNumber: '',
      companyPhone: '',
      companyWebsite: '',
      companyLogoUrl: '',
      companyAddress: '',
      companyCity: '',
      companyPin: '',
    };
    this.updateName = this.updateName.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.updateLogoUrl = this.updateLogoUrl.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updatePin = this.updatePin.bind(this);
    this.registerCall = this.registerCall.bind(this);
  }

  updateName(e) {
    this.setState({ companyName: e.target.value });
  }

  updateNumber(e) {
    this.setState({ companyNumber: e.target.value });
  }

  updatePhone(e) {
    if (e.target.value < 10000000000) {
      this.setState({ companyPhone: e.target.value });
    }
  }

  updateWebsite(e) {
    this.setState({ companyWebsite: e.target.value });
  }

  updateLogoUrl(e) {
    this.setState({ companyLogoUrl: e.target.value });
  }

  updateAddress(e) {
    this.setState({ companyAddress: e.target.value });
  }

  updateCity(e) {
    this.setState({ companyCity: e.target.value });
  }

  updatePin(e) {
    if (e.target.value < 1000000) {
      this.setState({ companyPin: e.target.value });
    }
  }

  registerCall() {}

  render() {
    return (
      <div
        className="card"
        style={{ width: '80%', maxWidth: 800, margin: 'auto', padding: 50 }}
      >
        <div className="field">
          <label className="label">Company Name</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="companyNameInput"
              className="input"
              type="text"
              placeholder="Company Name"
              value={this.state.companyName}
              onChange={this.updateName}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-building" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Company Registration Number</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="companyNumberInput"
              className="input"
              type="number"
              placeholder="Company Registration Number"
              value={this.state.companyNumber}
              onChange={this.updateNumber}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-address-card" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Company Phone</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="companyPhoneInput"
              className="input"
              type="number"
              placeholder="Company Phone"
              value={this.state.companyPhone}
              onChange={this.updatePhone}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-phone" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Company Website</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="companyWebsiteInput"
              className="input"
              type="text"
              placeholder="Company Website"
              value={this.state.companyWebsite}
              onChange={this.updateWebsite}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-globe" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Company Logo URL</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="companyLogoInput"
              className="input"
              type="text"
              placeholder="Company Logo URL"
              value={this.state.companyLogoUrl}
              onChange={this.updateLogoUrl}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-image" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Company Address</label>
          <div className="control has-icons-left has-icons-right">
            <textarea
              ref="companyAddressInput"
              className="input"
              type="text"
              placeholder="Company Address"
              value={this.state.companyAddress}
              onChange={this.updateAddress}
              rows="4"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-map-marker" />
            </span>
          </div>
          <br />
          <div className="columns">
            <div className="column">
              <input
                ref="CityInput"
                className="input"
                type="text"
                placeholder="City"
                value={this.state.city}
                onChange={this.updateCity}
              />
            </div>
            <div ref="StateInput" className="field column">
              <div className="control">
                <div className="select">
                  <select>
                    {/* TODO  make array and iterate here */}
                    <option>Select State</option>
                    <option>Madhya Pradesh</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <input
                ref="PinInput"
                className="input is-left"
                type="number"
                placeholder="Pin ode"
                value={this.state.pin}
                onChange={this.updatePin}
              />
            </div>
            <div ref="CountryInput" className="field column is-right">
              <div className="control">
                <div className="select">
                  <select>
                    {/* TODO  make array and iterate here */}
                    <option>Select Country</option>
                    <option>India</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link is-rounded"
              onClick={() => {
                this.props.companyCallback(this.state);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
