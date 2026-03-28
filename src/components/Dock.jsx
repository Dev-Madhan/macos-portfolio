import { dockApps } from '#constants';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { Tooltip } from 'react-tooltip';
import gsap from 'gsap';

// macOS dock magnification constants
const BASE_SIZE = 56;    // px – matches size-14 (3.5rem)
const MAX_SIZE  = 96;    // px – peak size when cursor is dead-centre
const SPREAD    = 60;    // px – Gaussian σ: tighter = fewer icons affected
const CUTOFF    = 130;   // px – beyond this distance, icon stays at scale 1

/**
 * Gaussian scale: smoothly peaks at MAX_SIZE/BASE_SIZE when dist=0,
 * and returns exactly 1 when dist >= CUTOFF.
 */
function gaussianScale(dist) {
  if (dist >= CUTOFF) return 1;
  const maxScale = MAX_SIZE / BASE_SIZE;  // ≈ 1.714
  const t = Math.exp(-(dist * dist) / (2 * SPREAD * SPREAD));
  return 1 + (maxScale - 1) * t;
}

const Dock = () => {
    const dockRef = useRef(null);

    const { contextSafe } = useGSAP({ scope: dockRef });

    const handleMouseMove = contextSafe((e) => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = Array.from(dock.querySelectorAll('.dock-icon'));
        const mouseX = e.clientX;

        icons.forEach((icon) => {
            const rect = icon.getBoundingClientRect();
            const center = rect.left + rect.width / 2;
            const dist   = Math.abs(mouseX - center);

            const scale  = gaussianScale(dist);
            // Y shift: lift proportionally so icon stays anchored at bottom
            const yShift = -(scale - 1) * BASE_SIZE * 0.55;

            gsap.to(icon, {
                scale,
                y: yShift,
                duration: 0.2,
                ease: 'power2.out',
                transformOrigin: 'bottom center',
                overwrite: 'auto',
            });
        });
    });

    const resetIcons = contextSafe(() => {
        const dock = dockRef.current;
        if (!dock) return;
        const icons = dock.querySelectorAll('.dock-icon');

        icons.forEach((icon) => {
            gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.45,
                ease: 'elastic.out(1, 0.6)',
                transformOrigin: 'bottom center',
                overwrite: 'auto',
            });
        });
    });

    const toggleApp = (app) => { }

    return (
        <div id="dock">
            <div ref={dockRef} className='dock-container' onMouseMove={handleMouseMove} onMouseLeave={resetIcons}>
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className='relative flex justify-center'>
                        <button type='button' className='dock-icon' aria-label={name} data-tooltip-id='dock-tooltip' data-tooltip-content={name} data-tooltip-delay-show={150} disabled={!canOpen} onClick={() => toggleApp({ id, canOpen })}>
                            <img src={`/images/${icon}`} alt={`${name} icon`} loading='lazy' className={canOpen ? '' : 'opacity-60'} />
                        </button>
                    </div>
                ))}

                <Tooltip id='dock-tooltip' place='top' className='font-inter font-medium tooltip text-xs' />
            </div>
        </div>
    )
}

export default Dock