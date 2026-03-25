import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Trophy } from "lucide-react";
import ProjectsList from "@/components/ProjectsList";

interface RankingEntry {
    projectId: string;
    titulo: string;
    score: number;
    voteCount: number;
}

const medals = ["🥇", "🥈", "🥉"];
const scoreColor = (score: number) => {
    if (score >= 9) return "text-emerald-400";
    if (score >= 8) return "text-primary";
    return "text-muted-foreground";
};

export default function CategoriaDetalle() {
    const { eventId, categoryId } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState<string>("");
    const [statusText, setStatusText] = useState<string>("Cargando...");
    const [statusColor, setStatusColor] = useState<string>("text-muted-foreground border-border bg-muted/20");
    const [ranking, setRanking] = useState<RankingEntry[]>([]);
    const [rankingLoading, setRankingLoading] = useState(false);

    useEffect(() => {
        if (categoryId) {
            axios.get(`http://localhost:8085/api/categories/${categoryId}`)
                .then(res => setCategoryName(res.data.name))
                .catch(err => console.error("Error fetching category:", err));

            // Fetch category status
            axios.get(`http://localhost:8085/api/voting-sessions/category/${categoryId}`)
                .then(res => {
                    const session = res.data[0];
                    if (!session) {
                        setStatusText("EN PREPARACIÓN");
                        setStatusColor("text-amber-600 border-amber-600/40 bg-amber-600/8 dark:text-amber-500 dark:border-amber-500/40 dark:bg-amber-500/10");
                        return;
                    }
                    const now = new Date();
                    const start = new Date(session.startTime);
                    const end = new Date(session.endTime);

                    if (now < start) {
                        setStatusText("EN PREPARACIÓN");
                        setStatusColor("text-amber-600 border-amber-600/40 bg-amber-600/8 dark:text-amber-500 dark:border-amber-500/40 dark:bg-amber-500/10");
                    } else if (now >= start && now <= end) {
                        setStatusText("ACTIVA");
                        setStatusColor("text-emerald-600 border-emerald-600/40 bg-emerald-600/8 dark:text-emerald-500 dark:border-emerald-500/40 dark:bg-emerald-500/10");
                    } else {
                        setStatusText("FINALIZADA");
                        setStatusColor("text-red-600 border-red-600/40 bg-red-600/8 dark:text-red-500 dark:border-red-500/40 dark:bg-red-500/10");
                    }
                })
                .catch(err => {
                    console.error("Error fetching sessions:", err);
                    setStatusText("EN PREPARACIÓN");
                    setStatusColor("text-amber-600 border-amber-600/40 bg-amber-600/8 dark:text-amber-500 dark:border-amber-500/40 dark:bg-amber-500/10");
                });
        }
    }, [categoryId]);

    const fetchRanking = () => {
        if (!categoryId) return;
        setRankingLoading(true);
        axios.get(`http://localhost:8085/api/rankings/category/${categoryId}`)
            .then(res => setRanking(res.data))
            .catch(err => console.error("Error fetching ranking:", err))
            .finally(() => setRankingLoading(false));
    };

    const handleTabChange = (value: string) => {
        if (value === "ranking") {
            fetchRanking();
        }
    };

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

            <div className="mb-10 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <div className="flex items-center gap-3 mb-5">
                    <Badge
                        variant="outline"
                        className={`${statusColor} font-medium tracking-wide uppercase text-[11px] px-3 py-1 transition-colors`}
                    >
                        {statusText}
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

            <div className="flex-1 animate-fade-up" style={{ animationDelay: "100ms" }}>
                <Tabs defaultValue="proyectos" className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="mb-6">
                        <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
                        <TabsTrigger value="ranking" className="gap-2">
                            <Trophy className="h-3.5 w-3.5" />
                            Ranking
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="proyectos">
                        <ProjectsList categoryId={categoryId} isActive={statusText === "ACTIVA"} />
                    </TabsContent>

                    <TabsContent value="ranking">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline" className="text-primary border-primary/40 bg-primary/8 font-medium tracking-wide uppercase text-[11px] px-3 py-1 gap-1.5">
                                    <Trophy className="h-3 w-3" />
                                    Clasificación de Categoría
                                </Badge>
                            </div>
                            <h2 className="text-2xl font-bold">Ranking — {categoryName}</h2>
                            <p className="text-muted-foreground mt-1">
                                Proyectos de esta categoría ordenados por su puntuación media ponderada.
                            </p>
                        </div>

                        {rankingLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : ranking.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border">
                                <p>Aún no hay votos registrados en esta categoría.</p>
                            </div>
                        ) : (
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
                                    {ranking.map((project, index) => (
                                        <div
                                            key={project.projectId}
                                            className={`relative grid grid-cols-[3rem_1fr_4rem_5rem] items-center gap-2 px-6 py-5 transition-colors hover:bg-muted/20 overflow-hidden ${
                                                index !== ranking.length - 1 ? "border-b border-border/30" : ""
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
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
