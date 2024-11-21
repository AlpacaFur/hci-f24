import ClassTimeProportions from "./components/pieChart";
import TimeSpentPerDay from "./components/barChart";
import "./analyticsPage.css"

export const AnalyticsPage: React.FC = () => {
    return (
      <div className="base">
          <div className="navigation-tabs">
          <a href="/calendar">Calendar</a>
          <a href="/optimizations">Optimizations</a>
          <a href="/analytics" className="active">
          Analytics
          </a>
        </div>
          <div className="content-frame">
            <h1>Insights & Analytics</h1>
          </div>
          <div className = "charts-container">
            <h2>Hours Studied This Week, By Class</h2>
            <h2>Average Hours Studied, By Day of the week</h2>
          </div>
          <div className="charts-container">
          <ClassTimeProportions/>
          <TimeSpentPerDay/>
          </div>
        </div>
    )
  }
  