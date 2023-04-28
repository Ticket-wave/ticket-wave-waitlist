import Image from "next/image";
import { FunctionComponent, ReactElement } from "react";
import images from "../../public/images";
import styles from '../styles/footer.module.scss';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "./SVGs/SVGicons";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = (): ReactElement => {
    return (
        <div className={`${styles.footerContainer} ${styles.container}`}>
            <div className={styles.lhs}>
                <div className={styles.lhs__logoArea}>
                    <div className={styles.logoImage}>
                        <Image src={images.logo} alt="logo" />
                    </div>
                    <p className={styles.name}>Ticketwave</p>
                </div>
                <div className={styles.lhs__info}>
                    <p>Ticket wave is a global self-service ticketing platform for live experiences that allows anyone to create, share, find and attend events in schools that fuel their passions and enrich their lives.</p>
                </div>
                <div className={styles.lhs__socials}>
                    <span><FacebookIcon /></span>
                    <span><TwitterIcon /></span>
                    <span><InstagramIcon /></span>
                    <span><LinkedInIcon /></span>
                </div>
            </div>
            <div className={styles.rhs}>
                <div className={`${styles.content} ${styles.content1}`}>
                    <h4>Plan Events</h4>
                    <div className={styles.content__links}>
                        <li>Create and Set Up</li>
                        <li>Sell Tickets</li>
                        <li>Online RSVP</li>
                        <li>Online Events</li>
                    </div>
                </div>
                <div className={`${styles.content} ${styles.content2}`}>
                    <h4>Ticketwave</h4>
                    <div className={styles.content__links}>
                        <li>About Us</li>
                        <li>Press</li>
                        <li>Contact Us</li>
                        <li>Help Center</li>
                        <li>How It Works</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                    </div>
                </div>
                <div className={`${styles.content} ${styles.content3}`}>
                    <h4>Stay Connected With Us</h4>
                    <p className={styles.joinText}>Join our mailing list to stay in the loop with our newest update on Events and concerts</p>
                    <div className={styles.content__subscribeArea}>
                        <input type='text' placeholder="Enter your email address" />
                        <button>Subscribe Now</button>
                    </div>
                    {/* <div className={styles.content__languageArea}>
                        <h5>Language </h5>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Footer;