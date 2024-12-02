import React, { useEffect, useState } from "react";
import defaultProfilePic from "../../../public/photos/keithBagley.png"; // Placeholder image path
import User from "../../components/User"; // Import the User class
import { NavigationTabs } from "../../components/NavigationTabs";
import "./profilePage.css";


const ProfilePage = () => {
  const user = User.loadFromLocalStorage();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(
    user.profilePic || defaultProfilePic
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = User.loadFromLocalStorage();
    setFirstName(storedUser.firstName);
    setLastName(storedUser.lastName);
    setEmail(storedUser.email);
    setProfilePic(storedUser.profilePic || defaultProfilePic);
  }, []);

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
        const updatedUser = new User(
          firstName,
          lastName,
          email,
          reader.result as string
        );
        updatedUser.saveToLocalStorage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const updatedUser = new User(firstName, lastName, email, profilePic);
    updatedUser.saveToLocalStorage();
    setIsEditing(false);
  };

  return (
    <div className="center-container">
      <NavigationTabs />
      <div className="content-frame shift-frame">
        <div className="profilepage-container">
          <div className="user-profile">
            <h2>User Profile</h2>
            <div className="profile-info">
              <div className="profile-picture">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-picture-image"
                />
                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  onChange={handleProfilePicChange}
                  className="file-input"
                />
                <label className="change-icon-button" htmlFor="upload">
                  Change Icon
                </label>
              </div>
              <div className="profile-details">
                <p>
                  <strong>First Name:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  ) : (
                    firstName
                  )}
                </p>
                <p>
                  <strong>Last Name:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  ) : (
                    lastName
                  )}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    email
                  )}
                </p>
              </div>
              <div className="profile-buttons">
                <button
                  className="edit-button"
                  onClick={() => {
                    if (isEditing) {
                      handleSaveChanges();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
                {isEditing && (
                  <button
                    className="cancel-button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
