// import { User } from 'firebase';
// ts doesn't see User in firebase, os I used workaround as a generic type

export function getUserShortName<T extends { displayName: string | null }>(
  user: T,
): string {
  if (!user?.displayName) {
    return 'U';
  }

  return user.displayName
    .split(' ')
    .map((part: string) => (part ? part[0] : ''))
    .join('')
    .toUpperCase();
}

export default {
  getUserShortName,
};
