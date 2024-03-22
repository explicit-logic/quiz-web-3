// Constants
import { TYPES } from '@/constants/message';

export function getInitData(): Messages.Init {
  return ({
    peerId: 'abb',
    type: TYPES.init,
    data: {
      agent: 'dd',
      locale: '',
      theme: 'dark',
    }
  });
}
