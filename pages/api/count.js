// pages/api/count.js
import db from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  await db;

  try {
    const count = await User.countDocuments({ subscribed: true });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subscriber count' });
  }
}
