import React, { HTMLProps, useEffect, useRef } from 'react';

interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
    indeterminate?: boolean;
}

const IndeterminateCheckbox = ({
    indeterminate,
    className = '',
    ...rest
  }: IndeterminateCheckboxProps) => {
    const ref = useRef<HTMLInputElement>(null!)
  
    useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate, rest.checked])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
}

export default IndeterminateCheckbox;