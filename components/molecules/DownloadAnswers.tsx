'use client';
// Modules
import { useTranslations } from 'next-intl';

// Components
import Button, { VARIANTS } from '@/components/atoms/Button';

// Helpers
import { downloadJson } from '@/helpers/downloadJson';

// Lib
import { getAllAnswers } from '@/store/answerStorage';
import { getIdentity } from '@/store/identityStorage';

function DownloadAnswers() {
  const t = useTranslations('Result');

  const onDownload = () => {
    downloadJson({
      identity: getIdentity(),
      answers: getAllAnswers(),
    }, 'answers.json');
  };

  return (
    <div>
      <p className="mb-4 font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">
        {t('download.caption')}
      </p>
      <p>
        <Button
          type="submit"
          variant={VARIANTS.default}
          onClick={onDownload}
        >
          {t('download.button')}
        </Button>
      </p>
    </div>
  );
}

export default DownloadAnswers;
