import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Heart, Sparkles } from 'lucide-react';

interface GameSettings {
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  cycles: number;
}

export const RelaxGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('rest');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<GameSettings>({
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 6,
    cycles: 5
  });

  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Create soothing background sounds
  const playTone = (frequency: number, duration: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + duration);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const startBreathingCycle = () => {
    setIsPlaying(true);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeLeft(settings.inhaleTime);
  };

  const stopBreathingCycle = () => {
    setIsPlaying(false);
    setCurrentPhase('rest');
    setTimeLeft(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };


  const resetBreathingCycle = () => {
    stopBreathingCycle();
    setCurrentCycle(0);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      intervalRef.current = window.setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      // Move to next phase
      if (currentPhase === 'inhale') {
        setCurrentPhase('hold');
        setTimeLeft(settings.holdTime);
        playTone(440, 0.2); // A note for transition
      } else if (currentPhase === 'hold') {
        setCurrentPhase('exhale');
        setTimeLeft(settings.exhaleTime);
        playTone(330, 0.2); // E note for transition
      } else if (currentPhase === 'exhale') {
        if (currentCycle < settings.cycles) {
          setCurrentCycle(currentCycle + 1);
          setCurrentPhase('inhale');
          setTimeLeft(settings.inhaleTime);
          playTone(523, 0.3); // C note for new cycle
        } else {
          // Completed all cycles
          setIsPlaying(false);
          setCurrentPhase('rest');
          playTone(659, 1); // E note for completion
        }
      }
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, timeLeft, currentPhase, currentCycle, settings]);

  const getCircleScale = () => {
    const progress = timeLeft / getCurrentPhaseTime();
    switch (currentPhase) {
      case 'inhale':
        return 0.5 + (0.5 * (1 - progress));
      case 'hold':
        return 1;
      case 'exhale':
        return 1 - (0.5 * (1 - progress));
      default:
        return 0.5;
    }
  };

  const getCurrentPhaseTime = () => {
    switch (currentPhase) {
      case 'inhale':
        return settings.inhaleTime;
      case 'hold':
        return settings.holdTime;
      case 'exhale':
        return settings.exhaleTime;
      default:
        return 0;
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'from-blue-400 to-cyan-300';
      case 'hold':
        return 'from-purple-400 to-pink-300';
      case 'exhale':
        return 'from-green-400 to-emerald-300';
      default:
        return 'from-gray-300 to-gray-200';
    }
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Ready to Begin';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Mindful Breathing</h1>
            <Sparkles className="h-8 w-8 text-purple-500 ml-3" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a moment to relax and center yourself with this guided breathing exercise. 
            Focus on the circle and follow the rhythm to calm your mind.
          </p>
        </div>

        {/* Main Breathing Circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-80 h-80 mb-8">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 to-blue-200 opacity-30 animate-pulse"></div>
            
            {/* Main breathing circle */}
            <div 
              className={`absolute inset-4 rounded-full bg-gradient-to-r ${getPhaseColor()} shadow-2xl transition-transform duration-1000 ease-in-out flex items-center justify-center`}
              style={{ 
                transform: `scale(${getCircleScale()})`,
                filter: 'blur(0px)'
              }}
            >
              <div className="text-center text-white">
                <Heart className="h-12 w-12 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-bold">{timeLeft}</div>
              </div>
            </div>

            {/* Floating particles */}
            {isPlaying && (
              <>
                <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-20 right-16 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-16 left-20 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-cyan-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
              </>
            )}
          </div>

          {/* Phase Instruction */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-700 mb-2">
              {getPhaseInstruction()}
            </h2>
            <p className="text-lg text-gray-500">
              {isPlaying ? `Cycle ${currentCycle} of ${settings.cycles}` : 'Press play to begin'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={isPlaying ? stopBreathingCycle : startBreathingCycle}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {isPlaying ? 'Pause' : 'Start'}
            </button>

            <button
              onClick={resetBreathingCycle}
              className="flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Breathing Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inhale Time: {settings.inhaleTime}s
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={settings.inhaleTime}
                    onChange={(e) => setSettings({...settings, inhaleTime: parseInt(e.target.value)})}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hold Time: {settings.holdTime}s
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    value={settings.holdTime}
                    onChange={(e) => setSettings({...settings, holdTime: parseInt(e.target.value)})}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exhale Time: {settings.exhaleTime}s
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={settings.exhaleTime}
                    onChange={(e) => setSettings({...settings, exhaleTime: parseInt(e.target.value)})}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Cycles: {settings.cycles}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={settings.cycles}
                    onChange={(e) => setSettings({...settings, cycles: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
            
            {/* Preset Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSettings({inhaleTime: 4, holdTime: 4, exhaleTime: 6, cycles: 5})}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-colors duration-200"
              >
                Relaxation (4-4-6)
              </button>
              <button
                onClick={() => setSettings({inhaleTime: 4, holdTime: 7, exhaleTime: 8, cycles: 4})}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg font-medium transition-colors duration-200"
              >
                Deep Calm (4-7-8)
              </button>
              <button
                onClick={() => setSettings({inhaleTime: 6, holdTime: 2, exhaleTime: 6, cycles: 8})}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors duration-200"
              >
                Energizing (6-2-6)
              </button>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Benefits of Mindful Breathing</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Reduces Stress</h4>
              <p>Activates the parasympathetic nervous system, promoting relaxation and reducing cortisol levels.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Improves Focus</h4>
              <p>Enhances concentration and mental clarity by training your attention on the present moment.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Play className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Better Sleep</h4>
              <p>Regular practice can improve sleep quality and help you fall asleep more easily.</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #696cff;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          }
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #696cff;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          }
        `
      }} />
    </div>
  );
};
