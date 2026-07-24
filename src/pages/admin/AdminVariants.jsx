import {
    useEffect,
    useMemo,
    useState
}
    from "react";

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

import {

    FaBoxesStacked,
    FaPlus,
    FaMagnifyingGlass,
    FaXmark,
    FaPen,
    FaTrash,
    FaBox,
    FaCube,
    FaLayerGroup

}
    from "react-icons/fa6";

import {
    toast
}
    from "react-toastify";

import SearchableDropdown from "../../components/common/SearchableDropdown";

import "../../css/admin/AdminVariants.css";

function AdminVariants() {

    const [
        variants,
        setVariants
    ] =
        useState([]);


    const [
        filteredVariants,
        setFilteredVariants
    ] =
        useState([]);


    const [
        products,
        setProducts
    ] =
        useState([]);


    const [
        loading,
        setLoading
    ] =
        useState(true);


    const [
        editingId,
        setEditingId
    ] =
        useState(null);


    const [
        formOpen,
        setFormOpen
    ] =
        useState(false);


    const [
        search,
        setSearch
    ] =
        useState("");


    const [
        productFilter,
        setProductFilter
    ] =
        useState("ALL");


    const [
        statusFilter,
        setStatusFilter
    ] =
        useState("ALL");


    const [
        stockFilter,
        setStockFilter
    ] =
        useState("ALL");


    const [
        formData,
        setFormData
    ] =
        useState({

            productId: "",

            sku: "",

            price: "",

            discountPercentage: "",

            stock: ""

        });

    useEffect(

        () => {

            fetchVariants();

            fetchProducts();

        },

        []

    );

    const fetchVariants =
        async () => {

            try {

                setLoading(
                    true
                );

                const response =
                    await getVariants();

                const data =
                    response.data || [];

                setVariants(
                    data
                );

            }

            catch (error) {

                console.error(
                    error
                );

                toast.error(
                    "Unable to load variants."
                );

            }

            finally {

                setLoading(
                    false
                );

            }

        };

    const fetchProducts =
        async () => {

            try {

                const response =
                    await getProducts();

                setProducts(

                    response.data || []

                );

            }

            catch (error) {

                console.error(
                    error
                );

            }

        };

    const handleChange =
        event => {

            setFormData({

                ...formData,

                [event.target.name]:
                    event.target.value

            });

        };

    const resetForm =
        () => {

            setEditingId(
                null
            );

            setFormOpen(
                false
            );

            setFormData({

                productId: "",

                sku: "",

                price: "",

                discountPercentage: "",

                stock: ""

            });

        };

    const handleAddVariant =
        () => {

            resetForm();

            setFormOpen(
                true
            );

        };

    const handleEdit =
        variant => {

            setEditingId(
                variant.id
            );

            setFormOpen(
                true
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

            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        };

    const handleDelete =
        async id => {

            if (

                !window.confirm(

                    "Delete this variant?"

                )

            )

                return;

            try {

                await deleteVariant(
                    id
                );

                toast.success(

                    "Variant deleted."

                );

                fetchVariants();

            }

            catch {

                toast.error(

                    "Delete failed."

                );

            }

        };

    const handleSubmit =
        async event => {

            event.preventDefault();

            try {

                if (editingId) {

                    await updateVariant({

                        id:
                            editingId,

                        ...formData

                    });

                    toast.success(

                        "Variant updated."

                    );

                }

                else {

                    await addVariant(

                        formData

                    );

                    toast.success(

                        "Variant added."

                    );

                }

                resetForm();

                fetchVariants();

            }

            catch {

                toast.error(

                    "Operation failed."

                );

            }

        };

    const displayedVariants =
        useMemo(

            () => {

                return variants.filter(

                    variant => {

                        const searchMatch =

                            !search

                            ||

                            variant.productName
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )

                            ||

                            variant.sku
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                );

                        const productMatch =

                            productFilter ===
                            "ALL"

                            ||

                            String(
                                variant.productId
                            ) ===
                            productFilter;

                        const statusMatch =

                            statusFilter ===
                            "ALL"

                            ||

                            (

                                statusFilter ===
                                "ACTIVE"

                                &&

                                variant.active

                            )

                            ||

                            (

                                statusFilter ===
                                "INACTIVE"

                                &&

                                !variant.active

                            );

                        const stockMatch =

                            stockFilter ===
                            "ALL"

                            ||

                            (

                                stockFilter ===
                                "OUT"

                                &&

                                variant.stock === 0

                            )

                            ||

                            (

                                stockFilter ===
                                "LOW"

                                &&

                                variant.stock > 0

                                &&

                                variant.stock < 10

                            )

                            ||

                            (

                                stockFilter ===
                                "AVAILABLE"

                                &&

                                variant.stock >= 10

                            );

                        return (

                            searchMatch

                            &&

                            productMatch

                            &&

                            statusMatch

                            &&

                            stockMatch

                        );

                    }

                );

            },

            [

                variants,

                search,

                productFilter,

                statusFilter,

                stockFilter

            ]

        );

    return (

        <div className="avm-page">


            {/* ========================================================= */}
            {/* PAGE HEADER */}
            {/* ========================================================= */}

            <div className="avm-header">


                <div>

                    <span className="avm-eyebrow">

                        PRODUCT MANAGEMENT

                    </span>

                    <h1>

                        Variant Management

                    </h1>

                    <p>

                        Create and manage product variants,
                        pricing, discounts and inventory.

                    </p>

                </div>


                <div className="avm-header-actions">


                    <div className="avm-count-card">

                        <div className="avm-count-icon">

                            <FaBoxesStacked />

                        </div>

                        <div>

                            <strong>

                                {variants.length}

                            </strong>

                            <span>

                                Total Variants

                            </span>

                        </div>

                    </div>


                    <button

                        type="button"

                        className="avm-add-button"

                        onClick={handleAddVariant}

                    >

                        <FaPlus />

                        Add Variant

                    </button>

                </div>

            </div>



            {/* ========================================================= */}
            {/* FORM */}
            {/* ========================================================= */}

            {

                formOpen &&

                <section className="avm-form-card">

                    <div className="avm-card-header">

                        <div>

                            <h2>

                                {

                                    editingId

                                        ? "Edit Variant"

                                        : "Create Variant"

                                }

                            </h2>

                            <p>

                                Configure pricing, stock and SKU.

                            </p>

                        </div>

                    </div>


                    <form

                        onSubmit={handleSubmit}

                        className="avm-form"

                    >

                        <div className="avm-grid">


                            <div className="avm-field">

                                <label>

                                    Product

                                </label>

                                <SearchableDropdown
                                    items={products}
                                    value={formData.productId}
                                    onChange={(id) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            productId: id
                                        }))
                                    }
                                    placeholder="Search product..."
                                    emptyText="Select Product"
                                />

                            </div>


                            <div className="avm-field">

                                <label>

                                    SKU

                                </label>

                                <input

                                    name="sku"

                                    value={formData.sku}

                                    onChange={handleChange}

                                    required

                                />

                            </div>


                            <div className="avm-field">

                                <label>

                                    Price

                                </label>

                                <input

                                    type="number"

                                    name="price"

                                    value={formData.price}

                                    onChange={handleChange}

                                    required

                                />

                            </div>


                            <div className="avm-field">

                                <label>

                                    Discount %

                                </label>

                                <input

                                    type="number"

                                    name="discountPercentage"

                                    value={formData.discountPercentage}

                                    onChange={handleChange}

                                />

                            </div>


                            <div className="avm-field">

                                <label>

                                    Stock

                                </label>

                                <input

                                    type="number"

                                    name="stock"

                                    value={formData.stock}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                        </div>


                        <div className="avm-form-actions">

                            <button

                                type="button"

                                className="avm-cancel"

                                onClick={resetForm}

                            >

                                Cancel

                            </button>


                            <button

                                type="submit"

                                className="avm-save"

                            >

                                {

                                    editingId

                                        ? "Update Variant"

                                        : "Save Variant"

                                }

                            </button>

                        </div>

                    </form>

                </section>

            }



            {/* ========================================================= */}
            {/* DIRECTORY */}
            {/* ========================================================= */}

            <section className="avm-table-card">


                <div className="avm-card-header">


                    <div>

                        <h2>

                            Variant Directory

                        </h2>

                        <p>

                            Search and manage product variants.

                        </p>

                    </div>

                </div>



                {/* FILTERS */}

                <div className="avm-filter-bar">


                    <div className="avm-search">

                        <FaMagnifyingGlass className="avm-search-icon" />

                        <input

                            placeholder="Search product or SKU..."

                            value={search}

                            onChange={

                                e =>

                                    setSearch(

                                        e.target.value

                                    )

                            }

                        />

                        {

                            search &&

                            <button

                                type="button"

                                onClick={() => setSearch("")}

                            >

                                <FaXmark />

                            </button>

                        }

                    </div>



                    <select

                        value={productFilter}

                        onChange={

                            e =>

                                setProductFilter(

                                    e.target.value

                                )

                        }

                    >

                        <option value="ALL">

                            All Products

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

                            All Status

                        </option>

                        <option value="ACTIVE">

                            Active

                        </option>

                        <option value="INACTIVE">

                            Inactive

                        </option>

                    </select>



                    <select

                        value={stockFilter}

                        onChange={

                            e =>

                                setStockFilter(

                                    e.target.value

                                )

                        }

                    >

                        <option value="ALL">

                            All Stock

                        </option>

                        <option value="AVAILABLE">

                            In Stock

                        </option>

                        <option value="LOW">

                            Low Stock

                        </option>

                        <option value="OUT">

                            Out of Stock

                        </option>

                    </select>


                    <div className="avm-result">

                        <strong>

                            {displayedVariants.length + " "}

                        </strong>

                        Results

                    </div>

                </div>

                {/* ========================= */}
                {/* LOADING */}
                {/* ========================= */}

                {

                    loading

                        ?

                        <div className="avm-loading">

                            {

                                Array.from({

                                    length: 6

                                }).map(

                                    (

                                        _,

                                        index

                                    ) => (

                                        <div

                                            key={index}

                                            className="avm-skeleton-row"

                                        >

                                            <div className="avm-skeleton-product" />

                                            <div className="avm-skeleton" />

                                            <div className="avm-skeleton" />

                                            <div className="avm-skeleton" />

                                            <div className="avm-skeleton" />

                                            <div className="avm-skeleton-action" />

                                        </div>

                                    )

                                )

                            }

                        </div>

                        :


                        displayedVariants.length === 0

                            ?

                            <div className="avm-empty">


                                <FaBoxesStacked className="avm-empty-icon" />


                                <h3>

                                    No variants found

                                </h3>


                                <p>

                                    Try changing the search or filters.

                                </p>


                                <button

                                    type="button"

                                    className="avm-clear"

                                    onClick={() => {

                                        setSearch("");

                                        setProductFilter("ALL");

                                        setStatusFilter("ALL");

                                        setStockFilter("ALL");

                                    }}

                                >

                                    <FaXmark />

                                    Clear Filters

                                </button>

                            </div>

                            :


                            <div className="avm-table-wrapper">


                                <table className="avm-table">


                                    <thead>

                                        <tr>

                                            <th>

                                                Product

                                            </th>

                                            <th>

                                                SKU

                                            </th>

                                            <th>

                                                Price

                                            </th>

                                            <th>

                                                Discount

                                            </th>

                                            <th>

                                                Stock

                                            </th>

                                            <th>

                                                Status

                                            </th>

                                            <th>

                                                Actions

                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {

                                            displayedVariants.map(

                                                variant => (

                                                    <tr

                                                        key={variant.id}

                                                    >


                                                        {/* PRODUCT */}


                                                        <td>

                                                            <div className="avm-product">

                                                                <div className="avm-product-icon">

                                                                    <FaCube />

                                                                </div>

                                                                <div>

                                                                    <strong>

                                                                        {

                                                                            variant.productName

                                                                        }

                                                                    </strong>

                                                                    <span>

                                                                        #

                                                                        {

                                                                            variant.id

                                                                        }

                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </td>



                                                        {/* SKU */}


                                                        <td>

                                                            <span className="avm-sku">

                                                                {

                                                                    variant.sku

                                                                }

                                                            </span>

                                                        </td>



                                                        {/* PRICE */}


                                                        <td>

                                                            ₹

                                                            {

                                                                Number(

                                                                    variant.price

                                                                ).toLocaleString()

                                                            }

                                                        </td>



                                                        {/* DISCOUNT */}


                                                        <td>

                                                            {

                                                                variant.discountPercentage || 0

                                                            }

                                                            %

                                                        </td>



                                                        {/* STOCK */}


                                                        <td>

                                                            {

                                                                variant.stock === 0

                                                                    ?

                                                                    <span className="avm-stock-out">

                                                                        Out of Stock

                                                                    </span>

                                                                    :

                                                                    variant.stock < 10

                                                                        ?

                                                                        <span className="avm-stock-low">

                                                                            {

                                                                                variant.stock + " "

                                                                            }

                                                                            Left

                                                                        </span>

                                                                        :

                                                                        <span className="avm-stock-good">

                                                                            {

                                                                                variant.stock + " "

                                                                            }

                                                                            Available

                                                                        </span>

                                                            }

                                                        </td>



                                                        {/* STATUS */}


                                                        <td>

                                                            {

                                                                variant.active

                                                                    ?

                                                                    <span className="avm-status active">

                                                                        Active

                                                                    </span>

                                                                    :

                                                                    <span className="avm-status inactive">

                                                                        Inactive

                                                                    </span>

                                                            }

                                                        </td>



                                                        {/* ACTIONS */}


                                                        <td>

                                                            <div className="avm-actions">

                                                                <button

                                                                    type="button"

                                                                    className="avm-edit"

                                                                    onClick={() =>

                                                                        handleEdit(

                                                                            variant

                                                                        )

                                                                    }

                                                                >

                                                                    <FaPen />

                                                                </button>

                                                                <button

                                                                    type="button"

                                                                    className="avm-delete"

                                                                    onClick={() =>

                                                                        handleDelete(

                                                                            variant.id

                                                                        )

                                                                    }

                                                                >

                                                                    <FaTrash />

                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )

                                            )

                                        }

                                    </tbody>

                                </table>

                            </div>

                }

            </section>

        </div>

    );

}

export default AdminVariants;