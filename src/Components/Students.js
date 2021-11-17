import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CgFontSpacing, CgToggleOff, CgToggleOn } from "react-icons/cg";
import { TextField } from "@material-ui/core";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { Accordion, Button } from "react-bootstrap";
import "./student.css";
function Students() {
  const [getStudentData, setStudentData] = useState([]);
  const [background, setBackground] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const handleClick = () => {
    setAddButton(!addButton);
  };
  const toggle = () => {
    setBackground(!background);
  };
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.students);
        setStudentData(response.students);
      });
  }, []);
  const [searchName, setSearchName] = React.useState("");
  const [searchNameResults, setSearchNameResults] = React.useState([]);
  const [searchTagName, setSearchTagName] = React.useState("");
  const [searchTagNameResults, setSearchTagNameResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchName(event.target.value);
  };
  const handleChanges = (event) => {
    setSearchTagName(event.target.value);
  };
  React.useEffect(() => {
    const results = getStudentData.filter((person) =>
      person.firstName.toLowerCase().includes(searchName)
    );
    setSearchNameResults(results);
  }, [searchName]);

  const [input, setInput] = useState([]);
  localStorage.setItem("testObject", JSON.stringify(input));
  console.log(input);
  var retrievedObject = localStorage.getItem("tagName");
  const tagName = [];
  tagName.push(retrievedObject)
  console.log(tagName)
  React.useEffect(() => {
    const results = tagName.filter((person) =>
      person.includes(searchTagName)
    );
    setSearchTagNameResults(results);
  }, [searchTagName]);
  
  let save = (e) => {
    e.preventDefault();
    let keyword = e.target.elements.keyword.value;
    localStorage.setItem("tagName", (keyword));
    console.log("Keyword: " + keyword);
   
  };
//   var retrievedObject = localStorage.getItem("tagName");
//   const tagName = [""];
//   tagName.push([retrievedObject])
//   console.log(tagName)
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: `${
          background
            ? "linear-gradient(to left, #232526, #414345)"
            : "linear-gradient(to left, #ece9e6, #ffffff)"
        }`,
        caretColor: "transparent",
      }}
    >
      <div style={{ float: "right", position: "fixed" }}>
        {background ? (
          <span style={{ fontSize: "12px", caretColor: "transparent" }}>
            <CgToggleOn
              style={{ color: "black", fontSize: "40px" }}
              onClick={toggle}
            />
            Light?
          </span>
        ) : (
          <span style={{ fontSize: "12px", caretColor: "transparent" }}>
            <CgToggleOff
              style={{ color: "black", fontSize: "40px" }}
              onClick={toggle}
            />
            Night?
          </span>
        )}
      </div>
      <Container
        style={{
          margin: "20rem",
        }}
      >
        <Row>
          <Col>
            <Card
              className="card shadow p-3 mb-5 bg-white rounded"
              style={{
                width: "50vw",
                height: "70vh",
                overflow: "scroll",
              }}
            >
              <TextField
                id="standard-basic"
                label="Search by Name"
                variant="standard"
                value={searchName}
                onChange={handleChange}
              />
              <TextField
                id="standard-basic"
                label="Search by tag"
                variant="standard"
                value={searchTagName}
                onChange={handleChanges}
              />

              <div style={{ width: "100%" }}>
                {searchNameResults.map((data) => (
                  <div key={data.id} className="active">
                    <div className="col-4 "> </div>
                    <div class="container">
                      <div class="row">
                        <div class="col">
                          {" "}
                          <img className="image mt-3" src={data.pic} />
                        </div>
                        <div class="col-8">
                          <h1 style={{ textTransform: "uppercase" }}>
                            {data.firstName} {data.lastName}
                          </h1>
                          <div style={{}}>
                            <div
                              className="body-info "
                              style={{
                                color: "black",
                                fontFamily: "Raleway, sans-serif",
                              }}
                            >
                              {" "}
                              <div>Email: {data.email}</div>
                              <div>Company: {data.company}</div>
                              <div>Skill: {data.skill}</div>
                              <div>
                                Average:{" "}
                                {data.grades.reduce(
                                  (a, b) => a + parseInt(b),
                                  0
                                ) / data.grades.length}
                                %
                              </div>
                              <div>
                                <div variant="secondary">
                                  <p className="button">{retrievedObject}</p>
                                </div>
                              </div>
                              <div>
                                <form onSubmit={save}>
                                  {" "}
                                  <TextField
                                    id="standard-basic"
                                    type="text" 
                                    label="Add a tag"
                                    name="keyword"
                                    variant="standard"
                                  />
                                </form>
                              </div>
                            </div>
                            {addButton ? (
                              <span>
                                <ul style={{ listStyleType: "none" }}>
                                  <li>Test 1 : {data.grades[0]}</li>
                                  <li>Test 2 : {data.grades[1]}</li>
                                  <li>Test 3 : {data.grades[2]}</li>
                                  <li>Test 4 : {data.grades[3]}</li>
                                  <li>Test 5 : {data.grades[4]}</li>
                                  <li>Test 6 : {data.grades[5]}</li>
                                  <li>Test 7 : {data.grades[6]}</li>
                                  <li>Test 8 : {data.grades[7]}</li>
                                </ul>
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </div>
                        </div>
                        <div className="col">
                          {addButton ? (
                            <FaMinus
                              className="plusminus-btn"
                              onClick={handleClick}
                            />
                          ) : (
                            <BsPlusLg
                              className="plusminus-btn"
                              onClick={handleClick}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <hr style={{ boxShadow: "0 0 0 0pt gray" }} />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Students;
