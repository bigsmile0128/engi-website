import React from 'react';
import classNames from 'classnames';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import dayjs from 'dayjs';
import EngiAmount from '~/components/EngiAmount';

type ActivityProps = {
  className?: string;
};

export default function Activity({ className }: ActivityProps) {
  const data = [
    { timestamp: dayjs().subtract(7, 'day').valueOf(), value: 100 },
    { timestamp: dayjs().subtract(6, 'day').valueOf(), value: 400 },
    { timestamp: dayjs().subtract(5, 'day').valueOf(), value: 200 },
    { timestamp: dayjs().subtract(4, 'day').valueOf(), value: 300 },
    { timestamp: dayjs().subtract(3, 'day').valueOf(), value: 500 },
    { timestamp: dayjs().subtract(2, 'day').valueOf(), value: 300 },
    { timestamp: dayjs().subtract(1, 'day').valueOf(), value: 800 },
    { timestamp: dayjs().subtract(0, 'day').valueOf(), value: 400 },
  ];
  return (
    <div className={classNames('', className)}>
      <div className="flex items-end justify-between">
        <h2 className="font-bold text-2xl">Activity</h2>
        <EngiAmount value={123} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            type="linear"
            dataKey="value"
            stroke="#65FEB7"
            strokeWidth={2}
            dot={false}
          />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            scale="time"
            tickFormatter={(value) => {
              return dayjs(value).format('MMM D');
            }}
            tick={{
              fontSize: 14,
              fill: '#BCBCBC',
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="value"
            tick={
              <EngiTick
                style={{
                  fill: '#BCBCBC',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              />
            }
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function EngiTick(props) {
  return (
    <Text {...props}>
      {props.labelFormatter?.(props.payload.value) ?? props.payload.value}
    </Text>
  );
}
