import axios from 'axios';

import { API_URL } from '@/utils/constants';

export default ({

  // Test

  getTest: () =>
    axios.get(`${API_URL}/test`),
});
