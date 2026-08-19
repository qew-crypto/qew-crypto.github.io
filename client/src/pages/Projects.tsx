/** Style note — Projects page: direct button directory, no descriptions until a specific bot is selected. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { SceneNavigation } from "@/components/SceneNavigation";
import { bots } from "@/lib/projectData";

const order = [bots.yuki, bots.createstick, bots.repainting];

export default function Projects() {
  return (
    <main className="clean-page projects-page">
      <SceneNavigation />
      <section className="projects-shell" aria-labelledby="projects-title">
        <div className="page-label"><span>03</span> ПРОЕКТЫ</div>
        <h1 id="projects-title">МОИ<br /><em>ПРОЕКТЫ</em></h1>
        <div className="project-buttons">
          {order.map((bot) => (
            <Link key={bot.id} href={`/projects/${bot.id}`} className="project-button">
              <span className="project-number">{bot.number}</span>
              <strong>{bot.handle}</strong>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
