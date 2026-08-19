/** Style note — the project intentionally exposes the single provided profile page and no added project subpages. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ExperienceProvider, useExperience } from "@/contexts/ExperienceContext";
import { Volume2 } from "lucide-react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function SoundNotice() {
  const { soundNotice, dismissNotice } = useExperience();
  if (!soundNotice) return null;
  return <button className="sound-notice" type="button" onClick={dismissNotice}><Volume2 size={17} /><span>НЕ УДАЛОСЬ ВКЛЮЧИТЬ МУЗЫКУ. НАЖМИТЕ КНОПКУ В УГЛУ.</span></button>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><ExperienceProvider><Toaster /><Home /><SoundNotice /></ExperienceProvider></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
