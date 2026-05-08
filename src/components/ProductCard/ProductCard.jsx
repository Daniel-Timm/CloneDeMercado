import React, { useState } from 'react';
import { ofertasDoDia } from "../../data/Product";
import { UsbDriveFill } from "react-bootstrap-icons";

const ProductCard = ({ item }) => {
  const [quantidade, setQuantidade] = useState(0);
  const [posicao, setPosicao] = useState(0);
  const precoFormatado = item.precoAtual.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',

  });
  const precoFormatado2 = item.precoOriginal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',

  });
  const porcentagem = Math.round((item.precoOriginal - item.precoAtual) / item.precoOriginal * 100);
  return (
    <div key={item.id} className="card h-100 border flex-shrink-0"
      style={{ cursor: 'pointer', width: '180px', minWidth: '180px', height: '100px', position: 'relative' }} >

      <div className="divImage">
        <span
          style={{
            position: "absolute",
            right: 5,
            top: 2,
            padding: "1px 5px",
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'red',
            fontSize: '12px'

          }}>{porcentagem}%off</span>
        <img src={item.urlImagem}
          style={{
            height: "160px",
            width: '160px',
            objectFit: 'contain',
            padding: '5px',


          }}
          alt="Imagem do profuto${item.nome}" />
      </div>
      <div style={{ padding: '3px' }} className="card-body d-flex flex-column">

        <h3 className="" style={{

          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          height: '3rem',
          fontSize: 14,
          textTransform: "capitalize",
          textOverflow: 'ellipsis',
          height: '3rem',
          marginTop: 0,
          color: '#333333',


        }}>{item.nome}</h3>
        <h3 style={{
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 3,
        }}>{precoFormatado}</h3>
        <h3 style={{
          fontSize: 12,
          textDecoration: "line-through",
          color: 'gray'
        }}>{precoFormatado2}</h3>
        <div className="d-flex gap-4 button">
          {quantidade === 0 ? (
            <button 
              onClick={() => setQuantidade(quantidade + 1)} 
              style={{ color: 'white', backgroundColor: '#a5c361' }} 
              className="btn w-100 shadow-sm gap-4 d-flex align-items-center mt-auto"
            >
              <i className="bi bi-cart3"></i> Adicionar
            </button>
          ) : (
            <div className="d-flex align-items-center justify-content-between w-100">
              <button onClick={() => setQuantidade(quantidade - 1)} className="btn btn-sm btn-outline-secondary">-</button>
              <span>{quantidade}</span>
              <button onClick={() => setQuantidade(quantidade + 1)} className="btn btn-sm btn-outline-secondary">+</button>
            </div>
          )}
        </div>
      </div> 
    </div>   
  );
};
      function OfertasSeçao() {

  return (


      <div className=" container d-flex flex-column gap-1">
        <div className="">
          <div className="col border-bottom pb-2 fw-bold fs-3 pt-4">Ofertas do dia</div>
        </div>
        <div className="d-flex overflow-x-auto gap-1 pt-5 pb-3 custom-scrollbar">

          {


            ofertasDoDia.map((item) => {


              return (
                <ProductCard key={item.id} item={item} />
              );
            })
          }
        </div>
      </div>
      );
}
      export default OfertasSeçao;