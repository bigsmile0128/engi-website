import { RiCodeLine } from 'react-icons/ri';
import {
  SiC,
  SiCsharp,
  SiJavascript,
  SiPython,
  SiRust,
  SiTypescript,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

type TechnologyIconProps = {
  className?: string;
  value?: string;
};

export default function TechnologyIcon({
  className,
  value,
  ...props
}: TechnologyIconProps) {
  switch (value) {
    case 'C':
      return <SiC className={className} {...props} />;
      break;
    case 'C_SHARP':
      return <SiCsharp className={className} {...props} />;
      break;
    case 'JAVA':
      return <FaJava className={className} {...props} />;
      break;
    case 'JAVA_SCRIPT':
      return <SiJavascript className={className} {...props} />;
      break;
    case 'PYTHON':
      return <SiPython className={className} {...props} />;
      break;
    case 'RUST':
      return <SiRust className={className} {...props} />;
      break;
    case 'TYPESCRIPT':
      return <SiTypescript className={className} {...props} />;
      break;
    default:
      return <RiCodeLine className={className} {...props} />;
  }
}
