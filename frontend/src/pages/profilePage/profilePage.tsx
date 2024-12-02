import React, { useEffect, useState } from "react"
import defaultProfilePic from "../../../public/photos/keithBagley.png" // Placeholder image path
import User from "../../components/User" // Import the User class
import "./profilePage.css"
import { NavigationTabs } from "../../components/NavigationTabs"
const ProfilePage = () => {
  // Load user data from localStorage
  const user = User.loadFromLocalStorage()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [profilePic, setProfilePic] = useState(
    user.profilePic || defaultProfilePic
  ) // Default to placeholder if no profile pic

  useEffect(() => {
    // Update the state if the user info in localStorage changes
    const storedUser = User.loadFromLocalStorage()
    setFirstName(storedUser.firstName)
    setLastName(storedUser.lastName)
    setEmail(storedUser.email)
    setProfilePic(storedUser.profilePic || defaultProfilePic)
  }, [])

  // Handle profile picture upload
  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result as string)
        const updatedUser = new User(
          firstName,
          lastName,
          email,
          reader.result as string
        )
        updatedUser.saveToLocalStorage() // Save updated profile pic to localStorage
      }
      reader.readAsDataURL(file)
    }
  }

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
                  style={{ width: 150, height: 150, borderRadius: "50%" }} // Optional: Styling for profile pic
                />
                <input
                  type="file"
                  accept="image/*"
                  id="upload"
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
                <label className="change-icon-button" htmlFor="upload">
                  Change Icon
                </label>
              </div>
              <div className="profile-details">
                <p>
                  <strong>Name:</strong> {firstName} {lastName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
