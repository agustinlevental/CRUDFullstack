"use client";
import { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState("0");
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [isEditActive, setIsEditActive] = useState("0");

  const getData = ()=>{
    axios.get("https://localhost:44342/api/Employee").then((result)=>{
      setData(result.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getData();
  },[])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOpenModal = (id) => {
    handleShow();
   axios.get(`https://localhost:44342/api/Employee/${id}`).then((result)=>{
    setEditName(result.data.name)
    setEditAge(result.data.age)
    setIsEditActive(result.data.isActive)
    setEditId(id)
   }).catch((error)=>{
    console.log(error)
   })
   

  };
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this employee?") == true
    ) {
      axios.delete(`https://localhost:44342/api/Employee/${id}`).then((result)=>{
        if(result.status===200){
          getData();
          toast.success("Employee has been deleted")
        } 
      }).catch((error)=>{
        toast.error(error)
      })
    }
  };
  const handleUpdate = () => {
    const url = `https://localhost:44342/api/Employee/${editId}`
    const data = {
    "id":editId,
      "name": editName,
      "age": editAge,
      "isActive": isEditActive
    }
    axios.put(url,data).then((result)=>{
      getData();
      clearFields();
      toast.success("Employee has been updated");
      handleClose();
    })
    
  };
  const handleIsActiveCheckbox = () =>{
    isActive==="0"?setIsActive("1"):setIsActive("0")
  }
  const handleSave = ()=>{
    const url = 'https://localhost:44342/api/Employee'
    const data = {
    
      "name": name,
      "age": age,
      "isActive": isActive
    }
    axios.post(url,data).then((result)=>{
      getData();
      clearFields();
      toast.success("Employee has been added")
    })
  }
  const clearFields = () =>{
    setName("")
    setAge("")
    setIsActive("0")
  } 
  const handleIsEditActiveCheckbox = () =>{
    isEditActive===0?setIsEditActive("1"):setIsEditActive("0")
  }
  return (
    <Fragment>
      <ToastContainer/>
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              // value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              // value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input type="checkbox" checked={isActive === "1" ? true : false}  
            // value={isActive}
             onChange={()=>handleIsActiveCheckbox()}/>
            <label>is active</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={handleSave}>Submit</button>
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>

            <th>Name</th>
            <th>Age</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleOpenModal(item.id)}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        {" "}
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "loading"}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />
          </Col>
          <Col>
            <input type="checkbox" checked={isEditActive === "1" ? true : false}
              value={isEditActive}
               onChange={()=>handleIsEditActiveCheckbox()}/>
            <label>is active</label>
          </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
