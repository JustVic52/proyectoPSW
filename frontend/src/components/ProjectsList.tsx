import { useState, useEffect } from "react";
import { projectsApi, categoriesApi, type Project } from "@/services/api";

export type { Project };
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, CheckCircle, Loader2 } from "lucide-react";
import ProjectDrawer from "./ProjectDrawer";
import VotingDialog from "./VotingDialog";

const projectMeta: Record<string, { tag: string }> = {
  "1": { tag: "Educación" },
  "2": { tag: "Medio Ambiente" },
  "3": { tag: "Finanzas" },
  "4": { tag: "Comunidad" },
};

export default function ProjectsList({ categoryId, isActive = false }: { categoryId?: string, isActive?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [votingProject, setVotingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = categoryId
          ? await categoriesApi.getProjects(categoryId)
          : await projectsApi.getAll();
        setProjects(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener los proyectos:", err);
        setError("Ha ocurrido un error al cargar los proyectos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [categoryId]);



  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-full">


      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-lg font-medium text-muted-foreground">Cargando proyectos...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-2">¡Oops! Algo ha ido mal</h3>
            <p className="text-sm">{error}</p>
            <Button variant="outline" className="mt-4 border-destructive/30 hover:bg-destructive/10" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in bg-card border-2 border-dashed border-border/80 rounded-2xl mx-auto w-full px-6 shadow-sm">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4 text-muted-foreground/60">
            {/* simple icon indicating document or emptiness */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-x-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3 11.5 6 6"/><path d="m3 17.5 6-6"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">No hay proyectos actualmente</h3>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Aún no hay ningún proyecto disponible en esta categoría. Vuelve a revisar más adelante cuando los creadores hayan enviado sus propuestas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => {
            const meta = projectMeta[project.id] ?? { tag: "Proyecto" };
            //console.log(project)
            return (
              <Card
                key={project.id}
                className="group pb-1 flex flex-col overflow-hidden border-border/50 shadow-sm hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 hover:border-border/80 transition-all duration-300 animate-fade-up bg-card"
                style={{ animationDelay: `${80 + index * 80}ms` }}
              >
                <CardHeader
                  className="pb-3 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Badge
                      variant="secondary"
                      className="text-[11px] font-medium bg-muted/60 text-muted-foreground border border-border/40"
                    >
                      {meta.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-[17px] font-bold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5 text-xs mt-1">
                    <Clock className="h-3 w-3" />
                    {new Date(project.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>

                <CardContent
                  className="flex-1 cursor-pointer pt-0"
                  onClick={() => setSelectedProject(project)}
                >
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>

                <CardFooter className="border-t border-border/40 bg-muted/20 justify-between pt-1 [.border-t]:pt-4 pb-4">
                  {isActive && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 text-[13px] font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVotingProject(project);
                      }}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Votar
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-[13px] border-border/60 hover:border-primary/50 hover:bg-primary/8 hover:text-primary transition-all ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    Detalles
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <ProjectDrawer
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onVoteClick={() => setVotingProject(selectedProject)}
        isActive={isActive}
      />

      <VotingDialog
        isOpen={!!votingProject}
        onClose={() => setVotingProject(null)}
        project={votingProject}
      />
    </div>
  );
}
