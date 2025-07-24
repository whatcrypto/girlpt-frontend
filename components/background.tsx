import React from 'react';
import NextBgImage from 'next-bg-image';
import { StaticImageData } from 'next/image';


type CssGradientString = string;

interface BackgroundProps {
  src: StaticImageData | Array<StaticImageData | CssGradientString>;
  children?: React.ReactNode;
  alt?: string;
}

export const Background = ({ children, src, alt }: BackgroundProps) => {
  return (
    <NextBgImage src={src} alt={alt}>
      {children}
    </NextBgImage>
  )
}

export default Background;
