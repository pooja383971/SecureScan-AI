// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../../api/api";
// import "./UserProfile.css";
// function UserProfile() {

//     const navigate = useNavigate();

//     // ==========================================z
//     // USER PROFILE
//     // ==========================================

//     const [profile, setProfile] = useState({

//         name: "",
//         email: "",
//         phone: "",
//         company: "",
//         designation: "",
//         address: "",
//         city: "",
//         country: "",
//         about: ""

//     });

//     // ==========================================
//     // PASSWORD
//     // ==========================================

//     const [passwordData, setPasswordData] = useState({

//         currentPassword: "",

//         newPassword: "",

//         confirmPassword: ""

//     });

//     // ==========================================
//     // ACCOUNT STATISTICS
//     // ==========================================

//     const [stats, setStats] = useState({

//         totalProjects: 0,

//         totalScans: 0,

//         totalReports: 0,

//         securityScore: 0

//     });

//     // ==========================================
//     // RECENT ACTIVITY
//     // ==========================================

//     const [activities, setActivities] = useState([]);

//     // ==========================================
//     // UI STATES
//     // ==========================================

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [editing, setEditing] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");

//     // ==========================================
//     // LOAD DATA
//     // ==========================================

//     useEffect(() => {

//         loadProfile();

//         loadStatistics();

//         loadActivities();

//     }, []);

//     // ==========================================
//     // LOAD PROFILE
//     // ==========================================

//     const loadProfile = async () => {

//         try {

//             setLoading(true);

//             const response = await api.get("/users/profile");

//             setProfile({

//                 name: response.data.name || "",
//                 email: response.data.email || "",
//                 phone: response.data.phone || "",
//                 company: response.data.company || "",
//                 designation: response.data.designation || "",
//                 address: response.data.address || "",
//                 city: response.data.city || "",
//                 country: response.data.country || "",
//                 about: response.data.about || ""

//             });

//         }

//         catch (error) {

//             console.error(error);

//             setError("Unable to load profile.");

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     // ==========================================
//     // LOAD DASHBOARD STATS
//     // ==========================================

//     const loadStatistics = async () => {

//         try {

//             const response = await api.get("/dashboard/stats");

//             setStats(response.data);

//         }

//         catch (error) {

//             console.error(error);

//         }

//     };

//     // ==========================================
//     // LOAD RECENT ACTIVITIES
//     // ==========================================

//     const loadActivities = async () => {

//         try {

//             const response = await api.get("/activities");

//             setActivities(response.data);

//         }

//         catch (error) {

//             console.error(error);

//         }

//     };

//     // ==========================================
//     // HANDLE INPUT CHANGE

//     // ==========================================

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setProfile({

//             ...profile,

//             [name]: value

//         });

//     };

//     // ==========================================
//     // HANDLE PASSWORD
//     // ==========================================

//     const handlePasswordChange = (e) => {

//         const { name, value } = e.target;

//         setPasswordData({

//             ...passwordData,

//             [name]: value

//         });

//     };

//     // ==========================================
//     // UPDATE PROFILE
//     // ==========================================

//     const updateProfile = async () => {

//         try {

//             setSaving(true);

//             await api.put(

//                 "/users/profile",

//                 profile

//             );

//             setSuccess(

//                 "Profile updated successfully."

//             );

//             setEditing(false);

//         }

//         catch (error) {

//             console.error(error);

//             setError(

//                 "Failed to update profile."

//             );

//         }

//         finally {

//             setSaving(false);

//         }

//     };

//     // ==========================================
//     // CHANGE PASSWORD
//     // ==========================================

//     const changePassword = async () => {

//         if (

//             passwordData.newPassword !==

//             passwordData.confirmPassword

//         ) {

//             setError(

//                 "Passwords do not match."

//             );

//             return;

//         }

//         try {

//             await api.put(

//                 "/users/change-password",

//                 passwordData

//             );

//             setSuccess(

//                 "Password changed successfully."

//             );

//             setPasswordData({

//                 currentPassword: "",

//                 newPassword: "",

//                 confirmPassword: ""

//             });

//         }

//         catch (error) {

//             console.error(error);

//             setError(

//                 "Unable to change password."

//             );

//         }

//     };

//     // ==========================================
//     // JSX STARTS HERE
//     // ==========================================

//     return (

//         <div className="profile-page">

//             <div className="profile-header">

//                 <div className="header-left">

//                     <h1>
//                         👤 My Profile
//                     </h1>

//                     <p>
//                         Manage your account information,
//                         security settings, and personal details.
//                     </p>

//                 </div>

//         <div className="header-right">

//             {

//                 editing ?

//                     (

//                         <button
//                             className="save-btn"
//                             onClick={updateProfile}
//                             disabled={saving}
//                         >

//                             {

//                                 saving

//                                     ?

//                                     "Saving..."

//                                     :

//                                     "💾 Save Profile"

//                             }

//                         </button>

//                     )

//                     :

//                     (

//                                 <button
//                                     type="button"
//                                     className="edit-profile-btn"
//                                     onClick={() => {
//                                         console.log("Edit button clicked");
//                                         navigate("/settings");
//                                     }}
//                                 >
//                                     ✏️ Edit Profile
//                                 </button>
//                     )

//             }

//         </div>

//     </div>

//     {/* ==========================================
//                 SUCCESS / ERROR MESSAGE
//             ========================================== */}

//     {

//         success &&

//             <div className="success-box">

//                 ✅ {success}

//             </div>

//     }

//     {

//         error &&

//             <div className="error-box">

//                 ❌ {error}

//             </div>

//     }

//     {/* ==========================================
//                 PROFILE CARD
//             ========================================== */}

//     <div className="profile-card">

//         <div className="profile-left">

//             <div className="profile-image">

//                 {

//                     profile.profileImage ?

//                         (

//                             <img

//                                 src={profile.profileImage}

//                                 alt="Profile"

//                             />

//                         )

//                         :

//                         (

//                             <div className="avatar">

//                                 {

//                                     profile.fullName

//                                         ?

//                                         profile.fullName.charAt(0).toUpperCase()

//                                         :

//                                         "U"

//                                 }

//                             </div>

//                         )

//                 }

//             </div>

//             <h2>

//                 {

//                     profile.fullName ||

//                     "User"

//                 }

//             </h2>

//             <p>

//                 {

//                     profile.designation ||

//                     "Security Analyst"

//                 }

//             </p>

//             <span>

//                 {

//                     profile.company ||

//                     "SecureScan AI User"

//                 }

//             </span>

//         </div>

//         <div className="profile-right">

//             <div className="profile-info-grid">

//                 <div className="info-card">

//                     <h4>

//                         📧 Email

//                     </h4>

//                     <p>

//                         {profile.email}

//                     </p>

//                 </div>

//                 <div className="info-card">

//                     <h4>

//                         📱 Phone

//                     </h4>

//                     <p>

//                         {

//                             profile.phone ||

//                             "Not Added"

//                         }

//                     </p>

//                 </div>

//                 <div className="info-card">

//                     <h4>

//                         🏢 Company

//                     </h4>

//                     <p>

//                         {

//                             profile.company ||

//                             "Not Added"

//                         }

//                     </p>

//                 </div>

//                 <div className="info-card">

//                     <h4>

//                         💼 Designation

//                     </h4>

//                     <p>

//                         {

//                             profile.designation ||

//                             "Not Added"

//                         }

//                     </p>

//                 </div>

//             </div>

//         </div>

//     </div>

//     {/* ==========================================
//                 PROFILE COMPLETION
//             ========================================== */}

//     <div className="profile-progress-card">

//         <div className="progress-header">

//             <h2>

//                 📊 Profile Completion

//             </h2>

//             <h3>

//                 85%

//             </h3>

//         </div>

//         <div className="progress-bar">

//             <div
//                 className="progress-fill"
//                 style={{ width: "85%" }}
//             >

//             </div>

//         </div>

//         <p>

//             Complete your profile to improve your
//             SecureScan AI experience.

//         </p>

//     </div>
//     {/* ==========================================
//                 PERSONAL INFORMATION
//             ========================================== */}

//     <div className="profile-form-card">

//         <div className="section-title">

//             <h2>

//                 📝 Personal Information

//             </h2>

//         </div>

//         <div className="profile-form">

//             {/* Full Name */}

//             <div className="form-group">

//                 <label>

//                     Full Name

//                 </label>

//                 <input

//                     type="text"

//                     name="fullName"

//                     value={profile.fullName}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="Enter your full name"

//                 />

//             </div>

//             {/* Email */}

//             <div className="form-group">

//                 <label>

//                     Email Address

//                 </label>

//                 <input

//                     type="email"

//                     name="email"

//                     value={profile.email}

//                     onChange={handleChange}

//                     disabled

//                 />

//             </div>

//             {/* Phone */}

//             <div className="form-group">

//                 <label>

//                     Phone Number

//                 </label>

//                 <input

//                     type="text"

//                     name="phone"

//                     value={profile.phone}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="+91 9876543210"

//                 />

//             </div>

//             {/* Company */}

//             <div className="form-group">

//                 <label>

//                     Company

//                 </label>

//                 <input

//                     type="text"

//                     name="company"

//                     value={profile.company}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="Enter company name"

//                 />

//             </div>

//             {/* Designation */}

//             <div className="form-group">

//                 <label>

//                     Designation

//                 </label>

//                 <input

//                     type="text"

//                     name="designation"

//                     value={profile.designation}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="Software Engineer"

//                 />

//             </div>

//             {/* Address */}

//             <div className="form-group full-width">

//                 <label>

//                     Address

//                 </label>

//                 <input

//                     type="text"

//                     name="address"

//                     value={profile.address}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="Enter your address"

//                 />

//             </div>

//             {/* City */}

//             <div className="form-group">

//                 <label>

//                     City

//                 </label>

//                 <input

//                     type="text"

//                     name="city"

//                     value={profile.city}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="City"

//                 />

//             </div>

//             {/* Country */}

//             <div className="form-group">

//                 <label>

//                     Country

//                 </label>

//                 <input

//                     type="text"

//                     name="country"

//                     value={profile.country}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="Country"

//                 />

//             </div>

//             {/* Bio */}

//             <div className="form-group full-width">

//                 <label>

//                     About Me

//                 </label>

//                 <textarea

//                     name="bio"

//                     rows="5"

//                     value={profile.bio}

//                     onChange={handleChange}

//                     disabled={!editing}

//                     placeholder="Write a short introduction about yourself..."

//                 />

//             </div>

//         </div>

//         {

//             editing &&

//             <div className="form-actions">

//                 <button

//                     className="cancel-btn"

//                     onClick={() => {

//                         setEditing(false);

//                         loadProfile();

//                     }}

//                 >

//                     ❌ Cancel

//                 </button>

//                 <button

//                     className="save-btn"

//                     onClick={updateProfile}

//                     disabled={saving}

//                 >

//                     {

//                         saving

//                             ?

//                             "Saving..."

//                             :

//                             "💾 Save Changes"

//                     }

//                 </button>

//             </div>

//         }

//     </div>
//     {/* ==========================================
//                 SECURITY SETTINGS
//             ========================================== */}

//     <div className="security-card">

//         <div className="section-title">

//             <h2>

//                 🔒 Security Settings

//             </h2>

//         </div>

//         <div className="security-grid">

//             {/* Current Password */}

//             <div className="form-group">

//                 <label>

//                     Current Password

//                 </label>

//                 <input

//                     type="password"

//                     name="currentPassword"

//                     value={passwordData.currentPassword}

//                     onChange={handlePasswordChange}

//                     placeholder="Enter current password"

//                 />

//             </div>

//             {/* New Password */}

//             <div className="form-group">

//                 <label>

//                     New Password

//                 </label>

//                 <input

//                     type="password"

//                     name="newPassword"

//                     value={passwordData.newPassword}

//                     onChange={handlePasswordChange}

//                     placeholder="Enter new password"

//                 />

//             </div>

//             {/* Confirm Password */}

//             <div className="form-group">

//                 <label>

//                     Confirm Password

//                 </label>

//                 <input

//                     type="password"

//                     name="confirmPassword"

//                     value={passwordData.confirmPassword}

//                     onChange={handlePasswordChange}

//                     placeholder="Confirm new password"

//                 />

//             </div>

//         </div>

//         <div className="password-actions">

//             <button

//                 className="change-password-btn"

//                 onClick={changePassword}

//             >

//                 🔐 Change Password

//             </button>

//         </div>

//     </div>

//     {/* ==========================================
//                 ACCOUNT SECURITY STATUS
//             ========================================== */}

//     <div className="account-security-card">

//         <div className="section-title">

//             <h2>

//                 🛡 Account Security

//             </h2>

//         </div>

//         <div className="security-status-grid">

//             <div className="status-card">

//                 <div className="status-icon">

//                     📧

//                 </div>

//                 <div>

//                     <h3>

//                         Email Verification

//                     </h3>

//                     <p>

//                         Verified

//                     </p>

//                 </div>

//                 <span className="verified">

//                     ✔

//                 </span>

//             </div>

//             <div className="status-card">

//                 <div className="status-icon">

//                     🔑

//                 </div>

//                 <div>

//                     <h3>

//                         Password Status

//                     </h3>

//                     <p>

//                         Strong Password

//                     </p>

//                 </div>

//                 <span className="verified">

//                     ✔

//                 </span>

//             </div>

//             <div className="status-card">

//                 <div className="status-icon">

//                     📱

//                 </div>

//                 <div>

//                     <h3>

//                         Two-Factor Authentication

//                     </h3>

//                     <p>

//                         Disabled

//                     </p>

//                 </div>

//                 <button className="enable-btn">

//                     Enable

//                 </button>

//             </div>

//             <div className="status-card">

//                 <div className="status-icon">

//                     🌍

//                 </div>

//                 <div>

//                     <h3>

//                         Last Login

//                     </h3>

//                     <p>

//                         Today

//                     </p>

//                 </div>

//             </div>

//         </div>

//     </div>

//     {/* ==========================================
//                 LOGIN INFORMATION
//             ========================================== */}

//     <div className="login-info-card">

//         <div className="section-title">

//             <h2>

//                 💻 Login Information

//             </h2>

//         </div>

//         <div className="login-grid">

//             <div className="login-item">

//                 <h4>

//                     🌐 Browser

//                 </h4>

//                 <p>

//                     Google Chrome

//                 </p>

//             </div>

//             <div className="login-item">

//                 <h4>

//                     💻 Device

//                 </h4>

//                 <p>

//                     Windows PC

//                 </p>

//             </div>

//             <div

//                 className="login-item"
//                 onClick={() => navigate("/settings")}
//                 style={{ cursor: "pointer" }}
//             >

//                 <h4>

//                     📍 Location

//                 </h4>

//                             <p>
//                                 {profile.location || "Not Added"}
//                             </p>

//             </div>

//             <div className="login-item">

//                 <h4>

//                     🕒 Last Active

//                 </h4>

//                 <p>

//                     Just Now

//                 </p>

//             </div>

//         </div>

//     </div>
//     {/* ==========================================
//                 ACCOUNT STATISTICS
//             ========================================== */}

//     <div className="statistics-section">

//         <div className="section-title">

//             <h2>

//                 📊 Account Statistics

//             </h2>

//         </div>

//         <div className="statistics-grid">

//             <div className="statistics-card">

//                 <div className="statistics-icon">

//                     📁

//                 </div>

//                 <h3>

//                     Total Projects

//                 </h3>

//                 <h1>

//                     {stats.totalProjects}

//                 </h1>

//             </div>

//             <div className="statistics-card">

//                 <div className="statistics-icon">

//                     🔍

//                 </div>

//                 <h3>

//                     Total Scans

//                 </h3>

//                 <h1>

//                     {stats.totalScans}

//                 </h1>

//             </div>

//             <div className="statistics-card">

//                 <div className="statistics-icon">

//                     📄

//                 </div>

//                 <h3>

//                     Reports Generated

//                 </h3>

//                 <h1>

//                     {stats.totalReports}

//                 </h1>

//             </div>

//             <div className="statistics-card">

//                 <div className="statistics-icon">

//                     🛡

//                 </div>

//                 <h3>

//                     Security Score

//                 </h3>

//                 <h1>

//                     {stats.securityScore}%

//                 </h1>

//             </div>

//         </div>

//     </div>

//     {/* ==========================================
//                 RECENT ACTIVITY
//             ========================================== */}

//     <div className="activity-section">

//         <div className="section-title">

//             <h2>

//                 📅 Recent Activity

//             </h2>

//         </div>

//         <div className="activity-list">

//             {

//                 activities.length === 0 ?

//                     (

//                         <div className="empty-activity">

//                             <h3>

//                                 No Recent Activity

//                             </h3>

//                             <p>

//                                 Your latest scans, reports and
//                                 profile updates will appear here.

//                             </p>

//                         </div>

//                     )

//                     :

//                     (

//                         activities.slice(0, 6).map((activity, index) => (

//                             <div

//                                 className="activity-card"

//                                 key={activity.id || index}

//                             >

//                                 <div className="activity-icon">

//                                     {

//                                         activity.type === "SCAN"

//                                             ?

//                                             "🔍"

//                                             :

//                                             activity.type === "REPORT"

//                                                 ?

//                                                 "📄"

//                                                 :

//                                                 activity.type === "PROFILE"

//                                                     ?

//                                                     "👤"

//                                                     :

//                                                     activity.type === "LOGIN"

//                                                         ?

//                                                         "🔐"

//                                                         :

//                                                         "📌"

//                                     }

//                                 </div>

//                                 <div className="activity-content">

//                                     <h3>

//                                         {

//                                             activity.title ||

//                                             "Activity"

//                                         }

//                                     </h3>

//                                     <p>

//                                         {

//                                             activity.description ||

//                                             "No description available."

//                                         }

//                                     </p>

//                                 </div>

//                                 <div className="activity-time">

//                                     {

//                                         activity.createdAt

//                                             ?

//                                             new Date(

//                                                 activity.createdAt

//                                             ).toLocaleDateString()

//                                             :

//                                             "Today"

//                                     }

//                                 </div>

//                             </div>

//                         ))

//                     )

//             }

//         </div>

//     </div>

//     {/* ==========================================
//                 ACCOUNT ACHIEVEMENTS
//             ========================================== */}

//     <div className="achievement-section">

//         <div
//     className="section-title"
//     onClick={() => navigate("/dashboard")}
//     style={{cursor:"pointer"}}
// >

//     <h2>

//         🏆 Achievements

//     </h2>

// </div>

//         <div className="achievement-grid">

//             <div className="achievement-card">

//                 <div className="achievement-icon">

//                     🚀

//                 </div>

//                 <h3>

//                     First Scan

//                 </h3>

//                 <p>

//                     Successfully completed your first
//                     vulnerability scan.

//                 </p>

//             </div>

//             <div className="achievement-card">

//                 <div className="achievement-icon">

//                     📄

//                 </div>

//                 <h3>

//                     Report Generator

//                 </h3>

//                 <p>

//                     Generated professional security reports.

//                 </p>

//             </div>

//             <div className="achievement-card">

//                 <div className="achievement-icon">

//                     🛡

//                 </div>

//                 <h3>

//                     Security Expert

//                 </h3>

//                 <p>

//                     Maintained a high security score for
//                     your projects.

//                 </p>

//             </div>

//             <div className="achievement-card">

//                 <div className="achievement-icon">

//                     ⭐

//                 </div>

//                 <h3>

//                     Active User

//                 </h3>

//                 <p>

//                     Regularly using SecureScan AI to
//                     secure applications.

//                 </p>

//             </div>

//         </div>

//     </div>
//     {/* ==========================================
//                 QUICK ACTIONS
//             ========================================== */}

//     <div className="quick-actions-section">

//         <div className="section-title">

//             <h2>

//                 🚀 Quick Actions

//             </h2>

//         </div>

//         <div className="quick-actions-grid">

//             <button
//                 className="action-btn"
//                 onClick={() => navigate("/dashboard")}
//             >

//                 📊 Dashboard

//             </button>

//             <button
//                 className="action-btn"
//                 onClick={() => navigate("/myscan")}
//             >

//                 🔍 New Scan

//             </button>

//             <button
//                 className="action-btn"
//                 onClick={() => navigate("/myprojects")}
//             >

//                 📁 My Projects

//             </button>

//             <button
//                 className="action-btn"
//                 onClick={() => navigate("/myreports")}
//             >

//                 📄 My Reports

//             </button>

//             <button
//                 className="action-btn"
//                 onClick={() => navigate("/notification")}
//             >

//                 🔔 Notifications

//             </button>

//             <button
//                 className="action-btn"
//                 onClick={() => navigate("/settings")}
//             >

//                 ⚙ Account Settings

//             </button>

//         </div>

//     </div>

//     {/* ==========================================
//                 ACCOUNT SUMMARY
//             ========================================== */}

//     <div className="account-summary-section">

//         <div className="section-title">

//             <h2>

//                 📈 Account Summary

//             </h2>

//         </div>

//         <div className="summary-card">

//             <div className="summary-item">

//                 <h3>

//                     👤 Profile Status

//                 </h3>

//                 <span className="status success">

//                     Active

//                 </span>

//             </div>

//             <div className="summary-item">

//                 <h3>

//                     🛡 Security Level

//                 </h3>

//                 <span className="status secure">

//                     Excellent

//                 </span>

//             </div>

//             <div className="summary-item">

//                 <h3>

//                     📅 Member Since

//                 </h3>

//                 <span>

//                     January 2026

//                 </span>

//             </div>

//             <div className="summary-item">

//                 <h3>

//                     🔍 Last Scan

//                 </h3>

//                         <span>
//                             {profile.createdAt
//                                 ? new Date(profile.createdAt).toLocaleDateString("en-US", {
//                                     month: "long",
//                                     year: "numeric"
//                                 })
//                                 : "Loading..."
//                             }
//                         </span>

//             </div>

//         </div>

//     </div>

//     {/* ==========================================
//                 AI PROFILE INSIGHTS
//             ========================================== */}

//     <div className="insight-section">

//                 <div
//                     className="section-title clickable"
//                     onClick={() => navigate("/myscan")}
//                 >

//                     <h2>

//                         🤖 AI Profile Insights

//                     </h2>

//                 </div>

//         <div className="insight-card">

//             <div className="insight-icon">

//                 🤖

//             </div>

//             <div>

//                 <h3>

//                     Profile Analysis

//                 </h3>

//                 <p>

//                     Your account is in excellent condition.
//                     Continue running weekly scans and keep your
//                     profile updated to receive personalized AI
//                     security recommendations.

//                 </p>

//             </div>

//         </div>

//     </div>

//     {/* ==========================================
//                 SECURITY RECOMMENDATIONS
//             ========================================== */}

//     <div className="recommendation-section">

//         <div className="section-title">

//             <h2>

//                 🛡 Security Recommendations

//             </h2>

//         </div>

//         <div className="recommendation-grid">

//             <div className="recommendation-card">

//                 <h3>

//                     🔑 Enable Two-Factor Authentication

//                 </h3>

//                 <p>

//                     Add an extra layer of protection
//                     to your SecureScan AI account.

//                 </p>

//             </div>

//             <div className="recommendation-card">

//                 <h3>

//                     🔄 Run Weekly Security Scans

//                 </h3>

//                 <p>

//                     Schedule regular scans to identify
//                     vulnerabilities early.

//                 </p>

//             </div>

//                     <div className="recommendation-card">

//                         <h3>
//                             📄 Download Reports
//                         </h3>

//                         <p>
//                             Keep PDF reports for compliance,
//                             auditing and documentation.
//                         </p>

//                     </div>

//         </div>

//     </div>

//     {/* ==========================================
//                 PROFILE HEALTH
//             ========================================== */}

//     <div className="profile-health-card">

//         <div>

//             <h2>

//                 ❤️ Profile Health

//             </h2>

//             <p>

//                 Your SecureScan AI account is healthy,
//                 protected and ready for secure scanning.

//             </p>

//         </div>

//         <div className="health-score">

//             <h1>

//                 96%

//             </h1>

//         </div>

//     </div>
//     {/* ==========================================
//                 QUICK PROFILE SUMMARY
//             ========================================== */}

//     <div className="profile-summary-footer">

//         <div className="summary-box">

//             <div className="summary-item">

//                 <h3>

//                     👤 Account Status

//                 </h3>

//                 <p>

//                     Active

//                 </p>

//             </div>

//             <div className="summary-item">

//                 <h3>

//                     🛡 Security Score

//                 </h3>

//                 <p>

//                     {stats.securityScore}%

//                 </p>

//             </div>

//             <div className="summary-item">

//                 <h3>

//                     📁 Projects

//                 </h3>

//                 <p>

//                     {stats.totalProjects}

//                 </p>

//             </div>

           
//                     <div
//                         className="summary-item"
//                         onClick={() => navigate("/history")}
//                         style={{ cursor: "pointer" }}
//                     >

//                         <h3>
//                             🔍 Total Scans
//                         </h3>

//                         <p>
//                             {stats.totalScans}
//                         </p>

//                     </div>
//         </div>

//     </div>

//     {/* ==========================================
//                 FOOTER
//             ========================================== */}

//             {/* ============================
//              FOOTER
//         ============================= */}

//             <footer className="profile-footer">

//                 <div className="footer-container">

//                     <h2>
//                         🛡️ SecureScan AI
//                     </h2>


//                     <p>
//                         AI Powered Vulnerability Scanner &
//                         Professional Security Management Platform
//                     </p>


//                     <div className="footer-pills">


//                         <div
//                             className="footer-pill"
//                             onClick={() => navigate("/profile")}
//                         >
//                             👤 User Profile
//                         </div>



//                         <div
//                             className="footer-pill"
//                             onClick={() => navigate("/settings")}
//                         >
//                             🔐 Secure Authentication
//                         </div>



//                         <div
//                             className="footer-pill"
//                             onClick={() => navigate("/dashboard")}
//                         >
//                             📊 Dashboard Analytics
//                         </div>



//                         <div
//                             className="footer-pill"
//                             onClick={() => navigate("/myscan")}
//                         >
//                             🤖 AI Security Insights
//                         </div>


//                     </div>



//                     <hr />


//                     <div className="footer-bottom">


//                         <small>
//                             © 2026 SecureScan AI. All Rights Reserved.
//                         </small>


//                         <small>
//                             Version 1.0.0 | Built with React + Spring Boot
//                         </small>


//                     </div>


//                 </div>


//             </footer>


//         </div>

//     );

// }


// export default UserProfile;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "./UserProfile.css";


function UserProfile() {


    const navigate = useNavigate();


    const [profile, setProfile] = useState({

        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        country: ""

    });


    const [loading, setLoading] = useState(true);



    // ==========================
    // LOAD PROFILE
    // ==========================

    useEffect(() => {

        fetchProfile();

    }, []);



    const fetchProfile = async () => {

        try {


            const response = await api.get("/users/profile");


            setProfile({

                name: response.data.name || "",

                email: response.data.email || "",

                phone: response.data.phone || "",

                company: response.data.company || "",

                designation: response.data.designation || "",

                country: response.data.country || ""

            });



        } catch (error) {

            console.error(
                "Profile Error:",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };




    if (loading) {

        return (

            <div className="profile-loading">

                Loading Profile...

            </div>

        );

    }



    return (

        <div className="profile-page">


            {/* ================= HEADER ================= */}


            <div className="profile-card profile-header">


                <div className="profile-avatar">

                    👤

                </div>



                <div className="profile-info">


                    <h1>

                        {profile.name || "User"}

                    </h1>


                    <p>

                        {profile.designation ||
                            "Security Analyst"}

                    </p>


                    <span>

                        {profile.email}

                    </span>


                </div>



                <button

                    className="edit-profile-btn"

                    onClick={() =>
                        navigate("/settings")
                    }

                >

                    ✏️ Edit Profile

                </button>


            </div>





            {/* ================= PERSONAL INFO ================= */}



            <div className="profile-card">


                <h2>

                    👤 Personal Information

                </h2>



                <div className="profile-grid">


                    <div>

                        <label>
                            Name
                        </label>

                        <p>
                            {profile.name || "-"}
                        </p>

                    </div>



                    <div>

                        <label>
                            Email
                        </label>

                        <p>
                            {profile.email || "-"}
                        </p>

                    </div>



                    <div>

                        <label>
                            Phone
                        </label>

                        <p>
                            {profile.phone || "-"}
                        </p>

                    </div>




                    <div>

                        <label>
                            Country
                        </label>

                        <p>
                            {profile.country || "-"}
                        </p>

                    </div>


                </div>


            </div>







            {/* ================= SECURITY SUMMARY ================= */}



            <div className="profile-card">


                <h2>

                    🔐 Security Summary

                </h2>



                <div className="summary-grid">


                    <div className="summary-box">

                        <h3>
                            🔍 Total Scans
                        </h3>

                        <p>
                            25
                        </p>

                    </div>




                    <div className="summary-box">

                        <h3>
                            🛡 Security Score
                        </h3>

                        <p>
                            85%
                        </p>

                    </div>




                    <div className="summary-box">

                        <h3>
                            ⚠ Threats Found
                        </h3>

                        <p>
                            3
                        </p>

                    </div>



                </div>


            </div>







            {/* ================= ACTIVITY ================= */}



            <div className="profile-card">


                <h2>

                    📌 Recent Activity

                </h2>



                <div className="activity-item">


                    <span>

                        ✔ Profile Loaded Successfully

                    </span>


                    <small>

                        Today

                    </small>


                </div>



                <div className="activity-item">


                    <span>

                        🔍 Security Scan Completed

                    </span>


                    <small>

                        Yesterday

                    </small>


                </div>



            </div>





        </div>


    );

}


export default UserProfile;