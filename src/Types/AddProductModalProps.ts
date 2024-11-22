import { ProductRequest } from "../Models/Request/ProductRequest";

export interface AddProductModalProps {
    show: boolean;
    isEditing?: boolean;
    handleClose: () => void;
    onProductAdded: (product: any) => void;
    initialValues?: ProductRequest;
}
