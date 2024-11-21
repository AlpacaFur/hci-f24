export const NavigationTabs: React.FC = () => {
  return (
    <div className="navigation-tabs">
      <a href="/calendar" className="active">
        Calendar
      </a>
      <a href="/optimizations">Optimizations</a>
      <a href="/insights">Insights</a>
    </div>
  )
}
