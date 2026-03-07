import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
    return (
        <div className="w-full max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Mi Perfil
                </h1>
                <p className="text-muted-foreground">
                    Información y estadísticas de tu cuenta.
                </p>
            </div>

            <Card className="border-border/50 overflow-hidden">
                <div className="h-20 bg-gradient-to-br from-primary/15 to-primary/5" />
                <CardContent className="pt-0 pb-6 px-6">
                    <div className="-mt-10 mb-4">
                        <Avatar className="h-20 w-20 ring-4 ring-background shadow-md">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">UN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="mb-5">
                        <div className="mb-1">
                            <h2 className="text-xl font-bold">Usuario</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">usuario@example.com</p>
                    </div>

                    <Separator className="mb-5" />

                    <div className="text-center">
                        <p className="text-2xl font-extrabold">3</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Votos emitidos</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
