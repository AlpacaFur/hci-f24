import "./optimizations.css"
import NavBar from "../../components/navBar/navBar"
import { LessTimeComponent } from "./optimization components/notEnoughTime"
import { ExtraTimeComponent } from "./optimization components/tooMuchTime"
import { NavigationTabs } from "../../components/NavigationTabs"

export const OptimizationsPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="center-container">
        <NavigationTabs />
        <div className="content-frame">
          <h1>Optimizations</h1>
        </div>
        <LessTimeComponent />
        <ExtraTimeComponent />
      </div>
    </div>
  )
}
