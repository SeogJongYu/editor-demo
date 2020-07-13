import * as React from 'react';
import PropTypes from 'prop-types';

function TypedComponent({
  children,
  someNumber: number,
}: {
  children: any;
  someNumber: number;
}): JSX.Element {
  return (
    <>
      {children}, Some Number: {number * 2}
    </>
  );
}

TypedComponent.propTypes = {
  children: PropTypes.node,
  someNumber: PropTypes.number,
};

export default TypedComponent;
