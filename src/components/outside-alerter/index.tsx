import React, { useRef, useEffect, ReactNode, FC } from 'react';

type ClickAwayProps = {
  onClickAway: () => void;
  children: ReactNode;
  [x: string]: any;
};

const ClickAway: FC<ClickAwayProps> = ({
  onClickAway,
  children,
  ...otherProps
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway();
        event.stopPropagation();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickAway, ref]);

  return (
    <div ref={ref} {...otherProps}>
      {children}
    </div>
  );
};

export default ClickAway;
