import { RiCodeLine } from 'react-icons/ri';
import { SiCsharp, SiJavascript, SiPython, SiRust } from 'react-icons/si';
import { Language } from '~/types';

type LanguageIconProps = {
  className?: string;
  value?: Language;
};

export default function LanguageIcon({
  className,
  value,
  ...props
}: LanguageIconProps) {
  switch (value) {
    // TODO: re-enable when more languages are added to the enum
    // case Language.C:
    //   return <SiC className={className} {...props} />;
    //   break;
    case Language.C_SHARP:
      return <SiCsharp className={className} {...props} />;
      break;
    // case Language.JAVA:
    //   return <SiJava className={className} {...props} />;
    //   break;
    case Language.JAVA_SCRIPT:
      return <SiJavascript className={className} {...props} />;
      break;
    case Language.PYTHON:
      return <SiPython className={className} {...props} />;
      break;
    case Language.RUST:
      return <SiRust className={className} {...props} />;
      break;
    // case Language.TYPESCRIPT:
    //   return <SiTypescript className={className} {...props} />;
    //   break;
    default:
      return <RiCodeLine className={className} {...props} />;
  }
}
