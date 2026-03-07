import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const mockRankings = [
    { id: "2", titulo: "EcoTracker Urbano",      icon: "🌿", score: 9.2 },
    { id: "1", titulo: "Plataforma Educativa AI", icon: "🤖", score: 8.7 },
    { id: "4", titulo: "Huertos Compartidos",     icon: "🌱", score: 7.9 },
    { id: "3", titulo: "Fintech Inclusiva",       icon: "💳", score: 7.4 },
];

const medals = ["🥇", "🥈", "🥉"];

const scoreColor = (score: number) => {
    if (score >= 9) return "text-emerald-600";
    if (score >= 7) return "text-primary";
    return "text-muted-foreground";
};

export default function Rankings() {
    return (
        <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30 gap-1.5">
                    <Trophy className="h-3 w-3" />
                    Clasificación actual
                </Badge>
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Rankings
                </h1>
                <p className="text-muted-foreground">
                    Proyectos ordenados por su puntuación media.
                </p>
            </div>

            <Card className="border-border/50 overflow-hidden">
                <CardHeader className="py-3 px-6 border-b border-border/40 bg-muted/20">
                    <div className="grid grid-cols-[2.5rem_1fr_5rem] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <span>#</span>
                        <span>Proyecto</span>
                        <span className="text-right">Puntuación</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {mockRankings.map((project, index) => (
                        <div
                            key={project.id}
                            className={`grid grid-cols-[2.5rem_1fr_5rem] items-center gap-2 px-6 py-4 transition-colors hover:bg-muted/20 ${
                                index !== mockRankings.length - 1 ? "border-b border-border/30" : ""
                            }`}
                        >
                            <span className="text-xl leading-none">
                                {medals[index] ?? <span className="text-sm font-bold text-muted-foreground pl-1">{index + 1}</span>}
                            </span>

                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-xl leading-none select-none">{project.icon}</span>
                                <span className="font-semibold truncate">{project.titulo}</span>
                            </div>

                            <div className="text-right">
                                <span className={`text-lg font-extrabold tabular-nums ${scoreColor(project.score)}`}>
                                    {project.score.toFixed(1)}
                                </span>
                                <span className="text-xs text-muted-foreground">/10</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
