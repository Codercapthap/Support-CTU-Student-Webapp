import React, { memo } from "react";

import "./_style.scss";

function Footer() {
  console.log("render Footer");
  return (
    <footer className="footer-wraper">
      <div className="footer">
        <ul className="footer-contact">
          <li className="infor pl2">Support CTU</li>
          {/* <li className="infor pl2">Topics Main</li> */}
          <li className="infor pl2 classic-4">Updating...</li>
        </ul>
        <span className="footer-shortlink">
          <a href="#" className="link-item button-base">
            <i className="fab fa-facebook-square"></i>
            facebook
          </a>
          <a href="#" className="link-item button-base">
            <i className="fab fa-github-square"></i>
            github
          </a>
          <a href="#" className="link-item button-base">
            <i className="fab fa-linkedin"></i>
            linkedin
          </a>
        </span>

        <div className="footer-copyright">
          <i className="fas fa-copyright"></i> Copyright 2022 by Nguyen Nam and
          Nguyen Khiem
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
