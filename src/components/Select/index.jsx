import React from "react";
import classnames from "classnames";

import { useOutsideDetecter } from "../../common/hooks/useOutsideDetecter";
import "./Select.scss";

function Select({
  options = [],
  setSelected,
  selected,
  name = "name",
  value = "value",
  disabled = false,
}) {
  const { visible, setVisible, ref } = useOutsideDetecter(false);

  return (
    <div className="dropdown" ref={ref}>
      <div
        className={classnames("dropdown__select", {
          dropdown__select_disabled: disabled,
        })}
        onClick={() => setVisible(!visible)}
        tabIndex="1"
        style={{ borderColor: visible && "#006ee6" }}
      >
        {selected?.[name]}
      </div>

      {visible && (
        <div className="dropdown__list">
          {options.map((attr) => (
            <div
              className="dropdown__listItem"
              onClick={() => {
                setSelected(attr);
                setVisible(false);
              }}
              key={attr[value]}
            >
              {attr.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
