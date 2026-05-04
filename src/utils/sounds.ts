// Sound effects utility using Web Audio API
// Sounds are generated programmatically (no external files needed)

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

// Sound synth functions
function playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}


// Sound effect functions
export const Sounds = {
  // Button click - short beep
  click: () => {
    playTone(800, 0.05, 'sine');
  },

  // Correct answer - happy major chord arpeggio
  correct: () => {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.15, 'sine'), i * 50);
    });
  },

  // Wrong answer - low dissonant tone
  wrong: () => {
    playTone(200, 0.3, 'sawtooth');
    setTimeout(() => playTone(150, 0.3, 'sawtooth'), 100);
  },

  // Level complete - victory fanfare
  complete: () => {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.2, 'sine');
        setTimeout(() => playTone(freq, 0.1, 'sine'), 100);
      }, i * 150);
    });
  },

  // Streak milestone - ascending sparkle
  streak: () => {
    [880, 1100, 1320, 1760].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.1, 'sine'), i * 30);
    });
  },

  // Battle win - triumphant
  battleWin: () => {
    [392, 523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.3, 'square'), i * 100);
    });
  },

  // Battle lose - sad descending
  battleLose: () => {
    [440, 349, 293, 220].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.4, 'sine'), i * 150);
    });
  },

  // Pop sound for interactions
  pop: () => {
    playTone(600, 0.05, 'sine');
  }
};

// Hook for playing sounds
export function useSounds() {
  // Resume audio context on first user interaction (browser requirement)
  const initAudio = () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  return { Sounds, initAudio };
}

export default Sounds;
