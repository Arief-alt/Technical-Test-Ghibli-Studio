'use client'

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const ThreeDBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x020714);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        mountRef.current?.appendChild(renderer.domElement);

        const starsGeometry = new THREE.BufferGeometry();
        const starPositions = [];
        const starSizes = [];
        const starColors = [];

        const numberOfStars = 500;
        for (let i = 0; i < numberOfStars; i++) {
            starPositions.push(
                Math.random() * 800 - 400,
                Math.random() * 800 - 400,
                Math.random() * 800 - 400
            );
            starSizes.push(Math.random() * 1.5);
            starColors.push(
                0.2 + Math.random() * 0.8,
                0.5 + Math.random() * 0.5,
                0.9 + Math.random() * 0.1
            );
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
        starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
        starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

        const starsMaterial = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        const bubbleGroup = new THREE.Group();
        const bubbleMaterial = new THREE.MeshPhongMaterial({
            color: 0x4499ff,
            transparent: true,
            opacity: 0.15,
            specular: 0x555555,
            shininess: 100,
            side: THREE.DoubleSide
        });

        const numberOfBubbles = 10;
        for (let i = 0; i < numberOfBubbles; i++) {
            const size = 2 + Math.random() * 6;
            const bubble = new THREE.Mesh(
                new THREE.SphereGeometry(size, 16, 16),
                bubbleMaterial.clone()
            );
            bubble.position.set(
                Math.random() * 60 - 30,
                Math.random() * 60 - 30,
                Math.random() * 60 - 30
            );
            bubble.userData = {
                speed: 0.005 + Math.random() * 0.01,
                amplitude: 1 + Math.random() * 2
            };
            bubbleGroup.add(bubble);
        }
        scene.add(bubbleGroup);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x88ccff, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),

            1.0,
            0.3,
            0.85
        );
        bloomPass.threshold = 0;
        bloomPass.strength = 1.0;
        bloomPass.radius = 0.4;
        composer.addPass(bloomPass);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate bubbles
            bubbleGroup.rotation.y += 0.0005; // Slower rotation
            bubbleGroup.children.forEach(bubble => {
                bubble.position.y += Math.sin(Date.now() * bubble.userData.speed) * 0.02; // Slower bobbing
            });

            starField.rotation.x += 0.00005;
            starField.rotation.y += 0.0001;

            composer.render();
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
                renderer.dispose();
                starsGeometry.dispose();
                starsMaterial.dispose();
                bubbleMaterial.dispose();
                scene.remove(starField);
                scene.remove(bubbleGroup);
                bubbleGroup.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        child.geometry.dispose();
                    }
                });
            }
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%'}} />;
};

export default ThreeDBackground;