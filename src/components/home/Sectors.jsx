import React, { useEffect, useRef, useState } from "react";
import Hortifruti from '../../assets/icons/Hortifruti.png';
import Bazar from '../../assets/icons/Bazar.png';
import Laticinios from '../../assets/icons/Laticinios.png';
import Bebidas from '../../assets/icons/Bebidas.png';
import Carnes from '../../assets/icons/Carnes.png';
import Perfumaria from '../../assets/icons/Perfumaria.png';
import Limpeza from '../../assets/icons/Limpeza.png';
import Mercearia from '../../assets/icons/Mercearia.png';
import Bebes from '../../assets/icons/Bebe-e-Criança.png';
import { api } from '../../services/api';

const CORES_PADRAO = ["#d98c00", "#a6b74e", "#0066a1"];

const ICONES_POR_NOME = {
    hortifrute: Hortifruti,
    hortifruti: Hortifruti,
    bazar: Bazar,
    laticinios: Laticinios,
    laticínios: Laticinios,
    bebidas: Bebidas,
    carnes: Carnes,
    perfumaria: Perfumaria,
    limpeza: Limpeza,
    mercearia: Mercearia,
    bebes: Bebes,
    bebês: Bebes,
};

const SETORES_FALLBACK = [
    { id: 1, nome: 'Hortifrute', cor: "#d98c00", imagem: Hortifruti },
    { id: 2, nome: 'Bazar', cor: "#a6b74e", imagem: Bazar },
    { id: 3, nome: 'Laticinios', cor: "#0066a1", imagem: Laticinios },
    { id: 4, nome: 'Bebidas', cor: "#d98c00", imagem: Bebidas },
    { id: 5, nome: 'Carnes', cor: "#a6b74e", imagem: Carnes },
    { id: 6, nome: 'Perfumaria', cor: "#0066a1", imagem: Perfumaria },
    { id: 7, nome: 'Limpeza', cor: "#d98c00", imagem: Limpeza },
    { id: 8, nome: 'Mercearia', cor: "#a6b74e", imagem: Mercearia },
    { id: 9, nome: 'Bebes', cor: "#0066a1", imagem: Bebes },
];

function Sectors() {
    const [setores, setSetores] = useState(SETORES_FALLBACK);
    const carouselRef = useRef(null);

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const dados = await api.listarCategorias();
                if (Array.isArray(dados) && dados.length > 0) {
                    const mapeados = dados.map((cat, index) => {
                        const chave = (cat.nome || '').toLowerCase().trim();
                        return {
                            id: cat.id,
                            nome: cat.nome,
                            cor: CORES_PADRAO[index % CORES_PADRAO.length],
                            imagem: ICONES_POR_NOME[chave] || Mercearia,
                        };
                    });
                    setSetores(mapeados);
                }
            } catch {
                // Mantém SETORES_FALLBACK caso a API não responda ou esteja vazia
            }
        }

        carregarCategorias();
    }, []);

    const scroll = (scrollOffset) => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <div className='container mt-5' style={{ position: "relative" }}>
            <button onClick={() => scroll(-200)}
                style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    zIndex: '10',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
                }} className="btn btn-light rounded-circle">
                <i className="bi bi-chevron-left" style={{ WebkitTextStroke: '1px black' }}></i>
            </button>
            <div style={{ overflowX: 'hidden', width: '100%' }}>
                <div ref={carouselRef} className='d-flex flex-nowrap'
                    style={{
                        scrollBehavior: 'smooth',
                        gap: '70px',
                        padding: '10px 20px',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                    <style>{`
                        div::-webkit-scrollbar { display: none; }
                    `}</style>
                    {setores.map((setor) => (
                        <div key={setor.id} className='text-center' style={{ flexShrink: 0, width: '120px', cursor: 'pointer', textTransform: 'uppercase' }}>
                            <div style={{
                                backgroundColor: setor.cor,
                                borderRadius: '50%',
                                height: '100px',
                                width: '100px',
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <img src={setor.imagem} alt={setor.nome} style={{ width: '90%' }} />
                            </div>
                            <p className="mt-2" style={{ fontSize: '13px', fontWeight: '500' }}>{setor.nome}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => scroll(200)}
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    zIndex: '10',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
                }}
                className="btn btn-light rounded-circle">
                <i className="bi bi-chevron-right" style={{ WebkitTextStroke: '1px black' }}></i>
            </button>
        </div>
    );
}

export default Sectors;