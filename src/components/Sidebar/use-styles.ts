import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sidebar: {
      flexBasis: '300px',
      backgroundColor: '#eee',
      borderRight: '1px solid #ccc'
    },
    title: {
      fontFamily: 'rig-shaded-bold-extrude, sans-serif',
      fontWeight: 700,
      fontStyle: 'normal',
      color: 'gold'
    }
  })
);

export default useStyles;