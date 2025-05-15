import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const NoAuthozComponent = () => {
    const navigate = useNavigate()
    const handleClickBlack = (e) => {
        navigate("/personal/home")
    }

    return (
        <div class="main-wrapper">

            <div class="container-fuild">
                <div>
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-8 d-flex justify-content-center align-items-center mx-auto">
                            <div>
                                <div class="p-4 text-center">
                                    <img src="/assets/logo/logo.png" class="img-fluid" alt="Img" style={{ width: "300px" }} />
                                </div>
                                <div class="error-images mb-5">
                                    <img src="/assets/my-img/error-403.png" alt="image" class="img-fluid" />
                                </div>
                                <div class="text-center">
                                    <h1 class="mb-3">Không có quyền truy cập</h1>
                                    <div class="d-flex justify-content-center pb-4">
                                        <a class="btn btn-primary d-flex align-items-center " onClick={handleClickBlack}><i class="ti ti-arrow-left me-2"></i>Quay trang chủ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default NoAuthozComponent;

