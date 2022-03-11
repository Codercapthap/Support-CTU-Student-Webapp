import { Routes, Route } from 'react-router-dom';

import Home from './Views/Home';
import Blog from './Views/Blog';
import About from './Views/About';
import Forum from './Views/Forum';

import Navbar from './Components/Navbar';

import './App.scss';

function App() {
   return (
      <div className="app">
         <div className=" app-box">
            <div className=" app-item">
               <Navbar />
            </div>
            <div className=" app-item">
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/forum" element={<Forum />} />
               </Routes>
            </div>
         </div>
         {/* <div className="mt">margin top </div> */}
      </div>
   );
}

export default App;
