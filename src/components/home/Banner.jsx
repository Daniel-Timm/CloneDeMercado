import React, { useEffect, useRef, useState } from "react";
import { Carousel } from 'bootstrap';

import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';
import banner4 from '../../assets/banner4.png';
import banner5 from '../../assets/banner5.png';
import banner6 from '../../assets/banner6.png';

function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        if (carouselRef.current) {
            const bootstrapCarousel = new Carousel(carouselRef.current, {
                interval: 4000,
                ride: 'carousel',
                pause: 'hover'
            });

            instanceRef.current = bootstrapCarousel;

            const handleSlide = (event) => {
                setActiveIndex(event.to);
            };

            carouselRef.current.addEventListener('slid.bs.carousel', handleSlide);

            return () => {
                if (carouselRef.current) {
                    carouselRef.current.removeEventListener('slid.bs.carousel', handleSlide);
                }
            };
        }
    }, []);

    const banners = [banner1, banner2, banner3, banner4, banner5, banner6];

    return (
        <div className="container mt-4" style={{ position: 'relative', padding: '0 50px' }}>
            <div
                ref={carouselRef}
                id="carouselTreichel"
                className="carousel slide position-relative"
            >
                <div
                    className="d-flex justify-content-center w-100"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        zIndex: 10,
                        gap: '12px'
                    }}
                >
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => instanceRef.current?.to(index)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.5)',
                                backgroundColor: activeIndex === index ? '#004a8e' : 'rgba(255,255,255,0.8)',
                                cursor: 'pointer',
                                transition: '0.3s',
                                
                                padding: 0
                            }}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>


                <div className="carousel-inner rounded shadow-sm">
                    {banners.map((img, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={img} className="d-block w-100" alt={`Banner ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselTreichel"
                    data-bs-slide="prev"
                    style={{ width: 'auto', left: '-20px' }}
                >
                    <span
                        style={{
                            width: '35px',
                            height: '35px',
                            backgroundColor: 'white', 
                            color: 'black',           
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '15px',        
                            boxShadow: '0px 4px 10px rgb(0, 0, 0) ' 
                        }}
                    >
                        <i className="bi bi-chevron-left" style={{ WebkitTextStroke: '1px black' }}></i> 
                    </span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button 
    className="carousel-control-next" 
    type="button" 
    data-bs-target="#carouselTreichel" 
    data-bs-slide="next"
    style={{ width: 'auto', right: '-20px' }} 
>
    <span 
        style={{ 
            width: '35px', 
            height: '35px', 
            backgroundColor: 'white', 
            color: 'black', 
            fontWeight: 'bold',

            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '15px',
            boxShadow: '0 2px 5px rgb(0, 0, 0)'
        }}
    >
        <i className="bi bi-chevron-right" style={{ WebkitTextStroke: '1px black' }}></i> 
    </span>
    <span className="visually-hidden">Próximo</span>
</button>
            </div>
        </div>
    );
}

export default Banner;