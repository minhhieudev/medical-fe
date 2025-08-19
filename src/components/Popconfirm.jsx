import React, { useState, useRef, useEffect } from 'react';

const Popconfirm = ({ 
  children, 
  title = "Bạn có chắc chắn?", 
  onConfirm, 
  onCancel,
  placement = "top" 
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!visible) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      let top, left;
      
      switch (placement) {
        case 'top':
          top = rect.top + scrollTop - 10;
          left = rect.left + scrollLeft + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + scrollTop + 10;
          left = rect.left + scrollLeft + rect.width / 2;
          break;
        case 'left':
          top = rect.top + scrollTop + rect.height / 2;
          left = rect.left + scrollLeft - 10;
          break;
        case 'right':
          top = rect.top + scrollTop + rect.height / 2;
          left = rect.right + scrollLeft + 10;
          break;
        default:
          top = rect.top + scrollTop - 10;
          left = rect.left + scrollLeft + rect.width / 2;
      }
      
      setPosition({ top, left });
    }
    
    setVisible(!visible);
  };

  const handleConfirm = () => {
    setVisible(false);
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    setVisible(false);
    if (onCancel) onCancel();
  };

  const handleClickOutside = (e) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [visible]);

  const getArrowClass = () => {
    switch (placement) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800';
    }
  };

  const getPopoverClass = () => {
    switch (placement) {
      case 'top':
        return 'transform -translate-x-1/2 -translate-y-full';
      case 'bottom':
        return 'transform -translate-x-1/2';
      case 'left':
        return 'transform -translate-x-full -translate-y-1/2';
      case 'right':
        return 'transform -translate-y-1/2';
      default:
        return 'transform -translate-x-1/2 -translate-y-full';
    }
  };

  return (
    <>
      <span ref={triggerRef} onClick={handleClick} className="cursor-pointer">
        {children}
      </span>
      
      {visible && (
        <div
          ref={popoverRef}
          className={`fixed z-50 ${getPopoverClass()}`}
          style={{ top: position.top, left: position.left }}
        >
          <div className="bg-gray-800 text-white text-xs rounded-md shadow-lg p-3 max-w-xs">
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-4 ${getArrowClass()}`}></div>
            
            {/* Content */}
            <div className="mb-3">
              <p className="text-white">{title}</p>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popconfirm;
