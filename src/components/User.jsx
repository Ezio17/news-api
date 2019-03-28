import React from 'react'
import { Link } from 'react-router-dom'

import Fetch from '../details/Fetch'

class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      addressVisibility: false,
      companyVisibility: false,
    }

    this.goBack = () => {
      this.props.history.goBack();
    }

    this.companyVisibilityInfo = () => {
      this.setState(prevState => ({
        companyVisibility: !prevState.companyVisibility,
      }));
    }

    this.addressVisibilityInfo = () => {
      this.setState(prevState => ({
        addressVisibility: !prevState.addressVisibility,
      }));
    }
  }

  async componentDidMount() {
    const user = await Fetch('https://jsonplaceholder.typicode.com' + this.props.match.url)

    this.setState({
      user,
    })
  }

  render() {
    const { user, addressVisibility, companyVisibility } = this.state

    let address = {};
    let company = {};
    Object.assign(address, user.address);
    Object.assign(company, user.company);

    const addressInfo = addressVisibility ? 'list-group-item' : 'list-group-item hidden'
    const companyInfo = companyVisibility ? 'list-group-item' : 'list-group-item hidden'

    return (
      user.name === undefined ?
        <div className="bg-color">
          <h1 className="no-info">We haven't information about this user :(</h1>
        </div>
        :
        <div className="container">
          <div className="row">
            <div className="col-12 text-center back">
              <Link to="/" className="text-center">
                <h1 className="back__text">All news / </h1>
              </Link>
              <h1
                className="back__text text-center"
                onClick={this.goBack}
              >Back
                </h1>
            </div>
            <div className="offset-md-3 col-md-6">
              <ul className="list-group  text-center">
                <li className="list-group-item">Name: {user.name}</li>
                <li className="list-group-item">User name: {user.username}</li>
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Phone: {user.phone}</li>
                <li className="list-group-item" >Website: {user.website}</li>
                <li
                  className="list-group-item pointer"
                  onClick={this.addressVisibilityInfo}
                >Address info</li>
                <li className={addressInfo}>City: {address.city}</li>
                <li className={addressInfo}>Geo: lat {address.geo.lat}, lng {address.geo.lng} </li>
                <li className={addressInfo}>Street: {address.street}</li>
                <li className={addressInfo}>Suite: {address.suite}</li>
                <li className={addressInfo}>Zipcode: {address.zipcode}</li>
                <li
                  className="list-group-item pointer"
                  onClick={this.companyVisibilityInfo}
                >Company info</li>
                <li className={companyInfo}>Name: {company.name}</li>
                <li className={companyInfo}>Catch Phrase: {company.catchPhrase}</li>
                <li className={companyInfo}>Bs: {company.bs}</li>
              </ul>
            </div>
          </div>
        </div>
    )
  }
}

export default User