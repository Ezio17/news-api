import React from 'react'
import { Link } from 'react-router-dom'

import Fetch from '../details/Fetch'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      postComment: [],
      hidden: true,
      authorPost: '',
      news: '',
    }

    this.hideComments = async () => {
      const comments = await Fetch(' https://jsonplaceholder.typicode.com/comments/')

      const postId = this.props.match.url.match(/\d+/g).join('');
      const postComment = comments.filter(comment => comment.postId === +postId)

      this.setState(prevState => ({
        hidden: !prevState.hidden,
        postComment,
      }));
    }
  }

  async componentDidMount() {
    const urlPostId = this.props.location.pathname.match(/\d+/g).join('')
    const localStorageUsers = JSON.parse(localStorage.getItem("news"))
    const user = localStorageUsers.filter(user => user.id === +urlPostId)
    const authorPost = await Fetch('https://jsonplaceholder.typicode.com/users/' + user[0].userId)

    this.setState({
      authorPost: authorPost.name,
      news: user[0]
    })
  }

  render() {
    const { postComment, hidden, authorPost, news } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center back">
            <Link to="/">
              <h1 className="back">All news</h1>
            </Link>
          </div>
          <h1 className="col-12 text-center post__title">Author:
          {authorPost === undefined ? ' Anonym' :
              <Link to={`/users/${news.userId}`} className="authorPost"> {authorPost} </Link>
            }</h1>

          <div className="card col-12 col-md-8 post">
            <div className="card-body">
              <h3 className="text-center">{news.title}</h3>
              <p className="text-center">{news.body}</p>
              <div className="post__block-comment">
                <p
                  className="post__comment"
                  onClick={this.hideComments}
                >{hidden ? 'Open comments' : 'Close comments'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={hidden ? 'row hidden' : 'row justify-content-center'}>
          {postComment.map(comment =>
            <div className="card border-dark col-12 col-md-6 col-lg-4 col-xl-3" key={comment.id}>
              <Link to={'/users/' + `${comment.id}`}>
                <div className="card-header text-center">{comment.email} </div>
              </Link>
              <div className="card-body text-dark">
                <h5 className="card-title">{comment.name}</h5>
                <p className="card-text">{comment.body}</p>
              </div>
            </div>)}
        </div>
      </div >
    )
  }
}

export default Post


