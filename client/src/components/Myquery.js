import React, { Component } from 'react'
import axios from 'axios';
import Moment from 'react-moment';
export class Myquery extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           mypost: {},
           msg: {}
        }
      }
  
      async componentDidMount() {
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
            const res = await axios.get('/api/myquery/user', config);
            if (res.status === 200) {

              
              this.setState({mypost: res.data})
              // Fetch comments for each query and update the state
      const updatedMypost = await Promise.all(
        res.data.map(async (post) => {
          const commentResponse = await axios.get(`/api/response/${post._id}`, config);
          return {
            ...post,
            comments: commentResponse.data,
          };
        })
      );
      this.setState({ mypost: updatedMypost });
    }
              
            
          } catch (error) {
            if (error.response.status === 401) {
              this.setState({loggedIn : false})
              localStorage.removeItem('token');
              this.props.history.push('/login')
            }
            
          }
            }
            render() {
                const {mypost} = this.state
                const navbarStyle = {
                  backgroundColor : "#ce93d8"
              }
                return (
                  <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            {
                                mypost.length? mypost.map((post, index) => {
                                    return (
                                
                            <div className="card shadow my-2">
                                <div className="card-header " style={navbarStyle}>
                                    <small class="text-light">{index+1}</small>
                                    <h3 className="text-light">
                                        My Reported Queries
                                    </h3>
                            </div>
                            <div className="card-body">
                              
                              <h4 className="card-text">
                              {post.complains}
                              </h4>
                              <p dangerouslySetInnerHTML={{__html: post.textarea}}></p>
                            
                            
                              <p class="card-text my-2"><small class="text-muted">
                      <Moment format='lll'>
                                {post.data}
                            </Moment>
                        </small>
                        </p> 
                            {/* Display replies for the current query */}
                            {post.comments && post.comments.length > 0 && (
  <div>
    <h5>Replies:</h5>
    {post.comments.map((comment, replyIndex) => (
      <div key={replyIndex} className="border p-2 my-2">
        <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
        <p className="text-muted">
          Posted by: {comment.name}
          <br />
          <Moment format="lll">{comment.date}</Moment>
        </p>
      </div>
    ))}
  </div>
)}

                            </div>
                            </div>
                                    )
                                    }):null
                                }
                        </div>
                    </div>
                  </div>
                )
              }
}

export default Myquery