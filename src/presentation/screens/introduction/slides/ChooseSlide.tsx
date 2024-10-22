import React from "react";
import SlideItem from "../SlideItem";

const ChooseSlide = () => {
  const title = "¡Elige!";
  const description = "Selecciona tu canción favorita";
  const image = require("@images/introduction/choose_song.png");
  return <SlideItem title={title} description={description} image={image} />;
};

export default ChooseSlide;
