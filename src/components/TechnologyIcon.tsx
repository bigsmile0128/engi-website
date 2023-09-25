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
import classNames from 'classnames';

type TechnologyIconProps = {
  className?: string;
  value?: string;
};

export default function TechnologyIcon({
  className,
  value,
  ...props
}: TechnologyIconProps) {
  const classes = classNames('h-4 w-4', className);
  switch (value) {
    case 'C_SHARP':
      return <SiCsharp className={classes} />;
      break;
    case 'PYTHON':
      return <SiPython className={classes} />;
      break;
    case 'JAVA_SCRIPT':
      return <SiJavascript className={classes} />;
      break;
    case 'TYPE_SCRIPT':
      return <SiTypescript className={classes} />;
      break;
    case 'RUST':
      return <SiRust className={classes} />;
      break;
    case 'SOLIDITY':
      return <SiSolidity className={classes} />;
      break;
    case 'SOLANG':
      return <TbCurrencySolana className={classes} />;
      break;
    case 'INK':
      return <InkIcon className={classes} />;
      break;
    case 'SUBSTRATE':
      return <SiParitysubstrate className={classes} />;
      break;
    case 'CPP':
      return <SiCplusplus className={classes} />;
      break;
    case 'C':
      return <SiC className={classes} />;
      break;
    case 'SAME_STORY':
      return <EngiIcon className={classes} />;
      break;
    case 'CSS':
      return <SiCss3 className={classes} />;
      break;
    case 'DOCKER':
      return <SiDocker className={classes} />;
      break;
    default:
      return <RiCodeLine className={classes} />;
  }
}
