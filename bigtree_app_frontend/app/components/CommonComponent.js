import React from 'react';
import TypedComponent from './TypedComponent.tsx';

/**
 * 사주, 궁합, 타로 List Item Component
 * @category Components
 * @returns JSX.Element
 */
function CommonComponent() {
  return <TypedComponent someNumber={24}>Hello Bigtree!</TypedComponent>;
}

export default CommonComponent;
