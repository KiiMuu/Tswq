import { useState, useEffect } from 'react';

export const useDetectOutsideClicks = (element, initialState) => {
    const [isOpen, setIsOpen] = useState(initialState);

    useEffect(() => {
        const clickedOutside = e => {
            // If the open element exists and is clicked outside of
            if (element.current !== null && !element.current.contains(e.target)) {
                setIsOpen(!isOpen);
            }
        }

        if (isOpen) {
            window.addEventListener('click', clickedOutside, { 
                once: true // fire click once && then remove it
            });
        }

        // INSTEAD OF `once: true`, you can:
        // unset our event listener once the dropdown is closed.
        // This is a way to perform any cleanup.
        // return () => {
        //     window.removeEventListener('click', clickedOutside);
        // }
    }, [isOpen, element]);

    return [isOpen, setIsOpen];
}