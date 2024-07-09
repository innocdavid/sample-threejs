import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshBasicMaterial, DoubleSide, MultiplyOperation } from 'three';
import { useGLTF, useTexture, Decal } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { easing } from 'maath';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF('/shirt_baked.glb');

  const stateString = JSON.stringify(snap);

  const shirtDesignerLogoDecal = useTexture(snap.shirtDesignerLogoDecal);
  const shirtClubLogo = useTexture(snap.shirtClubLogoDecal);
  const shirtClubPartnersLogoDecal = useTexture(snap.shirtClubPartnersLogoDecal);

  const material = useMemo(() => {
    return new MeshBasicMaterial({
      color: snap.color,
      opacity: 0.5,
      // side: DoubleSide,
      combine: MultiplyOperation
    });
  }, [snap.color]);

  useFrame((state, delta) => {
    easing.dampC(material.color, snap.color, 0.25, delta);
  });

  return (
    <group key={stateString}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={material} 
        dispose={null}
      >
          <>
            { shirtDesignerLogoDecal && (
              <Decal 
                position={[0.07, 0.08, 0.14]}
                rotation={[0, 0, 0]}
                scale={0.05}
                map={shirtDesignerLogoDecal}
                anisotropy={16}
                depthTest={false}
                depthWrite={true}
              />
            )}

            { shirtClubLogo && (
              <Decal 
                position={[-0.08, 0.08, 0.14]}
                rotation={[0, 0, 0]}
                scale={0.05} 
                map={shirtClubLogo}
                anisotropy={16}
                depthTest={false}
                depthWrite={true}
              />
            )}

            { shirtClubPartnersLogoDecal && (
              <Decal 
                position={[0, -0.006, 0.19]}
                rotation={[0, 0, 0]}
                scale={0.15}
                map={shirtClubPartnersLogoDecal}
                anisotropy={16}
                depthTest={false}
                depthWrite={true}
              />
            )}
          </>
      </mesh>
    </group>
  );
};

export default Shirt;
