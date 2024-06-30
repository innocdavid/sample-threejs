import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  // Track mouse positions
  let startX, startY, isDragging = false;

  useEffect(() => {
    const handleMouseDown = (event) => {
      startX = event.clientX;
      startY = event.clientY;
      isDragging = true;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        const deltaX = event.clientX - startX;
        group.current.rotation.y += deltaX * 0.01;
        // Remove deltaY adjustments to prevent vertical rotation
        startX = event.clientX;
        // Remove updating of startY to prevent vertical rotation
      }
    };    

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // Set camera position smoothly
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Optionally, you can smooth out the rotation changes here if needed
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
