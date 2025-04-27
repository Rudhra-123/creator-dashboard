import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const DashboardCard = memo(({ 
  title, 
  value, 
  previousValue,
  icon: Icon,
  variant = 'default'
}) => {
  // Calculate percentage change if previous value exists
  const percentChange = previousValue ? 
    ((value - previousValue) / previousValue * 100).toFixed(1) : null;
  
  // Determine trend direction
  let trend;
  if (percentChange > 0) {
    trend = 'up';
  } else if (percentChange < 0) {
    trend = 'down';
  } else {
    trend = 'neutral';
  }
  
  // Map variant to styling classes
  const variantClasses = {
    default: 'bg-white border-gray-200',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-amber-50 border-amber-200',
    danger: 'bg-red-50 border-red-200'
  };
  
  // Trend styling
  const trendStyles = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100'
  };
  
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={`p-6 rounded-lg border shadow-sm ${variantClasses[variant]} transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-gray-600 font-medium text-sm uppercase tracking-wider">{title}</h3>
        {Icon && <Icon size={20} className="text-gray-500" />}
      </div>
      
      <div className="flex flex-col">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        
        {percentChange !== null && (
          <div className="flex items-center mt-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${trendStyles[trend]}`}>
              <TrendIcon size={14} className="mr-1" />
              {Math.abs(percentChange)}%
            </span>
            <span className="text-xs text-gray-500 ml-2">vs previous</span>
          </div>
        )}
      </div>
    </div>
  );
});

// Adding displayName for better debugging (Dan Abramov practice)
DashboardCard.displayName = 'DashboardCard';
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  previousValue: PropTypes.number,
  icon: PropTypes.elementType,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
};

export default DashboardCard;
