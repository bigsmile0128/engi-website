'use client';

import dynamic from 'next/dynamic';
const Avatar = dynamic(() => import('avvvatars-react'), { ssr: false });

// SSR must be off to prevent hydration error with svg generated
export default Avatar;
