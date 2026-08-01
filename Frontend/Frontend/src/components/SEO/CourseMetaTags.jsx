// components/SEO/CourseMetaTags.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_URL, APP_NAME } from '../../config/api';

const CourseMetaTags = ({ course }) => {
  if (!course) return null;

  const baseUrl = APP_URL;
  const title = course.metaTitle || course.title;
  const description = course.metaDescription || course.shortDescription || '';
  const image = course.thumbnail || '/default-og-image.jpg';
  const slug = course.slug || course._id;
  const url = `${baseUrl}/course/${slug}`;

  // Ensure image is absolute URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return `${baseUrl}/default-og-image.jpg`;
    if (imagePath.startsWith('http')) return imagePath;
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const fullImageUrl = getImageUrl(image);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={APP_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content={`@${APP_NAME.replace(/\s/g, '')}`} />
      <meta name="twitter:creator" content={`@${APP_NAME.replace(/\s/g, '')}`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content={`${course.category || 'course'}, ${course.level || 'online learning'}, online course, ${course.title}, ${course.instructor?.name || 'expert instructor'}`} />
      
      {/* Article Meta */}
      {course.createdAt && (
        <meta property="article:published_time" content={course.createdAt} />
      )}
      {course.updatedAt && (
        <meta property="article:modified_time" content={course.updatedAt} />
      )}
      <meta property="article:section" content={course.category || 'Education'} />
      <meta property="article:tag" content={course.category || 'course'} />
      
      {/* Language */}
      <meta property="og:locale" content="en_US" />
      <meta name="language" content="English" />

      {/* JSON-LD Structured Data for Course */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": title,
          "description": description,
          "provider": {
            "@type": "Organization",
            "name": APP_NAME,
            "sameAs": baseUrl
          },
          "image": fullImageUrl,
          "url": url,
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": course.liveOrRecorded === 'Live' ? "InPerson" : "Online",
            "courseWorkload": course.duration || "Self-paced",
            "instructor": course.instructor?.name || "Expert Instructor"
          },
          "offers": {
            "@type": "Offer",
            "price": course.discountedPrice || course.originalPrice || 0,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString()
          }
        })}
      </script>
    </Helmet>
  );
};

export default CourseMetaTags;