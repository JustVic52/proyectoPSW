import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Info } from "lucide-react";

// Reuse the mock simply to display title matching URL (Optional real logic comes later)
const MOCK_EVENT_DETAILS: Record<string, any> = {
    "1": {
        title: "Hackathon Innovación 2026",
        description: "Evento central para el desarrollo de soluciones tecnológicas innovadoras en 48 horas. Votación abierta por parte del jurado profesional y público general.",
        status: "VOTACION",
        startDate: "2026-03-20T10:00:00Z",
        endDate: "2026-03-22T20:00:00Z",
    },
    // Fallback details if id not 1
    "default": {
        title: "Evento Genérico",
        description: "Detalles del evento seleccionado.",
        status: "CONFIGURACION",
        startDate: "2026-01-01T10:00:00Z",
        endDate: "2026-12-31T20:00:00Z",
    }
};

const MOCK_CATEGORIES = [
    { id: "cat-1", name: "Proyectos Sociales", type: "Voto Público" },
    { id: "cat-2", name: "Innovación Tecnológica", type: "Voto Jurado" },
    { id: "cat-3", name: "Sostenibilidad", type: "Voto Mixto" },
];

export default function EventoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const event = MOCK_EVENT_DETAILS[id as string] || MOCK_EVENT_DETAILS["default"];

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-screen">
            {/* Nav Back */}
            <Button 
                variant="ghost" 
                className="w-fit mb-6 text-muted-foreground hover:text-foreground gap-2 pl-0"
                onClick={() => navigate('/eventos')}
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a Eventos
            </Button>

            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-primary/10 border border-primary/20 p-8 sm:p-12 mb-10 animate-fade-up">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl">
                    <Badge className="bg-primary/20 text-primary mb-4 hover:bg-primary/30 pointer-events-none">
                        Evento Oficial
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        {event.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {event.description}
                    </p>
                    <div className="flex items-center font-medium text-sm text-foreground/80 gap-6">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span>Votaciones hasta el 22 de Marzo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-primary" />
                            <span>Múltiples categorías</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="flex-1 animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Categorías del Evento</h2>
                        <p className="text-muted-foreground mt-1">Explora los proyectos de cada categoría y emite tu voto.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MOCK_CATEGORIES.map(cat => (
                        <div 
                            key={cat.id} 
                            onClick={() => navigate(`/eventos/${id}/categorias/${cat.id}`)}
                            className="bg-card border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all hover:border-primary/50 group flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{cat.name}</h3>
                                <Badge variant="secondary" className="font-normal text-xs">{cat.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-auto">
                                Ver proyectos y emitir voto
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
