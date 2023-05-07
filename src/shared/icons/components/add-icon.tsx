import * as React from 'react';
import { SVGProps } from 'react';
export const SvgAddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 6V18M18 12L6 12"
      stroke="#FCFCFC"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
