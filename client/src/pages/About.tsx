/** Style note — personal details are staged as a character dossier from a midnight anime opening. */
import { ArrowDownRight, Clock3, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SceneNavigation } from "@/components/SceneNavigation";

const formatter = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

export default function About() {
  const [moscowTime, setMoscowTime] = useState(() => formatter.format(new Date()));
  useEffect(() => {
    const timer = window.setInterval(() => setMoscowTime(formatter.format(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="site-shell detail-shell about-shell">
      <div className="page-texture" aria-hidden="true" />
      <SceneNavigation />
      <section className="detail-opening about-opening">
        <p className="scene-caption"><span>SCENE 02</span> / CHARACTER DOSSIER</p>
        <h1>НЕ АНКЕТА.<br /><em>ПЕРСОНАЖ.</em></h1>
        <p>Короткие факты, которые остаются за титрами.</p>
        <div className="opening-code">FILE: HAWKUY_01<br />STATUS: IN MOTION</div>
      </section>

      <section className="dossier-grid" aria-label="Информация обо мне">
        <article className="dossier-main">
          <span className="dossier-number">鷹 / 01</span>
          <p>ИМЯ</p>
          <h2>ДЕНИС</h2>
          <div className="red-stamp">MAIN CHARACTER</div>
        </article>
        <article className="dossier-time">
          <div className="icon-capsule"><Clock3 size={19} /></div>
          <p>ВРЕМЯ СЕЙЧАС / МСК</p>
          <strong>{moscowTime}</strong>
          <span>EUROPE / MOSCOW</span>
        </article>
        <article className="dossier-birthday">
          <div className="icon-capsule"><Sparkles size={19} /></div>
          <p>ДЕНЬ РОЖДЕНИЯ</p>
          <strong>20<br /><em>ДЕКАБРЯ</em></strong>
          <span>WINTER ARC</span>
        </article>
        <article className="dossier-location">
          <MapPin size={20} />
          <p>TIMEZONE</p>
          <strong>MSK</strong>
          <span>UTC +3</span>
        </article>
      </section>

      <section className="about-outro">
        <span className="diagonal-trace" aria-hidden="true" />
        <div><p className="scene-caption"><span>NEXT SCENE</span> / THE PROJECT REEL</p><h2>ТЕПЕРЬ ПОСМОТРИ,<br /><em>ЧТО Я ДЕЛАЮ.</em></h2></div>
        <Link className="solid-link" href="/projects">МОИ ПРОЕКТЫ <ArrowDownRight size={18} /></Link>
      </section>
    </main>
  );
}
