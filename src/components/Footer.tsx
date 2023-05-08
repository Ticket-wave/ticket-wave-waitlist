import Image from "next/image";
import { FormEvent, FunctionComponent, ReactElement, useContext, useState } from "react";
import images from "../../public/images";
import styles from '../styles/footer.module.scss';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "./SVGs/SVGicons";
import { useSubscribeToWaitlist } from "@/pages/api/apiClient";
import { ToastContext } from "@/extensions/toast";
import { emailRegex } from "./constants/emailRegex";
import Link from "next/link";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = (): ReactElement => {


    const subscribeToWaitlist = useSubscribeToWaitlist();

    const toastHandler = useContext(ToastContext);

    const [email, setEmail] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState(false);
    const [loading, setLoading] = useState(false);


    function validateEmail(email?: string): boolean {
        if (!email) {
            return false;
        }
        return emailRegex.test(email);
    };


    /**
     * Function to subscribe to waitlist
     */
    async function handleSubscribeToWaitlist(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        setLoading(true);

        if (validateEmail(email)) {
            // If email is valid and passes regex test 
            setEmailErrorMsg(false);
        } else {
            toastHandler?.logWarning('Unable to process request', 'Please input a valid email address');
            setLoading(false);
            setEmailErrorMsg(true);
            return;
        }

        await subscribeToWaitlist({ email })
            .then((response) => {

                console.log('response:', response);

                if (response.status == 201) {
                    toastHandler?.logSuccess('Success', `You have successfully subscribed to our waitlist with email: ${email}`);
                } else {
                    console.error('Error: ', response);

                    toastHandler?.logError('Error', 'Error subscribing to waitlist. Please try again.');
                }
            })
            .catch((error) => {

                console.error('Throw Error: ', error);

                toastHandler?.logError('Error', 'Error subscribing to waitlist. Please try again.');

                //halt loader
                setLoading(false);
            })
            .finally(() => {
                setLoading(false); // stop loading button animation after either resolve or reject
            })
    };

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
                    <Link href='https://www.facebook.com/ticketwave0' target="_blank">
                        <span><FacebookIcon /></span>
                    </Link>
                    <Link href='https://twitter.com/theticketwave?t=iEC9AjmBaJxk7go7TEXgXQ&s=09' target="_blank">
                        <span><TwitterIcon /></span>
                    </Link>
                    <Link href='https://www.instagram.com/theticketwave/' target="_blank">
                        <span><InstagramIcon /></span>
                    </Link>
                    <Link href='https://www.linkedin.com/company/theticketwave/?viewAsMember=true' target="_blank">
                        <span><LinkedInIcon /></span>
                    </Link>
                </div>
            </div>
            <div className={styles.rhs}>
                {/* <div className={`${styles.content} ${styles.content1}`}>
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
                </div> */}
                <div className={`${styles.content} ${styles.content3}`}>
                    <h4>Stay Connected With Us</h4>
                    <p className={styles.joinText}>Join our mailing list to stay in the loop with our newest update on Events and concerts</p>
                    <form className={styles.content__subscribeArea} onSubmit={handleSubscribeToWaitlist}>
                        <input type='text'
                            placeholder="Enter your email address"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                setEmailErrorMsg(false);
                            }} />
                        <button type='submit' disabled={loading ? true : false} style={loading ? { cursor: 'not-allowed' } : {}}>
                            {loading ? <div className="loader" /> : 'Subscribe Now'}
                        </button>
                    </form>
                    {emailErrorMsg && <span className={styles.errorMsg}>Please input your correct email</span>}
                    {/* <div className={styles.content__languageArea}>
                        <h5>Language </h5>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Footer;