import React, { useState } from 'react';
import { Loader } from '../loader/Loader';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, ...rest }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    const handleImageLoad = () => {
      setIsLoading(false);
    };
  
    return (
      <div className="lazy-image-container">
        {isLoading && (
          <div className="loader-overlay">
            <Loader />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className={isLoading ? 'hidden' : 'visible'}
          {...rest}
        />
      </div>
    );
  };