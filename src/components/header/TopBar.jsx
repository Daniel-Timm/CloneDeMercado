import React from "react";
function TopBar() {
    return (
        <div className=" border-bottom py-0" style={{ fontSize: '12px', backgroundColor:'#c3c4c5' }}>
            <div className="container d-flex justify-content-between align-itens-center">
                <div className="ofertasBazarHortifruti d-flex align-items-center text-light "
                    style={{
                        cursor: 'pointer',

                    }} >
                    <span className="px-3 p-1  " style={{
                       backgroundColor: '#0088cc'

                    }}>Ofertas</span>
                    <span className="px-3 p-1  "style={{backgroundColor: '#ff9933'}}>Bazar</span>
                    <span className="px-3 p-1 "style={{backgroundColor:'#99bc59'}}>Hortifruti</span>
                </div>
                <div className="compraMinima fw-bold align-items-center">
                    Compra Mínima R$200,00
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2" style={{cursor:'pointer'}}>
                    <span>Lista de Compras</span>
                    <span>|</span>
                    <span>Meus Pedidos</span>
                    <span>|</span>
                    <span>Fale Conosco</span>
                </div>



            </div>
        </div>
    )
}
export default TopBar;