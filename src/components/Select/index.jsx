import React from "react";
import { useOutsideDetecter } from "../../common/hooks/useOutsideDetecter";

import "./Select.scss";

function Select({
  options = [],
  setSelected,
  selected,
  name = "name",
  value = "value",
}) {
  const { visible, setVisible, ref } = useOutsideDetecter(false);

  return (
    <div className="dropdown" ref={ref}>
      <div
        className="dropdown__select"
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
