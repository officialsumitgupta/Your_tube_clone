import User from '../Models/User.js';

export const addPoints = async (req, res) => {
  const { userId, videosWatched } = req.body;
  const pointsToAdd = videosWatched * 5;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points = (user.points || 0) + pointsToAdd;
    await user.save();

    res.status(200).json({ message: 'Points updated', points: user.points });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
