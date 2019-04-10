import React, { Component } from "react";
import "./Modal.css";
import axios from "axios";

export class Modal extends Component {
  
  updateBtn = e => {
    e.preventDefault();
    if (this.props.data === "" || this.props.dataone === "") {
      alert("Please Enter Values");
      return false;
    } else {
      let id = this.props.id;
      let newData = {
        username: this.props.data,
        email: this.props.dataone
      };
      axios(`/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: newData
      })
        .then(res => {
          console.log(res);
          this.props.display();
          this.props.close();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="main-container">
        <div className="modal-container">
          <button
            onClick={this.props.close}
            id="close"
            className="btn btn-danger"
          >
            X
          </button>
          <p className="text-center">Update Item</p>
          <form autoComplete="off">
            <input
              className="form-control"
              placeholder="Name"
              onChange={this.props.log}
              value={this.props.data}
              type="text"
              name="username"
            />{" "}
            <br />
            <input
              className="form-control"
              placeholder="Email"
              onChange={this.props.log}
              value={this.props.dataone}
              type="text"
              name="email"
            />
            <br />
            <div className="text-right">
              <button className="btn btn-success" onClick={this.updateBtn}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
