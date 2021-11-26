import { makeStyles } from '@material-ui/styles';
import teal from '@material-ui/core/colors/teal';
export  const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
      overflowX:'hidden',
      overflowY:'hidden',
  },
    appbar : {
        backgroundColor :  '#ff2ba0',
        
    },
  flex: {
    flex: 1,
  },
    chip:{
        color: teal[900],
        background : teal[300],
    },
   svgsend : {
     color: '#242424'  ,
     transform:'rotate(45deg)',
   },     
menuButton: {
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
    
    fontSize: 35,
    fontFamily: 'Fredoka One',
  },
  icon: {
    width: 24,
    height: 24,
    cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    color: '#B7B6BC',
    '&:hover': {
      opacity: 0.8,
    },
  },
  emoji: {
    width: 24,
    height: 24,
    cursor: 'pointer',
    color: '#B7B6BC',
    '&:hover': {
      opacity: 0.8,
    },
  },
  inputRoot: {
    borderRadius: 40,
    backgroundColor: '#F2F2F4',
    padding: '5px 10px',
    '& input': {
      fontSize: 14,
      paddingLeft: 10,
    },
  },
send: {
    color:'#b7b6bc',
},
  fileInput: {
    display: 'none',
  },
}));