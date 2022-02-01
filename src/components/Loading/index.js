import React from 'react';
// import Lottie from 'react-lottie';
// import animationFloatingDocument from './floating-document-green.json';

import { Container } from './styles';

export default function Loading({ card }) {
  return (
    <Container card={card}>
      {/* <Lottie
        height='50%'
        options={{
          loop: true,
          autoplay: true,
          speed: 1.5,
          animationData: animationFloatingDocument,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
          },
        }}
      /> */}
    </Container>
  );
}
