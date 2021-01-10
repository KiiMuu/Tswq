import { useRef, useEffect, useCallback } from 'react';
import { useDetectOutsideClicks } from './useDetectOutsideClick';

const useToggle = () => {

    const elementRef = useRef(null);
    const [isOpen, setIsOpen] = useDetectOutsideClicks(elementRef, false);

    const handleEscKey = useCallback(e => {
        if (e.keyCode === 27) setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    useEffect(() => {
        if (isOpen) document.addEventListener('keydown', handleEscKey, false);

        return () => {
            document.removeEventListener('keydown', handleEscKey, false);
        }
    }, [handleEscKey, isOpen]);

    const handleToggle = () => setIsOpen(!isOpen);
    
    return { isOpen, handleToggle, elementRef }
}

export default useToggle
