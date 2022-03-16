import React, { memo } from 'react';

import './_style.scss';

function Footer() {
   return (
      <footer className="footer-wraper">
         <div class="footer">
            <ul class="footer-contact">
               <li class="infor pl2">Support CTU</li>
               {/* <li class="infor pl2">Topics Main</li> */}
               <li class="infor pl2 classic-4">Updating...</li>
            </ul>
            <span class="footer-shortlink">
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

            <div class="footer-copyright">
               <i class="fas fa-copyright"></i> Copyright 2022 by Nguyen Nam
            </div>
         </div>
      </footer>
   );
}

export default memo(Footer);
