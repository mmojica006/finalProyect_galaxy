import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AddProductModalProps } from '../Types/AddProductModalProps';
import ProductService from '../Services/ProductService';
import { ProductRequest } from '../Models/Request/ProductRequest';
import CategoryService from '../Services/CategoryService';
import CategoryDropdown from '../Components/CategoryDropdown';
import { CategoryResponse } from '../Models/Response/CategoryResponse';
import SweetAlert2 from 'react-sweetalert2';
import Loader from '../Commons/Loader';


const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    category: Yup.string().required('Category is required'),
});

const AddProductModal: React.FC<AddProductModalProps> = ({ show, isEditing, handleClose, onProductAdded, initialValues }) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<ProductRequest>(initialValues || {
        id: 0,
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
    });
    const [categoryList, setCategoryList] = useState<CategoryResponse[]>([]);
    const [swalProps, setSwalProps] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                CategoryService.getAll().then(function (response) {
                    setCategoryList(response)
                    console.log('Category', response)

                });
            } catch (error) {
                console.log('error: ', error)
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (initialValues) {
            setFormValues(initialValues);
        }
    }, [initialValues]);

    useEffect(() => {
        if (!isEditing) {
            setFormValues({
                id: 0,
                title: '',
                price: 0,
                description: '',
                image: '',
                category: '',
            });
        }
    }, [isEditing]);


    const handleSubmit = async (values: ProductRequest, formikHelpers: FormikHelpers<ProductRequest>) => {
        const { setSubmitting, resetForm } = formikHelpers;
        try {
            setLoading(true)
            let response;
            if (isEditing) {
                response = await ProductService.updateProduct(values, values.id);
            }
            else {
                response = await ProductService.addProduct(values);
            }

            if (response) {
                setSwalProps({
                    show: true,
                    title: 'Successful',
                    text: `The product has been ${isEditing ? 'updated' : 'added'}!`,
                });
                onProductAdded(response);
                resetForm();
                handleClose();
            }


        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setSubmitting(false);
            setLoading(false)
        }
    }

    return (
        <>
            <Loader showLoading={loading} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        enableReinitialize
                        initialValues={formValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, formikHelpers) => {
                            handleSubmit(values, formikHelpers);
                            formikHelpers.setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <FormikForm>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Field name="title" type="text" className="form-control" />
                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Field name="price" type="number" className="form-control" />
                                    <ErrorMessage name="price" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Field name="description" type="text" className="form-control" />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Image URL</Form.Label>
                                    <Field name="image" type="text" className="form-control" />
                                    <ErrorMessage name="image" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Field name="category" component={CategoryDropdown} categories={categoryList} />
                                    {errors.category && touched.category ? (
                                        <div className="text-danger">{errors.category}</div>
                                    ) : null}
                                    <ErrorMessage name="category" component="div" className="text-danger" />
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                                        {isSubmitting ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Product' : 'Add Product')}
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
                <SweetAlert2 {...swalProps} />
            </Modal>
        </>

    );
};

export default AddProductModal;
