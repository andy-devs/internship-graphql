export const SIZE = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  mobileXL: 475,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
  desktopS: 1440,
  desktopL: 1920,
} as const;

export const MEDIA = {
  mobileS: `(min-width: ${SIZE.mobileS}px)`,
  mobileM: `(min-width: ${SIZE.mobileM}px)`,
  mobileL: `(min-width: ${SIZE.mobileL}px)`,
  mobileXL: `(min-width: ${SIZE.mobileXL}px)`,
  tablet: `(min-width: ${SIZE.tablet}px)`,
  laptop: `(min-width: ${SIZE.laptop}px)`,
  desktop: `(min-width: ${SIZE.desktop}px)`,
  desktopS: `(min-width: ${SIZE.desktopS}px)`,
  desktopL: `(min-width: ${SIZE.desktopL}px)`,
} as const;
