import React from 'react';
import classNames from 'classnames';
import Tag from './global/Tag/Tag';
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

type LanguageTagProps = {
  className?: string;
  isLoading?: boolean;
  value?: Language;
};

const displayNameMap = {
  [Language.C_SHARP]: 'C#',
  [Language.JAVA]: 'Java',
  [Language.JAVASCRIPT]: 'JavaScript',
  [Language.PYTHON]: 'Python',
  [Language.RUST]: 'Rust',
  [Language.TYPESCRIPT]: 'TypeScript',
};

export default function LanguageTag({
  className,
  value,
  isLoading,
}: LanguageTagProps) {
  let icon;
  switch (value) {
    case Language.C:
      icon = <SiC className="text-orange-primary mr-2" />;
      break;
    case Language.C_SHARP:
      icon = <SiCsharp className="text-orange-primary mr-2" />;
      break;
    case Language.JAVA:
      icon = <SiJava className="text-orange-primary mr-2" />;
      break;
    case Language.JAVASCRIPT:
      icon = <SiJavascript className="text-orange-primary mr-2" />;
      break;
    case Language.PYTHON:
      icon = <SiPython className="text-orange-primary mr-2" />;
      break;
    case Language.RUST:
      icon = <SiRust className="text-orange-primary mr-2" />;
      break;
    case Language.TYPESCRIPT:
      icon = <SiTypescript className="text-orange-primary mr-2" />;
      break;
    default:
      icon = <RiCodeLine className="text-orange-primary mr-2" />;
  }
  return (
    <Tag
      className={classNames(
        '',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      {icon}
      <span>{displayNameMap[value] ?? value}</span>
    </Tag>
  );
}
