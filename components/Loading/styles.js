import styled from 'styled-components';

export const Container = styled.div`
  background: #f9f9f9;
  z-index: 2051;

  display: flex;
  align-items: center;
  justify-content: center;

  position: ${(props) => (props.card ? 'relative' : 'fixed')};
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
