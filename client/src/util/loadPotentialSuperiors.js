import axios from 'axios';

export default async rank => {
  try {
    const res = await axios.get(`/api/user/rank/${rank}`);
    return res.data.map(user => ({
      id: user._id,
      name: user.name,
      rank: user.rank,
    }));
  } catch (error) {
    console.error(error);
  }
};
