import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  input {
    padding: 10px 0;
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
