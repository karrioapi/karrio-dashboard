import React, { useState, useRef, useReducer, useContext } from 'react';


interface DropdownComponent { }


const Dropdown: React.FC<DropdownComponent> = ({ children, ...props }) => {
  const [isActive, setIsActive] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const menuWrapper = useRef<HTMLDivElement>(null);
  const triggerWrapper = useRef<HTMLDivElement>(null);
  const [trigger, ...content] = React.Children.toArray(children);

  const handleOnClick = (e: React.MouseEvent) => {
    setIsActive(!isActive);
    if (!isActive) document.addEventListener('click', onBodyClick);
    else document.removeEventListener('click', onBodyClick);
    e.stopPropagation();
  };
  const onBodyClick = (e: MouseEvent) => {
    if (!triggerWrapper.current?.contains(e.target as Node) && !menuWrapper.current?.contains(e.target as Node)) {
      setIsActive(false);
      document.removeEventListener('click', onBodyClick);
    }
  };
  wrapper.current?.addEventListener('close-dropdown', (_: Event) => {
    setIsActive(false);
  });

  return (
    <div className={`dropdown is-right ${isActive ? "is-active" : ""}`} {...props} ref={wrapper}>

      <div className="dropdown-trigger" onClick={handleOnClick} ref={triggerWrapper}>
        {React.cloneElement(trigger as any)}
      </div>

      <div className="dropdown-menu" role="menu" ref={menuWrapper}>
        {isActive && (content || []).map((child, index) => (
          React.cloneElement(child as any, { key: index })
        ))}
      </div>
    </div>
  );
};

export function closeDropdown(target: EventTarget) {
  target.dispatchEvent(
    new CustomEvent('close-dropdown', { bubbles: true })
  );
}

export default Dropdown;
