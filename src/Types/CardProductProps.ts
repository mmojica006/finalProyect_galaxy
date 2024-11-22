export interface CardProductProps {
    id: number;
    title?: string;
    imageUrl?: string;
    price?: number;
    description: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    viewMode: "list" | "grid";
}
