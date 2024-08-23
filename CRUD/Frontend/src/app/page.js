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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showCreateEmployee, setShowCreateEmployee] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [isEditActive, setIsEditActive] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:44342/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this employee?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://localhost:44342/api/Employee/${id}`)
          .then((result) => {
            if (result.status === 200) {
              getData();
              Swal.fire({
                title: "Deleted!",
                text: "Employee has been deleted",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      }
    });
  };

  const handleUpdate = () => {
    if (!validateInput(editName,editAge)) return;
    const url = `https://localhost:44342/api/Employee/${editId}`;
    const data = {
      id: editId,
      name: editName,
      age: editAge,
      isActive: isEditActive,
    };
    axios.put(url, data).then((result) => {
      getData();
      clearFields();
      Swal.fire({
        title: "Good job!",
        text: "Employee has been updated",
        icon: "success",
      });
      handleClose();
    });
  };
  const handleSaveAndPost = () => {
    if (!validateInput(name,age)) return;
    const url = "https://localhost:44342/api/Employee";
    const data = {
      name: name,
      age: age,
      isActive: isActive,
    };
    axios.post(url, data).then((result) => {
      getData();
      clearFields();
      Swal.fire({
        title: "Good job!",
        text: "Employee has been added",
        icon: "success",
      });
    });
    handleCloseCreateEmployee();
  };
  const handleOpenModal = (id) => {
    setShow(true);
    axios
      .get(`https://localhost:44342/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setIsEditActive(result.data.isActive);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOpenModalCreateEmployee = () => {
    setShowCreateEmployee(true);
  };
  const handleClose = () => setShow(false);
  const handleCloseCreateEmployee = () => setShowCreateEmployee(false);
  
  const handleIsActiveCheckbox = () => {
    setIsActive(isActive === 0 ? 1 : 0);
  };
  const handleIsEditActiveCheckbox = () => {
    setIsEditActive(isEditActive === 0 ? 1 : 0);
  };
  const clearFields = () => {
    setName("");
    setAge("");
    setIsActive(0);
  };
  const validateInput = (name,age) => {
    const nameRegex = /^[A-Za-z\s]+$/;  
    const ageRegex = /^[0-9]+$/;        

    if (!name || !nameRegex.test(name)) {
      toast.error("Please enter a valid name.");
      return false;
    }

    if (!age || !ageRegex.test(age)) {
      toast.error("Please enter a valid age.");
      return false;
    }

    return true;
  };
  return (
    <Fragment>
      <ToastContainer />
      <Container>
        <div className={styles.buttonContainer}>
          <Button
            className="btn btn-primary"
            onClick={handleOpenModalCreateEmployee}
            style={{ marginTop: "15px" }}
          >
            Add Employee
          </Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center ">#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Age</th>
              <th className="text-center">Is active</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.age}</td>
                  <td className="text-center">
                    {item.isActive === 1 ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : (
                      <i className="bi bi-x-circle-fill text-danger"></i>
                    )}
                  </td>
                  <td className={styles.flexCenter}>
                    <div className={styles.actionsButtonsContainer}>
                      <i
                        className="bi bi-pencil-fill text-primary"
                        onClick={() => handleOpenModal(item.id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className="bi bi-trash-fill text-danger"
                        onClick={() => handleDelete(item.id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <Modal show={showCreateEmployee} onHide={handleCloseCreateEmployee}>
        <Modal.Header closeButton>
          <Modal.Title>Add employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={isActive === 1}
                value={isActive}
                onChange={handleIsActiveCheckbox}
              />
              <label style={{ marginLeft: "5px" }}>Is active</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateEmployee}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAndPost}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>

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
            <Col style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={isEditActive === 1}
                value={isEditActive}
                onChange={handleIsEditActiveCheckbox}
              />
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
