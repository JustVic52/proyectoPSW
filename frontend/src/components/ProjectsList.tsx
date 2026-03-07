import { useState } from "react";
import { projects } from "../mocks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, CheckCircle } from "lucide-react";
import ProjectDrawer from "./ProjectDrawer";
import VotingDialog from "./VotingDialog";

const projectMeta: Record<string, { icon: string; color: string; tag: string }> = {
    "1": { icon: "🤖", color: "border-l-violet-400",  tag: "Educación" },
    "2": { icon: "🌿", color: "border-l-emerald-400", tag: "Medio Ambiente" },
    "3": { icon: "💳", color: "border-l-blue-400",    tag: "Finanzas" },
    "4": { icon: "🌱", color: "border-l-green-400",   tag: "Comunidad" },
};

export default function ProjectsList() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [votingProject, setVotingProject] = useState<typeof projects[0] | null>(null);

    const handleVoteSubmit = (score: number) => {
        alert(`Has votado exitosamente por: "${votingProject?.titulo}" con una puntuación de: ${score}`);
        setVotingProject(null);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-full">
            <div className="mb-10 text-center sm:text-left">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">Votación Abierta</Badge>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Proyectos Destacados
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Descubre y apoya las iniciativas que marcarán la diferencia. Tu voto decide qué proyecto se hace realidad en nuestra comunidad.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => {
                    const meta = projectMeta[project.id] ?? { icon: "💡", color: "border-l-primary", tag: "Proyecto" };
                    return (
                        <div
                            key={project.id}
                            className={`group flex flex-col bg-card rounded-xl border border-border/50 border-l-4 ${meta.color} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                        >
                            {/* Header */}
                            <div className="flex items-start gap-4 p-5 pb-3 cursor-pointer" onClick={() => setSelectedProject(project)}>
                                <div className="text-3xl leading-none mt-0.5 select-none">{meta.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                            {project.titulo}
                                        </h3>
                                        <Badge variant="secondary" className="shrink-0 text-xs mt-0.5">{meta.tag}</Badge>
                                    </div>
                                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {new Date(project.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex-1 px-5 pb-4 cursor-pointer" onClick={() => setSelectedProject(project)}>
                                <p className="text-muted-foreground/90 line-clamp-3 text-sm leading-relaxed">
                                    {project.descripcion}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center px-5 py-3 border-t border-border/40 bg-muted/10 rounded-b-xl">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/8"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setVotingProject(project);
                                    }}
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    Votar
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    Detalles
                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ProjectDrawer
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
                onVoteClick={() => setVotingProject(selectedProject)}
            />

            <VotingDialog
                isOpen={!!votingProject}
                onClose={() => setVotingProject(null)}
                projectTitle={votingProject?.titulo || ""}
                onVoteSubmit={handleVoteSubmit}
            />
        </div>
    );
}
