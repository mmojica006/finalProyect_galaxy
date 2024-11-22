import { ProductRequest } from "../Models/Request/ProductRequest";
import { ProductResponse } from "../Models/Response/ProductResponse";
import apiService from "./Bases/AxiosApi";


const api = "/products";

async function getAll(): Promise<ProductResponse[]> {
    return await apiService.get("/products");
}

async function findById(productId: number) : Promise<ProductRequest>{
    return await apiService.get(`${api}/${productId}`);
}

async function addProduct(product: ProductRequest): Promise<ProductRequest> {
    return await apiService.post(api, product);
}

async function updateProduct(product: ProductRequest, productId?: number): Promise<ProductRequest> {
    return await apiService.post(`${api}/${productId}`, product);
}

async function deleteProduct(productId: number): Promise<ProductRequest> {
    return await apiService.delete(`${api}/${productId}`);
}


const ProductService = {
    getAll: () => getAll(),
    findById: (productId: number) => findById(productId),
    addProduct: (product: ProductRequest) => addProduct(product),
    updateProduct: (product: ProductRequest, productId?: number) => updateProduct(product, productId),
    deleteProduct:(productId: number)=> deleteProduct(productId),
};

export default ProductService;
