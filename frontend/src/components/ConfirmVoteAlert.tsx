import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type ConfirmVoteAlertProps = {
  showConfirmAlert: boolean;
  setShowConfirmAlert: (open: boolean) => void;
  score: string;
  projectTitle: string;
  comment: string;
  handleConfirmVote: () => void;
};

const ConfirmVoteAlert = ({
  showConfirmAlert,
  setShowConfirmAlert,
  score,
  projectTitle,
  comment,
  handleConfirmVote,
}: ConfirmVoteAlertProps) => {
  return (
    <AlertDialog open={showConfirmAlert} onOpenChange={setShowConfirmAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Confirmar votación?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de enviar un voto con puntuación de{" "}
            <strong className="text-foreground">{score}</strong> para el
            proyecto <strong className="text-foreground">{projectTitle}</strong>
            {comment && (
              <>
                {" "}con el comentario:{" "}
                <strong className="text-foreground">"{comment}"</strong>
              </>
            )}
            . ¿Deseas continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowConfirmAlert(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmVote}>
            Confirmar Voto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmVoteAlert;
