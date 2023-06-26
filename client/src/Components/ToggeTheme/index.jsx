import { useEffect, useLayoutEffect, memo } from 'react';

import './_style.scss';

import { useSelector } from 'react-redux';

/**
 * Add the data-theme attribute at the beginning of the html tag
 * in the index.html file of the public folder
 */

function ToggleTheme(props) {
   console.log('render ToggleTheme');
   const { changeCurrentTheme } = props;

   const theme = useSelector(state => state.config.theme);

   useLayoutEffect(() => {
      // update theme state
      const toggleButton = document.querySelector('.check-input');
      if (theme === 'dark') {
         toggleButton.checked = true;
      } else if (theme === 'light') {
         toggleButton.checked = false;
      }
   }, [theme]);

   useEffect(() => {
      // add window event
      const setTheme = theme => {
         document.documentElement.setAttribute('data-theme', theme);
         changeCurrentTheme(`${theme}`);
      };
      const handleKeyDown = e => {
         const toggleButton = document.querySelector('.check-input');
         if (e.keyCode === 32) {
            // listent to Press Space event
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
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   const switchTheme = e => {
      const setTheme = theme => {
         document.documentElement.setAttribute('data-theme', theme);
         changeCurrentTheme(`${theme}`);
      };

      if (e.target.checked) {
         setTheme('dark');
      } else {
         setTheme('light');
      }
   };

   return (
      <label className="switch">
         <input type="checkbox" onChange={switchTheme} className="check-input" value={theme} />
         <span className="slider"></span>
      </label>
   );
}

export default memo(ToggleTheme);
