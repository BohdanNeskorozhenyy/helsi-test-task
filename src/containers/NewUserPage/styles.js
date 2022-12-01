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

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;
`;

export const Header = styled.header`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: white;
  background-color: #00b4d8;
`;

export const BackButton = styled.button`
  border: none;
  background-color: transparent;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    color: currentColor;
  }
`;
