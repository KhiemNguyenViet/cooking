import React from 'react';
import { Helmet } from 'react-helmet';
import API_URL from '../config';

function SEO({ title, description, image, url, children }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {image && <meta property="og:image" content={image.startsWith('http') ? image : `${API_URL}${image}`} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image.startsWith('http') ? image : `${API_URL}${image}`} />}
      {children}
    </Helmet>
  );
}

export default SEO;
