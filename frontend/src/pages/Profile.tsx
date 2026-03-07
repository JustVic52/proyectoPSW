import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
    return (
        <div className="w-full max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-10 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
                    Mi Perfil
                </h1>
                <p className="text-base text-muted-foreground">
                    Información y estadísticas de tu cuenta.
                </p>
            </div>

            {/* Profile card */}
            <Card
                className="border-border/50 overflow-hidden shadow-lg animate-fade-up"
                style={{ animationDelay: "100ms" }}
            >
                {/* Banner */}
                <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.76_0.155_72/0.15)_0%,transparent_70%)]" />
                </div>

                <CardContent className="pt-0 pb-8 px-6">
                    {/* Avatar */}
                    <div className="-mt-10 mb-5">
                        <Avatar className="h-20 w-20 ring-4 ring-background shadow-xl">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                                UN
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Name + email */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-0.5">Usuario</h2>
                        <p className="text-sm text-muted-foreground">usuario@example.com</p>
                    </div>

                    <Separator className="mb-6 opacity-40" />

                    {/* Stats */}
                    <div className="text-center">
                        <p className="text-4xl font-extrabold text-primary">3</p>
                        <p className="text-sm text-muted-foreground mt-1">Votos emitidos</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
