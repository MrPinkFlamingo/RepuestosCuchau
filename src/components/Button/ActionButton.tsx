import React from 'react';
import { Link } from 'react-router-dom';

interface ActionButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: string;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  to,
  onClick,
  type = 'button',
  className = '',
  icon,
  disabled = false,
}) => {
  const content = (
    <>
      {icon && <i className={`${icon} me-1`}></i>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`btn btn-custom-action ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-custom-action ${className}`}
    >
      {content}
    </button>
  );
};
