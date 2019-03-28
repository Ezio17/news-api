import React from 'react'

const HomePageHeader = ({ mostCommented, sortNewNews, newNews, mostCommentedFunc, popularNews, popularNewsText }) => {

  return (
    <>
      <div className="col-12 text-center title">
        <h1 className="title_news">News</h1>
      </div>
      <ul className="nav justify-content-center col-12">
        <li className="nav-item">
          <p
            className="nav-link sortedItems"
            onClick={mostCommentedFunc}
          >{mostCommented}</p>
        </li>
        <li className="nav-item">
          <p
            className="nav-link sortedItems"
            onClick={popularNews}
          >{popularNewsText}</p>
        </li>
        <li className="nav-item">
          <p
            className="nav-link sortedItems"
            onClick={newNews}
          >{sortNewNews}</p>
        </li>
      </ul>
      <div className="col-12">
        <button
          type="button"
          className="btn btn-secondary offset-4 col-4 offset-md-5 col-md-2 btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@mdo"
        >Add news</button>
      </div>
    </>
  )
}

export default HomePageHeader