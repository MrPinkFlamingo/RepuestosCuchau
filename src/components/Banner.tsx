import React from 'react';
import { ActionButton } from './Button/ActionButton';

interface BannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const Banner: React.FC<BannerProps> = ({
  backgroundImage = "/img/AutoInicio.jpg",
  buttonText,
  buttonLink,
}) => {
  return (
    <div
      className="p-4 p-md-5 mb-4 text-white rounded shadow-sm"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('${backgroundImage}') center/cover no-repeat`,
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="col-md-8 col-lg-6 px-0">
        {buttonText && buttonLink && (
          <ActionButton to={buttonLink} className="mt-2" icon="bi bi-tag-fill">
            {buttonText}
          </ActionButton>
        )}
      </div>
    </div>
  );
};
