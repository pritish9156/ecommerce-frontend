import { useEffect, useState } from "react";

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}
    from "../../services/productService";

import {
    getBrands
}
    from "../../services/brandService";

import {
    toast
}
    from "react-toastify";

function AdminProducts(){

    const [products, setProducts] = useState([]);

    const [brands, setBrands] = useState([]);

    const [editingId, setEditingId] =useState(null);

    const [formData, setFormData] = useState({

            name: "",
            description: "",
            slug: "",
            brandId: ""

        });

    useEffect(() => {

        fetchProducts();
        fetchBrands();

    }, []);

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

    const fetchBrands =
        async () => {

        try {

            const response =
                await getBrands();

            setBrands(
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

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            if(editingId) {

                await updateProduct({

                    id: editingId,
                    ...formData

                });

                toast.success(
                    "Product Updated"
                );

            }
            else {

                await addProduct(
                    formData
                );

                toast.success(
                    "Product Added"
                );
            }

            resetForm();

            fetchProducts();

        }
        catch(error) {

            toast.error(
                "Operation Failed"
            );
        }
    };

    const resetForm =
        () => {

        setEditingId(null);

        setFormData({

            name: "",
            description: "",
            slug: "",
            brandId: ""

        });
    };

    const handleEdit =
        (product) => {

        setEditingId(
            product.id
        );

        setFormData({

            name:
                product.name,

            description:
                product.description,

            slug:
                product.slug,

            brandId:
                product.brand.id

        });
    };

    const handleDelete =
        async (id) => {

        try {

            await deleteProduct(id);

            toast.success(
                "Product Deleted"
            );

            fetchProducts();

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
                Product Management
            </h1>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Brand
                                </label>

                                <select
                                    className="form-select"
                                    name="brandId"
                                    value={formData.brandId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Brand
                                    </option>

                                    {
                                        brands.map(
                                            brand => (

                                                <option
                                                    key={brand.id}
                                                    value={brand.id}
                                                >
                                                    {brand.name}
                                                </option>

                                            )
                                        )
                                    }

                                </select>

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
                                "Update Product"
                                :
                                "Add Product"
                            }

                        </button>

                    </form>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <div
                        className="
                            d-flex
                            justify-content-between
                            align-items-center
                            mb-3
                        "
                    >

                        <h4>
                            Products
                        </h4>

                        <span
                            className="
                                badge
                                bg-primary
                            "
                        >
                            {products.length}
                        </span>

                    </div>

                    <div
                        className="table-responsive"
                    >

                        <table
                            className="
                                table
                                table-hover
                                align-middle
                            "
                        >

                            <thead
                                className="table-dark"
                            >

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Brand</th>

                                    <th>Slug</th>

                                    <th>Rating</th>

                                    <th>Reviews</th>

                                    <th>Status</th>

                                    <th width="180">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    products.map(
                                        product => (

                                            <tr
                                                key={product.id}
                                            >

                                                <td>
                                                    {product.id}
                                                </td>

                                                <td>
                                                    {product.name}
                                                </td>

                                                <td>
                                                    {
                                                        product.brand?.name
                                                    }
                                                </td>

                                                <td>
                                                    {product.slug}
                                                </td>

                                                <td>
                                                    {
                                                        product.averageRating
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        product.reviewCount
                                                    }
                                                </td>

                                                <td>

                                                    {
                                                        product.active
                                                        ?

                                                        <span
                                                            className="
                                                                badge
                                                                bg-success
                                                            "
                                                        >
                                                            Active
                                                        </span>

                                                        :

                                                        <span
                                                            className="
                                                                badge
                                                                bg-danger
                                                            "
                                                        >
                                                            Inactive
                                                        </span>
                                                    }

                                                </td>

                                                <td>

                                                    <button
                                                        className="
                                                            btn
                                                            btn-warning
                                                            btn-sm
                                                            me-2
                                                        "
                                                        onClick={() =>
                                                            handleEdit(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="
                                                            btn
                                                            btn-danger
                                                            btn-sm
                                                        "
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.id
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

        </div>
    );
}

export default AdminProducts;