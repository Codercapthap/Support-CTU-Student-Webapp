import { useEffect, useLayoutEffect, useState, memo } from 'react';

import './_style.scss';

// add props data-theme on file index.html in public folder

function ToggleTheme() {
   const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') ?? 'light');

   useLayoutEffect(() => {
      console.log('render useLayoutEffect');

      const theme = localStorage.getItem('theme') ?? 'light';
      document.documentElement.setAttribute('data-theme', theme);

      const toggleButton = document.querySelector('.check-input');
      if (theme === 'dark') {
         toggleButton.checked = true;
      } else if (theme === 'light') {
         toggleButton.checked = false;
      }
   }, []);

   useEffect(() => {
      console.log('render useEffect');

      const setTheme = theme => {
         console.log('call setTheme in useEffect');
         document.documentElement.setAttribute('data-theme', theme);
         localStorage.setItem('theme', `${theme}`);

         setCurrentTheme(`${theme}`);
      };
      const handleKeyDown = e => {
         const toggleButton = document.querySelector('.check-input');
         // console.log(e.keyCode);
         const theme = localStorage.getItem('theme');

         if (e.keyCode === 32) {
            // break "space"
            if (theme === 'dark') {
               setTheme('light');
               toggleButton.checked = false;
            } else if (theme === 'light') {
               setTheme('dark');
               toggleButton.checked = true;
            }
         }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
         console.log('remove event key down');
         window.removeEventListener('keydown', handleKeyDown);
         // window.onclick = function(event) { // do stuff; };
         // window.onclick = null;
      };
   }, []);

   const setTheme = theme => {
      console.log('call setTheme !== useEffect');
      console.log('render setTheme');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', `${theme}`);

      setCurrentTheme(`${theme}`);
   };

   console.log('re-render ToggleTheme');

   const switchTheme = e => {
      if (e.target.checked) {
         setTheme('dark');
      } else {
         setTheme('light');
      }
   };

   return (
      <label className="switch">
         <input
            type="checkbox"
            onChange={switchTheme}
            className="check-input"
            value={currentTheme === 'light'}
         />
         <span className="slider"></span>
      </label>
   );
}

export default memo(ToggleTheme);
