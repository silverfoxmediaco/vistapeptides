import React from 'react';
import { motion } from 'framer-motion';

const Table = ({ 
  columns = [],
  data = [],
  variant = 'default',
  size = 'md',
  striped = false,
  hover = true,
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'border border-dark-200',
    bordered: 'border-2 border-dark-300',
    minimal: 'border-0',
    medical: 'border border-primary-200 bg-primary-50/30',
  };

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const cellPadding = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  const paddingClasses = cellPadding[size];

  const tableClasses = `w-full ${variantClasses} ${sizeClasses} rounded-xl overflow-hidden ${className}`.trim();

  return (
    <div className="overflow-x-auto">
      <table className={tableClasses} {...props}>
        <thead className="bg-dark-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className={`${paddingClasses} text-left font-semibold text-dark-700 border-b border-dark-200`}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <motion.tr
              key={row.id || rowIndex}
              className={`
                ${striped && rowIndex % 2 === 1 ? 'bg-dark-25' : 'bg-white'}
                ${hover ? 'hover:bg-primary-25 transition-colors duration-150' : ''}
                ${rowIndex !== data.length - 1 ? 'border-b border-dark-100' : ''}
              `}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.05 }}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={`${rowIndex}-${column.key || colIndex}`}
                  className={`${paddingClasses} text-dark-900`}
                >
                  {column.render 
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]
                  }
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-12 text-dark-500">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default Table;