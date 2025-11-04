import React from 'react';

interface PillProps {
  children?: React.ReactNode;
  label?: string;
  className?: string;
}

const Pill: React.FC<PillProps> = ({ children, label, className = '' }) => {
  const content = children ?? label;

  if (!content) return null;

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full ${className}`}
    >
      {content}
    </span>
  );
};

export default Pill;