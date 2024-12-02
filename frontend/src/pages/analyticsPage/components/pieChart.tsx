import { PieChart } from "@mui/x-charts/PieChart"
import "./components.css"

export default function ClassTimeProportions() {
  return (
    <div className="chart">
      <PieChart
        margin={{ top: 70, bottom: 10, left: 100, right: 100 }}
        series={[
          {
            data: [
              {
                id: 0,
                value: 12,
                color: "#03045E",
                label: "HCI",
              },
              {
                id: 2,
                value: 20,
                color: "#0077B6",
                label: "Networks",
              },
              {
                id: 1,
                value: 15,
                color: "#00B4D8",
                label: "Improv",
              },
              {
                id: 3,
                value: 20,
                color: "#ADE8F4",
                label: "Introduction to Data Science",
              },
            ],
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
            padding: 0,
          },
        }}
        width={600}
        height={500}
      />
    </div>
  )
}
