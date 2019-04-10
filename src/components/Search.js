import React, { Component } from "react";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgPath: null,
      imgPrew: null
    };
    this.addMeCheck =  this.addMeCheck.bind(this);
    this.checkMe = this.checkMe.bind(this);
  }

  checkMe = e => {
    this.setState({
      imgPath: e.target.files[0],
      imgPrew: URL.createObjectURL(e.target.files[0])
    });
  };

  addMeCheck = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", this.state.imgPath);

    fetch("/user", {
      method: "POST",
      body: formData
    }).then(data => console.log(data));
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <div id="img">
            <img id="imgPic" src={this.state.imgPrew} alt="Alt" />
          </div>
          <input type="file" name="avatar" onChange={this.checkMe.bind(this)} />
          <button onClick={this.addMeCheck}>Add</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
