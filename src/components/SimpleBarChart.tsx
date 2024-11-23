import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ConsumptionGraphProps } from '../pages/Dashboard';
import { transformConsumptionData, sortDataByDate, colors } from '../constants/consumptionUtils';

const SimpleBarChart: FC<ConsumptionGraphProps> = ({
  data
}) => {

  const transformedData = transformConsumptionData(data);
  const sortedData = sortDataByDate(transformedData);
  const limitedData = sortedData.slice(0, 6)

  const energyKeys = Array.from(
    new Set(
      limitedData.flatMap((item) => Object.keys(item).filter((key) => key !== "name"))
    )
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={limitedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" reversed allowDataOverflow />
        <YAxis />
        <Tooltip />
        <Legend />
        {energyKeys.map((key, index) => (
          <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;