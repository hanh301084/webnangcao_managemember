import axios from 'axios'
import React, { Component } from 'react'
export default class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: this.email,
      password: this.password,
    }
    axios
      .post('/login', data)
      .then((res) => {
        //localStorage.setItem('token', res.token);
        //localStorage.setItem('user', res.user)
 
        if(res.status === 201){          
          console.log(this.props);
          this.setState({user: res.user});
          console.log(this.props);
          //window.location.replace('/');
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Login</h3>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={(e) => (this.email = e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => (this.password = e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    )
  }
}


