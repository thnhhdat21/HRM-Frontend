const explorer = [
    {
        "id": 1,
        "name": "Công ty TDSoftware",
        "departmentLevel": "Công ty",
        "businessBlock": null,
        "parentId": 0,
        "children": [
            {
                "id": 2,
                "name": "Ban giám đốc",
                "departmentLevel": "Phòng ban",
                "businessBlock": null,
                "parentId": 1,
                "children": [
                    {
                        "id": 38,
                        "name": "ád",
                        "departmentLevel": "",
                        "businessBlock": null,
                        "parentId": 2,
                        "children": null
                    }
                ]
            },
            {
                "id": 3,
                "name": "Khối Công Nghệ",
                "departmentLevel": "Khối nghiệp vụ",
                "businessBlock": "Khối Công Nghệ",
                "parentId": 1,
                "children": [
                    {
                        "id": 5,
                        "name": "Phòng hệ thống và hạ tầng",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Công Nghệ",
                        "parentId": 3,
                        "children": null
                    },
                    {
                        "id": 6,
                        "name": "Phòng quản lý chất lượng",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Công Nghệ",
                        "parentId": 3,
                        "children": null
                    }
                ]
            },
            {
                "id": 7,
                "name": "Khối sản phẩm",
                "departmentLevel": "Khối nghiệp vụ",
                "businessBlock": "Khối Sản Phẩm",
                "parentId": 1,
                "children": [
                    {
                        "id": 8,
                        "name": "Phòng quản lý sản phẩm_he",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Sản Phẩm",
                        "parentId": 7,
                        "children": null
                    },
                    {
                        "id": 9,
                        "name": "Phòng chăm sóc khách hàng",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Sản Phẩm",
                        "parentId": 7,
                        "children": null
                    }
                ]
            },
            {
                "id": 10,
                "name": "Khối kinh doanh",
                "departmentLevel": "Khối nghiệp vụ",
                "businessBlock": "Khối Kinh Doanh",
                "parentId": 1,
                "children": [
                    {
                        "id": 11,
                        "name": "Phòng kinh doanh",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Kinh Doanh",
                        "parentId": 10,
                        "children": null
                    },
                    {
                        "id": 12,
                        "name": "Phòng marketing",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Kinh Doanh",
                        "parentId": 10,
                        "children": null
                    }
                ]
            },
            {
                "id": 13,
                "name": "Khối hành chính",
                "departmentLevel": "Khối nghiệp vụ",
                "businessBlock": "Khối Hành Chính",
                "parentId": 1,
                "children": [
                    {
                        "id": 14,
                        "name": "Phòng nhân sự",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Hành Chính",
                        "parentId": 13,
                        "children": null
                    },
                    {
                        "id": 15,
                        "name": "Phòng tài chính - kế toán",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Hành Chính",
                        "parentId": 13,
                        "children": null
                    },
                    {
                        "id": 16,
                        "name": "Phòng quản lý tòa nhà",
                        "departmentLevel": "Phòng ban",
                        "businessBlock": "Khối Hành Chính",
                        "parentId": 13,
                        "children": null
                    }
                ]
            }
        ]
    },
    {
        "id": 39,
        "name": "Công ty Test",
        "departmentLevel": "Công ty",
        "businessBlock": null,
        "parentId": 0,
        "children": null
    }
];

export default explorer;
