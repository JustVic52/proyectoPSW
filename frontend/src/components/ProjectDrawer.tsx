import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Project } from "./ProjectsList";

type ProjectDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    onVoteClick: () => void;
    isActive?: boolean;
};

export default function ProjectDrawer({ isOpen, onClose, project, onVoteClick, isActive = false }: ProjectDrawerProps) {
    if (!project) return null;

    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent className="flex flex-col bg-background shadow-2xl">
                <DrawerHeader className="text-left border-b border-border/40 pb-4">
                    <DrawerTitle className="text-3xl font-bold">{project.title}</DrawerTitle>
                    <DrawerDescription className="text-base mt-2">
                        <span className="block text-sm">Fecha: {new Date(project.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    <h3 className="font-semibold text-lg mb-3">Descripción</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {project.description}
                    </p>
                </div>

                <DrawerFooter className="flex-col sm:flex-row sm:justify-between gap-3 border-t border-border/40 pt-4 pb-8">
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                            Cancelar
                        </Button>
                    </DrawerClose>
                    {isActive && (
                        <Button onClick={() => {
                            onClose();
                            onVoteClick();
                        }} className="w-full sm:w-auto">
                            Votar por este Proyecto
                        </Button>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
