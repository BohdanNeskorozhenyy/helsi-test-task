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

export const SwitchWrap = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
`;

export const Container = styled.div`
  position: relative;
`;
