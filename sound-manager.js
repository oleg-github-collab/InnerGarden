/**
 * INNER GARDEN - Sound Manager
 * @module soundManager
 */

import CONFIG from './config.js';
import { Storage } from './utils.js';

/**
 * Sound Manager Class
 * Handles all audio functionality including sound effects and ambient sounds
 */
export class SoundManager {
    constructor() {
        this.context = null;
        this.sounds = {};
        this.ambientSounds = {};
        this.enabled = this.getStoredSetting();
        this.volume = CONFIG.sound.volume;
        this.initialized = false;
        this.suspended = false;
        this.init();
    }

    /**
     * Initialize sound manager
     */
    async init() {
        try {
            // Initialize audio context
            await this.initAudioContext();
            
            // Create sound library
            this.createSounds();
            
            // Bind user interaction to resume context
            this.bindUserInteraction();
            
            // Mark as initialized
            this.initialized = true;
            
            console.log('Sound Manager initialized');
        } catch (error) {
            console.warn('Sound Manager initialization error:', error);
        }
    }

    /**
     * Initialize Web Audio API context
     */
    async initAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
            
            // Create master gain node
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = this.volume;
            this.masterGain.connect(this.context.destination);
            
            // Create compressor for better sound
            this.compressor = this.context.createDynamicsCompressor();
            this.compressor.connect(this.masterGain);
            
            // Handle context suspension
            if (this.context.state === 'suspended') {
                this.suspended = true;
            }
        } catch (error) {
            console.error('Web Audio API not supported:', error);
            this.enabled = false;
        }
    }

    /**
     * Get stored sound setting
     * @returns {boolean} Sound enabled state
     */
    getStoredSetting() {
        const stored = Storage.get(CONFIG.storage.prefix + CONFIG.storage.keys.sound);
        return stored !== null ? stored : CONFIG.sound.enabled;
    }

    /**
     * Save sound setting
     * @param {boolean} enabled - Sound enabled state
     */
    saveStoredSetting(enabled) {
        Storage.set(CONFIG.storage.prefix + CONFIG.storage.keys.sound, enabled);
    }

    /**
     * Create sound library
     */
    createSounds() {
        // UI Sounds
        this.sounds.click = () => this.playTone(
            CONFIG.sound.sounds.click.frequency,
            CONFIG.sound.sounds.click.duration,
            CONFIG.sound.sounds.click.type
        );
        
        this.sounds.hover = () => this.playTone(
            CONFIG.sound.sounds.hover.frequency,
            CONFIG.sound.sounds.hover.duration,
            CONFIG.sound.sounds.hover.type,
            0.3
        );
        
        this.sounds.success = () => this.playChord(
            CONFIG.sound.sounds.success.frequencies,
            CONFIG.sound.sounds.success.duration
        );
        
        this.sounds.error = () => this.playTone(
            CONFIG.sound.sounds.error.frequency,
            CONFIG.sound.sounds.error.duration,
            CONFIG.sound.sounds.error.type
        );
        
        this.sounds.notification = () => this.playChord(
            CONFIG.sound.sounds.notification.frequencies,
            CONFIG.sound.sounds.notification.duration
        );
        
        // Transition sounds
        this.sounds.transition = () => this.playTransition(
            CONFIG.sound.sounds.transition.startFreq,
            CONFIG.sound.sounds.transition.endFreq,
            CONFIG.sound.sounds.transition.duration
        );
        
        // Special effects
        this.sounds.whoosh = () => this.playNoise(0.2, 'highpass', 2000);
        this.sounds.magic = () => this.playMagicalSound();
        this.sounds.ambient = () => this.createAmbientSound();
        
        // Interactive wall sounds
        this.sounds.wallAdd = () => this.playWallAddSound();
        this.sounds.wallInteract = () => this.playWallInteractSound();
        
        // Gallery sounds
        this.sounds.galleryOpen = () => this.playGalleryOpenSound();
        this.sounds.gallerySwipe = () => this.playGallerySwipeSound();
        
        // 3D Tour sounds
        this.sounds.footstep = () => this.playFootstepSound();
        this.sounds.roomTransition = () => this.playRoomTransitionSound();
    }

    /**
     * Bind user interaction to resume audio context
     */
    bindUserInteraction() {
        const resumeContext = async () => {
            if (this.context && this.context.state === 'suspended') {
                try {
                    await this.context.resume();
                    this.suspended = false;
                    console.log('Audio context resumed');
                } catch (error) {
                    console.warn('Failed to resume audio context:', error);
                }
            }
        };

        // Resume on first user interaction
        ['click', 'touchstart', 'keydown'].forEach(event => {
            document.addEventListener(event, resumeContext, { once: true });
        });
    }

    /**
     * Play a tone
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in seconds
     * @param {string} type - Oscillator type
     * @param {number} volume - Volume (0-1)
     */
    playTone(frequency, duration, type = 'sine', volume = 0.5) {
        if (!this.canPlay()) return;

        try {
            const now = this.context.currentTime;
            
            // Create oscillator
            const oscillator = this.context.createOscillator();
            oscillator.frequency.setValueAtTime(frequency, now);
            oscillator.type = type;
            
            // Create gain envelope
            const gainNode = this.context.createGain();
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(volume * this.volume, now + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
            
            // Create filter for smoother sound
            const filter = this.context.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(frequency * 2, now);
            
            // Connect nodes
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.compressor);
            
            // Play
            oscillator.start(now);
            oscillator.stop(now + duration);
        } catch (error) {
            console.warn('Error playing tone:', error);
        }
    }

    /**
     * Play a chord
     * @param {Array<number>} frequencies - Array of frequencies
     * @param {number} duration - Duration in seconds
     * @param {number} volume - Volume (0-1)
     */
    playChord(frequencies, duration, volume = 0.3) {
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, duration, 'sine', volume / frequencies.length);
            }, index * 50);
        });
    }

    /**
     * Play noise
     * @param {number} duration - Duration in seconds
     * @param {string} filterType - Filter type
     * @param {number} filterFreq - Filter frequency
     */
    playNoise(duration, filterType = 'lowpass', filterFreq = 1000) {
        if (!this.canPlay()) return;

        try {
            const now = this.context.currentTime;
            const bufferSize = this.context.sampleRate * duration;
            
            // Create noise buffer
            const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
            }
            
            // Create buffer source
            const noise = this.context.createBufferSource();
            noise.buffer = buffer;
            
            // Create filter
            const filter = this.context.createBiquadFilter();
            filter.type = filterType;
            filter.frequency.setValueAtTime(filterFreq, now);
            
            // Create gain envelope
            const gainNode = this.context.createGain();
            gainNode.gain.setValueAtTime(0.2 * this.volume, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
            
            // Connect nodes
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.compressor);
            
            // Play
            noise.start(now);
        } catch (error) {
            console.warn('Error playing noise:', error);
        }
    }

    /**
     * Play transition sound
     * @param {number} startFreq - Start frequency
     * @param {number} endFreq - End frequency
     * @param {number} duration - Duration in seconds
     */
    playTransition(startFreq, endFreq, duration) {
        if (!this.canPlay()) return;

        try {
            const now = this.context.currentTime;
            
            // Create oscillator
            const oscillator = this.context.createOscillator();
            oscillator.frequency.setValueAtTime(startFreq, now);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
            
            // Create gain envelope
            const gainNode = this.context.createGain();
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3 * this.volume, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
            
            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(this.compressor);
            
            // Play
            oscillator.start(now);
            oscillator.stop(now + duration);
        } catch (error) {
            console.warn('Error playing transition:', error);
        }
    }

    /**
     * Play magical sound effect
     */
    playMagicalSound() {
        const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 0.4, 'sine', 0.15);
            }, index * 100);
        });
    }

    /**
     * Play wall add sound
     */
    playWallAddSound() {
        this.playChord([523.25, 659.25, 783.99], 0.3);
        setTimeout(() => {
            this.playTone(1046.50, 0.2, 'sine', 0.2);
        }, 200);
    }

    /**
     * Play wall interact sound
     */
    playWallInteractSound() {
        this.playTone(440, 0.1, 'sine', 0.3);
        setTimeout(() => {
            this.playTone(554.37, 0.1, 'sine', 0.25);
        }, 50);
    }

    /**
     * Play gallery open sound
     */
    playGalleryOpenSound() {
        this.playTransition(200, 800, 0.3);
        setTimeout(() => {
            this.playTone(1200, 0.1, 'sine', 0.2);
        }, 250);
    }

    /**
     * Play gallery swipe sound
     */
    playGallerySwipeSound() {
        this.playNoise(0.1, 'bandpass', 2000);
    }

    /**
     * Play footstep sound
     */
    playFootstepSound() {
        const freq = 80 + Math.random() * 40;
        this.playTone(freq, 0.05, 'square', 0.1);
    }

    /**
     * Play room transition sound
     */
    playRoomTransitionSound() {
        this.playTransition(400, 100, 0.5);
        setTimeout(() => {
            this.playTransition(100, 400, 0.5);
        }, 400);
    }

    /**
     * Create ambient sound
     * @returns {Object} Ambient sound controller
     */
    createAmbientSound() {
        if (!this.canPlay() || !CONFIG.sound.ambientEnabled) return null;

        try {
            const now = this.context.currentTime;
            
            // Create multiple oscillators for rich ambient sound
            const oscillators = [];
            const gains = [];
            const baseFreq = 110; // A2
            
            for (let i = 0; i < 4; i++) {
                const oscillator = this.context.createOscillator();
                const gainNode = this.context.createGain();
                const filter = this.context.createBiquadFilter();
                
                // Harmonic frequencies
                oscillator.frequency.setValueAtTime(baseFreq * (i + 1), now);
                oscillator.type = 'sine';
                
                // Random modulation
                const lfo = this.context.createOscillator();
                lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.2, now);
                const lfoGain = this.context.createGain();
                lfoGain.gain.setValueAtTime(5, now);
                
                lfo.connect(lfoGain);
                lfoGain.connect(oscillator.frequency);
                
                // Filter setup
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(1000, now);
                filter.Q.setValueAtTime(1, now);
                
                // Gain setup
                gainNode.gain.setValueAtTime(0.05 * this.volume / (i + 1), now);
                
                // Connect
                oscillator.connect(filter);
                filter.connect(gainNode);
                gainNode.connect(this.compressor);
                
                // Start
                oscillator.start(now);
                lfo.start(now);
                
                oscillators.push(oscillator);
                gains.push(gainNode);
            }
            
            // Return controller
            return {
                stop: () => {
                    oscillators.forEach(osc => osc.stop());
                },
                setVolume: (volume) => {
                    gains.forEach((gain, i) => {
                        gain.gain.setValueAtTime(volume * 0.05 / (i + 1), this.context.currentTime);
                    });
                }
            };
        } catch (error) {
            console.warn('Error creating ambient sound:', error);
            return null;
        }
    }

    /**
     * Play sound by name
     * @param {string} soundName - Sound name
     */
    play(soundName) {
        if (!this.sounds[soundName]) {
            console.warn(`Sound "${soundName}" not found`);
            return;
        }

        try {
            this.sounds[soundName]();
        } catch (error) {
            console.warn(`Error playing sound "${soundName}":`, error);
        }
    }

    /**
     * Check if sound can be played
     * @returns {boolean} Can play
     */
    canPlay() {
        return this.enabled && this.initialized && this.context && !this.suspended;
    }

    /**
     * Toggle sound on/off
     * @returns {boolean} New enabled state
     */
    toggle() {
        this.enabled = !this.enabled;
        this.saveStoredSetting(this.enabled);
        
        // Stop all ambient sounds if disabling
        if (!this.enabled) {
            this.stopAllAmbient();
        }
        
        return this.enabled;
    }

    /**
     * Set master volume
     * @param {number} volume - Volume (0-1)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.volume, this.context.currentTime);
        }
    }

    /**
     * Get current volume
     * @returns {number} Current volume
     */
    getVolume() {
        return this.volume;
    }

    /**
     * Enable sound
     */
    enable() {
        if (!this.enabled) {
            this.enabled = true;
            this.saveStoredSetting(true);
        }
    }

    /**
     * Disable sound
     */
    disable() {
        if (this.enabled) {
            this.enabled = false;
            this.saveStoredSetting(false);
            this.stopAllAmbient();
        }
    }

    /**
     * Check if sound is enabled
     * @returns {boolean} Enabled state
     */
    isEnabled() {
        return this.enabled;
    }

    /**
     * Stop all ambient sounds
     */
    stopAllAmbient() {
        Object.values(this.ambientSounds).forEach(sound => {
            if (sound && sound.stop) {
                sound.stop();
            }
        });
        this.ambientSounds = {};
    }

    /**
     * Resume audio context
     */
    async resume() {
        if (this.context && this.context.state === 'suspended') {
            try {
                await this.context.resume();
                this.suspended = false;
                return true;
            } catch (error) {
                console.warn('Failed to resume audio:', error);
                return false;
            }
        }
        return true;
    }

    /**
     * Suspend audio context
     */
    async suspend() {
        if (this.context && this.context.state === 'running') {
            try {
                await this.context.suspend();
                this.suspended = true;
                return true;
            } catch (error) {
                console.warn('Failed to suspend audio:', error);
                return false;
            }
        }
        return true;
    }

    /**
     * Get audio context state
     * @returns {string} Context state
     */
    getState() {
        return this.context ? this.context.state : 'closed';
    }

    /**
     * Destroy sound manager
     */
    destroy() {
        this.stopAllAmbient();
        
        if (this.context) {
            this.context.close();
            this.context = null;
        }
        
        this.sounds = {};
        this.initialized = false;
    }
}

// Create and export singleton instance
const soundManager = new SoundManager();

// Export both class and instance
export default soundManager;
export { soundManager };