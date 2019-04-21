import React from 'react'
import { connect } from 'react-redux';

import Fetch from '../details/Fetch'
import ModalAddNews from './ModalAddNews'
import HomePageHeader from './HomePageHeader'
import HomePageNews from './HomePageNews'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortNewNews: 'New news',
      mostCommented: 'Most commented',
      popularNews: 'Popular news',
      editItem: null,
      isLoading: true,
    }

    this.newNews = () => {
      const copyNews = [...this.props.items];
      let sortNewNews = '';

      if (this.state.sortNewNews === 'Old news') {
        copyNews.sort((a, b) => a['id'] - b['id']);
        sortNewNews = 'New news'
      } else if (this.state.sortNewNews === 'New news') {
        copyNews.sort((a, b) => b['id'] - a['id']);
        sortNewNews = 'Old news'
      }

      this.setState({
        sortNewNews,
      })

      let items = JSON.stringify(copyNews);
      localStorage.setItem('news', items)

      this.props.changeNews(JSON.parse(localStorage.getItem("news")))
    }

    this.popularNews = () => {
      const copyNews = [...this.props.items];
      let popularNews = '';

      if (this.state.popularNews === 'Popular news') {
        copyNews.sort((a, b) => b['viewer'] - a['viewer']);
        popularNews = 'Unpopular news'
      } else if (this.state.popularNews === 'Unpopular news') {
        copyNews.sort((a, b) => a['viewer'] - b['viewer']);
        popularNews = 'Popular news'
      }

      this.setState({
        popularNews,
      })

      let items = JSON.stringify(copyNews);
      localStorage.setItem('news', items)

      this.props.changeNews(JSON.parse(localStorage.getItem("news")))
    }

    this.viewer = (item) => {
      let { items } = this.props
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
          items[i] = {
            ...items[i],
            viewer: items[i].viewer + 1
          }

          let newItems = JSON.stringify(items);
          localStorage.setItem('news', newItems)

          this.props.changeNews(JSON.parse(localStorage.getItem("news")))
          this.props.setInput(item.userId)
        }
      }
    }

    this.deletePost = (id) => {
      const newsWithoutPost = this.props.items.filter(item => item.id !== +id)
      let items = JSON.stringify(newsWithoutPost);
      localStorage.setItem('news', items)

      this.props.changeNews(JSON.parse(localStorage.getItem("news")))
    }

    this.addNews = (title, body, userId) => {
      let copyItems = [...this.props.items]
      let allId = [];

      if (title === '') {
        return;
      }
      if (body === '') {
        return;
      }

      for (let i = 0; i < copyItems.length; i++) {
        allId.push(copyItems[i].id)
      }

      let max = Math.max.apply(null, allId)
      let newNews = { title, body, userId, id: max + 1, viewer: 0 }
      let concanNews = [...this.props.items, newNews];
      let items = JSON.stringify(concanNews);
      localStorage.setItem('news', items)

      this.props.changeNews(JSON.parse(localStorage.getItem("news")))
    }

    this.editNews = (title, body) => {
      const { editItem } = this.state
      const { items } = this.props

      if (editItem.title === title && editItem.body === body) {
        return
      }

      if (title === '') {
        title = editItem.title;
      }
      if (body === '') {
        body = editItem.body
      }
      console.log(editItem.title, '==========' + title)

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === editItem.id) {
          items[i] = {
            ...items[i],
            title,
            body
          }
          let newItems = JSON.stringify(items);
          localStorage.setItem('news', newItems)
          this.props.changeNews(JSON.parse(localStorage.getItem("news")))
        }
      }
    }

    this.getPost = (item) => {
      const { setInput } = this.props
      setInput(item.title, item.body)
      this.setState({
        editItem: item,
      })
    }
  }

  async componentDidMount() {
    if (JSON.parse(localStorage.getItem("news")) !== null) {
      this.props.changeNews(JSON.parse(localStorage.getItem("news")))

      this.setState({
        isLoading: false,
      })
      return
    }

    const news = await Fetch('https://jsonplaceholder.typicode.com/posts/')

    const viewer = [...news]
    for (let i = 0; i < viewer.length; i++) {
      viewer[i].viewer = 0;
    }

    let items = JSON.stringify(viewer);
    localStorage.setItem('news', items)

    this.props.changeNews(JSON.parse(localStorage.getItem("news")))

    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { sortNewNews, mostCommented, popularNews, isLoading } = this.state
    const { items } = this.props

    return (
      isLoading ?
        <div className="Loader">
          <h1>Loading...</h1>
        </div>
        :
        <div className="container">
          <div className="row">
            <HomePageHeader
              sortNewNews={sortNewNews}
              mostCommented={mostCommented}
              popularNewsText={popularNews}
              newNews={this.newNews}
              popularNews={this.popularNews}
              mostCommentedFunc={this.mostCommented}
            />
            <ModalAddNews addNews={this.addNews} />
            <HomePageNews
              items={items}
              viewer={this.viewer}
              deletePost={this.deletePost}
              getPost={this.getPost}
              editNews={this.editNews}
            />
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.news,
});

const mapDispatchToProps = dispatch => {
  return {
    changeNews(news) {
      dispatch({ type: 'CHANGE_NEWS', payload: news })
    },
    setInput(title, body) {
      dispatch({ type: 'SET_INPUT', payload: { title, body } })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);