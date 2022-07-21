import React, { Component } from "react";
import Slider from "react-slick";
import { introSlides } from "../../../data/data";

export default class Responsive extends Component {

  render() {

    const slides = []

    Array.isArray(introSlides) && introSlides.forEach((e, i) => {

      if (!e?.image || !e?.text) {
        console.error("Erro ao carregar o arquivo de imagem ou texto no componente 'Slider', posição: " + i)
        return
      }

      const slide = <div className="mini-intro" style={{ width: 250 }}>
        <div className="mini-intro-content">
          <img src={require(`../../../assets/${e?.image || ''}`)} alt="" className="mini-intro-img" />
          <img src={require("../../../assets/icone-coopers.png")} alt="" className="icon-coopers" />
          <div className="mini-intro-txt-area">
            <img src={require("../../../assets/fun-logo.png")} alt="" className="fun-logo" />
            <p className="intro-txt">{e?.text || ''}</p>
            <p className="read-more-link">read more</p>
          </div>
        </div>
      </div>;

      slides.push(slide)

    })

    const settings = {
      className: "mini-intro variable-width",
      dots: true,
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      swipeToSlide: true,
      infinite: true,
      autoplay:true,
      autoplaySpeed:4000,
      accessibility:true
    };

    return (
      <div >
        <Slider {...settings}>
          {slides}
        </Slider>
      </div>
    );
  }
}