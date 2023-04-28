import Image from "next/image";
import React, { useState } from "react";
import { FunctionComponent, ReactElement } from "react";
import images from "../../public/images";
import styles from '../styles/navbar.module.scss';

interface NavbarProps {
    
}

const Navbar: FunctionComponent<NavbarProps> = ():ReactElement => {

    // manages the state of the icon and toggles it
    const [showNav, setShowNav] = useState(false);

    const HandleClick = () => {
        setShowNav(!showNav);
    }

    return ( 
        <nav className={`${styles.navbar} ${styles.container}`}>
            <div className={styles.navbar__logo}>
                <div className={styles.logoImage}>
                    <Image src={images.logo} alt='Logo' />
                </div>
                <p className={styles.name}>Ticketwave</p>
            </div>

            {/* burger menu */}
            <div className={styles.navbar__burgerMenu}>
                <Image src={images.burgerMenu} alt="" onClick={HandleClick}/>
            </div>

            <div className={styles.navbar__button}>
                <button>Get early access</button>
            </div>

            {/* the burger content */}

            {
                showNav && 
                <div className={styles.navbar__dropDown}>
                    <ul>
                        <li>Products</li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                    <button type="button">Join waitlist</button>
                </div>
            }
        </nav> 
    );
}
 
export default Navbar;