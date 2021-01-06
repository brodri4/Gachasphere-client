import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function CreateList(props) {
  const [listName, setListName] = useState({});

  const handleOnChange = (e) => {
    setListName({
      ...listName,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = () => {
    axios.post("http://localhost:8080/lists/list-create", listName);
  };

  return (
    <div>
      {props.isActive ? (
        <div className="add-rating">
          <h1 className="heading">Create List</h1>
          <div className="add-rating_input-block">
            <input
              className="add-rating_input"
              type="text"
              name="Name"
              onChange={handleOnChange}
              placeholder="Please Enter Your List Name"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleOnSubmit();
                }
              }}
            ></input>
            <button
              id="add-rating_button"
              className="primary-button"
              onClick={handleOnSubmit}
            >
              Create
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CreateList;
