import React from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Alerts from '../Alerts/Alerts';
import './UserProfile.css';



export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            previewSource: '',
            message: '',
            showAlert: false,
            fileTypes: ['jpg', 'pdf', 'png', 'jpeg', 'image/jpg', 'image/pdf', 'image/png', 'image/jpeg']
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        let id = localStorage.getItem('_ID');
        if (!id) {
            this.props.history.push('/');
            localStorage.clear();
        }
        axios.get('/api/users/' + id).then((res) => {
            this.setState({user: res.data.user})
        })
    }

    handleFileInputChange = event => {
        const file = event.target.files[0];
        if(!this.state.fileTypes.includes(file.type)) {
            this.setState({
                message: 'Must be either jpg, pdf, or png'
            })
        } else {
            this.setState({
                message: ''
            })
            this.previewFile(file);
        }
    }

    previewFile = (file) => {
        if(file.size > 10000000) {
            this.setState({message: 'File size too big'});
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({ previewSource: reader.result });
        }
    }

    handleSubmitFile = (event) => {
        event.preventDefault();
            if(this.state.message.length > 0 || !this.state.previewSource || Object.keys(this.state.user) < 1) return;
            axios.post('/api/users/upload-image', JSON.stringify({
                data: this.state.previewSource, 
                _id: this.state.user._id
            })).then((res) => {
                if(res.data && res.data.message) {
                    this.setState({
                        message: res.data.message,
                        fileInput: '',
                        previewSource: '',
                        showPopup: true
                    });
                } else {
                    this.setState({
                        fileInput: '',
                        previewSource: '',
                        message: 'Success',
                        showPopup: true
                    })
                }
                this.getUser();
            }).catch((err) => {
                console.log(err);
                this.setState({showPopup: true, message: 'Something went wrong uploading image'})
            })
    }


 

    render() {
        return (
            <div className="profile-wrapper">
                <Alerts model={this.state.showAlert} message={this.state.message} />
                <div>
                    <Sidebar />
                </div>

                <div className="body">
                    {this.state.user &&
                        <div className="cards">
                            <div className="left">
                                <div className="img-uploader">
                               
                                    <center><div>Upload Avatar Image</div>
                                    <h1>{this.state.user.firstName + " " + this.state.user.lastName}</h1>
                                    <h2>{this.state.user.email}</h2></center>
                                    <div className="upload-box">
                                        <input onChange={(event) => this.handleFileInputChange(event)} type="file" />
                                        {this.state.previewSource ?
                                            <img className="display-image" src={this.state.previewSource } alt="profile avatar" />
                                            : (this.state.user.avatar && this.state.user.avatar.url ? <img style={{borderRadius: '50%', objectFit: 'cover', margin: '20px auto 0 25px', width: '25vw', height: '25vw'}} className="display-image" src={this.state.user.avatar.url} alt="taco"/>  : <img className="display-image" src={this.state.previewSource} alt="bell" /> )}
                                    </div>
                                    <div style={{color: this.state.message === 'Success' ? 'green' : 'red', fontSize: '.8em', margin: '20px 0'}}>{ this.state.message }</div>
                                   <center> <button className="image-btn" style={{marginTop: '20px'}} onClick={(event) => this.handleSubmitFile(event)}>Save</button></center>
                                </div>
                                </div>
                                
                        </div>
                    }
                </div>
            </div>
        )
    }
}