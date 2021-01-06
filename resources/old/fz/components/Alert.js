import React from 'react';

export default ({ type, children, closeAlert }) => (
  <div className={'alert alert-dismissible alert-' + (type ? 'danger' : 'success')}>
    <p>{children}</p>
    <button type="button" className="close" onClick={closeAlert}>
      <span>&times;</span>
    </button>
  </div>
);
