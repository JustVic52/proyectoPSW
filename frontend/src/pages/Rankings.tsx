import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const mockRankings = [
    { id: "2", titulo: "EcoTracker Urbano",       score: 9.2 },
    { id: "1", titulo: "Plataforma Educativa AI",  score: 8.7 },
    { id: "4", titulo: "Huertos Compartidos",      score: 7.9 },
    { id: "3", titulo: "Fintech Inclusiva",        score: 7.4 },
];

const medals = ["🥇", "🥈", "🥉"];

const scoreColor = (score: number) => {
    if (score >= 9) return "text-emerald-400";
    if (score >= 8) return "text-primary";
    return "text-muted-foreground";
};

export default function Rankings() {
    return (
        <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-10 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <Badge
                    variant="outline"
                    className="mb-5 text-primary border-primary/40 bg-primary/8 font-medium tracking-wide uppercase text-[11px] px-3 py-1 gap-1.5"
                >
                    <Trophy className="h-3 w-3" />
                    Clasificación actual
                </Badge>
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-[1.05]">
                    Rankings
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                    Proyectos ordenados por su puntuación media.
                </p>
            </div>

            {/* Table */}
            <Card
                className="border-border/50 overflow-hidden shadow-lg animate-fade-up"
                style={{ animationDelay: "100ms" }}
            >
                <CardHeader className="py-3 px-6 border-b border-border/40 bg-muted/20">
                    <div className="grid grid-cols-[3rem_1fr_5rem] text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        <span>Pos.</span>
                        <span>Proyecto</span>
                        <span className="text-right">Score</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {mockRankings.map((project, index) => (
                        <div
                            key={project.id}
                            className={`relative grid grid-cols-[3rem_1fr_5rem] items-center gap-2 px-6 py-5 transition-colors hover:bg-muted/20 overflow-hidden ${
                                index !== mockRankings.length - 1 ? "border-b border-border/30" : ""
                            } ${index === 0 ? "bg-primary/[0.04]" : ""}`}
                        >
                            {/* Watermark rank number */}
                            <span className="absolute right-20 top-1/2 -translate-y-1/2 text-[5.5rem] font-black leading-none select-none pointer-events-none text-foreground/[0.04]">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Position */}
                            <span className="text-xl leading-none relative z-10">
                                {medals[index] ?? (
                                    <span className="text-sm font-bold text-muted-foreground tabular-nums pl-1">
                                        {index + 1}
                                    </span>
                                )}
                            </span>

                            {/* Project info */}
                            <div className="flex items-center gap-3 min-w-0 relative z-10">
                                <span className="font-semibold truncate text-[15px]">{project.titulo}</span>
                            </div>

                            {/* Score */}
                            <div className="text-right relative z-10">
                                <span className={`text-xl font-extrabold tabular-nums ${scoreColor(project.score)}`}>
                                    {project.score.toFixed(1)}
                                </span>
                                <span className="text-xs text-muted-foreground/60">/10</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
