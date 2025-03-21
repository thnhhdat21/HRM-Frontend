import { useState, useEffect } from "react";

export default function useRightClickMenu(tableRef, width, height) {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

    // const handleContextMenu = (e) => {
    //     e.preventDefault();
    //     const totalWidth = document.documentElement.scrollWidth;
    //     const totalHeight = document.documentElement.scrollHeight;
    //     (e.pageX + 150) > totalWidth
    //         ? setX(`${totalWidth - 180}px`)
    //         : setX(e.pageX);
    //     (e.pageY + 200) > totalHeight
    //         ? setY(`${totalHeight - 230}px`)
    //         : setY(e.pageY);
    //     console.log(x + " " + y)
    //     setShowMenu(true)
    // }
    const handleContextMenu = (e) => {
        e.preventDefault();

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        const mouseX = e.pageX;
        const mouseY = e.pageY;

        // const menuWidth = 150;
        // const menuHeight = 200;

        const newX = (mouseX - scrollX + width > viewportWidth)
            ? mouseX - width
            : mouseX;

        const newY = (mouseY - scrollY + height > viewportHeight)
            ? mouseY - height
            : mouseY;

        setX(`${newX}px`);
        setY(`${newY}px`);

        setShowMenu(true);
    };


    const handleClick = () => {
        showMenu && setShowMenu(false)
    }


    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('contextmenu', handleContextMenu)
        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('contextmenu', handleContextMenu)
        }

    })

    return { x, y, showMenu }

}

// import { useState, useEffect } from "react";

// export default function useRightClickMenu(tableRef) {
//     const [x, setX] = useState(0);
//     const [y, setY] = useState(0);
//     const [showMenu, setShowMenu] = useState(false);

//     const handleContextMenu = (e) => {
//         if (tableRef.current && tableRef.current.contains(e.target)) {
//             e.preventDefault();
//             setX(e.pageX);
//             setY(e.pageY);
//             setShowMenu(true);
//         }
//     };

//     const handleClick = () => {
//         showMenu && setShowMenu(false);
//     };

//     useEffect(() => {
//         if (!tableRef.current) return;

//         const table = tableRef.current;
//         table.addEventListener("click", handleClick);
//         table.addEventListener("contextmenu", handleContextMenu);

//         return () => {
//             table.removeEventListener("click", handleClick);
//             table.removeEventListener("contextmenu", handleContextMenu);
//         };
//     }, [tableRef, showMenu]);

//     return { x, y, showMenu };
// }


// import { useState, useEffect } from "react";

// export default function useRightClickMenu(tableRef, width, height) {
//     const [x, setX] = useState(0);
//     const [y, setY] = useState(0);
//     const [showMenu, setShowMenu] = useState(false);
//     const [selectedId, setSelectedId] = useState(null); // Lưu ID của dòng được chọn

//     const handleContextMenu = (e) => {
//         if (tableRef.current && tableRef.current.contains(e.target)) {
//             e.preventDefault();

//             const tr = e.target.closest("tr");
//             if (tr) {
//                 setSelectedId(tr.getAttribute("data-id")); // Lấy ID từ data-id
//             }

//             e.pageX + width > window.innerWidth ? setX(`${window.innerWidth - (width + 30)}px`) : setX(e.pageX);
//             e.pageY + height > window.innerHeight ? setY(`${window.innerHeight - (height + 30)}px`) : setY(e.pageY);
//             setShowMenu(true);
//         }
//     };

//     const handleClick = () => {
//         showMenu && setShowMenu(false);
//     };

//     useEffect(() => {
//         if (!tableRef.current) return;

//         const table = tableRef.current;
//         table.addEventListener("click", handleClick);
//         table.addEventListener("contextmenu", handleContextMenu);

//         return () => {
//             table.removeEventListener("click", handleClick);
//             table.removeEventListener("contextmenu", handleContextMenu);
//         };
//     }, [tableRef, showMenu]);

//     return { x, y, showMenu, selectedId };
// }

