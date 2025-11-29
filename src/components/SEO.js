import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description }) {
  const defaultTitle = 'Skill Swap Marketplace';
  const defaultDescription = 'Exchange skills and knowledge with others in your community.';

  return (
    <Helmet>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title ? `${title} | ${defaultTitle}` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

export default SEO;
