import { useEffect, useState } from "react";

import { getProducts }
    from "../../services/productService";

import {
    getProductImages,
    addProductImage,
    updateProductImage,
    deleteProductImage
}
    from "../../services/productImageService";

import { toast }
    from "react-toastify";

import { uploadProductImage } from "../../services/uploadService";

function AdminImages() {

    const [products, setProducts] =
        useState([]);

    const [images, setImages] =
        useState([]);

    const [selectedFile,
        setSelectedFile] =
        useState(null);

    const [preview,
        setPreview] =
        useState(null);

    const [selectedProduct,
        setSelectedProduct] =
        useState("");

    const [editingId,
        setEditingId] =
        useState(null);

    const [formData,
        setFormData] =
        useState({
            productId: "",
            imageUrl: "",
            displayOrder: "",
            altText: ""
        });

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts =
        async () => {

            const response =
                await getProducts();

            setProducts(
                response.data
            );
        };

    const fetchImages =
        async (productId) => {

            try {

                const response =
                    await getProductImages(
                        productId
                    );

                setImages(
                    response.data
                );

            }
            catch (error) {

                console.error(error);

            }
        };

    const handleProductChange =
        (e) => {

            const productId =
                e.target.value;

            setSelectedProduct(
                productId
            );

            setFormData({

                ...formData,

                productId
            });

            fetchImages(
                productId
            );
        };

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value

            });
        };

    const resetForm =
        () => {

            setEditingId(null);

            setFormData({

                productId:
                    selectedProduct,

                imageUrl: "",

                displayOrder: "",

                altText: ""

            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                if (editingId) {

                    await updateProductImage({

                        id: editingId,

                        ...formData

                    });

                    toast.success(
                        "Image Updated"
                    );

                }
                else {

                    let imageUrl = "";

                    if(selectedFile) {

                        const uploadResponse =
                            await uploadProductImage(
                                selectedFile
                            );

                        imageUrl =
                            uploadResponse.data.imageUrl;
                    }

                    await addProductImage({

                        productId:
                            formData.productId,

                        imageUrl,

                        displayOrder:
                            formData.displayOrder,

                        altText:
                            formData.altText

                    });

                    toast.success(
                        "Image Added"
                    );
                }

                resetForm();

                fetchImages(
                    selectedProduct
                );

            }
            catch (error) {

                toast.error(
                    "Operation Failed"
                );
            }
        };

    const handleEdit =
        (image) => {

            setEditingId(
                image.id
            );

            setFormData({

                productId:
                    image.product.id,

                imageUrl:
                    image.imageUrl,

                displayOrder:
                    image.displayOrder,

                altText:
                    image.altText

            });
        };

    const handleDelete =
        async (id) => {

            try {

                await deleteProductImage(
                    id
                );

                toast.success(
                    "Image Deleted"
                );

                fetchImages(
                    selectedProduct
                );

            }
            catch (error) {

                toast.error(
                    "Delete Failed"
                );
            }
        };

    const handleFileChange =
        (e) => {

        const file =
            e.target.files[0];

        setSelectedFile(
            file
        );

        setPreview(
            URL.createObjectURL(
                file
            )
        );
    };

    return (

        <div>

            <h1 className="mb-4">
                Product Images
            </h1>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <div className="mb-3">

                        <label>
                            Select Product
                        </label>

                        <select
                            className="form-select"
                            value={selectedProduct}
                            onChange={
                                handleProductChange
                            }
                        >

                            <option value="">
                                Select Product
                            </option>

                            {
                                products.map(
                                    product => (

                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.name}
                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <input
                            type="file"
                            className="form-control mb-3"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {
                            preview && (

                                <div className="mb-3">

                                    <img
                                        src={preview}
                                        alt="preview"
                                        style={{
                                            width: "250px",
                                            borderRadius: "10px"
                                        }}
                                    />

                                </div>

                            )
                        }

                        <input
                            className="form-control mb-3"
                            placeholder="Display Order"
                            name="displayOrder"
                            value={formData.displayOrder}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Alt Text"
                            name="altText"
                            value={formData.altText}
                            onChange={handleChange}
                        />

                        <button
                            className={
                                editingId
                                    ?
                                    "btn btn-warning"
                                    :
                                    "btn btn-primary"
                            }
                        >

                            {
                                editingId
                                    ?
                                    "Update Image"
                                    :
                                    "Add Image"
                            }

                        </button>

                    </form>

                </div>

            </div>

            <div className="row">

                {
                    images.map(
                        image => (

                            <div
                                className="col-md-4 mb-4"
                                key={image.id}
                            >

                                <div
                                    className="card shadow"
                                >

                                    <img
                                        src={`http://localhost:8080/ecommerce-backend${image.imageUrl}`}
                                        alt={image.altText}
                                        className="card-img-top"
                                        style={{
                                            height: "250px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div
                                        className="card-body"
                                    >

                                        <h6>
                                            Order:
                                            {" "}
                                            {
                                                image.displayOrder
                                            }
                                        </h6>

                                        <p>
                                            {
                                                image.altText
                                            }
                                        </p>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                handleEdit(
                                                    image
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(
                                                    image.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>
    );
}

export default AdminImages;