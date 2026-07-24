import {
    useEffect,
    useMemo,
    useState
}
    from "react";

import {
    FaBoxOpen,
    FaCheck,
    FaEdit,
    FaPlus,
    FaSearch,
    FaStar,
    FaTimes,
    FaTrash,
    FaUndo
}
    from "react-icons/fa";

import {
    FaBoxesStacked,
    FaImage,
    FaTags
}
    from "react-icons/fa6";

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
    getAllCategories
}
    from "../../services/categoryService";

import {
    getAllTags
}
    from "../../services/tagsService";

import {
    API_BASE_URL
}
    from "../../services/api";

import {
    toast
}
    from "react-toastify";

import Loader
    from "../../components/Loader";

import "../../css/admin/AdminProducts.css";

import SearchableDropdown from "../../components/common/SearchableDropdown";


function AdminProducts() {

    const [
        products,
        setProducts
    ] = useState([]);

    const [
        brands,
        setBrands
    ] = useState([]);

    const [
        categories,
        setCategories
    ] = useState([]);

    const [
        tags,
        setTags
    ] = useState([]);

    const [
        tagSearch,
        setTagSearch
    ] = useState("");

    const [
        searchTerm,
        setSearchTerm
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter
    ] = useState("ALL");

    const [
        editingId,
        setEditingId
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        submitting,
        setSubmitting
    ] = useState(false);

    const [
        deletingId,
        setDeletingId
    ] = useState(null);

    const [
        tagDropdownOpen,
        setTagDropdownOpen
    ] = useState(false);

    const [
        formOpen,
        setFormOpen
    ] = useState(false);


    const [
        formData,
        setFormData
    ] = useState({

        name: "",

        description: "",

        slug: "",

        brandId: "",

        categoryId: "",

        tagIds: []

    });


    useEffect(() => {

        loadData();

    }, []);


    const loadData = async () => {

        try {

            setLoading(true);


            const [
                productResponse,
                brandResponse,
                categoryResponse,
                tagResponse
            ] = await Promise.all([

                getProducts(),

                getBrands(),

                getAllCategories(),

                getAllTags()

            ]);


            setProducts(

                Array.isArray(
                    productResponse.data
                )

                    ? productResponse.data

                    : []

            );


            setBrands(

                Array.isArray(
                    brandResponse.data
                )

                    ? brandResponse.data

                    : []

            );


            setCategories(

                Array.isArray(
                    categoryResponse.data?.data
                )

                    ? categoryResponse.data.data

                    : []

            );


            setTags(

                Array.isArray(
                    tagResponse.data?.data
                )

                    ? tagResponse.data.data

                    : []

            );

        }
        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load product information."
            );

        }
        finally {

            setLoading(false);

        }

    };

    const fetchProducts = async () => {

        try {

            const response =
                await getProducts();


            setProducts(

                Array.isArray(
                    response.data
                )

                    ? response.data

                    : []

            );

        }
        catch (error) {

            console.error(error);

            toast.error(
                "Unable to refresh products."
            );

        }

    };


    const handleChange = e => {

        const {
            name,
            value
        } = e.target;


        setFormData(

            previous => ({

                ...previous,

                [name]:
                    value

            })

        );

    };


    const openAddForm = () => {

        setEditingId(null);

        setFormData({

            name: "",

            description: "",

            slug: "",

            brandId: "",

            categoryId: "",

            tagIds: []

        });

        setTagSearch("");

        setTagDropdownOpen(false);

        setFormOpen(true);

    };


    const resetForm = () => {

        setEditingId(null);

        setFormData({

            name: "",

            description: "",

            slug: "",

            brandId: "",

            categoryId: "",

            tagIds: []

        });

        setTagSearch("");

        setTagDropdownOpen(false);

        setFormOpen(false);

    };


    const handleSubmit = async e => {

        e.preventDefault();


        try {

            setSubmitting(true);


            if (editingId) {

                await updateProduct({

                    id:
                        editingId,

                    ...formData

                });


                toast.success(
                    "Product updated successfully."
                );

            }
            else {

                await addProduct(
                    formData
                );


                toast.success(
                    "Product added successfully."
                );

            }


            resetForm();

            await fetchProducts();

        }
        catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||
                "Unable to save product."

            );

        }
        finally {

            setSubmitting(false);

        }

    };


    const handleEdit = product => {

        setEditingId(
            product.id
        );


        setFormData({

            name:
                product.name || "",

            description:
                product.description || "",

            slug:
                product.slug || "",

            brandId:
                product.brandId || "",

            categoryId:
                product.categoryId || "",

            tagIds:
                product.tagIds || []

        });


        setTagSearch("");

        setTagDropdownOpen(false);

        setFormOpen(true);


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };


    const handleDelete = async product => {

        const confirmed =
            window.confirm(

                `Delete "${product.name}"? This action cannot be undone.`

            );


        if (!confirmed) {

            return;

        }


        try {

            setDeletingId(
                product.id
            );


            await deleteProduct(
                product.id
            );


            toast.success(
                "Product deleted successfully."
            );


            if (
                editingId ===
                product.id
            ) {

                resetForm();

            }


            await fetchProducts();

        }
        catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||
                "Unable to delete product."

            );

        }
        finally {

            setDeletingId(
                null
            );

        }

    };


    const handleTagChange = tagId => {

        setFormData(

            previous => {

                const selected =
                    previous.tagIds.includes(
                        tagId
                    );


                return {

                    ...previous,

                    tagIds:
                        selected

                            ? previous.tagIds.filter(

                                id =>
                                    id !== tagId

                            )

                            : [

                                ...previous.tagIds,

                                tagId

                            ]

                };

            }

        );

    };


    const removeTag = tagId => {

        setFormData(

            previous => ({

                ...previous,

                tagIds:
                    previous.tagIds.filter(

                        id =>
                            id !== tagId

                    )

            })

        );

    };


    const filteredTags =
        useMemo(() => {

            const search =
                tagSearch
                    .trim()
                    .toLowerCase();


            return tags.filter(

                tag =>

                    tag.name
                        ?.toLowerCase()
                        .includes(search)

            );

        }, [
            tags,
            tagSearch
        ]);


    const filteredProducts =
        useMemo(() => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            return products.filter(

                product => {

                    const brandName =

                        product.brandName

                        ||

                        "";


                    const categoryName =

                        product.categoryName

                        ||

                        "";


                    const matchesSearch =

                        !search

                        ||

                        product.name
                            ?.toLowerCase()
                            .includes(search)

                        ||

                        product.slug
                            ?.toLowerCase()
                            .includes(search)

                        ||

                        brandName
                            .toLowerCase()
                            .includes(search)

                        ||

                        categoryName
                            .toLowerCase()
                            .includes(search);


                    const matchesStatus =

                        statusFilter === "ALL"

                        ||

                        (
                            statusFilter === "ACTIVE"

                            &&

                            product.active
                        )

                        ||

                        (
                            statusFilter === "INACTIVE"

                            &&

                            !product.active
                        );


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }

            );

        }, [
            products,
            searchTerm,
            statusFilter
        ]);


    const selectedTags =
        tags.filter(

            tag =>
                formData.tagIds.includes(
                    tag.id
                )

        );


    const activeProducts =
        products.filter(

            product =>
                product.active

        ).length;


    const inactiveProducts =
        products.length -
        activeProducts;


    const totalReviews =
        products.reduce(

            (
                total,
                product
            ) =>

                total +
                Number(
                    product.reviewCount || 0
                ),

            0

        );


    if (loading) {

        return (

            <Loader

                text="Loading products"

                subtext="Preparing your product catalogue and inventory information."

            />

        );

    }


    return (

        <div className="apr-page">


            {/* HEADER */}

            <div className="apr-header">

                <div>

                    <span className="apr-eyebrow">

                        CATALOGUE MANAGEMENT

                    </span>


                    <h1>

                        Products

                    </h1>


                    <p>

                        Create and manage your product catalogue,
                        organize products by brand and category,
                        and control product metadata.

                    </p>

                </div>


                <div className="apr-header-actions">


                    <button
                        type="button"
                        className="apr-refresh-button"
                        onClick={loadData}
                    >

                        <FaUndo />

                        Refresh

                    </button>


                    <button
                        type="button"
                        className="apr-add-button"
                        onClick={openAddForm}
                    >

                        <FaPlus />

                        Add Product

                    </button>

                </div>

            </div>


            {/* SUMMARY */}

            <div className="apr-summary-grid">


                <div className="apr-summary-card">

                    <div className="apr-summary-icon">

                        <FaBoxesStacked />

                    </div>

                    <div>

                        <span>

                            Total Products

                        </span>

                        <strong>

                            {products.length}

                        </strong>

                    </div>

                </div>


                <div className="apr-summary-card">

                    <div className="
                        apr-summary-icon
                        apr-summary-active
                    ">

                        <FaCheck />

                    </div>

                    <div>

                        <span>

                            Active Products

                        </span>

                        <strong>

                            {activeProducts}

                        </strong>

                    </div>

                </div>


                <div className="apr-summary-card">

                    <div className="
                        apr-summary-icon
                        apr-summary-inactive
                    ">

                        <FaBoxOpen />

                    </div>

                    <div>

                        <span>

                            Inactive Products

                        </span>

                        <strong>

                            {inactiveProducts}

                        </strong>

                    </div>

                </div>


                <div className="apr-summary-card">

                    <div className="
                        apr-summary-icon
                        apr-summary-reviews
                    ">

                        <FaStar />

                    </div>

                    <div>

                        <span>

                            Total Reviews

                        </span>

                        <strong>

                            {totalReviews}

                        </strong>

                    </div>

                </div>

            </div>


            {/* PRODUCT FORM */}

            {
                formOpen && (

                    <div className="apr-form-card">


                        <div className="apr-section-header">

                            <div className="apr-section-title">

                                <div className="apr-section-icon">

                                    {
                                        editingId

                                            ? <FaEdit />

                                            : <FaPlus />
                                    }

                                </div>


                                <div>

                                    <h2>

                                        {
                                            editingId

                                                ? "Edit Product"

                                                : "Add New Product"
                                        }

                                    </h2>


                                    <p>

                                        {
                                            editingId

                                                ? "Update the catalogue information for this product."

                                                : "Create the base product information before managing variants and images."
                                        }

                                    </p>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="apr-cancel-edit"
                                onClick={resetForm}
                            >

                                <FaTimes />

                                Close

                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="apr-form"
                        >


                            <div className="apr-form-grid">


                                <div className="apr-field">

                                    <label>

                                        Product Name

                                        <span>*</span>

                                    </label>


                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter product name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="apr-field">

                                    <label>

                                        Product Slug

                                    </label>


                                    <input
                                        type="text"
                                        name="slug"
                                        placeholder="product-url-slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                    />

                                </div>


                                <div className="apr-field">

                                    <label>

                                        Brand

                                        <span>*</span>

                                    </label>


                                    <SearchableDropdown
                                        items={brands}
                                        value={formData.brandId}
                                        onChange={(id) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                brandId: id
                                            }))
                                        }
                                        placeholder="Search brand..."
                                        emptyText="Select Brand"
                                    />

                                </div>


                                <div className="apr-field">

                                    <label>

                                        Category

                                        <span>*</span>

                                    </label>


                                    <SearchableDropdown
                                        items={categories}
                                        value={formData.categoryId}
                                        onChange={(id) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                categoryId: id
                                            }))
                                        }
                                        placeholder="Search category..."
                                        emptyText="Select Category"
                                    />

                                </div>


                                {/* TAGS */}

                                <div className="
                                    apr-field
                                    apr-field-full
                                ">

                                    <label>

                                        Product Tags

                                    </label>


                                    <div className="apr-tags-selector">


                                        <button
                                            type="button"
                                            className="apr-tags-trigger"
                                            onClick={
                                                () =>
                                                    setTagDropdownOpen(

                                                        previous =>
                                                            !previous

                                                    )
                                            }
                                        >

                                            <div>

                                                <FaTags />

                                                <span>

                                                    {
                                                        formData
                                                            .tagIds
                                                            .length > 0

                                                            ? `${formData.tagIds.length} tags selected`

                                                            : "Select product tags"
                                                    }

                                                </span>

                                            </div>


                                            <span className="apr-tags-count">

                                                {
                                                    formData
                                                        .tagIds
                                                        .length
                                                }

                                            </span>

                                        </button>


                                        {
                                            tagDropdownOpen && (

                                                <div className="apr-tags-dropdown">


                                                    <div className="apr-tag-search">

                                                        <FaSearch />


                                                        <input
                                                            type="text"
                                                            placeholder="Search available tags..."
                                                            value={tagSearch}
                                                            onChange={
                                                                e =>
                                                                    setTagSearch(
                                                                        e.target.value
                                                                    )
                                                            }
                                                            autoFocus
                                                        />

                                                    </div>


                                                    <div className="apr-tag-options">

                                                        {
                                                            filteredTags.length === 0

                                                                ? (

                                                                    <div className="apr-no-tags">

                                                                        No matching tags found.

                                                                    </div>

                                                                )

                                                                :

                                                                filteredTags.map(

                                                                    tag => {

                                                                        const selected =

                                                                            formData
                                                                                .tagIds
                                                                                .includes(
                                                                                    tag.id
                                                                                );


                                                                        return (

                                                                            <label
                                                                                key={tag.id}
                                                                                className={
                                                                                    `
                                                                                    apr-tag-option
                                                                                    ${selected

                                                                                        ? "apr-tag-option-selected"

                                                                                        : ""
                                                                                    }
                                                                                    `
                                                                                }
                                                                            >

                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={selected}
                                                                                    onChange={
                                                                                        () =>
                                                                                            handleTagChange(
                                                                                                tag.id
                                                                                            )
                                                                                    }
                                                                                />


                                                                                <span className="apr-custom-checkbox">

                                                                                    {
                                                                                        selected &&

                                                                                        <FaCheck />
                                                                                    }

                                                                                </span>


                                                                                <span>

                                                                                    {tag.name}

                                                                                </span>

                                                                            </label>

                                                                        );

                                                                    }

                                                                )
                                                        }

                                                    </div>

                                                </div>

                                            )
                                        }

                                    </div>


                                    {
                                        selectedTags.length > 0 && (

                                            <div className="apr-selected-tags">

                                                {
                                                    selectedTags.map(

                                                        tag => (

                                                            <span
                                                                key={tag.id}
                                                                className="apr-selected-tag"
                                                            >

                                                                {tag.name}


                                                                <button
                                                                    type="button"
                                                                    onClick={
                                                                        () =>
                                                                            removeTag(
                                                                                tag.id
                                                                            )
                                                                    }
                                                                >

                                                                    <FaTimes />

                                                                </button>

                                                            </span>

                                                        )

                                                    )
                                                }

                                            </div>

                                        )
                                    }

                                </div>


                                <div className="
                                    apr-field
                                    apr-field-full
                                ">

                                    <label>

                                        Description

                                    </label>


                                    <textarea
                                        name="description"
                                        rows="5"
                                        placeholder="Describe the product, its key features and important information..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            <div className="apr-form-actions">


                                <button
                                    type="button"
                                    className="apr-secondary-button"
                                    onClick={resetForm}
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="apr-primary-button"
                                    disabled={submitting}
                                >

                                    {
                                        submitting

                                            ? (

                                                <>

                                                    <span className="apr-button-loader" />

                                                    Saving Product

                                                </>

                                            )

                                            : editingId

                                                ? (

                                                    <>

                                                        <FaCheck />

                                                        Update Product

                                                    </>

                                                )

                                                : (

                                                    <>

                                                        <FaPlus />

                                                        Add Product

                                                    </>

                                                )
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                )
            }


            {/* TOOLBAR */}

            <div className="apr-toolbar">


                <div className="apr-search">

                    <FaSearch />


                    <input
                        type="text"
                        placeholder="Search products by name, slug, brand or category..."
                        value={searchTerm}
                        onChange={
                            e =>
                                setSearchTerm(
                                    e.target.value
                                )
                        }
                    />


                    {
                        searchTerm && (

                            <button
                                type="button"
                                onClick={
                                    () =>
                                        setSearchTerm("")
                                }
                            >

                                <FaTimes />

                            </button>

                        )
                    }

                </div>


                <div className="apr-filter">

                    <span>

                        Status

                    </span>


                    <select
                        value={statusFilter}
                        onChange={
                            e =>
                                setStatusFilter(
                                    e.target.value
                                )
                        }
                    >

                        <option value="ALL">

                            All Products

                        </option>

                        <option value="ACTIVE">

                            Active

                        </option>

                        <option value="INACTIVE">

                            Inactive

                        </option>

                    </select>

                </div>

            </div>


            {/* PRODUCT CATALOGUE */}

            <div className="apr-catalogue-card">


                <div className="apr-catalogue-header">

                    <div>

                        <h2>

                            Product Catalogue

                        </h2>


                        <p>

                            Manage products available across your store.

                        </p>

                    </div>


                    <span>

                        {filteredProducts.length} products

                    </span>

                </div>


                {
                    filteredProducts.length === 0

                        ? (

                            <div className="apr-empty-state">

                                <div className="apr-empty-icon">

                                    <FaBoxOpen />

                                </div>


                                <h3>

                                    {
                                        products.length === 0

                                            ? "No products yet"

                                            : "No matching products"
                                    }

                                </h3>


                                <p>

                                    {
                                        products.length === 0

                                            ? "Add your first product to start building your catalogue."

                                            : "Try changing your search term or product status filter."
                                    }

                                </p>

                            </div>

                        )

                        : (

                            <div className="apr-product-grid">

                                {
                                    filteredProducts.map(

                                        product => {

                                            const imageUrl =

                                                product.imageUrl

                                                    ? `${API_BASE_URL}${product.imageUrl}`

                                                    : null;


                                            const brandName =

                                                product.brandName

                                                ||

                                                "ShopSphere";


                                            const categoryName =

                                                product.categoryName

                                                ||

                                                "Uncategorized";


                                            const rating =

                                                Number(
                                                    product.averageRating || 0
                                                );


                                            const reviewCount =

                                                Number(
                                                    product.reviewCount || 0
                                                );


                                            const startingPrice =

                                                product.startingPrice !== null

                                                    &&

                                                    product.startingPrice !== undefined

                                                    ? Number(
                                                        product.startingPrice
                                                    )

                                                    : null;


                                            return (

                                                <article
                                                    className="apr-product-card"
                                                    key={product.id}
                                                >


                                                    {/* PRODUCT IMAGE */}

                                                    <div className="apr-card-image-wrapper">


                                                        {
                                                            imageUrl

                                                                ? (

                                                                    <img
                                                                        src={imageUrl}
                                                                        alt={product.name}
                                                                        className="apr-card-image"
                                                                        loading="lazy"
                                                                    />

                                                                )

                                                                : (

                                                                    <div className="apr-card-placeholder">

                                                                        <FaImage />

                                                                        <span>

                                                                            Image unavailable

                                                                        </span>

                                                                    </div>

                                                                )
                                                        }


                                                        {/* BRAND BADGE */}

                                                        <span className="apr-card-brand-badge">

                                                            {brandName}

                                                        </span>


                                                        {/* STATUS */}

                                                        <span
                                                            className={
                                                                `
                            apr-card-status
                            ${product.active

                                                                    ? "apr-card-status-active"

                                                                    : "apr-card-status-inactive"
                                                                }
                            `
                                                            }
                                                        >

                                                            <span />


                                                            {
                                                                product.active

                                                                    ? "Active"

                                                                    : "Inactive"
                                                            }

                                                        </span>

                                                    </div>


                                                    {/* PRODUCT INFORMATION */}

                                                    <div className="apr-card-content">


                                                        {/* BRAND + CATEGORY */}

                                                        <div className="apr-card-meta">

                                                            <span>

                                                                {brandName}

                                                            </span>


                                                            <span>

                                                                {categoryName}

                                                            </span>

                                                        </div>


                                                        {/* PRODUCT NAME */}

                                                        <h3 className="apr-card-name">

                                                            {product.name}

                                                        </h3>


                                                        {/* SLUG */}

                                                        <span className="apr-card-slug">

                                                            {
                                                                product.slug

                                                                    ? `/${product.slug}`

                                                                    : `Product ID · ${product.id}`
                                                            }

                                                        </span>


                                                        {/* RATING */}

                                                        <div className="apr-card-rating-row">


                                                            {
                                                                rating > 0

                                                                    ? (

                                                                        <>

                                                                            <div className="apr-card-rating">

                                                                                <FaStar />


                                                                                <strong>

                                                                                    {
                                                                                        rating.toFixed(
                                                                                            1
                                                                                        )
                                                                                    }

                                                                                </strong>

                                                                            </div>


                                                                            <span>

                                                                                {
                                                                                    reviewCount === 1

                                                                                        ? "1 review"

                                                                                        : `${reviewCount} reviews`
                                                                                }

                                                                            </span>

                                                                        </>

                                                                    )

                                                                    : (

                                                                        <span className="apr-card-new">

                                                                            New arrival

                                                                        </span>

                                                                    )
                                                            }

                                                        </div>


                                                        <div className="apr-card-divider" />


                                                        {/* PRICE + ACTIONS */}

                                                        <div className="apr-card-bottom">


                                                            <div className="apr-card-price">

                                                                <span>

                                                                    Starting from

                                                                </span>


                                                                {
                                                                    startingPrice !== null

                                                                        ? (

                                                                            <strong>

                                                                                ₹{
                                                                                    startingPrice
                                                                                        .toLocaleString(
                                                                                            "en-IN"
                                                                                        )
                                                                                }

                                                                            </strong>

                                                                        )

                                                                        : (

                                                                            <strong className="apr-card-no-price">

                                                                                No variants

                                                                            </strong>

                                                                        )
                                                                }

                                                            </div>


                                                            <div className="apr-card-actions">


                                                                <button
                                                                    type="button"
                                                                    className="apr-card-edit"
                                                                    onClick={
                                                                        () =>
                                                                            handleEdit(
                                                                                product
                                                                            )
                                                                    }
                                                                >

                                                                    <FaEdit />

                                                                    Edit

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="apr-card-delete"
                                                                    title="Delete product"
                                                                    disabled={
                                                                        deletingId ===
                                                                        product.id
                                                                    }
                                                                    onClick={
                                                                        () =>
                                                                            handleDelete(
                                                                                product
                                                                            )
                                                                    }
                                                                >

                                                                    {
                                                                        deletingId ===
                                                                            product.id

                                                                            ? (

                                                                                <span className="apr-small-loader" />

                                                                            )

                                                                            : (

                                                                                <FaTrash />

                                                                            )
                                                                    }

                                                                </button>

                                                            </div>

                                                        </div>


                                                    </div>

                                                </article>

                                            );

                                        }

                                    )
                                }

                            </div>

                        )
                }

            </div>

        </div>

    );

}


export default AdminProducts;