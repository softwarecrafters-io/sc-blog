'use client';
import {Routes} from "@/app/routes";
import Link from "next/link";
import styles from "@/app/components/server/header/header.module.css";
import {MenuMobile} from "@/app/components/server/header/MenuMobile";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const Menu = () => {
    const [activeLink, setActiveLink] = useState("");

    const links: Record<string, string> = {
        'About':  Routes.about,
        'Opiniones':  Routes.opinions,
        'Blog': Routes.blog,
        'Libro': 'https://cleanjavascript.es',
        'Acceso': 'https://academy.softwarecrafters.io/',
    }

    useEffect(() => {
        if (typeof window != null) {
            setActiveLink(window.location.pathname);
            console.log(window.location.pathname)
        }
    }, []);

    const renderedLinks = Object.keys(links).map((key) => {
        const href = links[key];
        const isActive = activeLink === href;

        return (
            <Link
                key={key}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                target={href.startsWith('http') ? '_blank' : '_self'}
                href={href}>
                {key}
            </Link>
        );
    });


    return <div className={styles.mainMenu}>
        <Logo/>
        <div className={styles.nav}>
            {renderedLinks}
        </div>
        <div className={styles.navMobileContainer}>
            <MenuMobile links={links}/>
        </div>
    </div>
}

const Logo = () => {
    return <Link href={Routes.home} aria-label="Software Crafters - Logo">
        <div className={styles.logo}>
            {logoSvg}
        </div>
    </Link>
}


const logoSvg = <svg
    className={styles.containerLogoSvg}
    height="44"
    viewBox="0 0 85 25.585621"
    version="1.1"
    id="svg1930"
    xmlns="http://www.w3.org/2000/svg">
    <defs id="defs1927" />
    <g id="layer1" transform="translate(-10.223957,-154.71156)">
        <path className={styles.logoSvg}
              d="m 26.896448,177.10532 5.527504,-3.19193 v -1.87336 -1.87336 l -0.364285,0.21123 -0.364286,0.21124 -5.014286,2.89083 -5.014286,2.89083 -0.172301,0.10887 -0.172301,0.10888 -0.70865,-0.40518 -0.708651,-0.40517 -0.03913,-0.0391 -0.03913,-0.0391 6.298656,-3.6367 6.298654,-3.63671 v -1.87012 -1.87013 l -0.352902,0.19834 -0.352902,0.19834 -9.125103,5.27143 -9.125102,5.27143 -0.01485,0.0817 -0.01485,0.0817 3.900001,2.25295 3.9,2.25295 0.06535,0.001 0.06535,0.001 5.527505,-3.19193 z m -4.752983,-8.2295 10.279126,-5.93572 6.81e-4,-0.94392 6.8e-4,-0.94393 -3.074114,-1.77574 -3.074114,-1.77574 -0.131602,-0.0505 -0.131601,-0.0505 -5.815714,3.35963 -5.815712,3.35963 -0.492858,0.28642 -0.492857,0.28641 0.0018,-0.87588 0.0018,-0.87588 5.498567,-3.17143 5.498566,-3.17142 0.02483,-0.0857 0.02483,-0.0857 -1.508891,-0.85715 -1.508892,-0.85714 -0.13773,0.005 -0.137732,0.005 -5.464286,3.15581 -5.464285,3.15582 v 4.62465 4.62465 l 0.278571,-0.16922 0.278571,-0.16922 6.942858,-4.00543 6.942857,-4.00543 0.695873,-0.40668 0.695871,-0.40668 0.74367,0.43051 0.74367,0.43051 -0.06811,0.0583 -0.06811,0.0583 -8.592858,4.95619 -8.592857,4.95619 v 0.96114 0.96114 l 0.75,0.43732 0.75,0.43731 0.07019,0.002 0.07019,0.002 z m 29.120497,4.2482 0.02572,-0.44465 -1.583077,-0.0268 -1.583078,-0.0268 -0.07122,-0.0714 -0.07122,-0.0714 -0.02981,-0.71145 -0.02981,-0.71145 0.09608,-0.17953 0.09608,-0.17953 1.5623,-0.0234 1.562301,-0.0233 v -0.42857 -0.42857 l -1.611598,-0.0233 -1.611597,-0.0233 -0.297233,0.14105 -0.297234,0.14105 -0.186965,0.26256 -0.186964,0.26257 -0.03594,0.75163 -0.03594,0.75164 0.05895,0.39313 0.05895,0.39314 0.260058,0.29619 0.260058,0.29618 0.269862,0.0791 0.269862,0.0791 1.542858,-0.0147 1.542857,-0.0147 z m 1.217134,-0.96963 v -1.45714 h 1.40851 1.408509 l 0.05441,0.17142 0.05441,0.17143 -0.05441,0.17143 -0.05441,0.17143 h -1.194224 -1.194223 l 6.85e-4,0.0643 6.86e-4,0.0643 0.945073,1.05 0.945073,1.05 h 0.597058 0.597058 v -0.0528 -0.0528 l -0.523112,-0.59004 -0.523114,-0.59004 h 0.270227 0.270227 l 0.251435,-0.13003 0.251436,-0.13002 0.147059,-0.27712 0.14706,-0.27712 0.003,-0.47181 0.003,-0.4718 -0.189325,-0.30634 -0.189323,-0.30633 -0.220423,-0.10043 -0.22035,-0.10043 h -1.967395 -1.967396 v 1.92857 1.92857 h 0.471428 0.471429 z m 5.076499,0.0214 0.0235,-1.43572 h 1.371429 1.371429 l 0.02636,0.36429 0.02636,0.36428 H 59.214601 58.05253 v 0.47143 0.47143 h 1.157143 1.157143 v 0.6 0.6 h 0.478236 0.478236 l -0.02824,-1.56428 -0.02824,-1.56429 -0.162729,-0.2401 -0.162728,-0.24009 -0.240158,-0.12419 -0.240158,-0.12419 h -1.508513 -1.508513 l -0.240158,0.12419 -0.240158,0.12419 -0.162728,0.24009 -0.162729,0.2401 -0.02824,1.56429 -0.02824,1.56428 h 0.476164 0.476163 z m 4.952073,0.70714 v -0.72857 h 1.5 1.5 v -0.47143 -0.47143 h -1.5 -1.5 v -0.25714 -0.25714 h 1.585714 1.585715 v -0.47143 -0.47143 h -2.057143 -2.057143 v 1.92857 1.92857 h 0.471428 0.471429 z m 5.89493,-0.75 0.0235,-1.43571 h 0.812213 0.812213 v -0.47143 -0.47143 H 67.909667 65.76681 v 0.47143 0.47143 h 0.857143 0.857143 v 1.46162 1.46162 l 0.45,-0.0259 0.45,-0.0259 z m 6.019356,1.00714 v -0.47143 H 72.881097 71.33824 v -0.25714 -0.25714 h 1.457143 1.457142 v -0.47143 -0.47143 H 72.795383 71.33824 v -0.25714 -0.25714 h 1.542857 1.542857 v -0.47143 -0.47143 h -2.014286 -2.014286 v 1.92857 1.92857 h 2.014286 2.014286 z m 1.285714,-0.98571 v -1.45714 h 1.40851 1.408509 l 0.05441,0.17142 0.05441,0.17143 -0.05441,0.17143 -0.05441,0.17143 H 77.332464 76.13824 l 6.86e-4,0.0643 6.85e-4,0.0643 0.945073,1.05 0.945073,1.05 h 0.597058 0.597059 v -0.0528 -0.0528 l -0.523113,-0.59004 -0.523113,-0.59004 h 0.270227 0.270226 l 0.251435,-0.13003 0.251436,-0.13002 0.147059,-0.27712 0.14706,-0.27712 0.0019,-0.47143 0.0019,-0.47143 -0.159126,-0.26695 -0.159127,-0.26695 -0.237321,-0.14019 -0.237247,-0.14019 h -1.979632 -1.979633 v 1.92857 1.92857 h 0.471429 0.471428 z m 7.968461,1.34516 0.297032,-0.1023 0.195825,-0.29125 0.195826,-0.29125 v -0.4241 -0.4241 l -0.138557,-0.23455 -0.138555,-0.23456 -0.182873,-0.12153 -0.182873,-0.12152 -1.457142,-0.0429 -1.457143,-0.0429 v -0.21428 -0.21429 l 1.692857,-0.0232 1.692857,-0.0232 v -0.46961 -0.46962 h -1.761399 -1.7614 l -0.240158,0.12419 -0.240157,0.12419 -0.135066,0.20613 -0.135065,0.20614 -0.05758,0.30694 -0.05758,0.30695 0.09619,0.29145 0.09619,0.29145 0.260554,0.24985 0.260554,0.24985 1.456894,0.0271 1.456892,0.0271 -0.02657,0.23001 -0.02657,0.23001 -1.692857,0.0232 -1.692857,0.0232 v 0.41247 0.41248 l 0.05714,0.0571 0.05714,0.0571 1.635715,-0.005 1.635714,-0.005 0.297032,-0.1023 z m -37.53989,-1.85945 v -0.42857 h -4.928572 -4.928572 v 0.42857 0.42857 h 4.928572 4.928572 z m 49.285716,0 v -0.42857 h -4.928572 -4.928571 v 0.42857 0.42857 h 4.928571 4.928572 z m -53.396683,-4.63026 0.339347,-0.17312 0.232383,-0.35116 0.232385,-0.35115 0.0343,-0.53868 0.0343,-0.53867 -0.102525,-0.31066 -0.102526,-0.31065 -0.217129,-0.25805 -0.21713,-0.25804 -0.268362,-0.14692 -0.268361,-0.14692 -2.142857,-0.0429 -2.142858,-0.0429 v -0.34285 -0.34286 l 2.592858,-0.0227 2.592857,-0.0227 v -0.72732 -0.72731 l -2.507143,0.002 -2.507143,0.002 -0.336224,0.078 -0.336223,0.078 -0.22092,0.16357 -0.220919,0.16357 -0.19304,0.28364 -0.193038,0.28363 -0.0967,0.35134 -0.0967,0.35134 0.09601,0.46745 0.09601,0.46745 0.245668,0.30398 0.245667,0.30398 0.290912,0.17143 0.290912,0.17143 2.121159,0.0268 2.121159,0.0269 0.05575,0.22213 0.05575,0.22212 -0.08621,0.13673 -0.08621,0.13673 -2.540698,0.0227 -2.5407,0.0227 v 0.68444 0.68444 h 2.703415 2.703415 l 0.339347,-0.17312 z m 7.631523,-0.0529 0.415182,-0.22597 0.239274,-0.34527 0.239274,-0.34528 v -1.73566 -1.73565 l -0.257928,-0.36699 -0.257927,-0.36699 -0.425168,-0.21896 -0.425169,-0.21897 -1.90497,-0.0285 -1.90497,-0.0285 -0.465225,0.0966 -0.465223,0.0966 -0.365496,0.31285 -0.365496,0.31285 -0.157903,0.34764 -0.157904,0.34764 -0.0014,1.37143 -0.0014,1.37143 0.08991,0.32377 0.08991,0.32377 0.27316,0.31111 0.273161,0.31111 0.343592,0.15609 0.343593,0.1561 2.216971,0.002 2.216972,0.002 0.415184,-0.22597 z m -4.656271,-1.23804 -0.15,-0.0874 v -1.30716 -1.30717 l 0.102857,-0.10286 0.102858,-0.10286 h 1.948163 1.948163 l 0.134694,0.1347 0.134694,0.13469 v 1.1748 1.17481 l -0.133431,0.1905 -0.133433,0.1905 -1.902282,-0.003 -1.902283,-0.003 z m 7.478572,0.39258 v -1.07143 h 2.271429 2.271428 v -0.72857 -0.72857 h -2.271428 -2.271429 v -0.38438 -0.38438 l 2.421429,-0.0228 2.421428,-0.0228 v -0.68571 -0.68571 l -3.107143,-0.0225 -3.107143,-0.0225 v 2.91536 2.91535 h 0.685715 0.685714 z m 9,-1.11428 v -2.18572 h 1.285715 1.285714 v -0.72959 -0.72959 l -3.278571,0.0224 -3.278572,0.0225 -0.0249,0.70714 -0.0249,0.70714 h 1.332038 1.332038 v 2.18572 2.18571 h 0.685714 0.685714 z m 6.85181,0.55714 0.568914,-1.58572 0.06886,-0.17142 0.06886,-0.17143 0.149769,0.38571 0.14977,0.38572 0.495403,1.39285 0.495403,1.39286 h 0.632748 0.632748 v -0.0292 -0.0292 l 1.028571,-2.85239 1.028571,-2.8524 v -0.0361 -0.0361 l -0.75,0.0248 -0.75,0.0248 -0.596312,1.66493 -0.596314,1.66493 -0.102793,-0.25065 -0.102793,-0.25064 -0.500894,-1.43535 -0.500894,-1.43534 -0.731666,-3.7e-4 -0.731668,-3.7e-4 -0.495628,1.43571 -0.495628,1.43572 -0.101775,0.24284 -0.101775,0.24285 -0.591024,-1.67856 -0.591025,-1.67856 h -0.71562 -0.715619 l -0.0021,0.10714 -0.0021,0.10714 1.007676,2.8104 1.007675,2.81039 0.635888,-0.0247 0.635888,-0.0247 0.568914,-1.58571 z m 6.968148,-0.53572 0.0229,-2.16428 2.051104,-0.023 2.051102,-0.023 0.06901,0.10873 0.06901,0.10873 0.0013,0.49285 0.0013,0.49286 h -1.757143 -1.757143 v 0.68572 0.68571 h 1.757143 1.757143 v 0.9 0.9 h 0.685714 0.685714 v -2.25795 -2.25794 l -0.199437,-0.37777 -0.199438,-0.37777 -0.364881,-0.25714 -0.36488,-0.25714 -2.167084,-0.0278 -2.167083,-0.0278 -0.374268,0.10078 -0.374268,0.10078 -0.355891,0.35589 -0.355892,0.35589 -0.0951,0.34258 -0.0951,0.34257 -5.14e-4,2.12143 -4.39e-4,2.12143 h 0.7271 0.7271 z m 7.608615,-0.0229 v -2.18718 l 2.164285,0.0229 2.164286,0.0229 0.07797,0.31558 0.07797,0.31558 -0.143122,0.21843 -0.14312,0.21843 -1.803425,0.0231 -1.803423,0.0231 1.432204,1.60715 1.432205,1.60714 h 0.976244 0.976246 l -0.832695,-0.92143 -0.832694,-0.92143 0.511199,-0.0429 0.511199,-0.0429 0.225909,-0.14824 0.225909,-0.14823 0.208155,-0.28034 0.208156,-0.28033 0.09755,-0.29137 0.09755,-0.29136 v -0.44337 -0.44337 l -0.131763,-0.3867 -0.131764,-0.38671 -0.318236,-0.30661 -0.318237,-0.30661 -0.342857,-0.0929 -0.342857,-0.0929 -2.85,-4.8e-4 -2.85,-4.7e-4 v 2.91428 2.91429 h 0.728571 0.728572 z m 12.514286,1.50148 v -0.68572 h -2.4 -2.4 v -0.38571 -0.38572 h 2.271428 2.271429 v -0.72857 -0.72857 h -2.271429 -2.271428 v -0.38571 -0.38572 h 2.4 2.4 v -0.72857 -0.72857 H 92.33824 89.252526 v 2.91428 2.91429 h 3.085714 3.085715 z"
        />
    </g>
</svg>
