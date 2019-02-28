import React, { Component } from 'react';
import './App.css';
import initFirebase from "./firebase/fireConfig";
import Login from "./Login";
import Home from "./Home";


class LoginLogout extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      coursesList: [
        {n:1, text: "JS"},
      ],
      next: 2
    }
    this.add =this.add.bind(this);
    this.delete=this.delete.bind(this);
  }
  add(text) {
    let courseItem = this.state.coursesList.slice();
    courseItem.push({n:this.state.next, text:text});
    this.setState({coursesList:courseItem, next:++this.state.next});
  }
  delete (n) {
    //console.log("del",n)
    this.setState({coursesList:this.state.coursesList.filter((course, index) =>course.n!==n)})
  }
  render() {
    return (
      <div className="todolist"> 
        <div>
          <Header/>
          <Input text="" add={this.add}/>
          <ul>
            {
              this.state.coursesList.map((course) => {
                return <Item course={course} key={course.n} n={course.n} delete={this.delete}/>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

 export default LoginLogout;