import { Roboto_Mono } from '@next/font/google';
import classNames from 'classnames';
import { Bit } from '~/types';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
});

type BitTestsProps = {
  className?: string;
  data?: Bit;
  isLoading?: boolean;
};

export default function BitTests({
  className,
  isLoading,
  data,
}: BitTestsProps) {
  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.tests?.length && data?.tests?.length > 0 ? (
        data?.tests.map((test) => (
          <div key={test.id} className="flex flex-col bg-black/[.14]">
            <span className="block font-medium px-8 py-6">{test.id}</span>
            {test.failedResultMessage && (
              <div
                className="flex"
                style={{
                  background:
                    'linear-gradient(97.66deg, rgba(255, 255, 255, 0.1) 8%, rgba(255, 255, 255, 0) 92.75%)',
                }}
              >
                <div className="basis-10 shrink-0 bg-[#EBEBEB]/[.14] opacity-80 backdrop-blur-[2px]" />
                <div
                  className={classNames(
                    'block text-sm font-medium px-8 py-6',
                    robotoMono.className
                  )}
                >
                  {test.failedResultMessage}
                </div>
              </div>
            )}
            <div className="flex h-[5px] bg-orange-primary"></div>
          </div>
        ))
      ) : (
        <div>No tests found.</div>
      )}
    </div>
  );
}
