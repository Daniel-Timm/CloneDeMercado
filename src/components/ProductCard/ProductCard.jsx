import React, { useState } from 'react';

const ProductCard = ({ item }) => {
  const [quantidade, setQuantidade] = useState(0);

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
    <div className="card h-100 border-light shadow-sm flex-shrink-0"
      style={{ width: '200px', minWidth: '200px', position: 'relative', borderRadius: '10px', overflow: 'hidden' }} >

      <span
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          padding: "2px 8px",
          borderRadius: '5px',
          color: 'white',
          fontWeight: 'bold',
          backgroundColor: 'red',
          fontSize: '11px',
          zIndex: 2
        }}>{porcentagem}% off</span>

      <div className="d-flex justify-content-center align-items-center bg-white" style={{ height: '180px' }}>
        <img 
          src={item.urlImagem}
          style={{
            maxHeight: "150px",
            maxWidth: '100%',
            objectFit: 'contain',
          }}
          alt={`Imagem do produto ${item.nome}`} 
        />
      </div>

      <div className="card-body d-flex flex-column p-3">
        <h3 style={{
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontSize: '14px',
          height: '2.4rem',
          lineHeight: '1.2rem',
          color: '#333',
          marginBottom: '8px'
        }}>{item.nome}</h3>

        <div className="mt-auto">
          <h3 style={{
            fontSize: '20px',
            fontWeight: "bold",
            margin: '0',
            color: '#000'
          }}>{precoFormatado}</h3>
          
          <h3 style={{
            fontSize: '12px',
            textDecoration: "line-through",
            color: '#999',
            marginBottom: '12px'
          }}>{precoFormatado2}</h3>

          <div className="d-flex w-100">
            {item.estoque > 0 ? (
              quantidade === 0 ? (
                <button 
                  onClick={() => setQuantidade(1)} 
                  style={{ color: 'white', backgroundColor: '#a5c361', border: 'none' }} 
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-bold py-2"
                >
                  <i className="bi bi-cart3"></i> ADICIONAR
                </button>
              ) : (
                <div className="d-flex align-items-center justify-content-between w-100 border rounded py-1 px-2" style={{ backgroundColor: '#f8f9fa' }}>
                  <button onClick={() => setQuantidade(Math.max(0, quantidade - 1))} className="btn btn-sm p-0 border-0 fw-bold">-</button>
                  <span className="fw-bold">{quantidade}</span>
                  <button onClick={() => setQuantidade(quantidade + 1)} className="btn btn-sm p-0 border-0 fw-bold text-success">+</button>
                </div>
              )
            ) : (
              <button 
                disabled 
                style={{ color: 'white', backgroundColor: '#ccc', border: 'none', cursor: 'not-allowed' }} 
                className="btn w-100 fw-bold py-2"
              >
                INDISPONÍVEL
              </button>
            )}
          </div>
        </div>
      </div> 
    </div>   
  );
};

export default ProductCard;