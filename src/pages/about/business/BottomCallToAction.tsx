import classNames from 'classnames';
import Link from 'next/link';
import Button from '~/components/global/Button/Button';
import GridPattern from '~/components/global/GridPattern/GridPattern';

type BottomCallToActionProps = {
  className?: string;
};

export default function BottomCallToAction({
  className,
}: BottomCallToActionProps) {
  return (
    <div className={classNames('relative', className)}>
      <GridPattern id="freelancer-bottom-cta" offset={-1} />
      <div className="max-w-page max-w-[540px] w-full flex flex-col items-center py-20">
        <p className="font-grifter text-4xl tablet:text-5xl text-center leading-[3rem]">
          Ready to post your first bit?
        </p>
        <span className="mt-8 text-lg text-secondary text-center tracking-wide">
          Post a bit today and start building your products
        </span>
        <Link href="/post" className="mt-8">
          <Button variant="primary">Post a Bit</Button>
        </Link>
      </div>
    </div>
  );
}
