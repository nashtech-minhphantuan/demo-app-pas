/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Carousel } from "antd";
import { BASE_URL } from "../../constant";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselHeader = (props: any) => {
  const { listItems } = props;
  const onChange = (currentSlide: number) => {};
  return (
    <Carousel
      dots={false}
      autoplay
      afterChange={onChange}
      className="carousel-header"
    >
      {listItems?.data?.map((item: any, index: number) => {
        return (
          <img
            key={index}
            src={`${BASE_URL}${item?.attributes?.avatar?.data?.attributes?.url}`}
            alt=""
          />
        );
      })}
    </Carousel>
  );
};

export default CarouselHeader;
