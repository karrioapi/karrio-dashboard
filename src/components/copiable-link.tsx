import React from 'react';

interface CopiableLinkComponent extends React.InputHTMLAttributes<HTMLAnchorElement> {
  text: string;
}

const CopiableLink: React.FC<CopiableLinkComponent> = ({ text, ...props }) => {
  const copyText = (_: React.MouseEvent) => {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  return (
    <a className="button is-white is-small m-1"
      style={{ padding: '0', height: '20px' }}
      onClick={copyText}
      {...props}>
      <span className="px-1">{text} </span>
      <i className="fas fa-clipboard"></i>
    </a>
  )
};

export default CopiableLink;
