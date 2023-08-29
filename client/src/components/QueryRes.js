// import React, { Component } from 'react'
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


// export class QueryRes extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       post: {},
//       comment: '',
//       msg: {}
//     }
//   }
//   async componentDidMount() {
//     try {
//       const res = await axios.get(`/api/query/${this.props.match.params.id}`);
//       // const res=await axios.get('/api/all/queries');
//       if (res.status === 200) {
//         console.log(res.data);
//         this.setState({ post: res.data })

//       }

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   async componentDidUpdate(prevState, prevProps) {
//     if (prevProps.post !== prevProps.post) {
//       try {
//         const res = await axios.get(`/api/query/${this.props.id}`);
//         // const res=await axios.get('/api/all/queries');
//         if (res.status === 200) {
//           console.log(res.data);
//           this.setState({ post: res.data })

//         }

//       } catch (error) {
//         console.log(error)
//       }
//     }
//   }
//   changeHandle=(e)=> {
//     this.setState({[e.target.name]: e.target.value})
// } 
//   handleChange = (e) => {
//     this.setState({ comment: e })
//   }

//   modules = {
//     toolbar: [
//       [{ 'header': [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//       ['link', 'image'],
//       ['clean']
//     ],
//   }

//   formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
//   ]
  
//   // this is submit function for add comment
//   SubmitHandle=async (e) => {
//     e.preventDefault();
//     try {
//         // get token from localStorage
// const token = localStorage.getItem('token');
// //Headers
// const config={
// headers: {
//   'Content-type':"application/json"
// }
// };
// if (token) {
// config.headers['Authorization'] = token
// }

//       const user = {
//         comment: this.state.comment

//       }

//       const res = await axios.post(`/api/comment/${this.props.match.params.id}`, user, config);

//       if(res.status===200) {
//         this.setState({msg: res.data.msg})
//         var x = document.getElementById("snackbar");
//         x.className="show bg-success";
//         setTimeout(function() {x.className.replace("show", "");}, 3000);
//         this.props.history.push('/')
//       }
//             } catch (error) {
//                 if (error.status === 404) {
//                     this.setState({msg: error.response.data.msg})
//                     var forErrorMsg=document.getElementById("snackbar");
//                     forErrorMsg.className="show bg-danger";
//                     setTimeout(function() {forErrorMsg.className.replace("show", "");}, 3000);
//                 }
//             }
//   }
  
//   render() {
//     const { post, msg } = this.state;
//     const { comments } = this.state.post;
    
//     return (
//       <div className="container">
//         {msg.length ? msg.map(errMsg => (
//           <div key={errMsg.msg} id="snackbar">
//             <strong>{errMsg.msg}</strong>
//           </div>
//         )) : null}
//         <div className="row">
//           <div className="col-md-6 m-auto">
//             <div className=" card-shadow-sm my-5">
//               <div className="card-header bg-success">
//                 <small className="text-light">{post.username}</small>
//                 <h3 className="text-light">{post.complains}</h3>
//               </div>
//               <div className="card-body">
//                 <div dangerouslySetInnerHTML={{ __html: post.textarea }} />
//               </div>
//             </div>
//             {comments ? comments.map((comment, index) => {
//               const navbarStyle = {
//                 backgroundColor : "#ce93d8"
//             }
//               return (
//                 <div className=" card-shadow-sm my-1">
//                   <div className="card-header " style={navbarStyle}>
//                     <small className="text-light">{comment.username}</small>
//                     <h3 className="text-light">{comment.complains}</h3>
//                   </div>
//                   <div className="card-body">
//                     <small><b>Reply:- </b></small>
//                     <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
//                   </div>
//                 </div>)
//             }) : null}
//           </div>
//         </div>

//         <div className="col-md-6 m-auto">
//           <div className="card">
//             <div className="card-body">
//               <form onSubmit={this.SubmitHandle}>
                
//                   <div class="mb-3">
//                     <label for="comment" class="form-label"><b>Response</b></label>
//                     <ReactQuill value={this.state.comment}
//                       onChange={this.handleChange}
//                       name="comment"
//                       theme="snow"
//                       modules={this.modules}
//                       formats={this.formats}
//                     />



                  
//                 </div>
//                 <button type="submit" class="btn btn-success">Add Response</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//     )
//   }
// }

// export default QueryRes

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QueryRes = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(`/api/query/${id}`);
        if (res.status === 200) {
          console.log(res.data);
          setPost({post: res.data});
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();
  }, [id]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleChange = (e) => {
    setComment(e);
  };

  const SubmitHandle = async (e) => {
    e.preventDefault();
    try {
      // get token from localStorage
      const token = localStorage.getItem('token');
      // Headers
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      if (token) {
        config.headers['Authorization'] = token;
      }

      const user = {
        comment: comment,
      };

      const res = await axios.post(`/api/comment/${id}`, user, config);

      if (res.data.msg) {
        setMsg([res.data.msg]);
        var x = document.getElementById('snackbar');
        x.className = 'show bg-success';
        setTimeout(function () {
          x.className.replace('show', '');
        }, 3000);
        navigate('/viewquery');
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMsg([error.response.data.msg]);
        var forErrorMsg = document.getElementById('snackbar');
        forErrorMsg.className = 'show bg-danger';
        setTimeout(function () {
          forErrorMsg.className.replace('show', '');
        }, 3000);
      }
    }
  };

  return (
    <div className="container">
      {msg.length ? msg.map((errMsg) => (
        <div key={errMsg.msg} id="snackbar">
          <strong>{errMsg.msg}</strong> 
        </div>
      )) : null}
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className=" card-shadow-sm my-5">
            <div className="card-header bg-success">
              <small className="text-light">{post.username}</small>
              <h3 className="text-light">{post.complains}</h3>
            </div>
            <div className="card-body">
              <div dangerouslySetInnerHTML={{ __html: post.textarea }} />
            </div>
          </div>
          {post.comments ? post.comments.map((comment, index) => {
            const navbarStyle = {
              backgroundColor: "#ce93d8",
            };
            return (
              <div className=" card-shadow-sm my-1">
                <div className="card-header " style={navbarStyle}>
                  <small className="text-light">{comment.username}</small>
                  <h3 className="text-light">{comment.complaints}</h3>
                </div>
                <div className="card-body">
                  <small><b>Reply:- </b></small>
                  <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
                </div>
              </div>
            );
          }) : null}
        </div>
      </div>

      <div className="col-md-6 m-auto">
        <div className="card">
          <div className="card-body">
            <form onSubmit={SubmitHandle}>

              <div className="mb-3">
                <label htmlFor="comment" className="form-label"><b>Response</b></label>
                <ReactQuill
                  value={comment}
                  onChange={handleChange}
                  name="comment"
                  theme="snow"
                  modules={modules}
                  formats={formats}
                />
              </div>
              <button type="submit" className="btn btn-success">Add Response</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryRes;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const QueryRes = ({ queryId }) => {
//   const [query, setQuery] = useState({});
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchQueryDetail();
//   }, [queryId]);

//   const fetchQueryDetail = async () => {
//     try {
//       const response = await axios.get(`/api/query/${queryId}`);
//       setQuery(response.data);
//       setComments(response.data.comments);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const handleCommentSubmit = async () => {
//     try {
//       const response = await axios.post(`/api/comment/${queryId}`, { comment });
//       setComments(response.data.comment);
//       setComment('');
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   return (
//     <div style={styles.container}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <h2>Query Detail</h2>
//           <p style={styles.queryField}>Complains: {query.complains}</p>
//           <p style={styles.queryField}>Text Area: {query.textarea}</p>

//           <div style={styles.commentsSection}>
//             <h3>Comments</h3>
//             <ul>
//               {comments.map(comment => (
//                 <li key={comment._id} style={styles.comment}>{comment.comment}</li>
//               ))}
//             </ul>
//             <textarea
//               style={styles.textarea}
//               placeholder="Add your comment..."
//               value={comment}
//               onChange={e => setComment(e.target.value)}
//             />
//             <button style={styles.button} onClick={handleCommentSubmit}>Submit Comment</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default QueryRes;

const styles = {
  container: {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '20px'
  },
  queryField: {
    fontSize: '16px',
    marginBottom: '10px'
  },
  commentsSection: {
    marginTop: '20px'
  },
  comment: {
    padding: '5px',
    border: '1px solid #ddd',
    marginBottom: '5px',
    borderRadius: '5px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px'
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};




