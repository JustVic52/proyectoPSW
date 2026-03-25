import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConfirmVoteAlert from "./ConfirmVoteAlert";
import { Textarea } from "./ui/textarea";
import { Project } from "./ProjectsList";
import { Loader2 } from "lucide-react";

type VotingDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
};

export default function VotingDialog({
  isOpen,
  onClose,
  project,
}: VotingDialogProps) {
  const [comment, setComment] = useState("");
  const [showConfirmAlert, setShowConfirmAlert] = useState<boolean>(false);
  const [votingSessionId, setVotingSessionId] = useState<string | null>(null);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [criterionValues, setCriterionValues] = useState<Record<string, string>>({});
  const [loadingConfig, setLoadingConfig] = useState(false);

  useEffect(() => {
    if (isOpen && project) {
      setLoadingConfig(true);
      setComment("");
      setCriterionValues({});
      setVotingSessionId(null);
      setCriteria([]);

      const fetchData = async () => {
        try {
          // 1. Obtener la categoría del proyecto
          const catRes = await axios.get(`http://localhost:8085/api/category-projects/project/${project.id}`);
          if (!catRes.data || catRes.data.length === 0) throw new Error("Proyecto no tiene categoría");
          const categoryId = catRes.data[0].categoryId;

          // 2. Obtener la sesión de votación activa para la categoría
          const sessionRes = await axios.get(`http://localhost:8085/api/voting-sessions/category/${categoryId}`);
          if (!sessionRes.data || sessionRes.data.length === 0) throw new Error("No hay sesión de votación activa");
          const session_id = sessionRes.data[0].id;
          setVotingSessionId(session_id);

          // 3. Obtener el baremo y criterios
          const scaleRes = await axios.get(`http://localhost:8085/api/scales/voting-session/${session_id}/with-criteria`);
          if (scaleRes.data && scaleRes.data.length > 0) {
             setCriteria(scaleRes.data[0].criteria || []);
          }
        } catch (error) {
          console.error("Error cargando configuración de votación:", error);
          toast.error("Error al cargar la escala de votación.");
        } finally {
          setLoadingConfig(false);
        }
      }
      fetchData();
    }
  }, [isOpen, project]);

  const handleCriterionChange = (criterionId: string, val: string) => {
    setCriterionValues(prev => ({ ...prev, [criterionId]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (criteria.some(c => !criterionValues[c.id] || isNaN(parseFloat(criterionValues[c.id])))) {
       toast.error("Por favor completa todos los criterios con valores numéricos válidos.");
       return;
    }
    if (!comment.trim()) {
       toast.error("Por favor ingresa un comentario con al menos un carácter.");
       return;
    }
    setShowConfirmAlert(true);
  };

  const handleConfirmVote = async () => {
    if (!project || !votingSessionId) return;
    setShowConfirmAlert(false);

    const valuesArray = criteria.map(c => ({
      criterionId: c.id,
      numericValue: parseFloat(criterionValues[c.id])
    }));

    const payload = {
      projectId: project.id,
      votingSessionId: votingSessionId,
      comment,
      criterionValues: valuesArray,
    };

    const votePromise = axios.post("http://localhost:8085/api/vote", payload);

    toast.promise(votePromise, {
      loading: "Registrando tu voto...",
      success: () => (
        <span className="text-black font-normal">
          🎉 Has votado exitosamente.
        </span>
      ),
      error: "Hubo un error al procesar tu voto.",
    });

    try {
      await votePromise;
      setComment("");
      setCriterionValues({});
      onClose();
    } catch (error) {
      console.error("Error submitting vote", error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Vota por el proyecto</DialogTitle>
            <DialogDescription>
              Estás a punto de valorar:{" "}
              <strong className="text-foreground">{project?.title}</strong>.
            </DialogDescription>
          </DialogHeader>
          
          {loadingConfig ? (
             <div className="flex justify-center items-center py-10">
               <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
               <span>Cargando criterios de votación...</span>
             </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 py-4">
                
                {criteria.map((c) => (
                  <div className="flex flex-col gap-2" key={c.id}>
                    <Label htmlFor={`crit-${c.id}`}>{c.name} {c.weight !== 1.0 && `(Peso: ${c.weight})`}</Label>
                    <Input
                      id={`crit-${c.id}`}
                      type="number"
                      min="0"
                      max="10"
                      step="any"
                      value={criterionValues[c.id] || ""}
                      onChange={(e) => handleCriterionChange(c.id, e.target.value)}
                      placeholder="Ejemplo: 8.5"
                      className="col-span-3"
                      required
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <Label htmlFor="comment">Comentario</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Me encantó el proyecto..."
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-between items-center flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="w-full sm:w-auto" disabled={criteria.length === 0}>
                  Confirmar Voto
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmVoteAlert
        showConfirmAlert={showConfirmAlert}
        setShowConfirmAlert={setShowConfirmAlert}
        projectTitle={project?.title || ""}
        comment={comment}
        handleConfirmVote={handleConfirmVote}
      />
    </>
  );
}
