import { useDispatch } from "react-redux";
import { resetTitleHeader } from "../../redux/slice/TitleHeaderSlice";

const HomeComponnent = () => {
    const dispatch = useDispatch();
    dispatch(resetTitleHeader())
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-xl-9 col-md-8">
                            <div className="card">
                                <div
                                    className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                    <h5 className="text-info fw-medium">Tin tức nội bộ</h5>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <div class="card">
                                            <div class="card-header border-0 pb-0">
                                                <div
                                                    class="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-2">
                                                    <div class="d-flex align-items-center">
                                                        <div>
                                                            <h6 class="mb-1">Thông tin đào tạo </h6>
                                                            <p class="d-flex align-items-center" style={{ fontSize: "13px" }}> 21/03/2025 - 15:24 </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-2">
                                                    <p class="text-dark fw-medium" style={{ margin: 0 }}>Con người là yếu tố cốt lõi tạo nên thành công của doanh nghiệp. Đào tạo nhân sự không chỉ là
                                                        nâng cao kỹ năng, mà còn là hành trình nuôi dưỡng tư duy, thái độ và tinh thần đồng hành cùng doanh nghiệp.
                                                        Hãy cùng nhau phát triển vươn xa hơn mỗi ngày.
                                                    </p>
                                                    <p className="fw-medium text-info link-hover ">#PhátTriểnNhânLực #ĐàoTạoNộiBộ</p>
                                                </div>
                                                <div class="mb-2">
                                                    <img src="https://smarthr.dreamstechnologies.com/html/template/assets/img/social/social-feed-01.jpg"
                                                        class="rounded" alt="Img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4">
                            <div className="card">
                                <div className="card-header p-3">
                                    <h4>Tin ghim</h4>
                                </div>
                                <div className="card-body p-0">
                                    <div className="border-bottom p-3">
                                        <p className="text-dark">&#10140; Link tra cứu mẫu văn bản nhân sự</p>
                                        <p className="text-dark">&#10140; Hòm thư góp ý Dịch vụ nhân sự</p>
                                        <p className="text-dark">&#10140; Một số lưu ý khi đăng ký nghỉ và làm thêm giờ</p>
                                        <p className="text-dark">&#10140; HƯỚNG DẪN SỬ DỤNG PHẦN MỀM NHÂN SỰ</p>
                                        <p className="text-dark">&#10140; THÔNG TIN CHI TIẾT CÁC LOẠI NGHỈ</p>
                                        <p className="text-dark">&#10140; CẨM NANG CHẤM CÔNG</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header p-3">
                                    <h4>Cập nhật thông tin cá nhân</h4>
                                </div>
                                <div className="card-body p-0">
                                    <div className="border-bottom p-3">
                                        <p className="text-dark">&bull; Thông tin cá nhân</p>
                                        <p className="text-dark">&bull; Quan hệ nhân thân</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
};

export default HomeComponnent;

