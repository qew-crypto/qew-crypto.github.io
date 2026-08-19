/** Style note — exact provided profile content, restyled only with a cold katana night background, quiet particles, and moonlit cursor. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  BadgeCheck,
  Bot,
  Check,
  ExternalLink,
  Headphones,
  MessageCircle,
  Shield,
  UserRound,
  Volume2,
  VolumeX,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useExperience } from "@/contexts/ExperienceContext";

const stars = Array.from({ length: 64 }, (_, index) => ({ id: index, x: `${(index * 29) % 101}%`, y: `${(index * 17) % 61}%`, size: 1 + (index % 3), delay: `${(index % 10) * -0.43}s` }));
const particles = Array.from({ length: 30 }, (_, index) => ({ id: index, x: `${(index * 41) % 101}%`, delay: `${(index % 13) * -0.72}s`, duration: `${8 + (index % 7)}s`, size: `${2 + (index % 3)}px` }));

function MoonCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches || !ref.current) return;
    let mouseX = -30; let mouseY = -30; let orbX = -30; let orbY = -30; let frame = 0;
    const onMove = (event: MouseEvent) => { mouseX = event.clientX; mouseY = event.clientY; ref.current?.classList.add("visible"); };
    const onLeave = () => ref.current?.classList.remove("visible");
    const update = () => { orbX += (mouseX - orbX) * 0.14; orbY += (mouseY - orbY) * 0.14; if (ref.current) ref.current.style.transform = `translate3d(${orbX - 13}px,${orbY - 13}px,0)`; frame = requestAnimationFrame(update); };
    document.addEventListener("mousemove", onMove); document.addEventListener("mouseleave", onLeave); update();
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(frame); };
  }, []);
  return <div className="moon-cursor" ref={ref} aria-hidden="true"><i /><span /></div>;
}

function Section({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return <section className="directory-section" style={{ animationDelay: `${delay}ms` }}><h2>{title}</h2>{children}</section>;
}

function DirectoryLink({ href, icon, title, subtitle }: { href: string; icon: React.ReactNode; title: string; subtitle: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className="directory-link"><span className="directory-icon">{icon}</span><span className="directory-copy"><b>{title}</b><small>{subtitle}</small></span><ExternalLink size={18} /></a>;
}

export default function Home() {
  const { hasEntered, enterExperience, isPlaying, toggleSound } = useExperience();
  const [showGate, setShowGate] = useState(true);
  const [gateLeaving, setGateLeaving] = useState(false);
  const enterSite = async () => { setGateLeaving(true); await enterExperience(); window.setTimeout(() => setShowGate(false), 550); };
  const showMusic = hasEntered && !showGate;

  return (
    <main className={`night-directory ${showGate ? "locked" : ""}`}>
      <div className="katana-night" aria-hidden="true">
        <div className="katana-night-image" /><div className="katana-night-shade" />
        <div className="sky-stars">{stars.map((star) => <i key={star.id} style={{ left: star.x, top: star.y, width: star.size, height: star.size, animationDelay: star.delay }} />)}</div>
        <div className="falling-particles">{particles.map((particle) => <i key={particle.id} style={{ left: particle.x, width: particle.size, height: particle.size, animationDelay: particle.delay, animationDuration: particle.duration } as CSSProperties} />)}</div>
        <div className="moon-orbit" /><div className="katana-label">KATANA / NIGHT SKY / HAWKUY</div>
      </div>

      {showGate && <section className={`entry-gate ${gateLeaving ? "leaving" : ""}`} aria-label="Вход на сайт">
        <div className="gate-kanji">鷹</div><h1>HAWKUY</h1><p className="gate-question">Вы готовы зайти на сайт?</p>
        <p className="gate-sub">При входе включится музыка — её можно выключить в любой момент кнопкой в углу экрана</p>
        <button type="button" onClick={enterSite}><Headphones size={17} /> Да, войти</button>
      </section>}

      {showMusic && <button className={`music-toggle ${isPlaying ? "playing" : "muted"}`} type="button" onClick={toggleSound} aria-pressed={isPlaying} title={isPlaying ? "Выключить музыку" : "Включить музыку"}>{isPlaying ? <Volume2 size={19} /> : <VolumeX size={19} />}<span className="equalizer"><i /><i /><i /></span></button>}
      <MoonCursor />

      <div className="directory-wrap">
        <aside className="profile-card">
          <div className="avatar-orbit"><div className="avatar-kanji">鷹</div></div><h1>HAWKUY</h1><div className="status-badge"><i /> ГАРАНТ</div><div className="line" />
          <div className="about-grid">
            <div><strong>Денис</strong><span>ИМЯ</span></div><div><strong>15 y.o</strong><span>ВОЗРАСТ</span></div><div><strong>20 дек</strong><span>ДЕНЬ РОЖДЕНИЯ</span></div><div><strong>Python</strong><span>СТЕК</span></div>
          </div>
          <p className="about-desc"><b>Кодер</b> — Python + вайбкодинг. Делаю ботов, сервисы и всё что нужно. Крутой и точка.</p>
          <a href="https://t.me/hawkuy" target="_blank" rel="noreferrer" className="telegram-profile"><span>✦</span> @Hawkuy <ExternalLink size={17} /></a>
        </aside>

        <div className="directory-content">
          <Section title="РЕПУТАЦИЯ">
            <div className="two-links"><DirectoryLink href="https://t.me/dehnc2000Proof" icon={<Check size={18} />} title="Пруфы" subtitle="@dehnc2000Proof" /><DirectoryLink href="https://t.me/handsHawkuy" icon={<UserRound size={18} />} title="Ручения" subtitle="@handsHawkuy" /></div>
          </Section>
          <Section title="МОИ ПРОЕКТЫ" delay={80}>
            <div className="link-stack">
              <DirectoryLink href="https://t.me/SharkBalanceBot" icon={<Bot size={18} />} title="@SharkBalanceBot" subtitle="Магазин цифровых товаров" />
              <DirectoryLink href="https://t.me/genncalls_bot" icon={<MessageCircle size={18} />} title="@genncalls_bot" subtitle="Пранк бот" />
              <DirectoryLink href="https://t.me/gencals_bot" icon={<Zap size={18} />} title="@gencals_bot" subtitle="Пранк + бомбер + анонимки и т.п." />
            </div>
          </Section>
          <Section title="ТРАСТЫ В БАЗАХ" delay={160}><DirectoryLink href="https://t.me/Impex_Antiscam" icon={<Shield size={18} />} title="@Impex_Antiscam" subtitle="Траст в базе" /></Section>
          <div className="notice-box"><BadgeCheck size={18} /><p><b>ГАСД:</b> Занесён без доквы. Писал апелляцию — проигнорировали.</p></div>
          <section className="spam-box"><WandSparkles size={20} /><h2>СПАМ-БАН?</h2><p>Пишите в сообщения каналу или используйте бота</p><div><a href="https://t.me/hawkuy" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Написать</a><a href="https://t.me/Spikespam_bot" target="_blank" rel="noreferrer"><Bot size={16} /> @Spikespam_bot</a></div></section>
          <footer>鷹 HAWKUY © 2025</footer>
        </div>
      </div>
    </main>
  );
}
