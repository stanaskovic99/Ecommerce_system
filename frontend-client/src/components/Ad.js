import React from "react";
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchAds } from "../actions/ad";

class Ad extends React.Component {
  componentDidMount() {
    if (this.props.ads.length === 0) this.props.fetchAds();
  }

  render() {
    const prevIcon = <i className="bi bi-chevron-left icon_carousel"></i>;
    const nextIcon = <i className="bi bi-chevron-right icon_carousel"></i>;

    if (this.props.ads.length === 0) {
      return <div className="text-center">Loading....</div>;
    }
    return (
      <Carousel prevIcon={prevIcon} nextIcon={nextIcon}>
        {this.props.ads.map((ad) => (
          <Carousel.Item
            key={ad._id}
            className="carousel_container"
            interval={77000}
          >
            <img
              className="img-fluid"
              src={ad.srcImage}
              alt="Slika je trenutno nedostupna"
            />
            <Carousel.Caption className="caption_carousel">
              <h1 className="text_carousel">{ad.title}</h1>
              <p className="text_carousel">{ad.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

const mapStateToProps = (state) => {
  return { ads: state.ads };
};

export default connect(mapStateToProps, { fetchAds })(Ad);
