import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./UserSettings.css";


function UserSettings() {


    const [user, setUser] = useState({

        name: "",
        email: "",
        phone: "",
        company: "",
        designation: ""

    });



    const [settings, setSettings] = useState({

        emailNotification: false,
        securityAlert: false,
        theme: "light",
        language: "English"

    });



    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadUser();

        loadSettings();

    }, []);




    // =========================
    // LOAD USER PROFILE
    // =========================

    const loadUser = async () => {


        try {


            const response = await api.get("/users/profile");


            setUser(response.data);



        } catch (error) {


            console.log("Profile loading error", error);


        }


    };






    // =========================
    // LOAD SETTINGS
    // =========================

    const loadSettings = async () => {


        try {


            const response = await api.get("/users/settings");


            setSettings(response.data);



        } catch (error) {


            console.log("Settings loading error", error);



        }
        finally {


            setLoading(false);


        }


    };







    const handleProfileChange = (e) => {


        const { name, value } = e.target;


        setUser({

            ...user,

            [name]: value

        });


    };







    const handleChange = (e) => {


        const { name, checked } = e.target;


        setSettings({

            ...settings,

            [name]: checked

        });


    };






    const saveProfile = async () => {


        try {


            await api.put(
                "/users/profile",
                user
            );


            alert("Profile Updated Successfully");


        }
        catch (error) {


            console.log(error);


        }


    };






    const saveSettings = async () => {


        try {


            await api.put(
                "/users/settings",
                settings
            );


            alert("Settings Updated Successfully");


        }
        catch (error) {


            console.log(error);


        }


    };







    if (loading) {

        return <h2>Loading...</h2>;

    }







    return (

        <div className="settings-page">


            <div className="settings-card">



                <h1>
                    ⚙️ Account Settings
                </h1>





                <h2>
                    👤 Personal Information
                </h2>




                <div className="setting-item">

                    <label>
                        Name
                    </label>

                    <input

                        type="text"

                        name="name"

                        value={user.name}

                        onChange={handleProfileChange}

                    />

                </div>






                <div className="setting-item">

                    <label>
                        Email
                    </label>


                    <input

                        type="email"

                        name="email"

                        value={user.email}

                        onChange={handleProfileChange}

                    />


                </div>






                <div className="setting-item">

                    <label>
                        Phone
                    </label>


                    <input

                        type="text"

                        name="phone"

                        value={user.phone}

                        onChange={handleProfileChange}

                    />


                </div>






                <div className="setting-item">

                    <label>
                        Company
                    </label>


                    <input

                        type="text"

                        name="company"

                        value={user.company}

                        onChange={handleProfileChange}

                    />


                </div>







                <div className="setting-item">

                    <label>
                        Designation
                    </label>


                    <input

                        type="text"

                        name="designation"

                        value={user.designation}

                        onChange={handleProfileChange}

                    />


                </div>





                <button

                    className="save-settings-btn"

                    onClick={saveProfile}

                >

                    💾 Save Profile

                </button>






                <hr />






                <h2>
                    🔐 Security Settings
                </h2>






                <div className="setting-item">


                    <h3>
                        📧 Email Notification
                    </h3>


                    <input

                        type="checkbox"

                        name="emailNotification"

                        checked={settings.emailNotification}

                        onChange={handleChange}

                    />


                </div>






                <div className="setting-item">


                    <h3>
                        🔐 Security Alert
                    </h3>


                    <input

                        type="checkbox"

                        name="securityAlert"

                        checked={settings.securityAlert}

                        onChange={handleChange}

                    />


                </div>







                <div className="setting-item">

                    <h3>
                        🎨 Theme
                    </h3>

                    <p>
                        {settings.theme}
                    </p>


                </div>







                <div className="setting-item">


                    <h3>
                        🌐 Language
                    </h3>


                    <p>
                        {settings.language}
                    </p>


                </div>






                <button

                    className="save-settings-btn"

                    onClick={saveSettings}

                >

                    💾 Save Settings

                </button>




            </div>


        </div>


    );


}



export default UserSettings;