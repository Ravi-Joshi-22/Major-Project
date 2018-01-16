import React from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="columns">
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-10">
              <div className="tile">
                <div
                  className="tile is-parent"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <article
                    className="tile is-child notification is-info has-text-centered"
                    style={{ maxWidth: 250 }}
                  >
                    <a href="/companyRegister">
                      As Recruiter<br />
                      <img
                        className="img-responsive"
                        alt="Recruiter"
                        src="/Assets/Recruiter.svg"
                      />
                    </a>
                  </article>
                </div>
                <div
                  className="tile is-parent"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <article
                    className="tile is-child notification is-warning has-text-centered"
                    style={{ maxWidth: 250 }}
                  >
                    <a>
                      As Employee<br />
                      <img
                        className="img-responsive"
                        alt="Employee"
                        src="/Assets/Employee.svg"
                      />
                    </a>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
