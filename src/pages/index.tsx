import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import images from '../../public/images'
import { CreateEventIcon, EasyManagementIcon, EfficientPaymentIcon, QuickTicketIcon, TrackIcon, UserFiendlyPlatformIcon } from '@/components/SVGs/SVGicons'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { useSubscribeToWaitlist } from './api/apiClient'
import { ToastContext } from '@/extensions/toast'
import { emailRegex } from '@/components/constants/emailRegex'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const subscribeToWaitlist = useSubscribeToWaitlist();

  const toastHandler = useContext(ToastContext);

  const whatweoffer = [
    {
      svg: <UserFiendlyPlatformIcon />,
      name: 'User Fiendly Platform',
      subtext: 'We prioritize a swift and data-efficient experience for our users, whether browsing on a mobile device or computer. Our platform emphasizes efficiency and ease of use, enabling users to access information quickly and with minimal data consumption.',
    },
    {
      svg: <QuickTicketIcon />,
      name: 'Quick Ticket Booking',
      subtext: 'Easily book tickets for your preferred events on our user-friendly platform. After selecting your event, complete your booking and registration quickly. Upon confirmation, you will receive a QR code ticket via email for entry.',
    },
    {
      svg: <CreateEventIcon />,
      name: 'Create/Post Events',
      subtext: 'Our platform enables you to quickly and freely create and publish events by entering the necessary information, including event details, date, time, location, and ticket categories, using an easy-to-use interface.',
    },
    {
      svg: <EfficientPaymentIcon />,
      name: 'Efficient payment',
      subtext: 'Easily manage and track sales and commissions in real-time with our platform. Detailed reports help monitor earnings and funds can be instantly transferred to verified bank accounts worldwide. Enjoy fast and secure payment processing.',
    },
    {
      svg: <EasyManagementIcon />,
      name: 'Easy Event Management',
      subtext: `Easily manage events from anywhere with our platform's user-friendly dashboard. Monitor ticket sales, view attendee lists, and export PDF reports effortlessly. Enjoy complete control and make informed decisions with real-time updates and changes.`,
    },
    {
      svg: <TrackIcon />,
      name: 'Track your performance',
      subtext: 'Our platform offers real-time reporting for tracking sales, commissions, and visitor behavior, providing valuable insights to optimize event promotion and sales strategies. Detailed reports on attendance rates, revenue, and ticket sales are easily accessible, ensuring successful events.',
    },
  ];

  const image = [
    {
      img: images.hero_bg_1,
    },
    {
      img: images.hero_bg_2,
    },
    {
      img: images.hero_bg_3,
    },
    {
      img: images.hero_bg_4,
    },
  ]

  const [heroSectionImgIndex, setHeroSectionImgIndex] = useState(0);
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

  // const uri: string = process.env.NEXT_PUBLIC_BE || 'http://localhost:8000'
  // const addToWaitList = async () => {
  //   try {
  //     setLoading(true)
  //     const sendreq = await fetch(uri + '/api/waitlist', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ "email": email })
  //     })
  //     const resp = await sendreq.json()
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //     setLoading(false)
  //   }
  // }


  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroSectionImgIndex((prevIndex) =>
        prevIndex === image.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [image.length]);

  return (
    <>
      <Head>
        <title>Waitlist | Ticket wave</title>
        <meta name="description" content="Don&apos;t let sold-out events keep you from having fun. Sign up for our ticket booking waitlist application and be the first to know when tickets become available for your favorite events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.homepageBody}>
        <div className={styles.heroSection}>
          <div className={styles.heroSection__image}>
            <Image src={image[heroSectionImgIndex].img} alt='Hero image' />
          </div>
          <h3>Tickets to unforgettable moment</h3>
          <p>&quot;Getting together to create unforgettable memories!&quot;</p>
          <form className={styles.searchArea} onSubmit={(e) => handleSubscribeToWaitlist(e)}>
            <input
              type='text'
              placeholder='Email Address'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                setEmailErrorMsg(false);
              }} />
            <button type='submit' disabled={loading ? true : false} style={loading ? { cursor: 'not-allowed' } : {}}>
              {loading ? <div className="loader" /> : 'Get Early Access'}
            </button>
          </form>
          {emailErrorMsg && <span className={styles.errorMsg}>Please input your correct email</span>}
        </div>

        <div className={styles.offersSection}>
          <h3>What we offer</h3>
          <div className={styles.offersSection__cards}>
            {
              whatweoffer.map((each, index) => (
                <div className={styles.eachService} key={index}>
                  <span>{each.svg}</span>
                  <h5>{each.name}</h5>
                  <p>{each.subtext}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className={styles.aboutSection}>
          <h3>About Us</h3>
          <p>Ticketwave is a cutting-edge, safe, and user-friendly event ticketing platform
            in Nigeria designed to provide each user with a distinct experience,
            whether as an event organizer or attendee. Our website enables event
            enthusiasts to effortlessly search for upcoming events in their area,
            such as musical festivals, concerts, conferences, virtual experiences,
            shows, and seminars.</p>
        </div>

        {/* <div className={styles.testimonialsSection}>
          <h3>Testimonials</h3>
          <p>Our Clients send us bunch of smilies with our services and we love them</p>
          <div className={styles.eachTestimonial}>
            <div className={styles.eachTestimonial__top}>
              <div className={styles.image}>
                <Image src={images.user} alt='user image' />
              </div>
              <p>Kemi Johnson</p>
            </div>
            <p>"I have been using this ticket website for years, and I can confidently
              say it's the best in the market. The customer support is fantastic, and
              the site is always up-to-date with the latest features. Thank you for
              making ticket selling so easy!"</p>
          </div>
        </div> */}

        {/* <div className={styles.joinSection}>
          <h4>Join thousands of Customers</h4>
          <p>Start your journey with us, by making your dream come true. </p>
          <div className={styles.searchArea}>
            <input type='text' placeholder='Email Address' />
            <button>Get Early Access</button>
          </div>
        </div> */}

        <div className={styles.getSoldSection}>
          <div className={styles.getSoldSection__lhs}>
            <h3>Get access to sold-out events and be part of the action!</h3>
            {/* <button className={styles.signUpBtn}>Sign Up</button> */}
          </div>
          <div className={styles.getSoldSection__rhs}>
            <div className={styles.image}>
              <Image src={images.logo_white} alt='logo' />
              <p>Ticketwave</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
