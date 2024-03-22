import type { TYPES as MESSAGE_TYPES } from '@/constants/message';

declare global {
  type Message = (Messages.Complete | Messages.Info | Messages.Init | Messages.Login | Messages.Open | Messages.Progress);

  namespace Messages {
    interface Init {
      peerId: string;
      type: typeof MESSAGE_TYPES.init;

      data: {
        agent: string,
        locale: string,
        theme: 'auto' | 'dark' | 'light',
      };
    }

    interface Login {
      peerId: string;
      type: typeof MESSAGE_TYPES.login;

      data: {
        identity: {
          email: string;
          group?: string;
          name?: string;
        },
        slugs: string[];
      };
    }

    interface Open {
      peerId: string;
      type: typeof MESSAGE_TYPES.open;

      data: {
        page: string;
      };
    }

    interface Progress {
      peerId: string;
      type: typeof MESSAGE_TYPES.progress;

      data: {
        answer: object;
        page: string;
        progress: number;
        total: number;
      };
    }

    interface Complete {
      peerId: string;
      type: typeof MESSAGE_TYPES.progress;

      data: {
        result: object;
      };
    }

    interface Info {
      peerId: string;
      type: typeof MESSAGE_TYPES.info;

      data: {
        text: string;
      };
    }
  }
}
