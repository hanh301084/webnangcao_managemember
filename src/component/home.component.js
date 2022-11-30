import React, { Component } from 'react'
import axios from 'axios'
export default class Home extends Component {
  /*componentDidMount() {
    axios.get('/user').then(
      (res) => {
        this.setState({
          user: res.user,
        })
      },
      (err) => {
        console.log(err)
      },
    )
  }*/
  render() {
    if (this.user) {
      return <h2>{this.user.fname}</h2>
    }
    return <h2>Manage Member</h2>
  }
}
