import { PropsWithChildren } from "react"
import { NavLink } from "react-router-dom"

const NavLinkActive: React.FC<
  PropsWithChildren<Parameters<typeof NavLink>[0]>
> = (props) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => (isActive ? "active" : "")}
    ></NavLink>
  )
}

export const NavigationTabs: React.FC = () => {
  return (
    <div className="navigation-tabs">
      <NavLinkActive to="/calendar">Calendar</NavLinkActive>
      <NavLinkActive to="/optimizations">Optimizations</NavLinkActive>
      <NavLinkActive to="/insights">Insights</NavLinkActive>
    </div>
  )
}
