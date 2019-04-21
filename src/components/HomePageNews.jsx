import React from 'react'
import { Link } from 'react-router-dom'

import ModalEditNews from './ModalEditNews'

const HomePageNews = (props) => {
  const { items, deletePost, getPost, viewer, editNews } = props
  return (
    items.map(item =>
      <div key={item.id}>
        <div className="offset-2 com-8 col-md-6 offset-md-0 col-lg-4 box block justify-content-center">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">{item.title}</h5>
              <p className="card-text">{item.body}</p>
              <div>
                <Link
                  to={`posts/${item.id}`}
                  onClick={() => viewer(item)}
                >
                  <p className="btn btn-primary block_views">Read more...</p >
                </Link>
                <p className="block_views offset-2">Views: {item.viewer}</p>
              </div>
            </div>
            <div className="row justify-content-center" >
              <p
                className="additional w-auto"
                data-toggle="modal"
                data-target="#ModalEdit"
                data-whatever="@mdo"
                onClick={() => getPost(item)}
              >Edit news</p>
              <p
                className="additional w-auto"
                onClick={() => deletePost(`${item.id}`)}
              >Delete news</p>
            </div>
          </div>
        </div>
        <ModalEditNews editNews={editNews} />
      </div>
    )
  )
}

export default HomePageNews