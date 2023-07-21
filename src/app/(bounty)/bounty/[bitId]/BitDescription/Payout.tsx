import classNames from 'classnames';
import { AiFillCreditCard } from 'react-icons/ai';
import { RiCoinsFill, RiWallet3Fill } from 'react-icons/ri';
import EngiAmount from '~/components/EngiAmount';
import Statistic from '~/components/Statistic';
import { Bit } from '~/types';

type PayoutProps = {
  className?: string;
  data?: Bit;
  isLoading?: boolean;
};

export default function Payout({ className, isLoading, data }: PayoutProps) {
  return (
    <div className={classNames('w-full', className)}>
      <h2
        className={classNames(
          'font-grifter text-xl inline-block',
          isLoading ? 'skeleton' : ''
        )}
      >
        Payout
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
        <Statistic
          icon={<AiFillCreditCard className="text-orange-primary h-5 w-5" />}
          value={<EngiAmount value={data?.funding} />}
          title={<span>Total Funding</span>}
          isLoading={isLoading}
        />
        <Statistic
          icon={<RiWallet3Fill className="text-orange-primary h-5 w-5" />}
          value={
            <EngiAmount
              value={data?.funding}
              // complete payout (80% of funding)
              modifier={0.8}
            />
          }
          title={<span>Complete Payout</span>}
          isLoading={isLoading}
        />
        <Statistic
          icon={<RiCoinsFill className="text-orange-primary h-5 w-5" />}
          value={
            <EngiAmount
              value={data?.funding}
              // per test payout (20% of payout / # of tests)
              modifier={0.2 / (data?.tests?.length || 1)}
            />
          }
          title={<span>Per Test Payout</span>}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
