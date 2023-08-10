import { RiCodeLine } from 'react-icons/ri';
import {
  SiC,
  SiCplusplus,
  SiCsharp,
  SiCss3,
  SiDocker,
  SiJavascript,
  SiParitysubstrate,
  SiPython,
  SiRust,
  SiSolidity,
  SiTypescript,
} from 'react-icons/si';
import { TbCurrencySolana } from 'react-icons/tb';
import InkIcon from './global/icons/InkIcon';
import EngiIcon from './global/icons/EngiIcon';

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
    case 'C_SHARP':
      return <SiCsharp className="h-4 w-4" />;
      break;
    case 'PYTHON':
      return <SiPython className="h-4 w-4" />;
      break;
    case 'JAVA_SCRIPT':
      return <SiJavascript className="h-4 w-4" />;
      break;
    case 'TYPE_SCRIPT':
      return <SiTypescript className="h-4 w-4" />;
      break;
    case 'RUST':
      return <SiRust className="h-4 w-4" />;
      break;
    case 'SOLIDITY':
      return <SiSolidity className="h-4 w-4" />;
      break;
    case 'SOLANG':
      return <TbCurrencySolana className="h-4 w-4" />;
      break;
    case 'INK':
      return <InkIcon className="h-4 w-4" />;
      break;
    case 'SUBSTRATE':
      return <SiParitysubstrate className="h-4 w-4" />;
      break;
    case 'CPP':
      return <SiCplusplus className="h-4 w-4" />;
      break;
    case 'C':
      return <SiC className="h-4 w-4" />;
      break;
    case 'SAME_STORY':
      return <EngiIcon className="h-4 w-4" />;
      break;
    case 'CSS':
      return <SiCss3 className="h-4 w-4" />;
      break;
    case 'DOCKER':
      return <SiDocker className="h-4 w-4" />;
      break;
    default:
      return <RiCodeLine className={className} {...props} />;
  }
}
