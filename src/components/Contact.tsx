import React, { useState } from "react";
import SendIcon from "../assets/Icons/send";
import ArrowDownIcon from "../assets/Icons/ArrowDown";
import { Row, Col, Button } from "react-bootstrap";
import { FormEvent } from "react";
import Contacts from "./ContactIcon";
import "./styles.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget;
    const formData = new FormData(formElements);

    setLoading(true);

    fetch(
      "https://script.google.com/macros/s/AKfycbw9sb77WtO7P2uDWIDsjpvihXUlAXAxnNnd4uz-fz4yQ8Agv5vAcP45E7Zt2JIts4JXLg/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            Name: "",
            Email: "",
            Message: "",
          });
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleClearAll = () => {
    setFormData({
      Name: "",
      Email: "",
      Message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <Row>
        <Col
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="d-flex flex-column text-center align-items-center">
            <p>You can email me here</p> <ArrowDownIcon color="#222831" />
          </div>
          <button className="email-btn w-100">
            <a href="mailto:pbagagunio@gmail.com?">
              <SendIcon color="#222831" /> Send Email
            </a>
          </button>
          <div className="d-flex flex-column text-center align-items-center mt-5">
            <p>
              Additional Contacts <Contacts />
            </p>
          </div>
        </Col>
        <Col
          lg={2}
          className="d-flex justify-content-center align-items-center"
        >
          <p className="line-text">Or</p>
        </Col>
        <Col lg={6} className="">
          <form
            className="d-flex flex-column"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-control">
              <label>
                Name
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label>
                Email
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label>
                Message
                <textarea
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="d-flex">
              <Button
                className="form-btn clear-btn"
                type="button"
                onClick={handleClearAll}
                disabled={loading}
              >
                Clear
              </Button>
              <Button
                className="form-btn form-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
          {submitSuccess && (
            <p className="success-message">
              Your message was successfully sent!
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
