// function Profile() {
//     return (
//         <div>
//             <h1>Profile Page</h1>
//         </div>
//     );
// }

// export default Profile;
import "./Profile.css";

function Profile() {
  return (
    <div className="page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <p><strong>Name:</strong> Admin</p>
        <p><strong>Email:</strong> admin@securescan.com</p>
        <p><strong>Role:</strong> Administrator</p>
      </div>
    </div>
  );
}

export default Profile;