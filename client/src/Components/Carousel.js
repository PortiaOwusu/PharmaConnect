import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";

export default function ({ classc }) {
  return (
    <Carousel
      className={`carousel ${classc}`}
      autoPlay
      interval={3500}
      transitionTime={1500}
      infiniteLoop
    >
      <div>
        <img src="/pic6.png" alt="" />
        <p></p>
      </div>

      <div>
        <img src="/pic4.jpg" alt="" />
        <p></p>
      </div>

      <div>
        <img src="/picture16.jpg" alt="" />
        <p></p>
      </div>

      <div>
        <img src="/picture4.jpg" alt="" />
        <p></p>
      </div>
      <div>
        <img src="/picture3.jpg" alt="" />
        <p></p>
      </div>
      <div>
        <img src="/picture6.jpg" alt="" />
        <p></p>
      </div>
      <div>
        <img src="/picture8.jpg" alt="" />
        <p></p>
      </div>
    </Carousel>
  );
}
