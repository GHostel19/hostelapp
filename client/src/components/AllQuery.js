import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class AllQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allpost: [],
      msg: {}
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/all/queries');
      if (res.status === 200) {
        const allpostWithComments = await Promise.all(
          res.data.map(async (post) => {
            const commentResponse = await axios.get(`/api/response/${post._id}`);
            return {
              ...post,
              comments: commentResponse.data
            };
          })
        );
        this.setState({ allpost: allpostWithComments });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { allpost } = this.state;
    const navbarStyle = {
      backgroundColor: '#ce93d8'
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            {allpost.length ? (
              allpost.map((post, index) => (
                <div key={index} className="card shadow-sm my-5">
                  <div className="card-header" style={navbarStyle}>
                    <h3 className="text-center text-light">View Queries</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5"></div>
                      <div className="col-md-10">
                        <p className="fs-3">
                          <b>{post.username}</b>
                        </p>
                      </div>
                    </div>
                    <div className="card-content my-3">
                      <Link className="nav-link" to={`/query/${post._id}`}>
                        <p className="fs-4">{post.complains}</p>
                      </Link>
                    </div>
                    <div className="card-content">
                      <div dangerouslySetInnerHTML={{ __html: post.textarea }} />
                    </div>
                    <p className="card-text my-2">
                      <small className="text-muted">
                        <Moment format="lll">{post.date}</Moment>
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
              ))
            ) : (
              <p>No queries found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AllQuery;
