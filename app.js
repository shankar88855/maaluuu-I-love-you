// Victorian Romantic Journey JavaScript

// Application State
let currentStep = 0;
let musicEnabled = false;
let musicAudio = null;

// Step configuration
const steps = [
    {
        id: 'envelope',
        element: 'step-envelope',
        instruction: 'Step 1 of 4 – Touch the envelope to open your first message',
        interactive: 'envelope',
        continueButton: 'continue-1'
    },
    {
        id: 'rose',
        element: 'step-rose', 
        instruction: 'Step 2 of 4 – Touch the rose to make it bloom',
        interactive: 'rose',
        continueButton: 'continue-2'
    },
    {
        id: 'key',
        element: 'step-key',
        instruction: 'Step 3 of 4 – Touch the key to unlock the next secret',
        interactive: 'key',
        continueButton: 'continue-3'
    },
    {
        id: 'locket',
        element: 'step-locket',
        instruction: 'Step 4 of 4 – Touch your heart to unlock the final secret',
        interactive: 'locket',
        continueButton: null
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌹 Victorian Love Journey Initializing... 🌹');
    
    // Small delay to ensure all elements are loaded
    setTimeout(() => {
        // Load saved progress from localStorage
        loadProgress();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize audio context for music
        initializeMusic();
        
        console.log('✨ Victorian Love Journey Ready! ✨');
    }, 100);
});

function setupEventListeners() {
    console.log('🔧 Setting up romantic event listeners...');
    
    // Welcome screen - Begin Journey button
    const beginButton = document.getElementById('begin-journey');
    if (beginButton) {
        // Remove any existing listeners
        beginButton.replaceWith(beginButton.cloneNode(true));
        const newBeginButton = document.getElementById('begin-journey');
        
        newBeginButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('💖 Begin Journey button clicked!');
            startJourney();
        });
        
        // Touch support for mobile
        newBeginButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📱 Begin Journey button touched!');
            startJourney();
        });
        
        // Keyboard support
        newBeginButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                startJourney();
            }
        });
        
        console.log('✅ Begin Journey button listeners added');
    } else {
        console.error('❌ Begin Journey button not found!');
    }
    
    // Step 1: Envelope
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep === 0) {
                console.log('📜 Opening the romantic envelope...');
                openEnvelope();
            }
        });
    }
    
    // Step 2: Rose
    const rose = document.getElementById('rose');
    if (rose) {
        rose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep === 1) {
                console.log('🌹 Making the rose bloom...');
                bloomRose();
            }
        });
    }
    
    // Step 3: Key
    const key = document.getElementById('key');
    if (key) {
        key.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep === 2) {
                console.log('🔑 Spinning the antique key...');
                spinKey();
            }
        });
    }
    
    // Step 4: Locket
    const locket = document.getElementById('locket');
    if (locket) {
        locket.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep === 3) {
                console.log('💖 Opening the heart locket...');
                openLocket();
            }
        });
    }
    
    // Continue buttons
    for (let i = 1; i <= 3; i++) {
        const continueBtn = document.getElementById(`continue-${i}`);
        if (continueBtn) {
            continueBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`➡️ Continuing to next step from step ${i}...`);
                advanceStep();
            });
        }
    }
    
    // Replay button
    const replayBtn = document.getElementById('replay-journey');
    if (replayBtn) {
        replayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔄 Replaying the romantic journey...');
            resetJourney();
        });
    }
    
    // Music toggle
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMusic();
        });
    }
    
    console.log('✅ All romantic event listeners setup completed!');
}

function loadProgress() {
    // Reset to step 0 for fresh experience each time
    currentStep = 0;
    console.log('📖 Starting fresh romantic journey');
}

function saveProgress() {
    localStorage.setItem('romanticJourneyStep', currentStep.toString());
    console.log(`💾 Progress saved: Step ${currentStep}`);
}

function startJourney() {
    console.log('🎭 Starting the romantic journey...');
    
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const mainJourney = document.getElementById('main-journey');
    
    if (!welcomeOverlay || !mainJourney) {
        console.error('❌ Required elements not found for journey start');
        return;
    }
    
    // Fade out welcome screen
    welcomeOverlay.classList.add('fade-out');
    
    setTimeout(() => {
        welcomeOverlay.style.display = 'none';
        mainJourney.classList.remove('hidden');
        
        // Reset to first step
        currentStep = 0;
        
        // Initialize the journey at the first step
        showStep(currentStep);
        updateProgress();
        updateInstruction();
        
        console.log('🎭 Journey started successfully at step 0!');
    }, 1200);
}

function showStep(stepIndex) {
    console.log(`🎯 Showing step ${stepIndex}: ${steps[stepIndex]?.id}`);
    
    // Hide all steps first
    steps.forEach((step, index) => {
        const element = document.getElementById(step.element);
        if (element) {
            element.classList.remove('active');
        }
    });
    
    // Show current step
    if (steps[stepIndex]) {
        const currentElement = document.getElementById(steps[stepIndex].element);
        if (currentElement) {
            currentElement.classList.add('active');
            console.log(`✅ Step ${stepIndex} (${steps[stepIndex].id}) is now active`);
        }
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const percentage = ((currentStep + 1) / steps.length) * 100;
        progressFill.style.width = `${percentage}%`;
        console.log(`📊 Progress updated: ${percentage}%`);
    }
}

function updateInstruction() {
    const instructionText = document.querySelector('.instruction-text');
    if (instructionText && steps[currentStep]) {
        instructionText.textContent = steps[currentStep].instruction;
        console.log(`📋 Instruction updated: ${steps[currentStep].instruction}`);
    }
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const continueBtn = document.getElementById('continue-1');
    
    if (!envelope) {
        console.error('❌ Envelope element not found');
        return;
    }
    
    // Add opened class for flip animation
    envelope.classList.add('opened');
    
    // Show continue button after animation
    setTimeout(() => {
        if (continueBtn) {
            continueBtn.classList.remove('hidden');
        }
    }, 800);
    
    console.log('📜 Envelope opened with romantic message revealed!');
}

function bloomRose() {
    const rose = document.getElementById('rose');
    const roseContent = document.querySelector('#step-rose .rose-content');
    
    if (!rose) {
        console.error('❌ Rose element not found');
        return;
    }
    
    // Add bloomed class for scaling and rotation
    rose.classList.add('bloomed');
    
    // Show rose content after bloom animation
    setTimeout(() => {
        if (roseContent) {
            roseContent.classList.remove('hidden');
        }
    }, 800);
    
    console.log('🌹 Rose has bloomed beautifully!');
}

function spinKey() {
    const key = document.getElementById('key');
    const keyContent = document.querySelector('#step-key .key-content');
    
    if (!key) {
        console.error('❌ Key element not found');
        return;
    }
    
    // Add spun class for rotation animation
    key.classList.add('spun');
    
    // Show key content after spin animation
    setTimeout(() => {
        if (keyContent) {
            keyContent.classList.remove('hidden');
        }
    }, 800);
    
    console.log('🔑 Antique key has spun and unlocked the secret!');
}

function openLocket() {
    const locketClosed = document.querySelector('#step-locket .locket-closed');
    const locketOpened = document.querySelector('#step-locket .locket-opened');
    const confettiContainer = document.getElementById('confetti-container');
    
    if (!locketClosed || !locketOpened) {
        console.error('❌ Locket elements not found');
        return;
    }
    
    // Hide closed locket and show opened locket
    locketClosed.style.display = 'none';
    locketOpened.classList.remove('hidden');
    
    // Start confetti animation - only for final step
    if (confettiContainer) {
        confettiContainer.classList.remove('hidden');
        confettiContainer.classList.add('active');
        
        // Stop confetti after 5 seconds  
        setTimeout(() => {
            confettiContainer.classList.remove('active');
        }, 5000);
    }
    
    // Update instruction to completion message
    const instructionText = document.querySelector('.instruction-text');
    if (instructionText) {
        instructionText.textContent = '✨ Your romantic journey is complete! ✨';
    }
    
    // Mark journey as complete
    currentStep = steps.length;
    saveProgress();
    updateProgress();
    
    console.log('💖 Heart locket opened! Final romantic message revealed with confetti!');
}

function advanceStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        saveProgress();
        showStep(currentStep);
        updateProgress();
        updateInstruction();
        
        console.log(`➡️ Advanced to step ${currentStep}: ${steps[currentStep].id}`);
    }
}

function resetJourney() {
    console.log('🔄 Resetting the romantic journey...');
    
    // Reset state
    currentStep = 0;
    saveProgress();
    
    // Reset all interactive elements
    const envelope = document.getElementById('envelope');
    const rose = document.getElementById('rose');
    const key = document.getElementById('key');
    const locketClosed = document.querySelector('#step-locket .locket-closed');
    const locketOpened = document.querySelector('#step-locket .locket-opened');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Reset envelope
    if (envelope) {
        envelope.classList.remove('opened');
    }
    const continueBtn1 = document.getElementById('continue-1');
    if (continueBtn1) {
        continueBtn1.classList.add('hidden');
    }
    
    // Reset rose
    if (rose) {
        rose.classList.remove('bloomed');
    }
    const roseContent = document.querySelector('#step-rose .rose-content');
    if (roseContent) {
        roseContent.classList.add('hidden');
    }
    
    // Reset key
    if (key) {
        key.classList.remove('spun');
    }
    const keyContent = document.querySelector('#step-key .key-content');
    if (keyContent) {
        keyContent.classList.add('hidden');
    }
    
    // Reset locket
    if (locketClosed) {
        locketClosed.style.display = 'block';
    }
    if (locketOpened) {
        locketOpened.classList.add('hidden');
    }
    
    // Stop confetti
    if (confettiContainer) {
        confettiContainer.classList.add('hidden');
        confettiContainer.classList.remove('active');
    }
    
    // Show welcome screen again
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const mainJourney = document.getElementById('main-journey');
    
    if (welcomeOverlay && mainJourney) {
        mainJourney.classList.add('hidden');
        welcomeOverlay.style.display = 'flex';
        welcomeOverlay.classList.remove('fade-out');
    }
    
    console.log('✅ Romantic journey has been reset successfully!');
}

function initializeMusic() {
    // Create a simple background music simulation
    try {
        musicAudio = new Audio();
        // Using a minimal data URL - in real implementation use actual music file
        musicAudio.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBTCLz/LVgT8KFT6+29q/Zz";
        musicAudio.loop = true;
        musicAudio.volume = 0.2;
        console.log('🎵 Background music initialized');
    } catch (error) {
        console.warn('⚠️ Could not initialize background music:', error);
    }
}

function toggleMusic() {
    const musicToggle = document.getElementById('music-toggle');
    
    if (!musicToggle) return;
    
    musicEnabled = !musicEnabled;
    
    if (musicEnabled) {
        musicToggle.classList.add('playing');
        if (musicAudio) {
            musicAudio.play().catch(e => {
                console.warn('⚠️ Could not play background music:', e);
            });
        }
        console.log('🎵 Background music started');
    } else {
        musicToggle.classList.remove('playing');
        if (musicAudio) {
            musicAudio.pause();
        }
        console.log('🎵 Background music paused');
    }
}

// Utility functions for enhanced romantic effects - throttled
let lastSparkleTime = 0;
function createRomanticSparkles(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime < 200) return; // Throttle sparkles
    lastSparkleTime = now;
    
    const sparkles = ['✨', '💖', '🌹', '💕'];
    const sparkle = document.createElement('div');
    
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleFloat 1.5s ease-out forwards;
    `;
    
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    
    // Add sparkle animation keyframes if not exists
    if (!document.querySelector('#sparkle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation-style';
        style.textContent = `
            @keyframes sparkleFloat {
                0% { 
                    opacity: 1; 
                    transform: scale(0) rotate(0deg); 
                }
                50% { 
                    opacity: 1; 
                    transform: scale(1) rotate(180deg); 
                }
                100% { 
                    opacity: 0; 
                    transform: scale(0.5) rotate(360deg) translateY(-30px); 
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

// Add romantic sparkles on mouse movement - throttled
let lastMouseSparkle = 0;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastMouseSparkle > 300 && Math.random() < 0.3) {
        createRomanticSparkles(e.clientX, e.clientY);
        lastMouseSparkle = now;
    }
});

// Enhanced click effects - only on interactive elements
document.addEventListener('click', function(e) {
    // Only create sparkles for specific interactive elements
    const interactiveElements = ['begin-journey', 'envelope', 'rose', 'key', 'locket'];
    if (interactiveElements.some(id => e.target.id === id || e.target.closest(`#${id}`))) {
        createRomanticSparkles(e.clientX, e.clientY);
    }
});

// Debug object for testing
window.romanticJourney = {
    getCurrentStep: () => currentStep,
    advanceStep,
    resetJourney,
    showStep,
    toggleMusic,
    openEnvelope,
    bloomRose,
    spinKey,
    openLocket,
    startJourney
};

console.log('💖✨ Victorian Romantic Journey Script Loaded! ✨💖');