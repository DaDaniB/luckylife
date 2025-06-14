import React, { useEffect, useRef, useState, useCallback } from 'react';
import './SlotMachinePage.css';
import { useAppContext } from '../context/AppContext';
import BezierEasing from 'bezier-easing'

import cherry from '../../imgs/CHERRY PIXEL NEW.png'
import seven from '../../imgs/7PIXEL NEW.png'
import bar from '../../imgs/BAR PIXEL NEW.png'
import bell from '../../imgs/BELL PIXEL NEW.png'
import horse from '../../imgs/HORSEPIXEL NEW.png'
import star from '../../imgs/STERN.svg'
import ptsBtn from '../../imgs/PRESS TO SPIN.svg'
import { KEY } from '../constants/animation';
import spinSoundFile from '../../sound/SLOT MACHINE NEU.wav'

const IMAGES = [cherry, seven, bar, bell, horse];
// const FINAL_IMAGE = '⭐';
const WHEEL_COUNT = 5;
const IMAGES_PER_WHEEL = 30;

const SPIN_DURATION = 3500;
const STAGGER_DELAY = 400;
const PAGE_SWITCH_DELAY = 2500
const DISPLAYED_IMAGES_COUNT = 3
const DISPLAYED_IMAGE_HEIGHT = (1 / DISPLAYED_IMAGES_COUNT) * 100 // 0.3 -> 30...%

const IMAGE_STRIP_HEIGHT = DISPLAYED_IMAGE_HEIGHT * IMAGES_PER_WHEEL
const IMAGE_HEIGHT = (1 / IMAGES_PER_WHEEL) * 100
const WHEEL_STRIP_OFFSET = ((IMAGES_PER_WHEEL - DISPLAYED_IMAGES_COUNT) / IMAGES_PER_WHEEL) * 100



const easingFunction = BezierEasing(.08, .37, .82, 1.06);

interface WheelData {
    id: number;
    images: string[];
    offsetY: number;
    spinning: boolean;
}

const SlotMachinePage: React.FC = () => {
    const spinSound = new Audio(spinSoundFile)
    const { setState, resetTimer } = useAppContext();
    const [wheels, setWheels] = useState<WheelData[]>([]);
    const animationRefs = useRef<(ReturnType<typeof requestAnimationFrame> | null)[]>([]);

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

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === KEY) {
                handleSpin()
            }
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, []);



    const animateWheel = (wheelIndex: number, duration: number) => {
        const startTime = performance.now();

        const startY = 0;
        const targetY = WHEEL_STRIP_OFFSET

        const animate = (currentTime: number) => {
            const t = Math.min((currentTime - startTime) / duration, 1);
            const eased = easingFunction(t);
            const position = startY + (targetY - startY) * eased;

            setWheels((prev) =>
                prev.map((wheel, index) =>
                    index === wheelIndex ? { ...wheel, offsetY: position, spinning: t < 1 } : wheel
                )
            );

            if (t < 1) {
                animationRefs.current[wheelIndex] = requestAnimationFrame(animate);
            } else {
                animationRefs.current[wheelIndex] = null;
            }

        };

        requestAnimationFrame(animate);
    };

    const handleSpin = useCallback(() => {
        resetTimer();
        if (hasSpun || wheels.length === 0) return;

        setHasSpun(true);
        document.getElementById("spin-btn")?.classList.remove("spin-btn-toggle");

        spinSound.currentTime = 0;
        spinSound.play().catch(e => console.warn('Sound playing while spinning failed', e))

        wheels.forEach((_, index) => {
            setTimeout(() => {
                animateWheel(index, SPIN_DURATION);
            }, index * STAGGER_DELAY);
        });

        const wheelSpinTime = SPIN_DURATION + (STAGGER_DELAY * WHEEL_COUNT)
        const pageSwitchDelay = wheelSpinTime + PAGE_SWITCH_DELAY;
        setTimeout(() => {
            spinSound.pause();
            spinSound.currentTime = 0
        }, pageSwitchDelay)
        setTimeout(() => setState('result'), pageSwitchDelay);
    }, [resetTimer, hasSpun, wheels, setState]);

    useEffect(() => {
        if (wheels.length > 0) {
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === KEY) {
                    handleSpin();
                }
            };

            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }
    }, [wheels, handleSpin]);


    return (
        <div className="slot-machine">
            <div className="slot-container slot-box">
                {wheels.map((wheel) => (
                    <div key={wheel.id} className="wheel">
                        <div
                            className="image-strip"
                            style={{
                                transform: `translateY(${wheel.offsetY - WHEEL_STRIP_OFFSET}%)`,
                                height: `${IMAGE_STRIP_HEIGHT}%`
                            }}
                        >
                            {wheel.images.map((img, idx) => (
                                <div key={idx} className="image-item" style={{
                                    height: `${IMAGE_HEIGHT}%`
                                }}>
                                    <img src={img} alt="slot-item" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            <div className="slot-star-wrapper">
                <img className='slot-star-wrapper-item' src={star} alt="stern" />
                <img className='slot-star-wrapper-item' src={star} alt="stern" />
                <div className="slot-star-btn slot-star-wrapper-item">
                    <button id='spin-btn' className='spin-btn spin-btn-toggle' onClick={handleSpin} disabled={wheels.some((w) => w.spinning)}>
                        <img src={ptsBtn} alt="press to spin" />
                    </button>
                    <img className='slot-star-wrapper-item' src={star} alt="stern" ></img>
                </div>

            </div>

        </div>
    );
};

export default SlotMachinePage;
