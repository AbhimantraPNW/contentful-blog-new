"use client"

import React from 'react';
import { FacebookShare } from 'react-share-kit';

type BlogPostProps = {
  title: string
  url: string
  content: string
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content }) => {
  const shareUrl = "http://localhost:3000/how-to-make-best-coffee"
  const titleToShare = `Check out this amazing post: ${title}`;

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>

      {/* Facebook Share Button */}
      <FacebookShare url={shareUrl} quote={titleToShare} />
    </div>
  );
};

export default BlogPost;