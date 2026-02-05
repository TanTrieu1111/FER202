//SlideBar.jsx dùng để hiển thị slide ảnh với tiêu đề và mô tả
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { slideimages}  from '../data/slideimages';
function SlideBar() {
    return (
        <Carousel>
            {slideimages.map((item, index) => (
                <Carousel.Item key={index}>
                    <img className="d-block w-100" src={item.image} alt={`Slide ${index + 1}`} />
                    <Carousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}   
export default SlideBar;