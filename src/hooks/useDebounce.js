import { useEffect, useState } from "react";

export default function useDebounce(intialValue = "", delay = 1000) {
    const [debounceValue, setDebounceValue] = useState(intialValue);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue('');
        }, delay);
        return () => {
            clearTimeout(timer);
        }
    }, [delay, intialValue])
    return debounceValue;
}