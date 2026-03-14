import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VotingDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    projectTitle: string;
    onVoteSubmit: (score: number) => void;
};

export default function VotingDialog({ isOpen, onClose, projectTitle, onVoteSubmit }: VotingDialogProps) {
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

    const handleConfirmVote = () => {
        const numericScore = parseFloat(score);
        if (!isNaN(numericScore)) {
            onVoteSubmit(numericScore);
            setScore("");
            setShowConfirmAlert(false);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Vota por el proyecto</DialogTitle>
                    <DialogDescription>
                        Estás a punto de valorar: <strong className="text-foreground">{projectTitle}</strong>.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 py-4">
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
                    </div>
                    <DialogFooter className="sm:justify-between items-center flex-col sm:flex-row gap-2">
                        <Button type="button" variant="secondary" onClick={onClose} className="w-full sm:w-auto">
                            Cancelar
                        </Button>
                        <Button type="submit" className="w-full sm:w-auto">Confirmar Voto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <AlertDialog open={showConfirmAlert} onOpenChange={setShowConfirmAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Confirmar votación?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Estás a punto de enviar un voto con puntuación de <strong className="text-foreground">{score}</strong> para el proyecto <strong className="text-foreground">{projectTitle}</strong>. ¿Deseas continuar?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setShowConfirmAlert(false)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmVote}>Confirmar Voto</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    );
}
