import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

export const useStyles = makeStyles({
  root: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: 'white',
    },
    '& .MuiSwitch-thumb': {
      border: '1px #adb5bd solid',
    },
    '& .MuiSwitch-switchBase': {
      color: '#adb5bd',
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#6c757d',
    },
    '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
      backgroundColor: 'white',
      border: '1px #adb5bd solid',
    },
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      transform: 'scale(0.75)',
    },
  },
});

export const Container = styled.div`
  position: relative;
  input {
    padding: 10px 0;
    padding-right: 90px;
  }
`;

export const Absolute = styled.div`
  position: absolute;
  top: 12px;
  right: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  height: 48px;
  color: #d32f2f;
  svg {
    width: 25px;
    height: 25px;
    color: currentColor;
  }
`;
