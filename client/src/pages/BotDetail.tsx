/** Style note — Bot detail: only the provided bot information and a clear Telegram exit. */
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { SceneNavigation } from "@/components/SceneNavigation";
import { bots, type BotId } from "@/lib/projectData";

export function BotDetail({ botId }: { botId: BotId }) {
  const bot = bots[botId];
  return (
    <main className="clean-page bot-page">
      <SceneNavigation />
      <section className={`bot-shell bot-${bot.id}`} aria-labelledby="bot-title">
        <Link href="/projects" className="back-link"><ArrowLeft size={17} /> НАЗАД К ПРОЕКТАМ</Link>
        <div className="bot-number">{bot.number}</div>
        <p className="bot-handle">{bot.handle}</p>
        <h1 id="bot-title">{bot.title}</h1>
        <ul className="bot-info">
          {bot.info.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a className="telegram-button" href={bot.telegramUrl} target="_blank" rel="noreferrer">ПЕРЕЙТИ В TELEGRAM <ArrowUpRight size={19} /></a>
      </section>
    </main>
  );
}
