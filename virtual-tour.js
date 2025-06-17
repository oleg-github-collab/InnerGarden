/**
 * virtual-tour.js
 * 3D virtual tour using Three.js
 */

import Utils from './utils.js';
import { SoundManager } from './sound-manager.js';

export class Virtual3DTour {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentRoom = 0;
        this.rooms = [];
        this.artworks = [];
        this.isVR = false;
        this.loadingManager = null;
        this.raycaster = null;
        this.mouse = new THREE.Vector2();
        this.intersects = [];
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.init();
    }

    init() {
        this.createUI();
        this.initThreeJS();
        this.createRooms();
        this.createLighting();
        this.bindEvents();
        this.startAnimation();
    }

    createUI() {
        const ui = document.createElement('div');
        ui.className = 'tour-ui';
        ui.innerHTML = `
            <div class="tour-controls">
                <button class="tour-btn" id="start-tour" data-translate="start3DTour">Start 3D Tour</button>
                <button class="tour-btn" id="toggle-vr" data-translate="enterVR">Enter VR</button>
                <div class="room-selector">
                    <button class="room-btn active" data-room="0" data-translate="room1">Nature Room</button>
                    <button class="room-btn" data-room="1" data-translate="room2">Emotional Space</button>
                    <button class="room-btn" data-room="2" data-translate="room3">Memory Hall</button>
                    <button class="room-btn" data-room="3" data-translate="room4">Interactive Zone</button>
                </div>
                <div class="tour-info">
                    <div class="controls-help" data-translate="moveInstructions">Use WASD or arrow keys to move</div>
                    <div class="interaction-help" data-translate="clickToInteract">Click to interact</div>
                </div>
            </div>
            <div class="tour-viewer">
                <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Loading 3D Environment...</div>
                </div>
            </div>
        `;
        
        this.container.appendChild(ui);
        this.viewer = ui.querySelector('.tour-viewer');
    }

    initThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.viewer.clientWidth / this.viewer.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1.6, 5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.viewer.clientWidth, this.viewer.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.viewer.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new THREE.PointerLockControls(this.camera, this.renderer.domElement);
        
        // Raycaster for interactions
        this.raycaster = new THREE.Raycaster();

        // Loading manager
        this.loadingManager = new THREE.LoadingManager();
        this.loadingManager.onLoad = () => {
            this.hideLoading();
        };

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    createRooms() {
        // Room geometries and materials
        const roomGeometry = new THREE.BoxGeometry(20, 10, 20);
        const roomMaterials = [
            new THREE.MeshLambertMaterial({ color: 0x8fbc8f }), // Nature - Green
            new THREE.MeshLambertMaterial({ color: 0x4682b4 }), // Emotional - Blue
            new THREE.MeshLambertMaterial({ color: 0xdda0dd }), // Memory - Purple
            new THREE.MeshLambertMaterial({ color: 0xf0e68c })  // Interactive - Yellow
        ];

        const roomData = [
            { name: 'Nature Room', color: 0x8fbc8f, artworks: this.createNatureArtworks() },
            { name: 'Emotional Space', color: 0x4682b4, artworks: this.createEmotionalArtworks() },
            { name: 'Memory Hall', color: 0xdda0dd, artworks: this.createMemoryArtworks() },
            { name: 'Interactive Zone', color: 0xf0e68c, artworks: this.createInteractiveArtworks() }
        ];

        roomData.forEach((data, index) => {
            const room = new THREE.Group();
            room.name = data.name;

            // Floor
            const floorGeometry = new THREE.PlaneGeometry(20, 20);
            const floorMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color(data.color).multiplyScalar(0.3) 
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.receiveShadow = true;
            room.add(floor);

            // Walls
            this.createWalls(room, data.color);

            // Artworks
            data.artworks.forEach(artwork => {
                room.add(artwork);
            });

            // Position rooms
            room.position.x = index * 25;
            this.scene.add(room);
            this.rooms.push(room);
        });
    }

    createWalls(room, color) {
        const wallGeometry = new THREE.PlaneGeometry(20, 10);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color(color).multiplyScalar(0.8) 
        });

        // North wall
        const northWall = new THREE.Mesh(wallGeometry, wallMaterial);
        northWall.position.set(0, 5, -10);
        northWall.castShadow = true;
        room.add(northWall);

        // South wall
        const southWall = new THREE.Mesh(wallGeometry, wallMaterial);
        southWall.position.set(0, 5, 10);
        southWall.rotation.y = Math.PI;
        southWall.castShadow = true;
        room.add(southWall);

        // East wall
        const eastWall = new THREE.Mesh(wallGeometry, wallMaterial);
        eastWall.position.set(10, 5, 0);
        eastWall.rotation.y = -Math.PI / 2;
        eastWall.castShadow = true;
        room.add(eastWall);

        // West wall
        const westWall = new THREE.Mesh(wallGeometry, wallMaterial);
        westWall.position.set(-10, 5, 0);
        westWall.rotation.y = Math.PI / 2;
        westWall.castShadow = true;
        room.add(westWall);
    }

    createNatureArtworks() {
        const artworks = [];
        
        // Create nature-themed artwork representations
        for (let i = 0; i < 6; i++) {
            const artwork = this.createArtworkFrame();
            artwork.position.set(
                -8 + (i % 3) * 8,
                3,
                -9.5 + Math.floor(i / 3) * 19
            );
            artwork.userData = {
                title: `Nature Artwork ${i + 1}`,
                description: 'A beautiful representation of nature\'s harmony',
                type: 'nature'
            };
            artworks.push(artwork);
        }

        return artworks;
    }

    createEmotionalArtworks() {
        const artworks = [];
        
        for (let i = 0; i < 8; i++) {
            const artwork = this.createArtworkFrame();
            const angle = (i / 8) * Math.PI * 2;
            artwork.position.set(
                Math.cos(angle) * 7,
                2 + Math.sin(i) * 2,
                Math.sin(angle) * 7
            );
            artwork.lookAt(0, artwork.position.y, 0);
            artwork.userData = {
                title: `Emotional Piece ${i + 1}`,
                description: 'An exploration of human emotions',
                type: 'emotional'
            };
            artworks.push(artwork);
        }

        return artworks;
    }

    createMemoryArtworks() {
        const artworks = [];
        
        for (let i = 0; i < 10; i++) {
            const artwork = this.createArtworkFrame();
            artwork.position.set(
                -9 + (i % 5) * 4.5,
                1.5 + Math.random() * 3,
                -8 + Math.floor(i / 5) * 16
            );
            artwork.rotation.y = (Math.random() - 0.5) * 0.5;
            artwork.userData = {
                title: `Memory Fragment ${i + 1}`,
                description: 'Capturing moments in time',
                type: 'memory'
            };
            artworks.push(artwork);
        }

        return artworks;
    }

    createInteractiveArtworks() {
        const artworks = [];
        
        // Create interactive installations
        for (let i = 0; i < 4; i++) {
            const installation = new THREE.Group();
            
            // Base
            const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.2);
            const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            installation.add(base);

            // Interactive element
            const elementGeometry = new THREE.SphereGeometry(0.5);
            const elementMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color().setHSL(i * 0.25, 0.7, 0.5),
                emissive: new THREE.Color().setHSL(i * 0.25, 0.3, 0.1)
            });
            const element = new THREE.Mesh(elementGeometry, elementMaterial);
            element.position.y = 1;
            installation.add(element);

            installation.position.set(
                -6 + (i % 2) * 12,
                0.1,
                -6 + Math.floor(i / 2) * 12
            );

            installation.userData = {
                title: `Interactive Installation ${i + 1}`,
                description: 'Touch to activate',
                type: 'interactive',
                interactive: true
            };

            artworks.push(installation);
        }

        return artworks;
    }

    createArtworkFrame() {
        const frame = new THREE.Group();
        
        // Frame
        const frameGeometry = new THREE.BoxGeometry(3, 2, 0.1);
        const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const frameModel = new THREE.Mesh(frameGeometry, frameMaterial);
        frameModel.castShadow = true;
        frame.add(frameModel);

        // Canvas
        const canvasGeometry = new THREE.PlaneGeometry(2.6, 1.6);
        const canvasMaterial = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.8) 
        });
        const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
        canvas.position.z = 0.051;
        frame.add(canvas);

        return frame;
    }

    createLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point lights in each room
        this.rooms.forEach((room, index) => {
            const pointLight = new THREE.PointLight(0xffffff, 0.8, 20);
            pointLight.position.set(index * 25, 8, 0);
            pointLight.castShadow = true;
            this.scene.add(pointLight);
        });
    }

    bindEvents() {
        // Start tour button
        const startBtn = this.container.querySelector('#start-tour');
        startBtn.addEventListener('click', () => {
            this.startTour();
        });

        // VR toggle
        const vrBtn = this.container.querySelector('#toggle-vr');
        vrBtn.addEventListener('click', () => {
            this.toggleVR();
        });

        // Room navigation
        const roomButtons = this.container.querySelectorAll('.room-btn');
        roomButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const roomIndex = parseInt(btn.getAttribute('data-room'));
                this.goToRoom(roomIndex);
                this.updateActiveRoom(btn);
            });
        });

        // Mouse interactions
        this.renderer.domElement.addEventListener('click', (event) => {
            this.handleClick(event);
        });

        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.handleMouseMove(event);
        });

        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        });

        document.addEventListener('keyup', (event) => {
            this.handleKeyUp(event);
        });
    }

    startTour() {
        this.controls.lock();
        this.container.querySelector('.tour-controls').style.display = 'block';
        SoundManager.play('transition');
    }

    toggleVR() {
        if (!this.isVR) {
            // Enter VR mode
            if (navigator.xr) {
                navigator.xr.requestSession('immersive-vr').then(session => {
                    this.renderer.xr.setSession(session);
                    this.isVR = true;
                    this.container.querySelector('#toggle-vr').textContent = 
                        window.languageManager?.t('exitVR') || 'Exit VR';
                }).catch(err => {
                    console.warn('VR not available:', err);
                    this.showVRFallback();
                });
            } else {
                this.showVRFallback();
            }
        } else {
            // Exit VR mode
            this.renderer.xr.getSession()?.end();
            this.isVR = false;
            this.container.querySelector('#toggle-vr').textContent = 
                window.languageManager?.t('enterVR') || 'Enter VR';
        }
    }

    showVRFallback() {
        // Create fullscreen stereoscopic view as VR fallback
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '999999';
        
        // Add exit button
        const exitBtn = document.createElement('button');
        exitBtn.textContent = 'Exit Fullscreen VR';
        exitBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000000;
            padding: 10px 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        
        exitBtn.addEventListener('click', () => {
            document.body.removeChild(this.renderer.domElement);
            document.body.removeChild(exitBtn);
            this.viewer.appendChild(this.renderer.domElement);
            this.handleResize();
        });
        
        document.body.appendChild(exitBtn);
    }

    goToRoom(roomIndex) {
        if (roomIndex < 0 || roomIndex >= this.rooms.length) return;
        
        this.currentRoom = roomIndex;
        
        // Animate camera to new room
        const targetPosition = new THREE.Vector3(roomIndex * 25, 1.6, 5);
        const startPosition = this.camera.position.clone();
        const duration = 2000;
        const startTime = Date.now();

        const animateTransition = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = Utils.easeInOutCubic(progress);

            this.camera.position.lerpVectors(startPosition, targetPosition, easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animateTransition);
            } else {
                SoundManager.play('success');
            }
        };

        animateTransition();
    }

    updateActiveRoom(activeBtn) {
        this.container.querySelectorAll('.room-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    handleClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            const artwork = this.findArtworkParent(object);
            
            if (artwork && artwork.userData) {
                this.showArtworkInfo(artwork.userData);
                SoundManager.play('click');
                
                if (artwork.userData.interactive) {
                    this.triggerInteractiveEffect(artwork);
                }
            }
        }
    }

    handleMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        // Update cursor style
        if (intersects.length > 0) {
            const object = intersects[0].object;
            const artwork = this.findArtworkParent(object);
            
            if (artwork && artwork.userData) {
                this.renderer.domElement.style.cursor = 'pointer';
            } else {
                this.renderer.domElement.style.cursor = 'default';
            }
        } else {
            this.renderer.domElement.style.cursor = 'default';
        }
    }

    findArtworkParent(object) {
        let parent = object;
        while (parent) {
            if (parent.userData && (parent.userData.title || parent.userData.interactive)) {
                return parent;
            }
            parent = parent.parent;
        }
        return null;
    }

    showArtworkInfo(userData) {
        // Create info panel
        const infoPanel = document.createElement('div');
        infoPanel.className = 'artwork-info-panel';
        infoPanel.innerHTML = `
            <div class="info-content">
                <h3>${userData.title}</h3>
                <p>${userData.description}</p>
                <button class="close-info">×</button>
            </div>
        `;

        infoPanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            z-index: 10000;
            max-width: 400px;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(infoPanel);

        // Close button
        infoPanel.querySelector('.close-info').addEventListener('click', () => {
            document.body.removeChild(infoPanel);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(infoPanel)) {
                document.body.removeChild(infoPanel);
            }
        }, 5000);
    }

    triggerInteractiveEffect(artwork) {
        // Create particle effect
        const particleCount = 20;
        const particles = new THREE.Group();

        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(
                new THREE.SphereGeometry(0.02),
                new THREE.MeshBasicMaterial({ 
                    color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6) 
                })
            );

            particle.position.copy(artwork.position);
            particle.position.add(new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ));

            particle.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    Math.random() * 0.1,
                    (Math.random() - 0.5) * 0.1
                ),
                life: 1.0
            };

            particles.add(particle);
        }

        this.scene.add(particles);

        // Animate particles
        const animateParticles = () => {
            let activeParticles = 0;

            particles.children.forEach(particle => {
                if (particle.userData.life > 0) {
                    particle.position.add(particle.userData.velocity);
                    particle.userData.velocity.y -= 0.002; // gravity
                    particle.userData.life -= 0.02;
                    particle.material.opacity = particle.userData.life;
                    activeParticles++;
                }
            });

            if (activeParticles > 0) {
                requestAnimationFrame(animateParticles);
            } else {
                this.scene.remove(particles);
            }
        };

        animateParticles();
    }

    handleKeyDown(event) {
        // Handle WASD movement when controls are locked
        if (this.controls.isLocked) {
            switch (event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.moveForward = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.moveBackward = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.moveLeft = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.moveRight = true;
                    break;
            }
        }
    }

    handleKeyUp(event) {
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.moveForward = false;
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.moveBackward = false;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.moveLeft = false;
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.moveRight = false;
                break;
        }
    }

    updateMovement() {
        const direction = new THREE.Vector3();
        const rotation = new THREE.Euler(0, 0, 0, 'YXZ');
        
        if (this.controls.isLocked) {
            rotation.setFromQuaternion(this.camera.quaternion);
            
            if (this.moveForward) direction.z -= 1;
            if (this.moveBackward) direction.z += 1;
            if (this.moveLeft) direction.x -= 1;
            if (this.moveRight) direction.x += 1;
            
            direction.normalize();
            direction.applyEuler(rotation);
            direction.y = 0; // Prevent flying
            
            const speed = 0.1;
            this.camera.position.add(direction.multiplyScalar(speed));
            
            // Keep camera at reasonable height
            this.camera.position.y = Math.max(1.6, this.camera.position.y);
        }
    }

    startAnimation() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            this.updateMovement();
            
            // Animate interactive installations
            this.rooms[3]?.children.forEach(child => {
                if (child.userData && child.userData.interactive) {
                    child.rotation.y += 0.01;
                    const element = child.children[1]; // The sphere
                    if (element) {
                        element.position.y = 1 + Math.sin(Date.now() * 0.003) * 0.2;
                    }
                }
            });
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }

    handleResize() {
        const width = this.viewer.clientWidth;
        const height = this.viewer.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    hideLoading() {
        const overlay = this.container.querySelector('.loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.scene) {
            this.scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        }
    }
}