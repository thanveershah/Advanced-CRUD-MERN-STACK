import React, { Component } from "react";
import Modal from "./Modal";
// import Search from "./Search";
import "./Navbar.css";
import axios from "axios";
// import uuid from "uuid"

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      userArray: [],
      tableArray: [],
      username: "",
      email: "",
      id: 0,
      list: "Please Add Items",
      colors: "text-info",
      showModal: false,
      imgPath: null,
      imgPrew: null,
      loading: false,
      startVal: 0,
      offset: 0,
      totalCount: []
      // testImage: "bottomlogo.jpg"
    };
    this.displayData = this.displayData.bind(this);
    this.displayTable = this.displayTable.bind(this);
    this.pagination = this.pagination.bind(this);
    this.paginationIncr = this.paginationIncr.bind(this);
    // this.testtry = this.testtry.bind(this);
  }

  //Checking Image
  checkMe = e => {
    this.setState({
      imgPath: e.target.files[0],
      imgPrew: URL.createObjectURL(e.target.files[0])
    });
  };

  // testtry = val => {
  //   this.setState({
  //     testImage: URL.createObjectURL(val)
  //   });
  //   console.log(this.state.testImage);
  // };

  // //Storing the Data
  addBtn = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("avatar", this.state.imgPath);
    formData.set("username", this.state.username);
    formData.set("email", this.state.email);
    // var data = {
    //   username: this.state.username,
    //   email: this.state.email
    // };
    this.setState({
      loading: true
    });
    // console.log(formData);
    axios
      .post("/user", formData)
      .then(res => {
        console.log(res);
        this.setState({
          list: "Item Added",
          colors: "text-success"
        });
        this.displayData();
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });

    console.log(this.state.userArray);
  };

  //Displaying the Data
  componentDidMount() {
    this.pagination();
    this.displayData();
  }

  displayData() {
    axios.get("/user/?startVal=" + this.state.offset + "").then(res => {
      console.log(res.data);
      this.setState({
        userArray: res.data
      });
    });
  }

  //Handling the input values
  logChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Delete Data
  delBtn = id => {
    axios(`/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        this.setState({
          list: "Item Deleted",
          colors: "text-danger"
        });
        this.displayData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Open Model
  openModel = data => {
    let username = data.username;
    let email = data.email;
    let id = data.id;
    this.setState({
      showModal: true,
      username: username,
      email: email,
      id: id
    });
  };

  //Close Model
  closeModel = () => {
    this.setState({
      showModal: false
    });
  };

  searchText = e => {
    let keys = e.target.value;
    axios(`/user/${keys}`).then(res => {
      console.log(res);
      this.setState({
        userArray: res.data
      });
    });
  };

  displayTable = e => {
    let test = e.target.value;
    let type = "details";
    axios(`/user/${test}/${type}`).then(res => {
      console.log(res);
      this.setState({
        tableArray: res.data
      });
    });
    console.log(this.state.tableArray);
  };

  deleteAll = e => {
    e.preventDefault();
    axios("/user", {
      method: "DELETE"
    }).then(res => {
      console.log(res);
      this.displayData();
    });
  };

  nextBtn = e => {
    e.preventDefault();
    var startval = this.state.startVal + 3;
    this.setState({
      startVal: startval
    });
    axios.get("/user/?startVal=" + startval + "").then(res => {
      console.log(res);
      this.setState({
        userArray: res.data
      });
    });
  };

  prevBtn = e => {
    e.preventDefault();
    var startval = this.state.startVal - 3;
    this.setState({
      startVal: startval
    });
    axios.get("/user/?startVal=" + startval + "").then(res => {
      this.setState({
        userArray: res.data
      });
    });
  };

  pagination = () => {
    fetch("/pagination")
      .then(data => {
        return data.json();
      })
      .then(data => {
        for (var i = 1; i <= data; i++) {
          this.state.totalCount.push(i);
          this.setState({
            totalCount: this.state.totalCount
          });
        }
        console.log(this.state.totalCount);
      });
  };

  paginationIncr = (data, event) => {
    event.preventDefault();
    var pageNumber = data * 3 - 3;
    this.setState({
      offset: pageNumber
    });
    axios.get("/user/?startVal=" + pageNumber + "").then(res => {
      this.setState({
        userArray: res.data
      });
    });
    console.log(data);
  };

  render() {
    return (
      <div className="conatiner">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <div id="img">
                <img id="imgPic" src={this.state.imgPrew} alt="Alt" />
              </div>
              <input type="file" name="avatar" onChange={this.checkMe} />
            </div>
            {/* <Search /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="text-secondary">
                <b>Enter Items:</b>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.logChange}
                  name="username"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.logChange}
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="text-right">
                <button
                  className="btn btn-primary"
                  name="addBtn"
                  onClick={this.addBtn}
                >
                  Add
                  <span
                    className={
                      this.state.loading
                        ? "spinner-border spinner-border-sm ml-2"
                        : ""
                    }
                  />
                </button>
              </div>
            </form>
            <hr />
            <div className="form-group mt-3">
              <select
                name="selectOption"
                className="form-control"
                onChange={this.displayTable}
              >
                <option value="">-Select-</option>
                {this.state.userArray.map(data => (
                  <option value={data.id} key={data.id}>
                    {data.username}
                  </option>
                ))}
              </select>
            </div>
            <table className="table table-dark">
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
                {this.state.tableArray.map(data => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            {/* <Search /> <br /> */}
            <div className="text-secondary">
              <b>Search Items:</b>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Search"
                type="text"
                name="search"
                onChange={this.searchText}
              />
            </div>
            <br />
            <hr />
            <div className="text-right">
              {this.state.totalCount.map((data, index) => (
                <button
                  className="btn btn-secondary active mr-2"
                  key={index}
                  onClick={e => this.paginationIncr(data, e)}
                >
                  {data}
                </button>
              ))}
            </div>
            <br />
            <b className={this.state.colors}>{this.state.list}</b>
            <ul className="list-group mt-3 d-flex flex-wrap justify-content-between ">
              {this.state.userArray.map((data, index) => (
                <li
                  key={data.id}
                  className="list-group-item  align-items-center"
                  style={{ boxShadow: "0 8px 10px silver" }}
                >
                  <div id="img">
                    <img
                      id="imgPic"
                      src={process.env.PUBLIC_URL +"/images/"+ data.image}
                      // onLoad={() => this.testtry(data.image)}
                      alt="Alt"
                    />
                    {/* <p>{data.image}</p> */}
                  </div>
                  <div className="order-md-1 order-2 ">
                    <b>ID : {data.id}</b> <br />
                    <b>Name:</b> {data.username} <br /> <b>Email: </b>{" "}
                    {data.email}
                  </div>
                  <div className="order-md-2 order-1 text-right mt-4 button-sec">
                    <button
                      onClick={() => this.openModel(data)}
                      className="btn mr-2"
                      style={{ color: "white", background: "orange" }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => this.delBtn(data.id)}
                    >
                      X
                    </button>
                  </div>{" "}
                </li>
              ))}
            </ul>
            <div className="text-right">
              <button
                className="btn btn-danger mt-4 mb-5"
                onClick={this.deleteAll}
                disabled={this.state.userArray.length === 0 ? true : false}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
        {this.state.showModal ? (
          <Modal
            data={this.state.username}
            dataone={this.state.email}
            id={this.state.id}
            close={this.closeModel}
            log={this.logChange}
            display={this.displayData}
            list={this.state.list}
          />
        ) : null}
      </div>
    );
  }
}

export default Navbar;
