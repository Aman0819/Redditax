import React from 'react';
import { Box, Typography } from '@material-ui/core';

const Header = ({
  title = 'Yo! you probably forgot the title!',
  className,
  ...rest
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      minHeight={56}
      my={5}
      className={className}
    >
      <Typography variant="h2" color="textSecondary">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
