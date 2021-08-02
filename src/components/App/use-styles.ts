import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app: {
      display: 'flex',
      backgroundColor: theme.palette.common.white,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      flexDirection: 'row'
    }
  }));

export default useStyles;
