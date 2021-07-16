/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import ContactForm from "./contactForm";

// ! Import firebase
import firebaseDb from "../firebase";

/**
 * @author
 * @function Contact
 **/

const Contact = (props) => {
  // ! State
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState(""); // For UPDATE

  //Once components load complete
  useEffect(() => {
    // ! Retrieve
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setContactObjects({
          ...snapshot.val(),
        });
      } else setContactObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    // ! CREATE
    if (currentId == "") {
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      // ! UPDATE
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  // ! Delete
  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`contacts/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };
  return (
    <>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-center">Contact Registerer</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm
            {...{ currentId, contactObjects, addOrEdit }} // For update
          ></ContactForm>
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((key) => (
                <tr key={key}>
                  <td>{contactObjects[key].fullName}</td>
                  <td>{contactObjects[key].mobile}</td>
                  <td>{contactObjects[key].email}</td>
                  <td className="bg-light">
                    <a
                      className="btn text-primary"
                      onClick={() => {
                        setCurrentId(key);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </a>
                    <a
                      className="btn text-danger"
                      onClick={() => {
                        onDelete(key);
                      }}
                    >
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contact;
