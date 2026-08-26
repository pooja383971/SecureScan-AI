import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {

  const { isAuthenticated, loading } = useAuth();


  // ===============================
  // CHECKING AUTH STATUS
  // ===============================

  if (loading) {

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontSize: "20px",
          fontWeight: "600"
        }}
      >

        <h2>
          🛡 SecureScan AI
        </h2>

        <p>
          Checking authentication...
        </p>


      </div>

    );

  }



  // ===============================
  // NOT LOGGED IN
  // ===============================

  if (!isAuthenticated) {

    return (

      <Navigate

        to="/login"

        replace

      />

    );

  }



  // ===============================
  // AUTHENTICATED USER
  // ===============================

  return children;

}


export default PrivateRoute;