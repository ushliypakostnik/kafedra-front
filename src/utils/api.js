import axios from 'axios';

import { API_URL } from '@/utils/constants';

axios.defaults.withCredentials = true;

export default ({

  // Songs

  getSongs: () =>
    axios.get(`${API_URL}/api/songs`),

  // Test

  getTest: () =>
    axios.get(`${API_URL}/test`),
});
