import React from "react";

import "./_style.scss";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

// import Counter from '../../Components/Counter/counter';

function Contact() {
  console.log("render Contact");
  const handleClearContact = () => {
    alert("clear");
  };

  const handleSentContact = () => {
    alert("clear");
  };

  return (
    <>
      <Header></Header>
      <div className="container-fuild contact-container">
        <div className="row infor-contact">
          <p className="col-12 contact-description">
            Thank you for visiting my website. If you have any questions or
            suggestions, please contact me through the channels below. Have a
            nice day!
          </p>
          <div className="col-12 row">
            <div className="col-6 row infor-contact-item">
              <div className="col-12 contact-as-wrapper">
                <div className="contact-as">
                  <i className="fas fa-phone-alt"></i>
                  <span>+84 794901324 & +84 786858816</span>
                </div>
              </div>
              <div className="col-12 contact-as-wrapper">
                <div className="contact-as">
                  <i className="fas fa-envelope"></i>
                  <span>nanam133hg@gmail.com & kidkaito1412.1@gmail.com</span>
                </div>
              </div>
              <div className="col-12 contact-as-wrapper">
                <div className="contact-as">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Ninh Kieu, Can Tho</span>
                </div>
              </div>
            </div>
            <div className="col-6 row infor-contact-item">
              <a
                className="col-4 social-item"
                href="https://www.facebook.com/nanam2k1"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="col-4 social-item"
                href="https://www.linkedin.com/in/nam-nguyen-anh-26b942231/"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                className="col-4 social-item"
                href="https://github.com/namnguyen2k1"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <form action="" method="GET" className="row input-contact">
          <div className="col-12 row input-contact-item">
            <div className="col-12 row input-box">
              <label className="col-12 input-title">First Name:</label>
              <input
                type="text"
                name="first-name"
                className="col-12 input-focus-border"
                id="firstNameField"
                placeholder="first name*"
                tabIndex={1}
                contentEditable={true}
                required
              />
            </div>
            <div className="col-12 row input-box">
              <label className="col-12 input-title">Last Name:</label>
              <input
                type="text"
                className="col-12 input-focus-border"
                name="last-name"
                tabIndex={2}
                id="lastNameField"
                placeholder="last name*"
                required
              />
            </div>
            <div className="col-12 row input-box">
              <label className="col-12 input-title">Mail:</label>
              <input
                type="mail"
                name="email"
                id="emailField"
                className="col-12 input-focus-border"
                tabIndex={3}
                placeholder="example@mail.com*"
                required
              />
            </div>
            <div className="col-12 row input-box">
              <label className="col-12 input-title">Phone:</label>
              <input
                type="phone"
                min="1000000000"
                className="col-12 input-focus-border"
                tabIndex={4}
                id="phoneField"
                placeholder="+84*"
                required
              />
            </div>
          </div>
          <div className="input-contact-item chose-contact-box">
            <div className="contact-title-chose">
              What do you want to talk about?
            </div>
            <div className="n-row chose-box">
              <div className="n-col chose-item-wrapper">
                <span className="chose-item">
                  <input type="radio" name="contact-radio" />
                  <span className="chose-title">Report Bug</span>
                </span>
              </div>
              <div className="n-col chose-item-wrapper">
                <span className="chose-item">
                  <input type="radio" name="contact-radio" />
                  <span className="chose-title">Contribute</span>
                </span>
              </div>

              <div className="n-col chose-item-wrapper">
                <span className="chose-item">
                  <input type="radio" name="contact-radio" />
                  <span className="chose-title">Add Friend</span>
                </span>
              </div>

              <div className="n-col chose-item-wrapper">
                <span className="chose-item">
                  <input type="radio" name="contact-radio" />
                  <span className="chose-title">Support</span>
                </span>
              </div>
            </div>
          </div>
          <div className="row input-contact-item">
            <label className="col-12 title-review">Message:</label>
            <textarea
              name="message"
              className="col-12 input-focus-border"
              id="messageField"
              cols="auto"
              rows="5"
              tabIndex={5}
              placeholder="Your review*"
              required
            ></textarea>
          </div>
          <div className="n-row input-contact-item">
            <div
              className="n-col contact-submit-button input-focus-border"
              onClick={handleSentContact}
              tabIndex={6}
            >
              <div className="sent-button">Submit</div>
              <i className="fas fa-paper-plane"></i>
            </div>
            <div
              className="n-col contact-submit-button input-focus-border"
              onClick={handleClearContact}
              tabIndex={7}
            >
              <span className="sent-button">Clear</span>
              <i className="fas fa-trash"></i>
            </div>
          </div>
        </form>
      </div>
      {/* <Counter /> */}
      <Footer></Footer>
    </>
  );
}
export default Contact;

// warning <a></a>: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/ee933a245567b52f3ca71045cfac7371faf52907/docs/rules/anchor-is-valid.md
// Đại loại là không nên để link trống
