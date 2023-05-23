import { FunctionComponent, ReactElement } from "react";
import styles from '../styles/unsubscribe.module.scss';
import Image from "next/image";
import images from "../../public/images";
import { motion } from 'framer-motion';

interface UnsubscribeProps {

}

const Unsubscribe: FunctionComponent<UnsubscribeProps> = (): ReactElement => {
    return (
        <div className={styles.unsubscribe}>
            <motion.div className={styles.unsubscribe__image}
                initial={{ opacity: 0, scale: 0.6, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeIn' }}>
                <Image src={images.unsubscribe} alt="sad looking emoji" />
            </motion.div>
            <motion.div className={styles.unsubscribe__textArea}
                initial={{ opacity: 0, scale: 1, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeIn' }}>
                <p>Oh no! We&apos;re sad to see you go! You&apos;ve successfully unsubscribed from our ticket sales website. We&apos;ll miss sharing exciting events, hot deals, and backstage secrets with you.</p>

                <p>But hey, if you ever change your mind and decide you can&apos;t resist the allure of tickets and epic experiences, we&apos;ll be here, ready to welcome you back with open arms. Just come on over to our website and resubscribe to join the party again!</p>

                <p>We&apos;d love to hear why you unsubscribed. Was it something we said? Or did a magical unicorn steal your interest? Feel free to share your thoughts with us. We&apos;re always looking to improve and make your ticket-buying journey more extraordinary.</p>

                <p>Thank you for being part of our ticket-loving community. Remember, the stage is always set for your triumphant return!</p>
            </motion.div>
            <p className={styles.bottom}>
                Farewell for now, <br />
                The Ticket Sales Team
            </p>
        </div>
    );
}

export default Unsubscribe;