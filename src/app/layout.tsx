import type { Metadata } from 'next';

import '../styles/global.css';

export const metadata: Metadata = {
  title: 'Angel Canela — Full Stack Software Engineer',
  description:
    'Full Stack Software Engineer specializing in React, Next.js, TypeScript, and cloud-native architectures. Currently building at The LEGO Group.',
  openGraph: {
    title: 'Angel Canela — Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer specializing in React, Next.js, TypeScript and cloud-native architectures. Currently at The LEGO Group.',
    type: 'website',
    locale: 'en_GB',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@400&family=Space+Mono:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
