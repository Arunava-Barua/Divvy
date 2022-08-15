import React from 'react';

const Button = ({ classStyles, btnName, handleClick }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {
    btnName === 'Cancel'
      ? (
        <button type="button" onClick={() => handleClick()} className={`text-sm minlg:text-lg px-6 py-2 minlg:px-8 font-poppins font-semibold text-white border border-cyan-400 flex-1 ${classStyles}`}>{btnName}</button>
      )
      : (
        <button type="button" onClick={() => handleClick()} className={`nft-gradient text-sm minlg:text-lg px-6 py-2 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}>{btnName}</button>
      )
}
  </>
);

export default Button;
