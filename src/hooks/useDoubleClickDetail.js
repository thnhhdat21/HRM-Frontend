import { useState, useEffect } from "react";

export default function useDoubleClickDetail(tableRef, infoWorkDay, width, height) {
    const [xdb, setXDB] = useState(0)
    const [ydb, setYDB] = useState(0)
    const [showMenudb, setShowMenuDB] = useState(false)

    const handleContextMenu = (e) => {
        const targetItem = e.target.closest('.item-working');
        if (targetItem && tableRef.current && tableRef.current.contains(targetItem)) {
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

            setXDB(`${newX}px`);
            setYDB(`${newY}px`);
            setShowMenuDB(true);
        }
    };


    const handleClick = (e) => {
        if (
            showMenudb &&
            infoWorkDay.current &&
            !infoWorkDay.current.contains(e.target)
        ) {
            setShowMenuDB(false);
        }
    }


    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('dblclick', handleContextMenu)
        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('dblclick', handleContextMenu)
        }

    })

    return { xdb, ydb, showMenudb }

}