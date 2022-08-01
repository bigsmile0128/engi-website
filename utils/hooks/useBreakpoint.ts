import { useMediaQuery } from 'react-responsive';

export default function useBreakpoint() {
  const sm = useMediaQuery({ minWidth: 640 });
  const md = useMediaQuery({ minWidth: 768 });
  const lg = useMediaQuery({ minWidth: 1024 });
  const xl = useMediaQuery({ minWidth: 1280 });

  return { sm, md, lg, xl };
}
