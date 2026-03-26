import { useState, useEffect, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { categoriesApi, votingSessionsApi, scalesApi, criteriaApi, type VotingSession } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Settings, ChevronRight, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Category = { id: string; name: string; };
type Scale = { id: string; description: string; };
type Criterion = { id: string; name: string; weight: number; type: string; };

export default function EventConfigDialog({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, startCategoriesTransition] = useTransition();
    const [loadingExpanded, startExpandedTransition] = useTransition();
    const [newCategoryName, setNewCategoryName] = useState("");
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    // Form inputs for scales/criteria
    const [votingSession, setVotingSession] = useState<VotingSession | null>(null);
    const [editStart, setEditStart] = useState("");
    const [editEnd, setEditEnd] = useState("");
    const [scales, setScales] = useState<Scale[]>([]);
    const [newScaleDesc, setNewScaleDesc] = useState("");

    // Criteria per scale: scaleId -> criteria array
    const [criteriaByScale, setCriteriaByScale] = useState<Record<string, Criterion[]>>({});
    const [newCriterion, setNewCriterion] = useState({ name: "", weight: 10, type: "NUMERIC", scaleId: "" });

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = () => {
        startCategoriesTransition(async () => {
            try {
                const res = await categoriesApi.getAll();
                setCategories(res.data);
            } catch (err) {
                toast.error("Error al cargar categorías");
            }
        });
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            await categoriesApi.create(newCategoryName);
            setNewCategoryName("");
            fetchCategories();
            toast.success("Categoría creada");
        } catch (err) {
            toast.error("Error al crear categoría");
        }
    };

    const handleDeleteCategory = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await categoriesApi.delete(id);
            if (expandedCategory === id) setExpandedCategory(null);
            fetchCategories();
            toast.success("Categoría eliminada");
        } catch (err) {
            toast.error("Error al eliminar categoría");
        }
    };

    const toggleCategory = async (id: string) => {
        if (expandedCategory === id) {
            setExpandedCategory(null);
            return;
        }
        setExpandedCategory(id);
        setVotingSession(null);
        setScales([]);

        startExpandedTransition(async () => {
            try {
                const res = await votingSessionsApi.getByCategory(id);
                const session = res.data[0];
                if (session) {
                    setVotingSession(session);
                    setEditStart(new Date(session.startTime).toISOString().slice(0, 16));
                    setEditEnd(new Date(session.endTime).toISOString().slice(0, 16));
                    loadScalesWithCriteria(session.id);
                }
            } catch (err) {
                console.error(err);
            }
        });
    };

    const handleEnableVoting = async (categoryId: string) => {
        try {
            const start = new Date();
            const end = new Date();
            end.setDate(end.getDate() + 7); // 7 days from now default
            
            const res = await votingSessionsApi.create({
                categoryId,
                votingType: "SCORE_BASED",
                canVoteOwnProject: false,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
            } as VotingSession);
            const session = res.data;
            setVotingSession(session);
            setEditStart(new Date(session.startTime).toISOString().slice(0, 16));
            setEditEnd(new Date(session.endTime).toISOString().slice(0, 16));
            toast.success("Votación habilitada");
        } catch (err) {
            toast.error("Error al habilitar votación");
        }
    };

    const handleUpdateSessionDates = async () => {
        if (!votingSession) return;
        try {
            const start = new Date(editStart).toISOString();
            const end = new Date(editEnd).toISOString();
            await votingSessionsApi.update(votingSession.id, { ...votingSession, startTime: start, endTime: end });
            toast.success("Fechas actualizadas");
        } catch (err) {
            toast.error("Error al actualizar fechas");
        }
    };



    const handleAddScale = async () => {
        if (!newScaleDesc.trim() || !votingSession) return;
        try {
            const res = await scalesApi.create({ votingSessionId: votingSession.id, description: newScaleDesc });
            setNewScaleDesc("");
            setScales([...scales, res.data]);
            toast.success("Barémo añadido");
        } catch (err) {
            toast.error("Error al añadir barémo");
        }
    };



    const loadScalesWithCriteria = async (sessionId: string) => {
        try {
            const res = await scalesApi.getWithCriteria(sessionId);
            // data is List<ScaleWithCriteria>
            const mappedScales: Scale[] = [];
            const mappedCriteria: Record<string, Criterion[]> = {};
            
            res.data.forEach((swc: any) => {
                mappedScales.push(swc.scale);
                mappedCriteria[swc.scale.id] = swc.criteria;
            });
            
            setScales(mappedScales);
            setCriteriaByScale(mappedCriteria);
        } catch (err) {
            console.error(err);
        }
    };

    // Override fetchScales to use the combined endpoint
    useEffect(() => {
        if (votingSession) {
            loadScalesWithCriteria(votingSession.id);
        }
    }, [votingSession]);

    const handleAddCriterion = async (scaleId: string) => {
        if (!newCriterion.name.trim() || newCriterion.scaleId !== scaleId) return;

        const currentCriteria = criteriaByScale[scaleId] || [];
        const currentSum = currentCriteria.reduce((sum, c) => sum + c.weight, 0);
        const newWeightDecimal = newCriterion.weight / 100;

        if (currentSum + newWeightDecimal > 1.001) {
            const available = Math.round((1 - currentSum) * 100);
            toast.error(`El peso total no puede sobrepasar el 100%. Queda un máximo de ${Math.max(0, available)}% disponible.`);
            return;
        }

        try {
            const res = await criteriaApi.create({
                scaleId,
                name: newCriterion.name,
                type: newCriterion.type.toUpperCase(),
                weight: newWeightDecimal,
            });
            
            setCriteriaByScale(prev => ({
                ...prev,
                [scaleId]: [...(prev[scaleId] || []), res.data]
            }));
            
            setNewCriterion({ name: "", weight: 10, type: "NUMERIC", scaleId: "" });
            toast.success("Criterio añadido");
        } catch (err) {
            toast.error("Error al añadir criterio");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Configuración del Evento</DialogTitle>
                    <DialogDescription>
                        Gestiona las categorías y los barémos (criterios de evaluación).
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Añadir Categoría */}
                    <div className="flex gap-3 items-end p-4 border rounded-xl bg-muted/20">
                        <div className="flex-1 space-y-2">
                            <Label>Nueva Categoría</Label>
                            <Input 
                                placeholder="Ej: Innovación Tecnológica" 
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleAddCategory} className="gap-2">
                            <Plus className="h-4 w-4" /> Añadir
                        </Button>
                    </div>

                    {/* Lista de Categorías */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Categorías Existentes</h3>
                        {loadingCategories ? (
                            <div className="flex items-center gap-2 py-4 text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Cargando categorías...</span>
                            </div>
                        ) : categories.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No hay categorías configuradas.</p>
                        ) : null}
                        
                        {categories.map(cat => (
                            <div key={cat.id} className="border rounded-lg overflow-hidden transition-all">
                                <div 
                                    className="flex items-center justify-between p-3 bg-card hover:bg-muted/50 cursor-pointer"
                                    onClick={() => toggleCategory(cat.id)}
                                >
                                    <div className="flex items-center gap-2">
                                        {expandedCategory === cat.id ? <ChevronDown className="h-4 w-4 text-muted-foreground"/> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                                        <span className="font-medium">{cat.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={(e) => handleDeleteCategory(cat.id, e)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Contenido Expandido: Baremos (Scales) */}
                                {expandedCategory === cat.id && (
                                    <div className="p-4 bg-muted/10 border-t">
                                        {loadingExpanded ? (
                                            <div className="flex items-center gap-2 py-4 text-muted-foreground">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span className="text-sm">Cargando configuración...</span>
                                            </div>
                                        ) : !votingSession ? (
                                            <div className="text-center py-4 space-y-3">
                                                <p className="text-sm text-muted-foreground">Esta categoría aún no tiene el sistema de votación habilitado.</p>
                                                <Button variant="outline" onClick={() => handleEnableVoting(cat.id)} className="gap-2 text-primary border-primary/20">
                                                    <Settings className="h-4 w-4" /> Habilitar Votaciones y Barémos
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {/* Configuración de Sesión */}
                                                <div className="flex flex-wrap gap-4 items-end bg-background p-4 rounded-lg border shadow-sm">
                                                    <div className="space-y-1">
                                                        <Label className="text-xs text-muted-foreground">Inicio de Votación</Label>
                                                        <Input 
                                                            type="datetime-local" 
                                                            value={editStart}
                                                            onChange={e => setEditStart(e.target.value)}
                                                            className="h-9 w-44 text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs text-muted-foreground">Fin de Votación</Label>
                                                        <Input 
                                                            type="datetime-local" 
                                                            value={editEnd}
                                                            onChange={e => setEditEnd(e.target.value)}
                                                            className="h-9 w-44 text-sm"
                                                        />
                                                    </div>
                                                    <Button size="sm" variant="secondary" onClick={handleUpdateSessionDates}>
                                                        Guardar Fechas
                                                    </Button>
                                                </div>

                                                {/* Añadir Scale */}
                                                <div className="flex gap-3 items-end">
                                                    <div className="flex-1 space-y-1">
                                                        <Label className="text-xs text-muted-foreground">Añadir Barémo (Escala global)</Label>
                                                        <Input 
                                                            placeholder="Ej: Evaluación Técnica Final" 
                                                            value={newScaleDesc}
                                                            onChange={e => setNewScaleDesc(e.target.value)}
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <Button size="sm" onClick={handleAddScale}>Añadir Barémo</Button>
                                                </div>

                                                {/* Listar Scales */}
                                                <div className="space-y-4">
                                                    {scales.map((scale, i) => (
                                                        <div key={scale.id} className="bg-background border rounded-lg p-4 shadow-sm">
                                                            <h4 className="font-semibold text-primary mb-3">Barémo {i+1}: {scale.description}</h4>
                                                            
                                                            {/* Lista de Criterios (Criterion) */}
                                                            <div className="space-y-2 mb-4 pl-4 border-l-2 border-primary/20">
                                                                {(criteriaByScale[scale.id] || []).map((crit) => (
                                                                    <div key={crit.id} className="flex justify-between items-center text-sm p-2 bg-muted/30 rounded">
                                                                        <span>{crit.name} <span className="text-[10px] text-muted-foreground uppercase ml-1 opacity-70">({crit.type})</span></span>
                                                                        <span className="text-muted-foreground text-xs font-mono ml-4 shrink-0">Peso: {Math.round(crit.weight * 100)}%</span>
                                                                    </div>
                                                                ))}
                                                                {(criteriaByScale[scale.id] || []).length === 0 && (
                                                                    <p className="text-xs text-muted-foreground italic">No hay criterios en este barémo.</p>
                                                                )}
                                                            </div>

                                                            {/* Añadir Criterio */}
                                                            <div className="flex flex-wrap items-end gap-2 pl-4">
                                                                <div className="flex-1 min-w-[200px]">
                                                                    <Input 
                                                                        placeholder="Nombre del criterio (Ej: Innovación)" 
                                                                        className="h-8 text-sm"
                                                                        value={newCriterion.scaleId === scale.id ? newCriterion.name : ""}
                                                                        onChange={e => setNewCriterion({ ...newCriterion, name: e.target.value, scaleId: scale.id })}
                                                                    />
                                                                </div>
                                                                <div className="w-32">
                                                                    <select
                                                                        className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                                        value={newCriterion.scaleId === scale.id ? newCriterion.type : "NUMERIC"}
                                                                        onChange={e => setNewCriterion({ ...newCriterion, type: e.target.value, scaleId: scale.id })}
                                                                    >
                                                                        <option value="NUMERIC">Numérico</option>
                                                                        <option value="SINGLE_CHOICE">Opción única</option>
                                                                        <option value="MULTIPLE_CHOICE">Op. Múltiple</option>
                                                                    </select>
                                                                </div>
                                                                <div className="w-24 relative">
                                                                    <Input 
                                                                        type="number" 
                                                                        min="1" 
                                                                        max="100"
                                                                        step="1"
                                                                        placeholder="Peso" 
                                                                        className="h-8 text-sm pr-6" // padding para el icono %
                                                                        value={newCriterion.scaleId === scale.id ? newCriterion.weight : 10}
                                                                        onChange={e => setNewCriterion({ ...newCriterion, weight: parseFloat(e.target.value) || 0, scaleId: scale.id })}
                                                                    />
                                                                    <span className="absolute right-2 top-1.5 text-xs text-muted-foreground pointer-events-none">%</span>
                                                                </div>
                                                                <Button size="sm" variant="secondary" className="h-8" onClick={() => handleAddCriterion(scale.id)}>
                                                                    Añadir
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
