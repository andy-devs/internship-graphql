import * as React from 'react';
import { SVGProps } from 'react';
export const SvgBackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6.75 15.5L3 11.75M3 11.75L6.75 8M3 11.75H21"
      stroke="#212121"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
