import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaShieldAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { toast } from "react-toastify";

import { loginUser } from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";



function Login() {


  const navigate = useNavigate();


  const { login } = useAuth();



  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");





  const handleLogin = async (e) => {


    e.preventDefault();


    setError("");



    if (!email.trim() || !password.trim()) {


      setError(
        "Please enter both email and password."
      );

      return;

    }



    setLoading(true);



    try {


      const response = await loginUser(
        email.trim(),
        password
      );



      console.log(
        "LOGIN RESPONSE:",
        response
      );



      if (response.success) {



        const userData = {


          email: email.trim(),


          name:
            response.user?.name ||
            response.user?.fullName ||
            "User",


          role:
            response.user?.role ||
            "USER"


        };





        // Save authentication

        login(
          response.token,
          userData
        );





        toast.success(
          response.message ||
          "Login successful"
        );





        navigate(
          "/dashboard",
          {
            replace: true
          }
        );



      }

      else {


        setError(
          response.message ||
          "Invalid login details"
        );


      }



    }

    catch (err) {



      console.error(
        "LOGIN ERROR",
        err
      );



      if (err.response) {


        setError(

          err.response.data?.message ||
          "Invalid email or password."

        );


      }

      else {


        setError(
          "Unable to connect backend."
        );


      }


    }



    finally {


      setLoading(false);


    }



  };







  return (


    <div className="login-container">


      <div className="login-card">



        <div className="login-brand">


          <FaShieldAlt
            className="brand-icon"
          />


          <h1>
            SecureScan AI
          </h1>


        </div>




        <p className="login-subtitle">

          Cyber Security Vulnerability Scanner

        </p>





        <form onSubmit={handleLogin}>



          <label>
            Email
          </label>



          <div className="input-group">


            <FaEnvelope
              className="input-icon"
            />



            <input

              type="email"

              placeholder="Enter Email"

              value={email}

              onChange={
                (e) =>
                  setEmail(e.target.value)
              }

              required

            />


          </div>






          <label>
            Password
          </label>




          <div className="input-group">


            <FaLock
              className="input-icon"
            />



            <input


              type={
                showPassword
                  ?
                  "text"
                  :
                  "password"
              }


              placeholder="Enter Password"


              value={password}


              onChange={
                (e) =>
                  setPassword(e.target.value)
              }


              required


            />




            <button


              type="button"


              className="toggle-visibility"


              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }


            >

              {

                showPassword

                  ?

                  <FaEyeSlash />

                  :

                  <FaEye />

              }


            </button>



          </div>






          {
            error &&

            <div className="login-error">

              {error}

            </div>

          }






          <button


            type="submit"


            className="login-btn"


            disabled={loading}



          >

            {

              loading

                ?

                "Signing In..."

                :

                "Login"

            }


          </button>




        </form>






        <p className="register-text">


          Don't have an account?


          <Link to="/register">

            Register

          </Link>



        </p>




      </div>



    </div>


  );


}



export default Login;