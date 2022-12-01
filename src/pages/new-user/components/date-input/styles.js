import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

export const useStyles = makeStyles({
  root: {
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      transform: 'scale(0.75)',
    },
  },
});

export const Container = styled.div`
  position: relative;
  input {
    padding: 10px 0;
  }
  button {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
  }
`;
