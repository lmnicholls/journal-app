import React from "react";
import ParticlesBg from "particles-bg";
import styled from "styled-components";

const Background = () => {
  return (
    <AnimatedBackground>
      <ParticlesBg type="circle" bg={true} />
    </AnimatedBackground>
  );
};

export default Background;

const AnimatedBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -10;
  background-color: #103373;
`;
