import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { Paper as MPaper } from '@mui/material';

export const useStyles = makeStyles({
  root: {
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      transform: 'scale(0.75)',
    },
  },
});

export const Container = styled.div`
  margin: auto;
  max-width: 1250px;
  padding: 50px 0;
`;

export const Paper = styled(MPaper)`
  padding: 16px;
`;
