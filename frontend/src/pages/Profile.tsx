import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock events — replace with API call once Event entity exists in backend
const MOCK_EVENTS = [
    {
        id: "1",
        title: "Hackathon Innovación 2026",
        description: "Evento central para el desarrollo de soluciones tecnológicas innovadoras en 48 horas.",
        status: "VOTACION",
        startDate: "2026-03-20T10:00:00Z",
        endDate: "2026-03-22T20:00:00Z",
    },
];

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Activity, BarChart4, Zap, Eye, CheckCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import EventConfigPanel from "@/components/EventConfigPanel";
import { projectsApi, votesApi, votingSessionsApi, categoriesApi, type Project, type AnonymousVote, type VotingSession, type Category } from "@/services/api";

export default function Profile() {
    const navigate = useNavigate();
    const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({ "1": true });

    const toggleEvent = (id: string) =>
        setExpandedEvents(prev => ({ ...prev, [id]: !prev[id] }));

    const [projects, setProjects] = useState<Project[]>([]);
    const [votes, setVotes] = useState<AnonymousVote[]>([]);
    const [sessions, setSessions] = useState<VotingSession[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [projectsRes, votesRes, sessionsRes, categoriesRes] = await Promise.all([
                    projectsApi.getAll(),
                    votesApi.getAll(),
                    votingSessionsApi.getAll(),
                    categoriesApi.getAll(),
                ]);
                setProjects(projectsRes.data);
                setVotes(votesRes.data);
                setSessions(sessionsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error("Error cargando datos del perfil:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const now = new Date();
    const activeSessions = sessions.filter(s => new Date(s.startTime) <= now && new Date(s.endTime) >= now);

    const projectMap = Object.fromEntries(projects.map(p => [p.id, p]));

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-lg font-medium text-muted-foreground">Cargando panel...</span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-10 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
                    Dashboard
                </h1>
                <p className="text-base text-muted-foreground">
                    Panel de control y vista general de tu actividad.
                </p>
            </div>

            <Tabs defaultValue="resumen" className="w-full animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="overflow-x-auto pb-2 mb-6 scrollbar-hide">
                    <TabsList className="min-w-max">
                        <TabsTrigger value="resumen">Resumen Global</TabsTrigger>
                        <TabsTrigger value="proyectos">Mis Proyectos</TabsTrigger>
                        <TabsTrigger value="votaciones">Mis Votaciones</TabsTrigger>
                        <TabsTrigger value="eventos">Gestión de Eventos</TabsTrigger>
                        <TabsTrigger value="configuracion">Configuración</TabsTrigger>
                    </TabsList>
                </div>

                {/* TAB 1: RESUMEN */}
                <TabsContent value="resumen" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sesiones Activas</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{activeSessions.length}</div>
                                <p className="text-xs text-muted-foreground">De {sessions.length} sesiones en total</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Proyectos Presentados</CardTitle>
                                <BarChart4 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{projects.length}</div>
                                <p className="text-xs text-muted-foreground">En {categories.length} categorías</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Votos Emitidos</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{votes.length}</div>
                                <p className="text-xs text-muted-foreground">Total registrado en el sistema</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* TAB 2: MIS PROYECTOS */}
                <TabsContent value="proyectos" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Proyectos</CardTitle>
                            <CardDescription>Todos los proyectos registrados en el sistema.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {projects.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No hay proyectos registrados.</p>
                            ) : projects.map((project, index) => (
                                <div key={project.id}>
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm leading-snug">{project.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground shrink-0">
                                            {new Date(project.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                                        </span>
                                    </div>
                                    {index < projects.length - 1 && <Separator />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                Feedback Cualitativo (IA)
                            </CardTitle>
                            <CardDescription>Hoja de ruta personalizada generada a partir de los comentarios del jurado.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-relaxed text-foreground/80">
                                <strong>Fortalezas:</strong> Gran enfoque en el impacto social y solución innovadora para el sector.<br /><br />
                                <strong>Áreas de Mejora:</strong> Se sugiere detallar más el modelo de monetización a corto plazo y establecer alianzas estratégicas para mejorar la viabilidad comercial.<br /><br />
                                <strong>Siguiente paso:</strong> Considera crear un prototipo funcional (MVP) de la pasarela de pagos.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 3: MIS VOTACIONES */}
                <TabsContent value="votaciones" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Votaciones Activas</CardTitle>
                            <CardDescription>Sesiones donde el periodo de votación está abierto.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {activeSessions.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No hay votaciones activas en este momento.</p>
                            ) : (
                                <div className="space-y-3">
                                    {activeSessions.map(session => (
                                        <div key={session.id} className="flex items-center justify-between pb-2">
                                            <div>
                                                <p className="font-medium text-sm">Sesión de votación</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Cierra: <span className="text-red-500 font-semibold">
                                                        {new Date(session.endTime).toLocaleDateString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                                    </span>
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => navigate(`/eventos/1/categorias/${session.categoryId}`)}>Ir a Votar</Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de Votos</CardTitle>
                            <CardDescription>Todos los votos registrados en el sistema.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {votes.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No hay votos registrados.</p>
                            ) : (
                                <div className="space-y-4">
                                    {[...votes].reverse().map((vote, index) => (
                                        <div key={vote.id}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-green-500/10 p-2 rounded-full">
                                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {projectMap[vote.projectId]?.title ?? "Proyecto desconocido"}
                                                        </p>
                                                        {vote.comment && (
                                                            <p className="text-xs text-muted-foreground line-clamp-1">"{vote.comment}"</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-muted-foreground shrink-0">
                                                    {new Date(vote.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                                                </span>
                                            </div>
                                            {index < votes.length - 1 && <Separator className="mt-4" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 4: GESTION DE EVENTOS */}
                <TabsContent value="eventos" className="space-y-4">
                    {MOCK_EVENTS.map(event => {
                        const isExpanded = expandedEvents[event.id] ?? false;
                        return (
                            <Card key={event.id} className="border-border/60">
                                {/* Header — always visible, click to expand/collapse */}
                                <CardHeader
                                    className="pb-3 cursor-pointer select-none"
                                    onClick={() => toggleEvent(event.id)}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            {isExpanded
                                                ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                                                : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                                            }
                                            <div>
                                                <CardTitle className="text-base">{event.title}</CardTitle>
                                                <CardDescription className="mt-0.5 text-xs">{event.description}</CardDescription>
                                            </div>
                                        </div>
                                        <Badge className="shrink-0 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 pointer-events-none">
                                            Votación Abierta
                                        </Badge>
                                    </div>
                                </CardHeader>

                                {isExpanded && (
                                    <CardContent className="pt-0 space-y-4">
                                        <div className="flex justify-end">
                                            <Button variant="outline" size="sm" className="gap-2" disabled>
                                                <Eye className="h-3.5 w-3.5" />
                                                Publicar Resultados
                                            </Button>
                                        </div>
                                        <Separator />
                                        <EventConfigPanel />
                                    </CardContent>
                                )}
                            </Card>
                        );
                    })}
                </TabsContent>

                {/* TAB 5: CONFIGURACION */}
                <TabsContent value="configuracion" className="space-y-6">
                    <Card className="border-border/50 overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.76_0.155_72/0.15)_0%,transparent_70%)]" />
                        </div>
                        <CardContent className="pt-0 pb-6 px-6">
                            <div className="-mt-10 mb-5">
                                <Avatar className="h-20 w-20 ring-4 ring-background shadow-xl">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                                        SU
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold mb-0.5">Superusuario Admin</h2>
                                <p className="text-sm text-muted-foreground">admin@votify.com</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Datos Personales</CardTitle>
                            <CardDescription>Actualiza tu información de cuenta.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Nombre de Usuario</Label>
                                <Input id="username" defaultValue="Superusuario Admin" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input id="email" type="email" defaultValue="admin@votify.com" />
                            </div>
                            <div className="pt-2">
                                <Button>Guardar Cambios</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    );
}
