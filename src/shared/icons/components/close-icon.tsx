import { SVGProps } from 'react';

export const SvgCloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6 18L18 6M6 6L18 18" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
