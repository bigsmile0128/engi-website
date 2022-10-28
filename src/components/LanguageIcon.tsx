import React from 'react';
import { Language } from '~/types';
import { RiCodeLine } from 'react-icons/ri';
import {
  SiC,
  SiCsharp,
  SiJava,
  SiJavascript,
  SiPython,
  SiRust,
  SiTypescript,
} from 'react-icons/si';

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
    case Language.C:
      return <SiC className={className} {...props} />;
      break;
    case Language.C_SHARP:
      return <SiCsharp className={className} {...props} />;
      break;
    case Language.JAVA:
      return <SiJava className={className} {...props} />;
      break;
    case Language.JAVA_SCRIPT:
      return <SiJavascript className={className} {...props} />;
      break;
    case Language.PYTHON:
      return <SiPython className={className} {...props} />;
      break;
    case Language.RUST:
      return <SiRust className={className} {...props} />;
      break;
    case Language.TYPESCRIPT:
      return <SiTypescript className={className} {...props} />;
      break;
    default:
      return <RiCodeLine className={className} {...props} />;
  }
}
