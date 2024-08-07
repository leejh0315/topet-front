import React from "react";
import { GoArrowLeft, GoHome, GoChevronDown } from "react-icons/go";
import { IoSearch, IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "../css/topbar.module.css";
import { ReactComponent as Logo } from "../asset/icon/TopetLogo.svg";

const TopBar = ({
  centerChange,
  selectedSearchType,
  searchText,
  setSearchText,
  handleBottomSheetOpen,
  isHome,
  isSearchMode,
  toggleSearchMode,
  onSearch,
  resetSearch
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (isSearchMode) {
      resetSearch(); // searchText 초기화 및 searchMode false 설정
    } else {
      navigate(-1); // 뒤로가기
    }
  };

  const goHome = () => {
    navigate("/home"); // 홈으로 이동
  };

  const handleAnimalSelectClick = () => {
    handleBottomSheetOpen(centerChange);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value); // 입력값을 상태로 업데이트
  };

  const renderTopBar = () => {
    if (isSearchMode) {
      return (
        <div className={styles.topbar}>
          <GoArrowLeft className={styles.icon} onClick={goBack} />
          <div className={styles.searchContainer}>
            <input
              className={styles.searchInput}
              placeholder="검색어를 입력하세요"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <button
              className={styles.dropdownButton}
              onClick={() => handleBottomSheetOpen("검색")}
            >
              {selectedSearchType}
              <IoMdArrowDropdown />
            </button>
          </div>
          <button className={styles.searchButton} onClick={onSearch}>검색</button>
        </div>
      );
    } else {
      switch (centerChange) {
        case "강아지":
        case "고양이":
        case "특수동물":
          return (
            <div className={styles.topbar}>
              <GoArrowLeft className={styles.icon} onClick={goBack} />
              <div
                className={styles.animalSelectBox}
                onClick={handleAnimalSelectClick}
              >
                {centerChange}
                <GoChevronDown className="arrow-bottom" />
              </div>
              <CiSearch className={styles.icon} onClick={toggleSearchMode} />
            </div>
          );
        case "로고":
        case "쇼츠":
          return (
            <div className={styles.topbar}>
              <GoArrowLeft className={styles.icon} onClick={goBack} />
              <div>
                <input
                  placeholder="쇼츠를 검색해보세요"
                  className={styles.searchInput}
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
                <IoSearch color="#333" />
              </div>
              <GoHome className={styles.icon} onClick={goHome} />
            </div>
          );
        default:
          return (
            <div
              className={`${styles.topbar} ${isHome ? styles.homeComp : ""}`}
            >
              <GoArrowLeft
                className={`${styles.icon} ${isHome ? styles.hidden : ""}`}
                onClick={goBack}
              />
              <Logo width={37} height={37} />
              <GoHome
                className={`${styles.icon} ${isHome ? styles.hidden : ""}`}
                onClick={goHome}
              />
            </div>
          );
      }
    }
  };

  return renderTopBar();
};

export default TopBar;
