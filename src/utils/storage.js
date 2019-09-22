import { LOCALSTORAGE } from '@/utils/constants';

export default ({

  // User

  setSongs: (songs) => {
    localStorage.setItem(LOCALSTORAGE.songs, JSON.stringify(songs));
  },
});
