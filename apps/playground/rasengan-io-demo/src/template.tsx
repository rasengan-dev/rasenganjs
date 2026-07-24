import { type TemplateProps } from 'rasengan';

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rasengan IO Demo</title>
      </Head>
      <Body>
        <Script />
      </Body>
    </html>
  );
}
