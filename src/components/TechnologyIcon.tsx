import { RiCodeLine } from 'react-icons/ri';
import { SiCsharp, SiJavascript, SiPython, SiRust } from 'react-icons/si';
import { Technology } from '~/types';

type TechnologyIconProps = {
  className?: string;
  value?: Technology;
};

export default function TechnologyIcon({
  className,
  value,
  ...props
}: TechnologyIconProps) {
  switch (value) {
    // TODO: re-enable when more languages are added to the enum
    // case Language.C:
    //   return <SiC className={className} {...props} />;
    //   break;
    case Technology.C_SHARP:
      return <SiCsharp className={className} {...props} />;
      break;
    // case Language.JAVA:
    //   return <SiJava className={className} {...props} />;
    //   break;
    case Technology.JAVA_SCRIPT:
      return <SiJavascript className={className} {...props} />;
      break;
    case Technology.PYTHON:
      return <SiPython className={className} {...props} />;
      break;
    case Technology.RUST:
      return <SiRust className={className} {...props} />;
      break;
    // case Language.TYPESCRIPT:
    //   return <SiTypescript className={className} {...props} />;
    //   break;
    default:
      return <RiCodeLine className={className} {...props} />;
  }
}
