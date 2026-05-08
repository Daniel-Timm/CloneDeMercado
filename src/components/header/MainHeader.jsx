import React from 'react';
import { Search, Person, Cart3 } from 'react-bootstrap-icons';

function MainHeader() {
    return (
        <div className='bg-white py-3 border-bottom'>
            <div className='container d-flex align-itens-center'>
                <div className='me-4 fw-bold text-primary fs-3'>ТРЕИЧЕЛ</div>
                <div className='flex-grow-1 position-relative'>
                    <input type="text"
                        className='form-control rounded-1'
                        placeholder='сделайте свой поиск' />
                    <Search className='position-absolute end-0 top-50 translate-middle-y me-3 text-secondary' />
                </div>
                <div className='d-flex align-items-center ms-4'>

                   
                    <div className='login-area d-flex align-items-center me-4' style={{ cursor: 'pointer' }}>
                        <Person size={32} className='text-secondary' />
                        <div className='d-flex flex-column ms-2' style={{ lineHeight: '1.2' }}>
                            <small className='text-secondary' style={{ fontSize: '11px' }}>Faça seu login</small>
                            <span className='fw-bold text-dark' style={{ fontSize: '13px' }}>ou cadastre-se</span>
                        </div>
                    </div>

                    
                    <div className='cart-area d-flex align-items-center' style={{ cursor: 'pointer' }}>
                        <div className='position-relative'>
                            <Cart3 size={30} className='text-dark' />
                            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success' style={{ fontSize: '10px' }}>
                                0
                            </span>
                        </div>
                        <span className='ms-2 fw-bold text-dark' style={{ fontSize: '13px' }}>Meu Carrinho</span>
                    </div>

                </div>
            </div>
        </div>
    );

}
export default MainHeader;