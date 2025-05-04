import { toast } from "react-toastify"

export const responseData = (response, setList) => {
    if (response.data.code === 1000) {
        setList(response.data.data)
    } else if (response.data.code > 1000) {
        setList([])
        toast.info(response.data.message)
    }
    else
        toast.error("Bảo trì hệ thống")
}


export const responseData_ReturnInfo = (response, setList) => {
    if (response.data.code === 1000) {
        setList(response.data.data)
    } else if (response.data.code > 1000) {
        setList([])
        toast.info(response.data.message)
    }
    else
        toast.error("Bảo trì hệ thống")
}

export const responseDataUpdateUI = (response, setList) => {
    if (response.data.code === 1000) {
        setList((prev) => [...prev, response.data.data])
        toast.success("Thêm mới thành công!");
    } else if (response.data.code > 1000)
        toast.error(response.data.message)
    else
        toast.error("Bảo trì hệ thống")
}

export const responseUpdateAndUpdateUI = (response, setList) => {
    if (response.data.code === 1000) {
        const itemResponse = response.data.data
        setList((prev) =>
            prev.map((item) =>
                item.id === itemResponse.id ? itemResponse : item
            )
        )
    } else if (response.data.code > 1000)
        toast.error(response.data.message)
    else
        toast.error("Bảo trì hệ thống")
}


export const responseDelete = (response, setList, id) => {
    if (response.data.code === 1000) {
        toast.success("Xóa thành công!");
        setList(prevList => prevList.filter(item => item.id !== id));
    } else if (response.data.code > 1000)
        toast.error(response.data.message)
    else
        toast.error("Bảo trì hệ thống")
}


export const responseUpdate = (response, message, setList, apiGetList) => {
    if (response.data.code === 1000) {
        toast.success(message)
        apiGetList().then((response) => {
            responseData(response, setList)
        })
    } else if (response.data.code > 1000)
        toast.error(response.data.message)
    else
        toast.error("Bảo trì hệ thống")
}

export const responseUpdateType = (response, message, setList, apiGetList, type) => {
    if (response.data.code === 1000) {
        toast.success(message)
        apiGetList(type).then((response) => {
            responseData(response, setList)
        })
    } else if (response.data.code > 1000)
        toast.error(response.data.message)
    else
        toast.error("Bảo trì hệ thống")
}