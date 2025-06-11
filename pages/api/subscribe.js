// pages/api/subscribe.js
import db from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await db;

  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already subscribed' });
    }

    const user = await User.create({ email, subscribed: true });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
