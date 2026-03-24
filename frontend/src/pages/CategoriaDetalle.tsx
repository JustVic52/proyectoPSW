import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import ProjectsList from "@/components/ProjectsList";

export default function CategoriaDetalle() {
    const { eventId, categoryId } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState<string>("");

    useEffect(() => {
        if (categoryId) {
            axios.get(`http://localhost:8085/api/categories/${categoryId}`)
                .then(res => setCategoryName(res.data.name))
                .catch(err => console.error("Error fetching category:", err));
        }
    }, [categoryId]);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-screen">
            <Button 
                variant="ghost" 
                className="w-fit mb-6 text-muted-foreground hover:text-foreground gap-2 pl-0"
                onClick={() => navigate(`/eventos/${eventId}`)}
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al Evento
            </Button>

            <div className="mb-12 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <div className="flex items-center gap-3 mb-5">
                    <Badge
                        variant="outline"
                        className="text-primary border-primary/40 bg-primary/8 font-medium tracking-wide uppercase text-[11px] px-3 py-1"
                    >
                        Votación Abierta
                    </Badge>
                    {categoryName && (
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 border-l-2 border-primary/30 pl-3 tracking-tight">
                            {categoryName}
                        </h2>
                    )}
                </div>
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-[1.05]">
                    Proyectos
                    <br />
                    <span className="text-primary">Destacados</span>
                </h1>
                <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                    Descubre y apoya las iniciativas que marcarán la diferencia. Tu voto
                    decide qué proyecto se hace realidad.
                </p>
            </div>

            <div className="flex-1">
                <ProjectsList categoryId={categoryId} />
            </div>
        </div>
    );
}
