import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { uploadBrandImage } from "../../services/uploadService";
import {
    IMAGE_BASE_URL
}
    from "../../config";

function AdminBrands() {

    const [brands, setBrands] =
        useState([]);

    const [formData, setFormData] =
        useState({
            name: "",
            slug: "",
            logoUrl: "",
            description: "",
            website: "",
            country: ""
        });

    const [editingId, setEditingId] = useState(null);

    const [logoFile, setLogoFile] = useState(null);

    useEffect(() => {

        fetchBrands();

    }, []);

    const fetchBrands =
        async () => {

            try {

                const response =
                    await api.get("/brand");

                setBrands(
                    response.data
                );

            }
            catch (error) {

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

            setFormData({

                name: "",
                slug: "",
                logoUrl: "",
                description: "",
                website: "",
                country: ""

            });

            setEditingId(null);
        };

    const generateSlug = (text) => {

        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                let logoUrl =
                    formData.logoUrl;

                if (logoFile) {

                    const uploadResponse =
                        await uploadBrandImage(
                            logoFile
                        );

                    logoUrl =
                        uploadResponse.data.imageUrl;
                }

                const brandData = {

                    ...formData,

                    slug: generateSlug(
                        formData.name
                    ),

                    logoUrl
                };

                if (editingId) {

                    await api.put(
                        "/brand",
                        {
                            id: editingId,
                            ...brandData
                        }
                    );

                    toast.success(
                        "Brand Updated"
                    );

                } else {

                    await api.post(
                        "/brand",
                        brandData
                    );

                    toast.success(
                        "Brand Added"
                    );
                }

                resetForm();

                fetchBrands();

            }
            catch (error) {

                console.error(error);

                toast.error(
                    "Operation Failed"
                );
            }
        };

    const handleEdit =
        (brand) => {

            setEditingId(
                brand.id
            );

            setFormData({

                name:
                    brand.name,

                slug:
                    brand.slug,

                logoUrl:
                    brand.logoUrl,

                description:
                    brand.description,

                website:
                    brand.website,

                country:
                    brand.country
            });
        };

    const handleDelete =
        async (id) => {

            try {

                await api.delete(
                    `/brand/${id}`
                );

                toast.success(
                    "Brand Deleted"
                );

                fetchBrands();

            }
            catch (error) {

                toast.error(
                    "Delete Failed"
                );
            }
        };

    const handleImageChange =
        (e) => {

            setLogoFile(
                e.target.files[0]
            );
        };

    return (

        <div>

            <h1 className="mb-4">
                Brand Management
            </h1>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Brand Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Brand Logo
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-primary"
                        >

                            {
                                editingId
                                    ?

                                    "Update Brand"

                                    :

                                    "Add Brand"
                            }

                        </button>

                    </form>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                brands.map(
                                    brand => (

                                        <tr
                                            key={
                                                brand.id
                                            }
                                        >

                                            <td>
                                                {brand.id}
                                            </td>

                                            <td>

                                                {
                                                    brand.logoUrl && (

                                                        <img
                                                            src={
                                                                brand.logoUrl
                                                                    ? `http://localhost:8080/ecommerce-backend${brand.logoUrl}`
                                                                    : "https://via.placeholder.com/100"
                                                            }
                                                            alt={brand.name}
                                                            width="60"
                                                            height="60"
                                                            style={{
                                                                objectFit:
                                                                    "contain"
                                                            }}
                                                        />

                                                    )
                                                }

                                            </td>

                                            <td>
                                                {brand.name}
                                            </td>

                                            <td>
                                                {brand.country}
                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() =>
                                                        handleEdit(
                                                            brand
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            brand.id
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

export default AdminBrands;