/**
 * Компонент для отображения кликабельного адреса
 */
'use client';

import { MapPin } from 'lucide-react';
import { useMaps } from '@/lib/utils/maps';
import { cn } from '@/lib/utils';

interface ClickableAddressProps {
  address: string;
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const ClickableAddress = ({ 
  address, 
  className, 
  showIcon = true,
  children 
}: ClickableAddressProps) => {
  const { openAddress } = useMaps();

  const handleClick = () => {
    openAddress(address);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center space-x-2 text-left hover:text-navy-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2 rounded-md p-1 -m-1",
        className
      )}
      title="Открыть в картах"
    >
      {showIcon && <MapPin className="w-4 h-4 text-navy-400 flex-shrink-0" />}
      <span className="underline decoration-dotted underline-offset-4 hover:decoration-solid">
        {children || address}
      </span>
    </button>
  );
};