type Project = {
    id: string;
    titulo: string;
    descripcion: string;
    createdAt: string;
}

export const projects: Project[] = [
    {
        id: "1",
        titulo: "Plataforma Educativa AI",
        descripcion: "Una plataforma que utiliza inteligencia artificial para adaptar el contenido de aprendizaje a las necesidades de cada estudiante, mejorando la retención y el engagement escolar.",
        createdAt: "2026-03-01T10:00:00.000Z"
    },
    {
        id: "2",
        titulo: "EcoTracker Urbano",
        descripcion: "Aplicación móvil y hardware IoT para que los ciudadanos midan la calidad del aire y el ruido en su vecindario y compartan los datos en tiempo real.",
        createdAt: "2026-03-02T15:30:00.000Z"
    },
    {
        id: "3",
        titulo: "Fintech Inclusiva",
        descripcion: "Billetera digital diseñada específicamente para personas mayores con interfaces simplificadas y soporte por voz integrado nativamente.",
        createdAt: "2026-03-03T09:15:00.000Z"
    },
    {
        id: "4",
        titulo: "Huertos Compartidos",
        descripcion: "Plataforma que conecta a personas con espacios sin usar (terrazas, jardines) con personas que quieren plantar pero no tienen dónde.",
        createdAt: "2026-03-04T08:00:00.000Z"
    }
];