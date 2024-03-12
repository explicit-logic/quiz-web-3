// Modules
import Image from 'next/image';

export type Props = {
  token: Tokens.Image;
};

export default function TokenImage(props: Props) {
  const { token } = props;
  const caption = token.text ?? token.title;

  return (
    <figure className="flex flex-wrap justify-center">
      <Image
        alt={caption}
        className="h-auto max-w-md object-contain rounded"
        height={0}
        priority
        sizes="100vw"
        src={token.href}
        style={{ width: '100%', height: 'auto' }}
        width={0}
      />
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 w-full">
        {caption}
      </figcaption>
    </figure>
  );
}
