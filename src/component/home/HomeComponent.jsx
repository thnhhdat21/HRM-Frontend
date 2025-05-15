import React from 'react';

const HomeComponnent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    {/* <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
                            <div class="mb-2">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#add_ticket"
                                    class="btn btn-primary d-flex align-items-center"><i
                                        class="ti ti-circle-plus me-2"></i>Thêm bài viết</a>
                            </div>
                        </div>
                    </div> */}

                    <div class="row">
                        <div class="col-xl-9 col-md-8">
                            <div class="card">
                                <div
                                    class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                    <h5 class="text-info fw-medium">Tin tức nội bộ</h5>
                                </div>
                                <div class="card-body">
                                    {/* <div
                                        class="d-flex align-items-center justify-content-between flex-wrap mb-3">
                                        <div class="d-flex align-items-center flex-wrap">
                                            <div class="mb-3">
                                                <span class="badge badge-info rounded-pill mb-2">Tic - 001</span>
                                                <div class="d-flex align-items-center mb-2">
                                                    <h5 class="fw-semibold me-2">Laptop Issue</h5>
                                                    <span
                                                        class="badge bg-outline-pink d-flex align-items-center ms-1"><i
                                                            class="ti ti-circle-filled fs-5 me-1"></i>Open</span>
                                                </div>
                                                <div class="d-flex align-items-center flex-wrap row-gap-2">
                                                    <p class="d-flex align-items-center mb-0 me-2">
                                                        <img src="assets/img/profiles/avatar-06.jpg"
                                                            class="avatar avatar-xs rounded-circle me-2" alt="img" />
                                                        Assigned to <span class="text-dark ms-1">Juan Hermann</span>
                                                    </p>
                                                    <p class="d-flex align-items-center mb-0 me-2"><i
                                                        class="ti ti-calendar-bolt me-1"></i>Updated 20 hours ago
                                                    </p>
                                                    <p class="d-flex align-items-center mb-0"><i
                                                        class="ti ti-message-circle-share me-1"></i>9 Comments</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="border-bottom mb-3 pb-3">
                                            <div>
                                                <p class="mb-3">For the past week, my laptop has been experiencing
                                                    intermittent freezing issues. The freezes occur randomly, approximately
                                                    3-4 times a day, and last about 30-60 seconds each time. During these
                                                    freezes, the cursor
                                                    becomes unresponsive, and I am unable to click on anything or use
                                                    keyboard shortcuts. The issue usually resolves itself, but it
                                                    significantly disrupts my work.
                                                </p>
                                                <ul class="list-styled-dotted border-bottom pb-3">
                                                    <li class="ms-4 mb-3">I first noticed the problem on February 1, 2024,
                                                        while using Google Meet for a video conference. Since then, the
                                                        issue has occurred during various tasks, including browsing with
                                                        Chrome, using Microsoft Office
                                                        applications, and even when the laptop is idle.</li>
                                                    <li class="ms-4">Error messages: No specific error messages have
                                                        appeared, but the Task Manager (when accessible) shows a spike in
                                                        CPU usage to 100% during these freezes.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-4">
                            <div class="card">
                                <div class="card-header p-3">
                                    <h4>Tin ghim</h4>
                                </div>
                                <div class="card-body p-0">
                                    <div class="border-bottom p-3">
                                        <p class="text-dark">&#10140; Link tra cứu mẫu văn bản nhân sự</p>
                                        <p class="text-dark">&#10140; Hòm thư góp ý Dịch vụ nhân sự</p>
                                        <p class="text-dark">&#10140; Một số lưu ý khi đăng ký nghỉ và làm thêm giờ</p>
                                        <p class="text-dark">&#10140; HƯỚNG DẪN SỬ DỤNG PHẦN MỀM NHÂN SỰ</p>
                                        <p class="text-dark">&#10140; THÔNG TIN CHI TIẾT CÁC LOẠI NGHỈ</p>
                                        <p class="text-dark">&#10140; CẨM NANG CHẤM CÔNG</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header p-3">
                                    <h4>Cập nhật thông tin cá nhân</h4>
                                </div>
                                <div class="card-body p-0">
                                    <div class="border-bottom p-3">
                                        <p class="text-dark">&bull; Thông tin cá nhân</p>
                                        <p class="text-dark">&bull; Quan hệ nhân thân</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default HomeComponnent;

