// Modules
import { useTranslations } from 'next-intl';

// Icons
import { ImSpinner2 } from 'react-icons/im';

// Constants
import { STATES } from '@/constants/connection';

type State = typeof STATES[keyof typeof STATES];

const getStateComponent = (state: State, silent: boolean = false) => {
  if (!silent && state === STATES.LOADING) {
    return (
      <span className="flex mr-2">
        <ImSpinner2 className="animate-spin h-4 w-4" />
      </span>
    );
  }

  if (state === STATES.ONLINE) {
    return (
      <span className="flex relative h-2 w-2 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
      </span>
    );
  }

  if (state === STATES.ERROR) {
    return (
      <span className="flex h-2 w-2 mr-2">
        <span className="rounded-full h-2 w-2 bg-amber-500 dark:bg-amber-400" />
      </span>
    );
  }

  return (
    <span className="flex h-2 w-2 mr-2">
      <span className="rounded-full h-2 w-2 bg-gray-500" />
    </span>
  );
};

const getStateText = (t: (t: string) => string, state: State) => {
  if (state === STATES.LOADING) {
    return t('loading');
  }

  return '';
};

function Flasher(props: { silent?: boolean, state: State }) {
  const { silent = false, state } = props;
  const t = useTranslations('Common');
  const component = getStateComponent(state, silent);
  const text = silent ? '' : getStateText(t, state);

  return (
    <div className="flex items-center h-full">
      {component}
      <span>{text}</span>
      {/* <span>Ariana Tyler</span> */}
    </div>
  );
}

export default Flasher;
