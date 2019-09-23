import { SESSION_STORAGE } from '@/utils/constants';

export default ({

  // User

  setSongs: (songs) => {
    sessionStorage.setItem(SESSION_STORAGE.songs, JSON.stringify(songs));
  },
});
