import React from 'react';

export default class UploadDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '/resume',
        };
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(e) {
        this.setState({fileName: e.target.value});
        //check file upload working
    }
    
    render() {
        return (
            <div className="card" style={{ width: '80%', maxWidth: 500, margin: 'auto', padding: 100, textAlign: "center" }}>
                <div class="field">
                    <div class="file is-centered is-boxed is-success has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume" onChange={this.uploadFile}/>
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Upload Documents…
                        </span>
                        </span>
                        <span class="file-name">
                            {this.state.fileName}
                        </span>
                    </label>
                    </div>
                </div>
            </div>
        );
    }
}