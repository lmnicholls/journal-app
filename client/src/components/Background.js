import React from "react";
import ParticlesBg from "particles-bg";

const Background = () => {
  return (
    <div className="background">
      <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
    </div>
  );
};

export default Background;
