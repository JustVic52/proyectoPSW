import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type ProjectDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    project: {
        id: string;
        titulo: string;
        descripcion: string;
        createdAt: string;
    } | null;
    onVoteClick: () => void;
};

export default function ProjectDrawer({ isOpen, onClose, project, onVoteClick }: ProjectDrawerProps) {
    if (!project) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-md flex flex-col h-full bg-background border-l border-border/40 shadow-2xl">
                <SheetHeader className="text-left mt-4 border-b border-border/40 pb-6 mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <SheetTitle className="text-3xl font-bold">{project.titulo}</SheetTitle>
                    </div>
                    <SheetDescription className="text-base">
                        <span className="block text-sm">Fecha: {new Date(project.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto pr-2 pb-6">
                    <h3 className="font-semibold text-lg mb-3">Descripción</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {project.descripcion}
                    </p>
                </div>

                <SheetFooter className="flex-col sm:flex-row sm:justify-between items-center gap-3 pt-6 border-t border-border/40 mt-auto">
                    <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        onClose();
                        onVoteClick();
                    }} className="w-full sm:w-auto">
                        Votar por este Proyecto
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
