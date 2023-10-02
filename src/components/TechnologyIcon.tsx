import { RiCodeLine } from 'react-icons/ri';
import {
  SiC,
  SiCplusplus,
  SiCsharp,
  SiCss3,
  SiDocker,
  SiHtml5,
  SiJavascript,
  SiMdx,
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
}: TechnologyIconProps) {
  const classes = classNames('h-4 w-4', className);
  switch (value) {
    case 'csharp':
      return <SiCsharp className={classes} />;
      break;
    case 'python':
      return <SiPython className={classes} />;
      break;
    case 'javascript':
      return <SiJavascript className={classes} />;
      break;
    case 'typescript':
      return <SiTypescript className={classes} />;
      break;
    case 'rust':
      return <SiRust className={classes} />;
      break;
    case 'solidity':
      return <SiSolidity className={classes} />;
      break;
    case 'solang':
      return <TbCurrencySolana className={classes} />;
      break;
    case 'ink':
      return <InkIcon className={classes} />;
      break;
    case 'substrate':
      return <SiParitysubstrate className={classes} />;
      break;
    case 'cpp':
      return <SiCplusplus className={classes} />;
      break;
    case 'c':
      return <SiC className={classes} />;
      break;
    case 'samestory':
      return <EngiIcon className={classes} />;
      break;
    case 'css':
      return <SiCss3 className={classes} />;
      break;
    case 'docker':
      return <SiDocker className={classes} />;
      break;
    case 'html':
      return <SiHtml5 className={classes} />;
      break;
    case 'mdx':
      return <SiMdx className={classes} />;
      break;
    default:
      return <RiCodeLine className={classes} />;
  }
}
