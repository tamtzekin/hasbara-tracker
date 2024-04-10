import React from 'react';
import { Helmet } from 'react-helmet-async';

// This is set on each individual claim page
const PageMetadata = ({
    url,
    title,
    description,
    twitterTitle,
    twitterDescription,
    twitterUrl,
}) => {

    // Metadata that stays the same per page
    const type = "article";
    const siteName = "Hasbara Tracker";
    const image = "https://files.hasbaratracker.com/htlogo_twittercard.jpg";
    const twitterImageAlt = "In a pixellated font, the title reads: Hasbara Tracker - Debunking Israeli propaganda";
    const twitterCard = "summary_large_image";
    const twitterSite = "@hasbaratracker";
    const twitterCreator = "@hasbaratracker";
    const twitterImage = "https://files.hasbaratracker.com/htlogo_twittercard.jpg";
    const twitterDomain = "hasbaratracker.com";
    
    return (
        <Helmet>
            {/* OpenGraph metadata */}
            <meta name="url" property="og:url" content={url} />
            <meta name="type" property="og:type" content={type} />
            <meta name="site_name" property="og:site_name" content={siteName} />
            <title>Claim: ‘{title}’</title>
            <meta name="title" property="og:title" content='Claim: ‘{title}’' />
            <meta name="description" property="og:description" content={description} />
            <meta name="image" property="og:image" content={image} />
            
            <meta property="twitter:image:alt" content={twitterImageAlt} />

            {/* Twitter metadata */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:site" content={twitterSite} />
            <meta name="twitter:title" content={twitterTitle} />
            <meta name="twitter:creator" content={twitterCreator} />
            <meta name="twitter:description" content={twitterDescription} />
            <meta name="twitter:image" content={twitterImage} />
            <meta property="twitter:url" content={twitterUrl} />
            <meta property="twitter:domain" content={twitterDomain} />
        </Helmet>
    );
};

export default PageMetadata;
