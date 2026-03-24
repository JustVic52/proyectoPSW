import { useState, useEffect } from "react";
import axios from "axios";

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}
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

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [votingProject, setVotingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);



  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-full">


      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-lg font-medium text-muted-foreground">Cargando proyectos...</span>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-[13px] border-border/60 hover:border-primary/50 hover:bg-primary/8 hover:text-primary transition-all"
                    onClick={() => setSelectedProject(project)}
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
      />

      <VotingDialog
        isOpen={!!votingProject}
        onClose={() => setVotingProject(null)}
        projectTitle={votingProject?.title || ""}
      />
    </div>
  );
}
