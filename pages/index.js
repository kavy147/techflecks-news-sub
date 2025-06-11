import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/count')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(err => console.error('Failed to fetch subscriber count', err));
  }, []);

  function handleSubscribeClick() {
    router.push('/subscribe');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Subscriber App 📬</h1>
      <p className={styles.subheading}>Stay updated by subscribing with your email.</p>
      <button className={styles.button} onClick={handleSubscribeClick}>
        Subscribe Now
      </button>
      <p className={styles.count}>📈 Total Subscribers: {count}</p>
      <div className={styles.footer}>
        <p className={styles.ceoMessage}>
          “By subscribing, you're joining a community of forward-thinkers. We promise to send you only the most valuable updates — no spam, ever.”
        </p>
        <p className={styles.ceoName}>— Shani Shinojiya, CEO</p>
      </div>
    </div>
  );
}
