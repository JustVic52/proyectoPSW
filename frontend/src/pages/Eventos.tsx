import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from "lucide-react";

// Mock Data
const MOCK_EVENTS = [
    {
        id: "1",
        title: "Hackathon Innovación 2026",
        description: "Evento central para el desarrollo de soluciones tecnológicas innovadoras en 48 horas.",
        status: "VOTACION", // CONFIGURACION, VOTACION, CERRADO
        startDate: "2026-03-20T10:00:00Z",
        endDate: "2026-03-22T20:00:00Z",
        participantsCount: 45
    },
    {
        id: "2",
        title: "Premios Startup Sostenible",
        description: "Reconocimiento a las iniciativas empresariales con mayor impacto ecológico y social de este año.",
        status: "CONFIGURACION",
        startDate: "2026-04-15T08:00:00Z",
        endDate: "2026-04-30T18:00:00Z",
        participantsCount: 120
    },
    {
        id: "3",
        title: "Concurso Anual de Robótica",
        description: "Exposición y competencia internacional de proyectos de automatización y robótica.",
        status: "CERRADO",
        startDate: "2026-01-10T09:00:00Z",
        endDate: "2026-01-15T18:00:00Z",
        participantsCount: 82
    }
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "VOTACION":
            return <Badge className="bg-green-500 hover:bg-green-600">Votación Abierta</Badge>;
        case "CONFIGURACION":
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">En Configuración</Badge>;
        case "CERRADO":
            return <Badge variant="outline" className="text-muted-foreground border-muted-foreground">Cerrado</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
};

export default function Eventos() {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-10 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
                    Explorador de <span className="text-primary">Eventos</span>
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl">
                    Descubre todos los certámenes y hackathons disponibles. Entra a un evento para ver sus categorías y participar en las votaciones.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_EVENTS.map((evento, index) => (
                    <Card 
                        key={evento.id} 
                        className="flex flex-col h-full hover:shadow-lg transition-shadow animate-fade-up cursor-pointer"
                        style={{ animationDelay: `${100 + index * 100}ms` }}
                        onClick={() => navigate(`/eventos/${evento.id}`)}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                {getStatusBadge(evento.status)}
                            </div>
                            <CardTitle className="text-xl leading-tight line-clamp-2">{evento.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1.5 mt-2">
                                <CalendarDays className="h-3.5 w-3.5" />
                                <span>{formatDate(evento.startDate)} - {formatDate(evento.endDate)}</span>
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {evento.description}
                            </p>
                        </CardContent>
                        
                        <CardFooter className="border-t bg-muted/20 pt-4 flex justify-between items-center">
                            <div className="flex items-center text-sm text-muted-foreground gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>{evento.participantsCount} Proyectos</span>
                            </div>
                            <Button variant="outline" size="sm">
                                Ver Categorías
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
