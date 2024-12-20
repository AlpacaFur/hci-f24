import { PropsWithChildren } from "react"
import { NavLink } from "react-router-dom"

const NavLinkActive: React.FC<
  PropsWithChildren<Parameters<typeof NavLink>[0] & { danger?: boolean }>
> = (props) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        (props.danger ? "danger " : "") + (isActive ? "active" : "")
      }
      data-text={props.children}
    ></NavLink>
  )
}

export const NavigationTabs: React.FC = () => {
  return (
    <div className="navigation-tabs">
      <NavLinkActive to="/calendar">Calendar</NavLinkActive>
      <NavLinkActive to="/optimizations">Optimizations</NavLinkActive>
      <NavLinkActive to="/insights">Insights</NavLinkActive>
      <div className="spacer"></div>
      <NavLinkActive to="/profile-page">Profile</NavLinkActive>
      <NavLinkActive to="/" danger={true}>
        Log Out
      </NavLinkActive>
    </div>
  )
}
