import { CategoryResponse } from "../Models/Response/CategoryResponse";
import apiService from "./Bases/AxiosApi";


const api = "/products/categories";

async function getAll(): Promise<CategoryResponse[]> {
    return await apiService.get(api);
}

const CategoryService = {
    getAll: () => getAll(),
    
};

export default CategoryService;
