import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, CalendarDays, Info, Trophy } from "lucide-react";

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

interface RankingEntry {
    projectId: string;
    titulo: string;
    score: number;
    voteCount: number;
}

const MOCK_EVENT_DETAILS: Record<string, any> = {
    "1": {
        title: "Hackathon Innovación 2026",
        description: "Evento central para el desarrollo de soluciones tecnológicas innovadoras en 48 horas.",
        startDate: "2026-03-20T10:00:00Z",
        endDate: "2026-03-22T20:00:00Z",
    },
    "default": {
        title: "Evento Genérico",
        description: "Detalles del evento seleccionado.",
        startDate: "2026-01-01T10:00:00Z",
        endDate: "2026-12-31T20:00:00Z",
    }
};

const medals = ["🥇", "🥈", "🥉"];
const scoreColor = (score: number) => {
    if (score >= 9) return "text-emerald-400";
    if (score >= 8) return "text-primary";
    return "text-muted-foreground";
};

export default function EventoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [votingSessions, setVotingSessions] = useState<VotingSession[]>([]);
    const [globalRanking, setGlobalRanking] = useState<RankingEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [rankingLoading, setRankingLoading] = useState(false);
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

    const fetchGlobalRanking = (cats: Category[]) => {
        if (cats.length === 0) return;
        const categoryIds = cats.map(c => c.id).join(',');
        setRankingLoading(true);
        axios.get(`http://localhost:8085/api/rankings/global?categoryIds=${categoryIds}`)
            .then(res => setGlobalRanking(res.data))
            .catch(err => console.error("Error fetching global ranking:", err))
            .finally(() => setRankingLoading(false));
    };

    const handleTabChange = (value: string) => {
        if (value === "ranking") {
            fetchGlobalRanking(categories);
        }
    };

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

    // Show all categories
    const visibleCategories = categoriesWithStatus;

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

    const renderRankingTable = (data: RankingEntry[], isLoading: boolean) => {
        if (isLoading) return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
        if (data.length === 0) return (
            <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border">
                <p>Aún no hay votos registrados para calcular el ranking.</p>
            </div>
        );
        return (
            <Card className="border-border/50 overflow-hidden shadow-lg">
                <CardHeader className="py-3 px-6 border-b border-border/40 bg-muted/20">
                    <div className="grid grid-cols-[3rem_1fr_4rem_5rem] text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        <span>Pos.</span>
                        <span>Proyecto</span>
                        <span className="text-center">Votos</span>
                        <span className="text-right">Score</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {data.map((project, index) => (
                        <div
                            key={project.projectId}
                            className={`relative grid grid-cols-[3rem_1fr_4rem_5rem] items-center gap-2 px-6 py-5 transition-colors hover:bg-muted/20 overflow-hidden ${index !== data.length - 1 ? "border-b border-border/30" : ""
                                } ${index === 0 ? "bg-primary/[0.04]" : ""}`}
                        >
                            <span className="absolute right-20 top-1/2 -translate-y-1/2 text-[5.5rem] font-black leading-none select-none pointer-events-none text-foreground/[0.04]">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xl leading-none relative z-10">
                                {medals[index] ?? (
                                    <span className="text-sm font-bold text-muted-foreground tabular-nums pl-1">{index + 1}</span>
                                )}
                            </span>
                            <div className="flex items-center gap-3 min-w-0 relative z-10">
                                <span className="font-semibold truncate text-[15px]">{project.titulo}</span>
                            </div>
                            <div className="text-center relative z-10">
                                <span className="text-sm text-muted-foreground tabular-nums">{project.voteCount}</span>
                            </div>
                            <div className="text-right relative z-10">
                                <span className={`text-xl font-extrabold tabular-nums ${scoreColor(project.score)}`}>
                                    {project.score.toFixed(2)}
                                </span>
                                <span className="text-xs text-muted-foreground/60">/10</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-screen">
            <Button
                variant="ghost"
                className="w-fit mb-6 text-muted-foreground hover:text-foreground gap-2 pl-0"
                onClick={() => navigate('/eventos')}
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a Eventos
            </Button>

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

            <div className="flex-1 animate-fade-up" style={{ animationDelay: "100ms" }}>
                <Tabs defaultValue="categorias" className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="categorias">Categorías</TabsTrigger>
                        <TabsTrigger value="ranking" className="gap-2">
                            <Trophy className="h-3.5 w-3.5" />
                            Ranking Global
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="categorias">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">Categorías del Evento</h2>
                            <p className="text-muted-foreground mt-1">Explora los proyectos de cada categoría y emite tu voto.</p>
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
                        ) : visibleCategories.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border">
                                <p>No hay categorías registradas para este evento.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {renderCategoryGroup("Activas", visibleCategories.filter(c => c.statusInfo.text === "Activo"))}
                                {renderCategoryGroup("En espera", visibleCategories.filter(c => c.statusInfo.text === "En Preparación" || c.statusInfo.text === "En espera"))}
                                {renderCategoryGroup("Finalizadas", visibleCategories.filter(c => c.statusInfo.text === "Finalizado"))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="ranking">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline" className="text-primary border-primary/40 bg-primary/8 font-medium tracking-wide uppercase text-[11px] px-3 py-1 gap-1.5">
                                    <Trophy className="h-3 w-3" />
                                    Clasificación Global
                                </Badge>
                            </div>
                            <h2 className="text-2xl font-bold">Ranking del Evento</h2>
                            <p className="text-muted-foreground mt-1">
                                Todos los proyectos del evento ordenados por su puntuación media ponderada.
                            </p>
                        </div>
                        {renderRankingTable(globalRanking, rankingLoading)}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
