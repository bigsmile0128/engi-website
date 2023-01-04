import Image from 'next/legacy/image';
import classNames from 'classnames';
import { HiUser } from '@react-icons/all-files/hi/HiUser';
import { BiBuildings } from 'react-icons/bi';
import randomColor from 'randomcolor';
import dynamic from 'next/dynamic';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

import { TeamMember as TeamMemberType } from './About.utils';

interface Props extends TeamMemberType {
  className?: string;
}

function TeamMember({
  className,
  name,
  role,
  companies,
  photoLink,
  socialLinks,
}: Props) {
  const backgroundColor = randomColor({
    seed: name,
    luminosity: 'light',
  });

  return (
    <div className={classNames('flex flex-col min-w-[260px]', className)}>
      {photoLink ? (
        <Image
          src={photoLink}
          alt={name + 'photo'}
          width={260}
          height={260}
          className="w-full"
        />
      ) : (
        <div
          className={classNames(
            'h-[260px] flex items-center justify-center px-12'
          )}
          style={{
            backgroundColor,
          }}
        >
          <HiUser size={150} />
        </div>
      )}

      <div className="flex flex-col p-4 bg-black/20 border border-white/30 border-t-0">
        <div className="flex items-center">
          <p className="text-green-primary flex-grow">{role}</p>
          {socialLinks?.map(({ name, link, iconLink }) => (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              key={name}
              className="ml-2"
            >
              <Image
                src={iconLink}
                alt={name}
                width={20}
                height={20}
                className="w-5"
              />
            </a>
          ))}
        </div>
        <p className="font-bold border-b border-white/30 pb-2 mb-2">{name}</p>
        <div>
          <p className="whitespace-nowrap">Previously Building @</p>
          <div className="flex items-center gap-x-4 mt-2">
            {companies ? (
              companies?.map(({ name, iconLink }, index) =>
                iconLink ? (
                  <Image
                    key={name + index}
                    src={iconLink}
                    alt={name}
                    width={20}
                    height={20}
                    className="h-5"
                    data-tip={name}
                  />
                ) : (
                  <div key={index}>
                    <BiBuildings className="h-5 w-5" data-tip={name} />
                  </div>
                )
              )
            ) : (
              <BiBuildings className="h-5 w-5" />
            )}
            <ReactTooltip effect="solid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
