import { Button, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import ProductService from "../Services/ProductService";
import { ProductResponse } from "../Models/Response/ProductResponse";
import CardProduct from "../Components/CardProduct";
import AddProductModal from "./AddProductModal";
import { NOT_IMAGE } from "../Utils/Constants";
import Loader from "../Commons/Loader";
import { ProductRequest } from "../Models/Request/ProductRequest";


const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductRequest | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        ProductService.getAll().then(function (response) {
          setProducts(response)
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = () => {
    setCurrentProduct(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };
  const handleProductAdded = (newProduct: any) => {
    if (isEditing) {
      setProducts(products.map(p => (p.id === newProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, newProduct]);
    }
  };


  const handleEdit = (id: number) => {
    console.log(`Edit product with id: ${id}`);
    const product = products.find(p => p.id === id);
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Do you want to delete the item?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

  const deleteProduct = async (id: number) => {
    try {
      setLoading(true)
      ProductService.deleteProduct(id).then(function (response) {
        console.log('response', response)
        setLoading(false)
        Swal.fire('The product was deleted!' + response.title, '', 'success')
      });
    } catch (error) {
      console.log('Error: ', error)
      setLoading(false)
    }

  }


  return (
    <Container className="mt-5">
      <Loader showLoading={loading} />
      <Button variant="primary" onClick={handleAdd} className="my-3">
        Add product
      </Button>
      <AddProductModal
        show={showModal}
        handleClose={handleModalClose}
        onProductAdded={handleProductAdded}
        isEditing={isEditing}
        initialValues={currentProduct || undefined}
      />
      <h1>Product List</h1>
      <Row>

        {products.map(product => (
          <CardProduct
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.image || NOT_IMAGE}
            description={product.description}
            onEdit={handleEdit}
            onDelete={handleDelete}
            
            viewMode="grid" />

        ))}
      </Row>
    </Container>
  )
}

export default Products