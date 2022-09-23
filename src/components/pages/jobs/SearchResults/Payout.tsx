import React from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/icons/EngiIcon';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

type PayoutProps = {
  className?: string;
  reward?: number;
  isLoading?: boolean;
};

const COLORS = ['#65FEB7', '#65FEB799', '#65FEB733'];

export default function Payout({ className, reward, isLoading }: PayoutProps) {
  const data = [
    { name: 'Winning Payout', value: 100 },
    { name: 'Honors Bracket', value: 30 },
    { name: 'Minimum Wage', value: 20 },
  ];

  return (
    <div className={classNames('flex items-center', className)}>
      <div className="flex items-center mr-1">
        <div
          className={classNames(
            'flex items-center gap-x-1',
            isLoading ? 'children:skeleton' : ''
          )}
        >
          <EngiIcon className="h-[11px] w-auto text-green-primary" />
          <span className="font-grifter text-xl -mb-1">{reward}</span>
        </div>
        <div
          className={classNames(
            'flex items-center gap-x-2 ml-2',
            isLoading ? 'children:skeleton' : ''
          )}
        >
          <span className="font-bold text-orange-primary text-sm">+</span>
          <span className="font-bold text-sm text-[#C2C2C2]">e50</span>
        </div>
      </div>
      <div
        className={classNames(
          'hidden xl:block h-12 w-12 ml-auto',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <PieChart width={48} height={48}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            fill="#8884d8"
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
        </PieChart>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, ...props }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#232323] px-2 py-1 -translate-x-1/3 -translate-y-[120%]">
        <span className="text-xs whitespace-nowrap">{`${payload?.[0].name}: e${payload?.[0].value}`}</span>
      </div>
    );
  }

  return null;
};
