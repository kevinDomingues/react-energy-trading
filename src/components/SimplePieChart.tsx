import { FC } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ConsumptionGraphProps } from '../pages/Dashboard';
import { aggregatedData, labelToColor, fallbackColor } from '../constants/consumptionUtils';

const SimplePieChart: FC<ConsumptionGraphProps> = ({
  data
}) => {

  const transformedData = aggregatedData(data);
  const renderCustomLabel = ({ name, value }: {name: string, value: number}) => `${name}: ${value}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={transformedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={labelToColor[entry.name as keyof typeof labelToColor] || fallbackColor} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SimplePieChart;