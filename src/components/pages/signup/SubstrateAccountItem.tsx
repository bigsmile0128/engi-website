import { uuid4 } from '@sentry/utils';
import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';
import { useMemo } from 'react';
import Button from '~/components/global/Button/Button';
import { AccountExistenceResult, SubstrateAccount } from '~/types';

type SubstrateAccountItemProps = {
  account?: SubstrateAccount;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

export default function SubstrateAccountItem({
  className,
  account,
  isLoading,
  onClick,
}: SubstrateAccountItemProps) {
  // TODO: enable popover menu when there are actually account options
  // const [referenceElement, setReferenceElement] = useState(null);
  // const [popperElement, setPopperElement] = useState(null);
  // const { styles, attributes } = usePopper(referenceElement, popperElement, {
  //   placement: 'bottom-end',
  //   modifiers: [
  //     {
  //       name: 'offset',
  //       options: {
  //         offset: [0, 10],
  //       },
  //     },
  //   ],
  // });

  const avatarId = useMemo(() => {
    return account?.address ?? uuid4();
  }, [account]);

  return (
    <div
      className={classNames(
        'flex items-center py-4 px-8 bg-secondary w-full overflow-hidden',
        className
      )}
    >
      <div
        className={classNames(
          'shrink-0 h-14 w-14',
          isLoading ? 'skeleton' : ''
        )}
      >
        <Avvvatars value={avatarId} style="shape" size={56} />
      </div>
      <div className="flex flex-col ml-4 overflow-hidden">
        <div
          className={classNames(
            'flex-1 flex items-center overflow-hidden gap-x-4',
            isLoading ? 'children:skeleton' : ''
          )}
        >
          <span className="font-bold shrink-0">
            {account?.meta?.name ?? 'Name'}
          </span>
          <div className="shrink-0 self-stretch w-[1px] bg-white/30" />
          <span className="inline-block text-sm text-secondary truncate max-w-[50%]">
            {account?.address || 'Address'}
          </span>
        </div>
        <span
          className={classNames(
            'text-sm text-secondary',
            isLoading ? 'skeleton text-transparent' : ''
          )}
        >
          {account?.exists === AccountExistenceResult.YES
            ? 'Registered'
            : account?.exists === AccountExistenceResult.UNCONFIRMED
            ? 'Unconfirmed email'
            : 'Not registered'}
        </span>
      </div>
      <Button
        className="shrink-0 ml-auto whitespace-nowrap px-0 w-[100px]"
        variant="primary"
        size="small"
        onClick={onClick}
        isLoading={isLoading}
        disabled={
          account?.exists === AccountExistenceResult.UNSUPPORTED_ADDRESS
        }
      >
        {account?.exists === AccountExistenceResult.NO
          ? 'Register'
          : account?.exists === AccountExistenceResult.UNCONFIRMED
          ? 'Confirm'
          : account?.exists === AccountExistenceResult.UNSUPPORTED_ADDRESS
          ? 'Unsupported'
          : 'Log In'}
      </Button>
      {/* TODO: popover button to implement when there are more options */}
      {/* <Popover>
        <Popover.Button
          ref={setReferenceElement}
          className="ml-4 hover:text-green-primary focus-green-primary"
        >
          <RiMore2Fill className="h-6 w-6" />
        </Popover.Button>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="py-2 bg-[#374151]"
        >
          <Link
            href="/bits"
            className={classNames(
              'px-4 py-2',
            )}
          >
            Option 1
          </Link>
        </Popover.Panel>
      </Popover> */}
    </div>
  );
}
