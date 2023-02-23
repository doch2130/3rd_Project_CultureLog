import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
export default function ChartPerson({
  movie,
  book,
  perfo,
  Allmovie,
  Allbook,
  Allperfo,
}) {
  const data = [
    {
      name: 'BOOK',
      AllUser: Allbook,
      User: book,
    },
    {
      name: 'MOVIE',
      AllUser: Allmovie,
      User: movie,
    },
    {
      name: 'PERFOMANCE',
      AllUser: Allperfo,
      User: perfo,
    },
  ];
  console.log(movie);
  return (
    <div>
      <LineChart
        width={800}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="AllUser" stroke="#82ca9d" />
        <Line type="monotone" dataKey="User" stroke="#00471b" />
      </LineChart>
    </div>
  );
}
