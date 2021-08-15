import _ from "lodash";
import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (cb: () => void, delay: number) => {
    const inputsRef = useRef<{ cb: any; delay?: number }>({ cb });

    const isMounted = useIsMounted();

    useEffect(() => {
        inputsRef.current = { cb, delay };
    });

    return useCallback(
        _.debounce(
            (...args) => {
                if (inputsRef.current.delay === delay && isMounted())
                    inputsRef.current.cb(...args);
            },
            delay,
            {
                leading: false,
                trailing: true,
            }
        ),
        [delay]
    );
};

function useIsMounted() {
    const isMountedRef = useRef(true);
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);
    return () => isMountedRef.current;
}
