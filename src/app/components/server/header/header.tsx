import styles from './header.module.css';
import {ThemeToggle} from "@/app/components/server/header/theme/themeSwicher";
import Link from "next/link";
import {Routes} from "@/app/routes";
import {MenuMobile} from "@/app/components/server/header/MenuMobile";
import {Menu} from "@/app/components/server/header/Menu";

export const Header = () => {
    return (
        <header className={styles.headerContainer} id={"header"}>
            <div className={styles.header}>
                <Menu/>
                <div className={styles.toggleMenu}>
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    )
}

export const HeaderForBlockLetter = () => {
    return (
        <header className={styles.headerContainer} id={"header"}>
            <div className={styles.header}>
                <div className={styles.toggleMenu}>
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    )
}
