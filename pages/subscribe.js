import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Subscribe.module.css';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.status === 201) {
      setError('');
      setShowModal(true);
    } else if (res.status === 409) {
      setError('⚠️ This email is already subscribed.');
    } else {
      setError('❌ Something went wrong. Please try again.');
    }
  }

  function closeModal() {
    setShowModal(false);
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>📬 Subscribe to our updates</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className={styles.button}>Subscribe</button>
        </form>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 style={{ marginBottom: '10px', color:"black" }}>✅ Subscribed Successfully!</h3>
            <p style={{color:"black"}}>You’ll now receive updates to your email.</p>
            <button className={styles.okButton} onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
