/**
 * Audio Visualizer using Web Audio API
 * Renders a waveform on a canvas element based on audio input.
 */

class AudioVisualizer {
    constructor(audioElementId, canvasElementId) {
        this.audio = document.getElementById(audioElementId);
        this.canvas = document.getElementById(canvasElementId);
        this.ctx = this.canvas.getContext('2d');
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.source = null;
        this.isInitialized = false;
        this.animationId = null;

        // Resize canvas to fit container
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Initialize on user interaction (required by browsers)
        const overlay = document.getElementById('play-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.init();
                this.audio.play();
                overlay.style.display = 'none';
            });
        }

        // Also allow init if audio is played programmatically
        this.audio.addEventListener('play', () => {
            if (!this.isInitialized) this.init();
        });
    }

    resize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    init() {
        if (this.isInitialized) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            this.analyser = this.audioContext.createAnalyser();

            // Connect audio source
            this.source = this.audioContext.createMediaElementSource(this.audio);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);

            // Configure analyser
            this.analyser.fftSize = 2048;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);

            this.isInitialized = true;
            this.animate();
        } catch (e) {
            console.error("Audio Context initialization failed:", e);
        }
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        const width = this.canvas.width;
        const height = this.canvas.height;

        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
        this.ctx.fillRect(0, 0, width, height);

        if (!this.isInitialized) return;

        this.analyser.getByteTimeDomainData(this.dataArray);

        // Check if data is silent (all 128 or all 0) while audio is playing
        let isSilent = true;
        if (!this.audio.paused) {
            for (let i = 0; i < this.dataArray.length; i++) {
                // 128 is silence in 8-bit unsigned, 0 is "zeroes" from CORS error
                if (this.dataArray[i] !== 128 && this.dataArray[i] !== 0) {
                    isSilent = false;
                    break;
                }
            }
        }

        // Fallback: Generate fake waveform if silent but playing (CORS issue or silence)
        if (isSilent && !this.audio.paused) {
            if (!this.corsLogged) {
                console.warn("Visualizer: CORS restrictions detected (audio blocked). Running in simulation mode.");
                this.corsLogged = true;
            }

            const time = Date.now() / 1000;
            for (let i = 0; i < this.dataArray.length; i++) {
                // Generate a cool sci-fi waveform
                const x = i / this.dataArray.length;
                const v = Math.sin(x * 10 + time * 5) * Math.cos(x * 25 + time * 2) * 0.5 + 0.5;
                // Add some noise
                const noise = (Math.random() - 0.5) * 0.1;
                this.dataArray[i] = (v + noise) * 128 + 64; // Scale to byte range
            }
        } else {
            this.corsLogged = false;
        }

        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#00ff9d'; // Cyber Green
        this.ctx.beginPath();

        const sliceWidth = width * 1.0 / this.dataArray.length;
        let x = 0;

        for (let i = 0; i < this.dataArray.length; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = v * height / 2;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.ctx.lineTo(width, height / 2);
        this.ctx.stroke();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.visualizer = new AudioVisualizer('my-audio', 'visualizer-canvas');
});
