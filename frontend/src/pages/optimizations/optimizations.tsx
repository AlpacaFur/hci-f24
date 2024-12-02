import "./optimizations.css"
import { LessTimeComponent } from "./optimization components/notEnoughTime"
import { ExtraTimeComponent } from "./optimization components/tooMuchTime"
import { NavigationTabs } from "../../components/NavigationTabs"

export const OptimizationsPage: React.FC = () => {
  return (
    <div>
      <div className="center-container">
        <NavigationTabs />
        <div className="content-frame shift-frame">
          <h1>Optimizations</h1>
          <LessTimeComponent />
          <ExtraTimeComponent />
        </div>
      </div>
    </div>
  )
}
