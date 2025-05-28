import React, { useEffect, useRef, useState } from 'react';
import './SlotMachinePage.css';
import { useAppContext } from '../context/AppContext';
import BezierEasing from 'bezier-easing'

const IMAGES = ['🍒', '🍋', '🔔', '⭐', '7️⃣'];
// const FINAL_IMAGE = '⭐';
const WHEEL_COUNT = 5;
const IMAGES_PER_WHEEL = 30;
const IMAGE_HEIGHT = 80;
const SPIN_DURATION = 18;
const STAGGER_DELAY = 300;
const DISPLAYED_IMAGES_COUNT = 3
const WHEEL_HEIGHT = DISPLAYED_IMAGES_COUNT * IMAGE_HEIGHT
const WHEEL_STRIP_OFFSET = -(IMAGE_HEIGHT * IMAGES_PER_WHEEL) + WHEEL_HEIGHT

// Cubic easing for acceleration/deceleration
// const easeInOutCubic = (t: number) =>
//     t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easingFunction = BezierEasing(.08, .37, .82, 1.06);

interface WheelData {
    id: number;
    images: string[];
    offsetY: number;
    spinning: boolean;
}

const SlotMachinePage: React.FC = () => {
    const { setState } = useAppContext();
    const [wheels, setWheels] = useState<WheelData[]>([]);
    const animationRefs = useRef<ReturnType<typeof requestAnimationFrame>[]>([]);
    const [hasSpun, setHasSpun] = useState(false);

    useEffect(() => {
        const generateWheelImages = (): string[] => {
            const list: string[] = [];
            for (let i = 0; i < IMAGES_PER_WHEEL; i++) {
                list.push(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
            }
            // const finalImageIndex = IMAGES_PER_WHEEL - (Math.floor(DISPLAYED_IMAGES_COUNT / 2) + 1)
            // list[finalImageIndex] = (FINAL_IMAGE);
            return list;
        };

        const initial: WheelData[] = Array.from({ length: WHEEL_COUNT }, (_, id) => ({
            id,
            images: generateWheelImages().reverse(),
            offsetY: 0,
            spinning: false,
        }));

        setWheels(initial);
    }, []);

    const animateWheel = (wheelIndex: number, duration: number) => {
        const startTime = performance.now();

        const startY = 0;
        const targetIndex = IMAGES_PER_WHEEL - DISPLAYED_IMAGES_COUNT
        const targetY = targetIndex * IMAGE_HEIGHT;

        const animate = (currentTime: number) => {
            const t = Math.min((currentTime - startTime) / duration, 1);
            const eased = easingFunction(t);
            const position = startY + (targetY - startY) * eased;

            setWheels((prev) =>
                prev.map((wheel, index) =>
                    index === wheelIndex ? { ...wheel, offsetY: position, spinning: t < 1 } : wheel
                )
            );

            animationRefs.current[wheelIndex] = requestAnimationFrame(animate);

        };

        requestAnimationFrame(animate);
    };

    const handleSpin = () => {
        if (hasSpun) return;
        setHasSpun(true);

        wheels.forEach((_, index) => {
            setTimeout(() => {
                animateWheel(index, SPIN_DURATION);
            }, index * STAGGER_DELAY);
        });
        const delay = SPIN_DURATION + (STAGGER_DELAY * WHEEL_COUNT) + 500
        setTimeout(() => setState('result'), delay);
    };

    return (
        <div className="slot-machine">
            <h2>Spinning for Section...</h2>
            <div className="slot-container">
                {wheels.map((wheel) => (
                    <div key={wheel.id} className="wheel" style={{
                        height: `${WHEEL_HEIGHT}px`
                    }}>
                        <div
                            className="image-strip"
                            style={{
                                transform: `translateY(${wheel.offsetY + WHEEL_STRIP_OFFSET}px)`
                            }}
                        >
                            {wheel.images.map((img, idx) => (
                                <div key={idx} className="image-item">
                                    {img}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleSpin} disabled={wheels.some((w) => w.spinning)}>
                Spin
            </button>
        </div>
    );
};

export default SlotMachinePage;
