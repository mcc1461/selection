//* IMPORTANT: You need to use {styles.container} as class name in the component to apply the styles
//* You may use module.css in order to escape from class name conflicts
//* By using module.css, you can use the same class name in different components without any conflicts
//* {styles["clear-btn"]} is used to access the class name with hyphen in it, otherwise it will throw an error
//* Because, you can't access the class name with hyphen in it directly. You need to use the square brackets to access it.

import React, { useEffect, useState } from "react";
import styles from "./Select.module.css";

export type SelectOption = {
  country: string;
  capital: string;
};

type MultipleSelectProps = {
  multiple: true;
  capital: SelectOption[];
  onChange: (capital: SelectOption[]) => void;
};
type SingleSelectProps = {
  multiple?: false; // single select
  capital?: SelectOption;
  onChange: (capital: SelectOption | undefined) => void;
};
type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

function Select({ multiple, capital, onChange, options }: SelectProps) {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (capital.includes(option)) {
        onChange(capital.filter((o) => o !== option));
      } else {
        onChange([...(capital || []), option]);
      }
    } else {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? capital.includes(option) : option === capital;
  }

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(null);
    }
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.capital}>
        {multiple
          ? capital.map((c) => (
              <div key={c.country} className={styles["multiple-option"]}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(c);
                  }}
                  className={styles["selected-option"]}
                >
                  {c.capital}
                </button>
                <span className={styles["remove-btn"]}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(c);
                }}
                >&times;</span>
              </div>
            ))
          : capital
          ? capital.capital
          : "Select an option"}
      </span>
      <button
        onClick={(e) => {
          clearOptions();
          e.stopPropagation();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.arrow}>▼</div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.country}
            className={`${styles.option} 
              ${isOptionSelected(option) ? styles.selected : ""} 
              ${highlightedIndex === index ? styles.highlighted : ""}`}
            onClick={(e) => {
              selectOption(option);
              e.stopPropagation();
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            onMouseLeave={() => setHighlightedIndex(null)}
          >
            {option.capital}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
