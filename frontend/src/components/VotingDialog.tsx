import { useState } from "react";
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

const PROJECT_ID = "74c900c4-d97d-4a63-a67c-e5f97073f68a";
const VOTING_SESSION_ID = "65d27a35-3eba-4601-8fde-4b5e1432a993";
const CRITERION_ID = "fd2db0ef-943d-4a2f-8eac-9b83a8bae209";

type VotingDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
};

export default function VotingDialog({
  isOpen,
  onClose,
  projectTitle,
}: VotingDialogProps) {
  const [comment, setComment] = useState("");
  const [score, setScore] = useState<string>("");
  const [showConfirmAlert, setShowConfirmAlert] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericScore = parseFloat(score);
    // Validacion simple requerida por el input html aunque no lo pidan estrictamente
    if (!isNaN(numericScore)) {
      // Mostrar AlertDialog en lugar de enviar directamente
      setShowConfirmAlert(true);
    }
  };

  const handleConfirmVote = async () => {
    const numericScore = parseFloat(score);
    if (!isNaN(numericScore)) {
      setShowConfirmAlert(false);

      const votePromise = axios.post("http://localhost:8085/api/vote", {
        projectId: PROJECT_ID,
        votingSessionId: VOTING_SESSION_ID,
        comment,
        criterionValues: [
          { criterionId: CRITERION_ID, numericValue: numericScore },
        ],
      });

      toast.promise(votePromise, {
        loading: "Registrando tu voto...",
        success: () => (
          <span className="text-black font-normal">
            🎉 Has votado exitosamente. Comentario: "{comment}"
          </span>
        ),
        error: "Hubo un error al procesar tu voto.",
      });

      try {
        await votePromise;
        setScore("");
        setComment("");
        onClose();
      } catch (error) {
        console.error("Error submitting vote", error);
      }
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
              <strong className="text-foreground">{projectTitle}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="score">Puntuación (0 al 10)</Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="10"
                  step="any"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Ejemplo: 8.5"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="score">Comment</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="I really liked the presentation"
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
              <Button type="submit" className="w-full sm:w-auto">
                Confirmar Voto
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmVoteAlert
        showConfirmAlert={showConfirmAlert}
        setShowConfirmAlert={setShowConfirmAlert}
        score={score}
        projectTitle={projectTitle}
        comment={comment}
        handleConfirmVote={handleConfirmVote}
      />
    </>
  );
}
