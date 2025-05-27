import { useState, useEffect } from "react";

export default function useRightClickMenu(tableRef, width, height) {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

    const handleContextMenu = (e) => {
        if (tableRef.current && tableRef.current.contains(e.target)) {
            e.preventDefault();

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const scrollX = window.scrollX || document.documentElement.scrollLeft;
            const scrollY = window.scrollY || document.documentElement.scrollTop;

            const mouseX = e.pageX;
            const mouseY = e.pageY;

            const newX = (mouseX - scrollX + width > viewportWidth)
                ? mouseX - width
                : mouseX;

            const newY = (mouseY - scrollY + height > viewportHeight)
                ? mouseY - height
                : mouseY;

            setX(`${newX}px`);
            setY(`${newY}px`);

            setShowMenu(true);
        }
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