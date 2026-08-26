// import "./Header.css";
// import { FaShieldAlt, FaMoon, FaSun } from "react-icons/fa";
// import { useState, useEffect } from "react";

// function Header() {

//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const saved = localStorage.getItem("darkMode");

//     if (saved === "true") {
//       setDarkMode(true);
//       document.body.classList.add("dark-mode");
//     }
//   }, []);

//   const toggleDarkMode = () => {

//     const value = !darkMode;

//     setDarkMode(value);

//     if (value) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }

//     localStorage.setItem("darkMode", value);
//   };

//   return (

//     <header className="header">

//       <div className="header-left">

//         <FaShieldAlt className="logo-icon" />

//         <h2>SecureScan AI</h2>

//       </div>

//       <div className="header-right">

//         <button className="theme-btn" onClick={toggleDarkMode}>

//           {darkMode ? <FaSun /> : <FaMoon />}

//         </button>

//       </div>

//     </header>

//   );

// }

// export default Header;
import "./Header.css";
import { FaShieldAlt } from "react-icons/fa";

function Header() {

  return (
    <header className="header">

      <div className="header-left">
        <FaShieldAlt className="logo-icon" />
        <h2>SecureScan AI</h2>
      </div>

    </header>
  );

}

export default Header;