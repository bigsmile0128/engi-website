import classNames from 'classnames';
import Image from 'next/image';
import saveCostsImg from 'public/img/about/business/save-costs.png';
import LogoAltSvg from '~/components/Logo';

type SaveCostsProps = {
  className?: string;
};

const stats = [
  {
    value: '~1/100',
    description: 'cost per developer hour',
  },
  {
    value: '~10x',
    description: 'faster time-to-code-completion',
  },
  {
    value: '24/7',
    description: 'active product development',
  },
];

export default function SaveCosts({ className }: SaveCostsProps) {
  return (
    <div
      className={classNames(
        'py-12 tablet:py-24 xl:py-32 bg-secondary/40',
        className
      )}
    >
      <div className="max-w-page w-full flex flex-col gap-8 xl:flex-row xl:justify-between xl:items-end">
        <span className="font-grifter text-3xl tablet:text-5xl tablet:leading-normal">
          Reduce overhead&nbsp; Accelerate shipping&nbsp; Increase quality
        </span>
        <span className="text-lg text-secondary">
          Competition pressurizes engineering <em>output</em>, rather than
          interviewing skills, allowing code cost and quality to be respectively
          market min-maxed
        </span>
      </div>
      <Image
        src={saveCostsImg}
        className="max-w-page w-full mt-12 tablet:mt-16 xl:mt-24"
        alt="Sourcing"
      />
      {/* TODO: replace with carousel when we have actual data */}
      <div className="max-w-page w-full flex flex-col xl:flex-row xl:items-center gap-12 mt-12 tablet:mt-16">
        {/* Company info */}
        <div className="max-w-page w-full">
          <div className="flex flex-col gap-6 tablet:flex-row">
            <div className="bg-black rounded-full flex items-center justify-center h-16 w-16 shrink-0">
              <div className="-ml-1">
                <LogoAltSvg beta={false} />
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <span className="text-xl font-bold tablet:font-grifter tablet:text-5xl tablet:mt-3">
                Engi
              </span>
              <span className="font-medium text-xl">
                Engi saves time and money using itself for its own development
                needs
              </span>
            </div>
          </div>
        </div>
        {/* Company stats */}
        <div className="max-w-page w-full grid grid-cols-2 tablet:grid-cols-3 gap-8 tablet:mt-8">
          {stats.map(({ value, description }) => (
            <div className="flex flex-col gap-4" key={description}>
              <span className="font-grifter text-3xl tablet:text-4xl">
                {value}
              </span>
              <span className="text-lg text-secondary tablet:text-base tablet:font-medium">
                {description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
