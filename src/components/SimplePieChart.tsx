import { FC } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ConsumptionGraphProps } from '../pages/Dashboard';
import { colors, aggregatedData } from '../constants/consumptionUtils';

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
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default SimplePieChart;