import { useNavigate } from 'react-router-dom';

const NoAuthozComponent = () => {
    const navigate = useNavigate()
    const handleClickBlack = (e) => {
        navigate("/personal/home")
    }

    return (
        <div className="main-wrapper">

            <div className="container-fuild">
                <div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-8 d-flex justify-content-center align-items-center mx-auto">
                            <div>
                                <div className="p-4 text-center">
                                    <img src="/assets/logo/logo.png" className="img-fluid" alt="Img" style={{ width: "300px" }} />
                                </div>
                                <div className="error-images mb-5">
                                    <img src="/assets/my-img/error-404.png" alt="image" className="img-fluid" />
                                </div>
                                <div className="text-center">
                                    <h1 className="mb-3">Không có quyền truy cập</h1>
                                    <div className="d-flex justify-content-center pb-4">
                                        <a className="btn btn-primary d-flex align-items-center " onClick={handleClickBlack}><i className="ti ti-arrow-left me-2"></i>Quay trang chủ</a>
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

