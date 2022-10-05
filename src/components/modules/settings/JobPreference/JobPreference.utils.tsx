import { ReactNode } from 'react';
import JavaScriptIcon from 'public/img/settings/javascript.svg';
import CPlusPlusIcon from 'public/img/settings/c-plus-plus.svg';
import PythonIcon from 'public/img/settings/python.svg';
import HtmlIcon from 'public/img/settings/html5.svg';
import RustIcon from 'public/img/settings/rust.svg';
import TypescriptIcon from 'public/img/settings/typescript.svg';
import ReactIcon from 'public/img/settings/reactjs.svg';

type LangSelectItem = {
  icon: ReactNode;
  title: string;
};

export const langData: LangSelectItem[] = [
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <CPlusPlusIcon width={33} height={33} />,
    title: 'C++',
  },
  {
    icon: <PythonIcon width={33} height={33} />,
    title: 'Python',
  },
  {
    icon: <HtmlIcon width={33} height={33} />,
    title: 'HTML',
  },
  {
    icon: <RustIcon width={33} height={33} />,
    title: 'Rust',
  },
  {
    icon: <TypescriptIcon width={33} height={33} />,
    title: 'Typescript',
  },
  {
    icon: <ReactIcon width={33} height={33} />,
    title: 'React',
  },
];
