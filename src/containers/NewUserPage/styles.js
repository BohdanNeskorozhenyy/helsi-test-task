import styled from 'styled-components';
import { Paper as MPaper } from '@mui/material';

export const Container = styled.div`
  margin: auto;
  max-width: 1250px;
  padding: 50px 0;
`;

export const Paper = styled(MPaper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;
