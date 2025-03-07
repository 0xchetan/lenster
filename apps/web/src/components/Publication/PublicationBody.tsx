import Attachments from '@components/Shared/Attachments';
import IFramely from '@components/Shared/IFramely';
import Markup from '@components/Shared/Markup';
import type { LensterPublication } from '@generated/types';
import { EyeIcon } from '@heroicons/react/outline';
import getURLs from '@lib/getURLs';
import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import DecryptedPublicationBody from './DecryptedPublicationBody';

interface Props {
  publication: LensterPublication;
}

const PublicationBody: FC<Props> = ({ publication }) => {
  const { pathname } = useRouter();
  const showMore = publication?.metadata?.content?.length > 450 && pathname !== '/posts/[id]';

  if (publication?.metadata?.encryptionParams) {
    return <DecryptedPublicationBody encryptedPublication={publication} />;
  }

  return (
    <div className="break-words">
      <Markup
        className={clsx(
          { 'line-clamp-5': showMore },
          'whitespace-pre-wrap break-words leading-md linkify text-md'
        )}
      >
        {publication?.metadata?.content}
      </Markup>
      {showMore && (
        <div className="mt-4 text-sm lt-text-gray-500 font-bold flex items-center space-x-1">
          <EyeIcon className="h-4 w-4" />
          <Link href={`/posts/${publication?.id}`}>
            <Trans>Show more</Trans>
          </Link>
        </div>
      )}
      {publication?.metadata?.media?.length > 0 ? (
        <Attachments attachments={publication?.metadata?.media} publication={publication} />
      ) : (
        publication?.metadata?.content &&
        getURLs(publication?.metadata?.content)?.length > 0 && (
          <IFramely url={getURLs(publication?.metadata?.content)[0]} />
        )
      )}
    </div>
  );
};

export default PublicationBody;
