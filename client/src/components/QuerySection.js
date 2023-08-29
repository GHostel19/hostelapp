import React, { Component } from 'react'
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export class QuerySection extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         complains: '',
         textarea: '',
         msg: {}
      }
    }

    changeHandle=(e)=> {
        this.setState({[e.target.name]: e.target.value})
    } 
    handleChange=(e) => {
      this.setState({textarea: e})
    }
    SubmitHandle=async (e) => {
        e.preventDefault();
        try {
            // get token from localStorage
  const token = localStorage.getItem('token');
  //Headers
  const config={
    headers: {
      'Content-type':"application/json"
    }
  };
  if (token) {
    config.headers['Authorization'] = token
  }
  const user = {
    complains: this.state.complains,
    textarea: this.state.textarea
  }
  const res = await axios.post('/api/create/query',user, config);
  if(res.status===200) {
    this.setState({ msg: res.data.msg, complains: '', textarea: '' });
    this.setState({msg: res.data.msg})
    var x = document.getElementById("snackbar");
    x.className="show bg-success";
    setTimeout(function() {x.className.replace("show", "");}, 3000);
    this.props.history.push('/')
  }
        } catch (error) {
            if (error.response.data) {
                this.setState({msg: error.response.data.msg})
                var forErrorMsg=document.getElementById("snackbar");
                forErrorMsg.className="show bg-danger";
                setTimeout(function() {forErrorMsg.className.replace("show", "");}, 3000);
            }
        }
    }

    modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }
  
    formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]
  render() {
    const {msg} = this.state;
    const navbarStyle = {
      backgroundColor : "#ce93d8"
  }
  const submitStyle = {
    backgroundColor : "#20c997"
  }
    return (
     <div className = "container">
        {msg.length ? msg.map(errMsg => (
                  <div key={errMsg.msg} id="snackbar">
                    <strong>{errMsg.msg}</strong>
                  </div>
                )) : null}
        <div className="row">
            <div className="col-md-6 m-auto">
                <div className="card shadow my-5">
                <div className="card-header " style={navbarStyle}>
                    <h3 className="text-center text-light">
                        Write your Query
                    </h3>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.SubmitHandle}>
                  <div className="row">

                    <div class="mb-3">
                      <label for="complains" class="form-label">Write your Query</label>
                      <input type="text" class="form-control form-control-sm"
                        id="complains" value={this.state.complains} onChange={this.changeHandle} name='complains'/>

                    </div>
                    <div class="mb-3">
                      <label for="textarea" class="form-label">Explaination</label>
                      <ReactQuill value={this.state.textarea}
                      onChange={this.handleChange}
                      name="textarea"
                      theme="snow"
                      modules={this.modules}
                      formats={this.formats}
                      />

                    

                    </div>

                   
                  </div>
                  <button type="submit" class="btn " style={submitStyle}e>Send Query</button>
                  {/* <Link to='/profile'>Profile</Link> */}
                </form>
                    </div>
                </div>
            </div>
        </div>
     </div>
    )
  }
}

export default QuerySection