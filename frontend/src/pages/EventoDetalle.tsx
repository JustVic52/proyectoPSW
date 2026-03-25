import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Info } from "lucide-react";

interface Category {
    id: string;
    name: string;
    createdAt: string;
}

interface VotingSession {
    id: string;
    categoryId: string;
    startTime: string;
    endTime: string;
}

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

export default function EventoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [votingSessions, setVotingSessions] = useState<VotingSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, sessionsRes] = await Promise.all([
                    axios.get('http://localhost:8085/api/categories'),
                    axios.get('http://localhost:8085/api/voting-sessions')
                ]);
                setCategories(categoriesRes.data);
                setVotingSessions(sessionsRes.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Error al cargar los datos del evento. Por favor, inténtalo de nuevo.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const event = MOCK_EVENT_DETAILS[id as string] || MOCK_EVENT_DETAILS["default"];

    const getCategoryStatus = (categoryId: string) => {
        const session = votingSessions.find(s => s.categoryId === categoryId);
        if (!session) return { text: "En Preparación", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500 border-amber-200 dark:border-amber-800" };

        const now = new Date();
        const start = new Date(session.startTime);
        const end = new Date(session.endTime);

        if (now < start) return { text: "En espera", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500 border-blue-200 dark:border-blue-800" };
        if (now >= start && now <= end) return { text: "Activo", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500 border-emerald-200 dark:border-emerald-800" };
        return { text: "Finalizado", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500 border-red-200 dark:border-red-800" };
    };

    const categoriesWithStatus = categories.map(cat => ({
        ...cat,
        statusInfo: getCategoryStatus(cat.id)
    }));

    const renderCategoryGroup = (title: string, cats: typeof categoriesWithStatus) => {
        if (cats.length === 0) return null;
        return (
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-4 text-foreground/90 border-b pb-2">{title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cats.map(cat => (
                        <div
                            key={cat.id}
                            onClick={() => navigate(`/eventos/${id}/categorias/${cat.id}`)}
                            className="bg-card border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all hover:border-primary/50 group flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-3 gap-2">
                                <h4 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">{cat.name}</h4>
                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    <Badge variant="secondary" className="font-normal text-[10px] px-1.5 py-0 h-4">Categoría</Badge>
                                    <Badge variant="outline" className={`font-medium text-[10px] px-1.5 py-0 h-4 ${cat.statusInfo.color}`}>
                                        {cat.statusInfo.text}
                                    </Badge>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-auto">
                                Ver proyectos y detalles
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

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

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-destructive bg-destructive/10 rounded-xl border border-destructive/20">
                        <p>{error}</p>
                        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Reintentar</Button>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border">
                        <p>No hay categorías disponibles en este momento.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {renderCategoryGroup("Activas", categoriesWithStatus.filter(c => c.statusInfo.text === "Activo"))}
                        {renderCategoryGroup("En espera", categoriesWithStatus.filter(c => c.statusInfo.text === "En espera"))}
                        {renderCategoryGroup("En Preparación", categoriesWithStatus.filter(c => c.statusInfo.text === "En Preparación"))}
                        {renderCategoryGroup("Finalizadas", categoriesWithStatus.filter(c => c.statusInfo.text === "Finalizado"))}
                    </div>
                )}
            </div>
        </div>
    );
}
