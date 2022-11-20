/* eslint-disable @next/next/no-img-element */
import React from "react";
import CarouselHeader from "../carouselHeader";

const Header = (props: any) => {
  const { data } = props;
  return (
    <div className="container">
      <div className="header-pokemon">
        <div className="header-title">
          <span>Your Pokemon Collection</span>
        </div>
        <div className="header-logo">
          <img src="/image/International_Pokémon_logo.svg.png" alt="" />
        </div>
        <div className="header-logo2">
          <img src="/image/logo2.png" alt="" />
        </div>
        <CarouselHeader listItems={data} />
        <div className="backGround-circle">
          <div className="backGround-globular"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
