import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


const AuthContext = createContext();



export function AuthProvider({ children }) {


  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);



  // =====================================
  // CHECK LOGIN ON PAGE LOAD
  // =====================================

  useEffect(() => {


    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");


    if (token && storedUser) {


      try {


        const userData = JSON.parse(storedUser);


        setUser(userData);


      }
      catch (error) {


        console.error(
          "User data parsing failed",
          error
        );


        localStorage.removeItem("user");

        localStorage.removeItem("token");


      }


    }


    setLoading(false);



  }, []);





  // =====================================
  // LOGIN
  // =====================================

  const login = (token, userData) => {


    localStorage.setItem(
      "token",
      token
    );


    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );


    localStorage.setItem(
      "userEmail",
      userData.email
    );


    setUser(userData);


  };






  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {


    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("userEmail");


    setUser(null);


  };





  return (

    <AuthContext.Provider


      value={{

        user,

        loading,

        login,

        logout,


        isAuthenticated:
          Boolean(user)

      }}


    >

      {children}


    </AuthContext.Provider>


  );

}




export function useAuth() {


  return useContext(AuthContext);


}



export default AuthContext;