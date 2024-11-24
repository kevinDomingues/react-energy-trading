import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TransactionGraphData } from '../pages/Dashboard';
import { transactionsByDay } from '../constants/transactionUtils';

const SimpleLineChart: FC<TransactionGraphData> = ({
  data
}) => {

  const transformedData = transactionsByDay(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={transformedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" allowDataOverflow />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
        <Line type="monotone" dataKey="avg" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;