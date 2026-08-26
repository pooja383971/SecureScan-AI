
// import { useEffect, useState } from "react";
// import "./Settings.css";

// function Settings() {

//   const [notifications, setNotifications] = useState(true);

//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {

//     const notify = localStorage.getItem("notifications");

//     const dark = localStorage.getItem("darkMode");

//     if (notify !== null)
//       setNotifications(JSON.parse(notify));

//     if (dark !== null)
//       setDarkMode(JSON.parse(dark));

//   }, []);

//   useEffect(() => {

//     localStorage.setItem("notifications", notifications);

//   }, [notifications]);

//   useEffect(() => {

//     localStorage.setItem("darkMode", darkMode);

//     if (darkMode)

//       document.body.classList.add("dark");

//     else

//       document.body.classList.remove("dark");

//   }, [darkMode]);

//   return (

//     <div className="page">

//       <h1>Settings</h1>

//       <div className="setting-item">

//         <label>

//           <input

//             type="checkbox"

//             checked={notifications}

//             onChange={() =>
//               setNotifications(!notifications)
//             }

//           />

//           Enable Notifications

//         </label>

//       </div>

//       <div className="setting-item">

//         <label>

//           <input

//             type="checkbox"

//             checked={darkMode}

//             onChange={() =>
//               setDarkMode(!darkMode)
//             }

//           />

//           Dark Mode

//         </label>

//       </div>

//     </div>

//   );

// }

// export default Settings;
import { useEffect, useState } from "react";
import "./Settings.css";

function Settings() {

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load saved settings
  useEffect(() => {

    const savedNotification =
      localStorage.getItem("notifications");

    const savedDarkMode =
      localStorage.getItem("darkMode");

    if (savedNotification !== null) {
      setNotifications(JSON.parse(savedNotification));
    }

    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

  }, []);

  // Save notifications
  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // Save dark mode and apply theme
  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

  }, [darkMode]);

  return (

    <div className="page">

      <h1>Settings</h1>

      <div className="setting-item">

        <label>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
          />

          Enable Notifications

        </label>

      </div>

      <div className="setting-item">

        <label>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />

          Dark Mode

        </label>

      </div>

    </div>

  );

}

export default Settings;