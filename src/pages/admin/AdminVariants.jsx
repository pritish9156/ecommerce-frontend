import { useEffect, useState } from "react";

import {
    getVariants,
    addVariant,
    updateVariant,
    deleteVariant
}
from "../../services/variantService";

import {
    getProducts
}
from "../../services/productService";

import { toast }
from "react-toastify";

function AdminVariants() {

    const [variants, setVariants] =
        useState([]);

    const [products, setProducts] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            productId: "",
            sku: "",
            price: "",
            discountPercentage: "",
            stock: ""
        });

    useEffect(() => {

        fetchVariants();
        fetchProducts();

    }, []);

    const fetchVariants =
        async () => {

        try {

            const response =
                await getVariants();

            setVariants(
                response.data
            );

        }
        catch(error) {

            console.error(error);

        }
    };

    const fetchProducts =
        async () => {

        try {

            const response =
                await getProducts();

            setProducts(
                response.data
            );

        }
        catch(error) {

            console.error(error);

        }
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

            productId: "",
            sku: "",
            price: "",
            discountPercentage: "",
            stock: ""

        });
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            if(editingId) {

                await updateVariant({

                    id: editingId,

                    ...formData

                });

                toast.success(
                    "Variant Updated"
                );

            }
            else {

                await addVariant(
                    formData
                );

                toast.success(
                    "Variant Added"
                );
            }

            resetForm();

            fetchVariants();

        }
        catch(error) {

            toast.error(
                "Operation Failed"
            );
        }
    };

    const handleEdit =
        (variant) => {

        setEditingId(
            variant.id
        );

        setFormData({

            productId:
                variant.productId,

            sku:
                variant.sku,

            price:
                variant.price,

            discountPercentage:
                variant.discountPercentage,

            stock:
                variant.stock

        });
    };

    const handleDelete =
        async (id) => {

        try {

            await deleteVariant(id);

            toast.success(
                "Variant Deleted"
            );

            fetchVariants();

        }
        catch(error) {

            toast.error(
                "Delete Failed"
            );
        }
    };


    return (

        <div>

            <h1 className="mb-4">
                Variant Management
            </h1>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Product
                                </label>

                                <select
                                    className="form-select"
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                    required
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

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    SKU
                                </label>

                                <input
                                    className="form-control"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Discount %
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="discountPercentage"
                                    value={formData.discountPercentage}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

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
                                "Update Variant"
                                :
                                "Add Variant"
                            }

                        </button>

                    </form>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table
                        className="
                            table
                            table-hover
                        "
                    >

                        <thead
                            className="
                                table-dark
                            "
                        >

                            <tr>

                                <th>ID</th>

                                <th>Product</th>

                                <th>SKU</th>

                                <th>Price</th>

                                <th>Discount</th>

                                <th>Stock</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                variants.map(
                                    variant => (

                                        <tr
                                            key={variant.id}
                                        >

                                            <td>
                                                {variant.id}
                                            </td>

                                            <td>
                                                {
                                                    variant.productName
                                                }
                                            </td>

                                            <td>
                                                {variant.sku}
                                            </td>

                                            <td>
                                                ₹ {variant.price}
                                            </td>

                                            <td>
                                                {
                                                    variant.discountPercentage
                                                }%
                                            </td>

                                            <td>
                                                {
                                                    variant.stock
                                                }
                                            </td>

                                            <td>

                                                {
                                                    variant.active
                                                    ?

                                                    <span className="badge bg-success">
                                                        Active
                                                    </span>

                                                    :

                                                    <span className="badge bg-danger">
                                                        Inactive
                                                    </span>
                                                }

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() =>
                                                        handleEdit(
                                                            variant
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            variant.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default AdminVariants;