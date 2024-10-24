import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function findMatches(userId, userSkills) {
  const matches = [];
  const usersRef = collection(firestore, 'users');

  for (const skill of userSkills) {
    const q = query(usersRef, where('skills', 'array-contains', skill));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      if (doc.id !== userId) {
        matches.push({
          userId: doc.id,
          userName: doc.data().name,
          matchedSkill: skill
        });
      }
    });
  }

  return matches;
}