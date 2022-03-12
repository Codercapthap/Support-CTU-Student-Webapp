import React from 'react';

import './_style.scss';

function Footer() {
   return (
      <footer className="footer-wraper">
         <div class="footer">
            <ul class="footer-contact p2">
               <li class="infor pl2">Support CTU version 1.0</li>
               <li class="infor pl2">Last update: 12/03/2022</li>
               <li class="infor pl2 classic-4">Updating...</li>
            </ul>
            <span class="footer-shortlink p2">
               Contact me with
               <a href="#" class="link-item button-base">
                  <i class="fab fa-facebook-square"></i>
                  facebook
               </a>
               <a href="#" class="link-item button-base">
                  <i class="fab fa-github-square"></i>
                  github
               </a>
               <a href="#" class="link-item button-base">
                  <i class="fab fa-linkedin"></i>
                  linkedin
               </a>
            </span>

            <div class="footer-copyright py1">
               <i class="fas fa-copyright"></i> Copyright 2022 by Nguyen Nam
            </div>
         </div>
      </footer>
   );
}

export default Footer;
