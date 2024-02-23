import React from 'react';

const SocialLink = ({ link, icon }) => {
  return (
    link && (
      <a href={link} target='_blank' rel='noopener noreferrer'>
        {icon}
      </a>
    )
  );
};

export default SocialLink;
