import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
// import Modal from "./components/Modal"
// import Navbar from "./components/Navbar";
// import {  BrowserRouter as Route, Link, Router } from "react-router-dom";
// import Search from "./components/Search";
// import Header from "./components/Header"

class App extends Component {
  // state = {
  //   newData: ["Hammad"],
  //   names: "",
  //   test: ""
  // // };

  // handleChange = e => {
  //   this.setState({
  //     names: e.target.value
  //   });
  // };

  // addItem = (e) => {
  //   e.preventDefault();
  //   let name = this.state.names;
  //   let newArr = this.state.newData;

  //   if (newArr.includes(name) || name === "") {
  //     this.setState({
  //       test: "Error"
  //     });
  //     return false;
  //   } else {
  //     newArr.push(name);
  //     this.setState({
  //       newData: newArr,
  //       test: "Item Added",
  //       names:""
  //     });

  //   }

  //   console.log(this.state.newData);
  // };

  // delItem = i => {
  //   let newArr = this.state.newData;
  //   newArr.splice(i, 1);
  //   this.setState({
  //     newData: newArr,
  //     test: "Item Deleted"
  //   });
  //   if (newArr.length === 0) {
  //     this.setState({
  //       test: "List Is Empty"
  //     });
  //   }
  //   console.log("Clicked");
  // };

  render() {
    return (
      <div className="container">
        <h4 className="text-center text-secondary">
          CRUD - React , Node + Express, FetchAPI , MySql - MERN{" "}
        </h4>
        {/* <Header /> */}
        <div>
        
        </div>
        {/* <Router>
          <Route
            path="/"  component={App} />
          <Route path="/navbar" component={Navbar} />
          <Route path="/search" component={Search} />
        </Router> */}
        <br />
        {/* <form method="POST" onSubmit={this.addItem}>
          <input
            type="text"
            value={this.state.names}
            onChange={this.handleChange}
          />
          
        </form> */}
        {/* <p className={this.state.test ? "check" : ""}>{this.state.test}</p> */}
        <Navbar />
      </div>
    );
  }
}

export default App;
