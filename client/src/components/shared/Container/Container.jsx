import React from 'react';

const Container = ({ children }) => {
  return (
    <div className='2xl:max-w-[2000px] w-full mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
      {children}
    </div>
  );
};

export default Container;