import { getLegacyHomeMarkup } from '../lib/legacy-page';

export default function HomePage() {
  const markup = getLegacyHomeMarkup();

  return <div id="legacy-root" dangerouslySetInnerHTML={{ __html: markup }} />;
}
