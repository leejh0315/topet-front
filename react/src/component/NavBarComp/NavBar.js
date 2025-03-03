import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../css/navBar.module.css";
import { TbCalendar, TbHome, TbUserCircle, TbMap } from "react-icons/tb";
import { Mobile, DeskTop } from "../../responsive/responsive";
import { useMediaQuery } from "react-responsive";
function NavBar() {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <nav className={styles.navbar}>
      {/* 홈 화면 이동 */}
      <NavLink
        to="/home"
        end
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbHome size={25} />
        <div>홈</div>
      </NavLink>
      {/* 캘린더 화면 이동 */}
      <NavLink
        to="/schedule"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbCalendar size={25} />
        <div>캘린더</div>
      </NavLink>
      {/* 지도 화면 이동 */}
      <NavLink
        to="/map"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbMap size={25} />
        <div>지도</div>
      </NavLink>
      {/* 마이페이지 화면 이동 */}
      <NavLink
        to="/mypage"
        className={({ isActive }) =>
          isActive ? styles.activeNavItem : styles.navItem
        }
      >
        <TbUserCircle size={25} />
        <div>마이페이지</div>
      </NavLink>
    </nav>
  );
}

export default NavBar;
