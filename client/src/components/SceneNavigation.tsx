/** Style note — clean anime bio navigation: two direct destinations and a quiet future-sound control. */
import { Headphones, Pause, UserRound, PanelsTopLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useExperience } from "@/contexts/ExperienceContext";

export function SceneNavigation() {
  const [location] = useLocation();
  const { isPlaying, toggleSound } = useExperience();
  const isProjects = location.startsWith("/projects");

  return (
    <header className="site-nav">
      <Link className="site-brand" href="/" aria-label="HAWKUY — Био">
        <img src="/manus-storage/hawkuy-mark_ae73c36f.png" alt="" />
        <span>HAWKUY</span>
      </Link>
      <nav aria-label="Навигация">
        <Link href="/" className={!isProjects ? "active" : ""}><UserRound size={15} /> БИО</Link>
        <Link href="/projects" className={isProjects ? "active" : ""}><PanelsTopLeft size={15} /> ПРОЕКТЫ</Link>
      </nav>
      <button className={`sound-toggle ${isPlaying ? "playing" : ""}`} type="button" onClick={toggleSound} aria-label={isPlaying ? "Остановить музыку" : "Включить музыку"}>
        {isPlaying ? <Pause size={16} /> : <Headphones size={16} />}
      </button>
    </header>
  );
}
