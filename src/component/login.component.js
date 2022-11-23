import axios from 'axios'
import React, { Component } from 'react'

export default class Login extends Component {
  state = {}
  handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: this.email,
      password: this.password,
    }
    axios
      .post('/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
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
