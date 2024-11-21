import "./optimizations.css"
import NavBar from "../../components/navBar/navBar"
import { LessTimeComponent } from "./optimization components/notEnoughTime"
import { ExtraTimeComponent } from "./optimization components/tooMuchTime"

export const OptimizationsPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="center-container">
        <div className="navigation-tabs">
          <a href="/calendar">Calendar</a>
          <a href="/optimizations" className="active">
            Optimizations
          </a>
          <a href="/insights">Insights</a>
        </div>
        <div className="content-frame">
          <h1>Optimizations</h1>
        </div>
        <LessTimeComponent/>
       <ExtraTimeComponent/>
      </div>
    </div>
  )
}
