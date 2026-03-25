import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Clock, Activity, BarChart4, Zap, Lock, Eye, CheckCircle, Settings } from "lucide-react";
import EventConfigDialog from "@/components/EventConfigDialog";
import { useState } from "react";

export default function Profile() {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-10 animate-fade-up" style={{ animationDelay: "0ms" }}>
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
                    Dashboard
                </h1>
                <p className="text-base text-muted-foreground">
                    Panel de control y vista general de tu actividad.
                </p>
            </div>

            <Tabs defaultValue="resumen" className="w-full animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="overflow-x-auto pb-2 mb-6 scrollbar-hide">
                    <TabsList className="min-w-max">
                        <TabsTrigger value="resumen">Resumen Global</TabsTrigger>
                        <TabsTrigger value="proyectos">Mis Proyectos</TabsTrigger>
                        <TabsTrigger value="votaciones">Mis Votaciones</TabsTrigger>
                        <TabsTrigger value="eventos">Gestión de Eventos</TabsTrigger>
                        <TabsTrigger value="configuracion">Configuración</TabsTrigger>
                    </TabsList>
                </div>

                {/* TAB 1: RESUMEN (Vista Global) */}
                <TabsContent value="resumen" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Eventos Activos</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4</div>
                                <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Proyectos Presentados</CardTitle>
                                <BarChart4 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">128</div>
                                <p className="text-xs text-muted-foreground">En todas las categorías</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Votos Emitidos</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">14,231</div>
                                <p className="text-xs text-muted-foreground">+1200 en las últimas 24h</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Actividad Reciente</CardTitle>
                            <CardDescription>Eventos y votaciones destacadas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                                        <Clock className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">Votación "Hackathon Ciberseguridad" a punto de cerrar</p>
                                        <p className="text-sm text-muted-foreground">Faltan 45 minutos para el cierre.</p>
                                    </div>
                                    <div className="font-medium text-sm text-orange-500">Urgente</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 2: MIS PROYECTOS (Vista Participante) */}
                <TabsContent value="proyectos" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dashboard de Evaluación</CardTitle>
                            <CardDescription>Síntesis de las valoraciones recibidas por dimensión.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Innovación</span>
                                    <span className="text-muted-foreground">8.5/10</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full w-[85%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Viabilidad Comercial</span>
                                    <span className="text-muted-foreground">7.0/10</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full w-[70%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Impacto Social</span>
                                    <span className="text-muted-foreground">9.2/10</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full w-[92%]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                Feedback Cualitativo (IA)
                            </CardTitle>
                            <CardDescription>Hoja de ruta personalizada generada a partir de los comentarios del jurado.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-relaxed text-foreground/80">
                                <strong>Fortalezas:</strong> Gran enfoque en el impacto social y solución innovadora para el sector.<br/><br/>
                                <strong>Áreas de Mejora:</strong> Se sugiere detallar más el modelo de monetización a corto plazo y establecer alianzas estratégicas para mejorar la viabilidad comercial.<br/><br/>
                                <strong>Siguiente paso:</strong> Considera crear un prototipo funcional (MVP) de la pasarela de pagos.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 3: MIS VOTACIONES (Vista Público/Jurado) */}
                <TabsContent value="votaciones" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Votaciones Activas</CardTitle>
                            <CardDescription>Eventos donde el periodo de votación está abierto.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-2">
                                    <div>
                                        <p className="font-medium">Hackathon Ciberseguridad</p>
                                        <p className="text-sm text-muted-foreground mt-1">Cierra en: <span className="text-red-500 font-semibold">45 minutos</span></p>
                                    </div>
                                    <Button variant="outline" size="sm">Ir a Votar</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de Votos</CardTitle>
                            <CardDescription>Tus votos recientes (anonimizados en el sistema central).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-500/10 p-2 rounded-full">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Voto emitido para "Proyecto X"</p>
                                            <p className="text-xs text-muted-foreground">Hace 2 días</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold bg-muted px-2 py-1 rounded">8.5</div>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-500/10 p-2 rounded-full">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Voto emitido para "App Educativa Y"</p>
                                            <p className="text-xs text-muted-foreground">Hace 1 semana</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold bg-muted px-2 py-1 rounded">9.0</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 4: GESTION DE EVENTOS (Vista Organizador) */}
                <TabsContent value="eventos" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado de las Votaciones</CardTitle>
                            <CardDescription>Monitorización en tiempo real.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg bg-card">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold">Hackathon Ciberseguridad</h3>
                                            <p className="text-sm text-muted-foreground">Progreso de participación: 85%</p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                            En curso
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-3 mb-4">
                                        <div className="h-full bg-primary rounded-full w-[85%]" />
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className="w-full gap-2 border-primary/20 hover:bg-primary/5 text-primary"
                                        onClick={() => setIsConfigOpen(true)}
                                    >
                                        <Settings className="h-4 w-4" />
                                        Configurar Evento
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Acciones Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="destructive" className="gap-2">
                                    <Lock className="h-4 w-4" />
                                    Cerrar Votaciones
                                </Button>
                                <Button variant="secondary" className="gap-2">
                                    <Clock className="h-4 w-4" />
                                    Extender 24h
                                </Button>
                                <Button variant="outline" className="gap-2">
                                    <Eye className="h-4 w-4" />
                                    Publicar Resultados Preliminares
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 5: CONFIGURACION */}
                <TabsContent value="configuracion" className="space-y-6">
                    {/* Tarjeta de perfil movida aqui */}
                    <Card className="border-border/50 overflow-hidden shadow-sm">
                        <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.76_0.155_72/0.15)_0%,transparent_70%)]" />
                        </div>
                        <CardContent className="pt-0 pb-6 px-6">
                            <div className="-mt-10 mb-5">
                                <Avatar className="h-20 w-20 ring-4 ring-background shadow-xl">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                                        SU
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold mb-0.5">Superusuario Admin</h2>
                                <p className="text-sm text-muted-foreground">admin@votify.com</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Datos Personales</CardTitle>
                            <CardDescription>Actualiza tu información de cuenta.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Nombre de Usuario</Label>
                                <Input id="username" defaultValue="Superusuario Admin" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input id="email" type="email" defaultValue="admin@votify.com" />
                            </div>
                            <div className="pt-2">
                                <Button>Guardar Cambios</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <EventConfigDialog isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
        </div>
    );
}
