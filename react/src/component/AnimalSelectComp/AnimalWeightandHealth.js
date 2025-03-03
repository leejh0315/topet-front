import React, { useState, useEffect } from "react";
import styles from "../../css/animal_weightandhealth.module.css";
import { TbTriangleInvertedFilled } from "react-icons/tb";
/// responsive
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const InputPetHealth = ({ value, onChange, title, inputText }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.health_wrapper}>
      <div className={styles.subtitle}>{title}</div>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          value={value || ""}
          onChange={handleInputChange}
          placeholder={inputText}
        />
      </div>
    </div>
  );
};

const InputWeight = ({
  weight,
  setWeight,
  weightDontKnow,
  setWeightDontKnow,
  setNextPossible,
}) => {
  const [weightValue, setWeightValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("kg");
  const [dropdown, setDropdown] = useState(false);

  const handleWeightUnitChange = (unit) => {
    if (weightDontKnow == false) {
      setSelectedUnit(unit);
      setWeight(`${weightValue}${unit}`);
      setDropdown(false);
    }
  };

  const handleWeightInputChange = (e) => {
    let newValue = e.target.value;
  
    if (/^\d*\.?\d*$/.test(newValue) && newValue.length <= 7) {
      setWeightValue(newValue);
      setWeight(`${newValue}${selectedUnit}`);
      if (newValue) {
        setNextPossible(true);
      } else {
        setNextPossible(false);
      }
    }
  };

  const handleWeightBlur = () => {
    if (weightValue.endsWith('.')) {
      const newWeightNum = `${weightValue}0`; // .으로 끝나면 0을 붙임
      setWeightValue(newWeightNum);
      setWeight(`${newWeightNum}${selectedUnit}`);
    }
  };

  const handleWeightDontKnow = () => {
    setWeightDontKnow((prev) => !prev);
    if (!weightDontKnow) {
      setNextPossible(true);
      setWeight("");
      setWeightValue("");
    } else {
      setNextPossible(false);
    }
  };

  // useEffect(() => {
  //     const handleClickOutside = (event) => {
  //         if (!event.target.closest(`.${styles.custom_select}`)) {
  //             setDropdown(false);
  //         }
  //     };

  //     document.addEventListener('mousedown', handleClickOutside);

  //     return () => {
  //         document.removeEventListener('mousedown', handleClickOutside);
  //     };
  // }, []);

  return (
    <div className={styles.weight_wrapper}>
      <div className={styles.subtitle}>체중</div>
      <div className={styles.weight_input_wrapper}>
        <input
          className={styles.weight_input}
          id="petWeight"
          type="text"
          value={weightValue}
          onBlur={handleWeightBlur}
          onChange={handleWeightInputChange}
          placeholder={"체중을 알려주세요"}
          disabled={weightDontKnow}
        />
        <div
          className={`${styles.custom_select} ${styles.unit_select} ${
            weightDontKnow ? styles.disabled : ""
          }`}
          onClick={(e) => {
            setDropdown((prev) => !prev);
          }}
        >
          <div className={styles.selected_option}>
            {selectedUnit}
            <TbTriangleInvertedFilled className={styles.dropdown_icon} />
          </div>
          {!weightDontKnow && dropdown && (
            <div className={styles.options}>
              <div
                className={styles.option}
                onClick={(e) => {
                  handleWeightUnitChange("kg");
                  e.stopPropagation();
                }}
              >
                kg
              </div>
              <div
                className={styles.option}
                onClick={(e) => {
                  handleWeightUnitChange("g");
                  e.stopPropagation();
                }}
              >
                g
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.dontknowweight_wrapper}>
        <span className={styles.dontknowweight_text}>체중을 몰라요</span>
        <input
          className={styles.dontknowweight_checkbox}
          type="checkbox"
          checked={weightDontKnow}
          onChange={handleWeightDontKnow}
        />
      </div>
    </div>
  );
};

const AnimalWeightandHealth = ({
  allergy,
  health,
  handleAllergyChange,
  handleHealthChange,
  setWeight,
  weightDontKnow,
  setWeightDontKnow,
  setNextPossible,
}) => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  if (weightDontKnow) {
    setNextPossible(true);
  }

  return (
    <div className={`${styles.wrapper} ${isDeskTop && styles.dtver}`}>
      <h2 className={styles.title}>반려동물의 건강상태를 알려주세요</h2>
      <div className={styles.container}>
        <InputWeight
          setWeight={setWeight}
          weightDontKnow={weightDontKnow}
          setWeightDontKnow={setWeightDontKnow}
          setNextPossible={setNextPossible}
        />
        <InputPetHealth
          title={"알레르기(선택)"}
          value={allergy}
          onChange={handleAllergyChange}
          inputText={"알레르기가 있는 음식을 알려주세요"}
        />
        <InputPetHealth
          title={"건강상태(선택)"}
          value={health}
          onChange={handleHealthChange}
          inputText={"과거나 현재의 병력을 알려주세요"}
        />
      </div>
    </div>
  );
};

export default AnimalWeightandHealth;
