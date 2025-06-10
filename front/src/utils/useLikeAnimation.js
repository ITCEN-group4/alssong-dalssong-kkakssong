import { useEffect, useState } from "react";

export default function useLikeAnimation() {
    const [animate, setAnimate] = useState(false);

    const trigger = () => setAnimate(true);

    useEffect(() => {
        if (animate) {
            const timer = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timer);
        }
    }, [animate]);

    return [animate, trigger];
}