/** Style note — quiet music begins only after the user enters, then remains controllable from the profile. */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const soundtrackUrl = "/manus-storage/hawkuy-night-track_b016143d.mp3";
type ExperienceValue = { hasEntered: boolean; isPlaying: boolean; soundNotice: boolean; enterExperience: () => Promise<void>; toggleSound: () => Promise<void>; dismissNotice: () => void; };
const ExperienceContext = createContext<ExperienceValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null); const [hasEntered, setHasEntered] = useState(false); const [isPlaying, setIsPlaying] = useState(false); const [soundNotice, setSoundNotice] = useState(false);
  const notify = () => { setSoundNotice(true); window.setTimeout(() => setSoundNotice(false), 3400); };
  const play = async () => {
    if (!audioRef.current) { notify(); return; }
    try { audioRef.current.volume = 0.2; await audioRef.current.play(); setIsPlaying(true); } catch { setIsPlaying(false); notify(); }
  };
  const enterExperience = async () => { setHasEntered(true); await play(); };
  const toggleSound = async () => { if (!audioRef.current) { notify(); return; } if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } else await play(); };
  useEffect(() => { if (audioRef.current) audioRef.current.volume = 0.2; return () => audioRef.current?.pause(); }, []);
  return <ExperienceContext.Provider value={{ hasEntered, isPlaying, soundNotice, enterExperience, toggleSound, dismissNotice: () => setSoundNotice(false) }}><audio ref={audioRef} src={soundtrackUrl} loop preload="metadata" />{children}</ExperienceContext.Provider>;
}
export function useExperience() { const value = useContext(ExperienceContext); if (!value) throw new Error("useExperience must be used inside ExperienceProvider"); return value; }
