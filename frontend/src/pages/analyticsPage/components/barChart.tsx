import { BarChart } from '@mui/x-charts/BarChart';
import "./components.css"
import { colors } from '@mui/material';

export default function TimeSpentPerDay() {
  return (
    <div className='chart'>
         <BarChart
      xAxis={[{ scaleType: 'band', data: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'] }]}
      series={[{ data: [3, 4, 2, 4, 3, 1, 1] }]}
      width={700}
      height={500}
    />
    </div>
  );
}