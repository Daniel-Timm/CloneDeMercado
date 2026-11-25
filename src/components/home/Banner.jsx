
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from 'bootstrap';
import { api } from '../../services/api';

import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';
import banner4 from '../../assets/banner4.png';
import banner5 from '../../assets/banner5.png';
import banner6 from '../../assets/banner6.png';

const BANNERS_FALLBACK = [
    { id: 'local-1', imagemUrl: banner1, titulo: 'Banner 1', linkUrl: null },
    { id: 'local-2', imagemUrl: banner2, titulo: 'Banner 2', linkUrl: null },
    { id: 'local-3', imagemUrl: banner3, titulo: 'Banner 3', linkUrl: null },
    { id: 'local-4', imagemUrl: banner4, titulo: 'Banner 4', linkUrl: null },
    { id: 'local-5', imagemUrl: banner5, titulo: 'Banner 5', linkUrl: null },
    { id: 'local-6', imagemUrl: banner6, titulo: 'Banner 6', linkUrl: null },
];

function Banner({ banners: bannersProp }) {
    const [banners, setBanners] = useState(BANNERS_FALLBACK);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        if (Array.isArray(bannersProp)) {
            if (bannersProp.length > 0) {
                setBanners(
                    bannersProp.map((b, idx) => ({
                        id: b.id ?? `prop-${idx}`,
                        imagemUrl: b.imagemUrl,
                        titulo: b.titulo || `Banner ${idx + 1}`,
                        linkUrl: b.linkUrl || null,
                    }))
                );
                setActiveIndex(0);
            } else {
                setBanners(BANNERS_FALLBACK);
                setActiveIndex(0);
            }
            return;
        }

        async function carregarBanners() {
            try {
                const dados = await api.listarBanners();
                if (Array.isArray(dados) && dados.length > 0) {
                    const topo = dados
                        .filter((b) => b.ativo !== false && Number(b.ordem ?? 1) === 1)
                        .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
                        .map((b, idx) => ({
                            id: b.id ?? `api-${idx}`,
                            imagemUrl: b.imagemUrl,
                            titulo: b.titulo || `Banner ${idx + 1}`,
                            linkUrl: b.linkUrl || null,
                        }));

                    if (topo.length > 0) {
                        setBanners(topo);
                        setActiveIndex(0);
                    }
                }
            } catch {
                // Mantém BANNERS_FALLBACK caso a API não responda
            }
        }

        carregarBanners();
    }, [bannersProp]);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        instanceRef.current?.dispose();

        const bootstrapCarousel = new Carousel(el, {
            interval: 4000,
            ride: 'carousel',
            pause: 'hover'
        });

        instanceRef.current = bootstrapCarousel;

        const handleSlide = (event) => {
            setActiveIndex(event.to);
        };

        el.addEventListener('slid.bs.carousel', handleSlide);

        return () => {
            el.removeEventListener('slid.bs.carousel', handleSlide);
            bootstrapCarousel.dispose();
        };
    }, [banners]);

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
                            key={banners[index].id}
                            type="button"
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
                    {banners.map((banner, index) => (
                        <div key={banner.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            {banner.linkUrl ? (
                                <a href={banner.linkUrl}>
                                    <img
                                        src={banner.imagemUrl}
                                        className="d-block w-100"
                                        alt={banner.titulo}
                                    />
                                </a>
                            ) : (
                                <img
                                    src={banner.imagemUrl}
                                    className="d-block w-100"
                                    alt={banner.titulo}
                                />
                            )}
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
                            boxShadow: '0px 4px 10px rgb(0, 0, 0)'
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