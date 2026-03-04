import { useState } from "react";
import { projects } from "./mocks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, CheckCircle } from "lucide-react";
import ProjectDrawer from "./ProjectDrawer";
import VotingDialog from "./VotingDialog";

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/40 group border-border/50">
                        <CardHeader className="pb-3 cursor-pointer" onClick={() => setSelectedProject(project)}>
                            <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {project.titulo}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1.5 mt-2">
                                <Clock className="h-3.5 w-3.5" />
                                {new Date(project.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-4 cursor-pointer" onClick={() => setSelectedProject(project)}>
                            <p className="text-muted-foreground/90 line-clamp-3 text-base leading-relaxed">
                                {project.descripcion}
                            </p>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-border/40 mt-auto flex justify-between items-center bg-muted/10 pb-4">
                            <Button
                                variant="ghost"
                                className="gap-2 text-muted-foreground group/vote transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setVotingProject(project);
                                }}
                            >
                                <CheckCircle className="h-5 w-5 transition-colors" />
                                <span>Votar</span>
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5 shadow-sm group/det"
                                onClick={() => setSelectedProject(project)}
                            >
                                <span>Detalles</span>
                                <ChevronRight className="h-4 w-4 group-hover/det:translate-x-1 transition-transform" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
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
