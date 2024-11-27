import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { StudentProvider } from "./components/useStudent/useStudent" // Adjust path as necessary
import LoginPage from "./pages/loginPage/loginPage"
import HomePage from "./pages/calendar/calendar"
import ProfilePage from "./pages/profilePage/profilePage"
import WelcomePage from "./pages/welcomePage/welcomePage"
import { OptimizationsPage } from "./pages/optimizations/optimizations"
import RegisterInfo from "./pages/newregistration/RegisterInfo/RegisterInfo"
import PreferencePage from "./pages/newregistration/PreferencePage/PreferencePage"
import { AnalyticsPage } from "./pages/analyticsPage/analyticsPage"
const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/calendar",
      element: <HomePage />,
    },
    {
      path: "/optimizations",
      element: <OptimizationsPage />,
    },
    {
      path: "/profile-page",
      element: <ProfilePage />,
    },
    {
      path: "/create-user",
      element: <RegisterInfo />,
    },
    {
      path: "/preference-setup",
      element: <PreferencePage />,
    },
    {
      path: "/insights",
      element: <AnalyticsPage />,
    },
  ])

  return (
    <StudentProvider>
      <RouterProvider router={router} />
    </StudentProvider>
  )
}

export default App
