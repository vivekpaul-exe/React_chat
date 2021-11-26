import React from 'react';
import { useStyles } from './styles';
import Avatar from '@material-ui/core/Avatar';




export default function AvatarSlides() {
  const classes = useStyles();

  return (
    <div className={classes.avatar}>
      <Avatar>H</Avatar>
      <Avatar className={classes.orange}>N</Avatar>
      <Avatar className={classes.purple}>OP</Avatar>
    </div>
  );
}
