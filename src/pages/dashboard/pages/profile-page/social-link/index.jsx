import React from 'react';
import PropTypes from 'prop-types';

const SocialLink = ({ link, icon }) => {
  return (
    link && (
      <a href={link} target='_blank' rel='noopener noreferrer'>
        {icon}
      </a>
    )
  );
};

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default SocialLink;
