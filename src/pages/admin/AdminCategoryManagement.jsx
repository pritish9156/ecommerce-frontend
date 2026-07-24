import {
    useEffect,
    useState,
    useMemo
}
    from "react";

import {
    FaPlus,
    FaLayerGroup,
    FaCheck,
    FaTriangleExclamation,
    FaXmark,
}
    from "react-icons/fa6";

import {
    FaSearch
}
    from "react-icons/fa";

import CategoryForm
    from "../../components/CategoryForm";

import CategoryTable
    from "../../components/CategoryTable";

import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}
    from "../../services/categoryService";

import "../../css/admin/AdminCategoryManagement.css";


function AdminCategoryManagement() {

    const [categories, setCategories] =
        useState([]);

    const [showModal, setShowModal] =
        useState(false);

    const [
        selectedCategory,
        setSelectedCategory
    ] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [
        deletingId,
        setDeletingId
    ] =
        useState(null);

    const [
        notification,
        setNotification
    ] =
        useState(null);

    const [
        searchTerm,
        setSearchTerm
    ] = useState("");


    useEffect(() => {

        fetchCategories();

    }, []);


    useEffect(() => {

        if (!notification) {

            return;

        }

        const timer =
            setTimeout(
                () => {

                    setNotification(
                        null
                    );

                },
                4000
            );

        return () =>
            clearTimeout(
                timer
            );

    }, [notification]);


    const showNotification =
        (
            type,
            message
        ) => {

            setNotification({

                type,

                message

            });

        };


    const fetchCategories =
        async () => {

            try {

                setLoading(
                    true
                );

                const response =
                    await getAllCategories();

                setCategories(

                    response.data?.data
                    ||
                    []

                );

            }
            catch (error) {

                console.error(
                    error
                );

                showNotification(

                    "error",

                    "Unable to load categories."

                );

            }
            finally {

                setLoading(
                    false
                );

            }

        };


    const handleAdd =
        () => {

            setSelectedCategory(
                null
            );

            setShowModal(
                true
            );

        };


    const handleEdit =
        (category) => {

            setSelectedCategory(
                category
            );

            setShowModal(
                true
            );

        };


    const handleCloseModal =
        () => {

            setShowModal(
                false
            );

            setSelectedCategory(
                null
            );

        };


    const handleDelete =
        async (id) => {

            const confirmed =
                window.confirm(

                    "Are you sure you want to delete this category?"

                );

            if (!confirmed) {

                return;

            }

            try {

                setDeletingId(
                    id
                );

                const response =
                    await deleteCategory(
                        id
                    );

                showNotification(

                    "success",

                    response.data?.message
                    ||
                    "Category deleted successfully."

                );

                await fetchCategories();

            }
            catch (error) {

                console.error(
                    error
                );

                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to delete category."

                );

            }
            finally {

                setDeletingId(
                    null
                );

            }

        };


    const handleSave =
        async (formData) => {

            try {

                const response =
                    await createCategory(
                        formData
                    );

                showNotification(

                    "success",

                    response.data?.message
                    ||
                    "Category created successfully."

                );

                await fetchCategories();

                handleCloseModal();

            }
            catch (error) {

                console.error(
                    error
                );

                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to create category."

                );

                throw error;

            }

        };


    const handleUpdate =
        async (formData) => {

            try {

                const response =
                    await updateCategory(
                        formData
                    );

                showNotification(

                    "success",

                    response.data?.message
                    ||
                    "Category updated successfully."

                );

                await fetchCategories();

                handleCloseModal();

            }
            catch (error) {

                console.error(
                    error
                );

                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to update category."

                );

                throw error;

            }

        };

    const filteredCategories =
        useMemo(() => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            if (!search) {

                return categories;

            }


            return categories.filter(

                category => {

                    const name =
                        category.name
                            ?.toLowerCase()
                        || "";


                    const description =
                        category.description
                            ?.toLowerCase()
                        || "";


                    const parentName =
                        category.parentCategory
                            ?.name
                            ?.toLowerCase()
                        || "";


                    return (

                        name.includes(
                            search
                        )

                        ||

                        description.includes(
                            search
                        )

                        ||

                        parentName.includes(
                            search
                        )

                    );

                }

            );

        }, [
            categories,
            searchTerm
        ]);


    return (

        <div className="acm-page">


            {/* PAGE HEADER */}

            <div className="acm-header">


                <div className="acm-header-content">


                    <span className="acm-eyebrow">

                        CATALOG MANAGEMENT

                    </span>


                    <h1>

                        Category Management

                    </h1>


                    <p>

                        Organize your products into structured categories
                        and build a clean catalog hierarchy.

                    </p>


                </div>


                <div className="acm-header-actions">


                    <div className="acm-category-count">


                        <div className="acm-count-icon">

                            <FaLayerGroup />

                        </div>


                        <div>

                            <strong>

                                {
                                    categories.length
                                }

                            </strong>

                            <span>

                                Total Categories

                            </span>

                        </div>


                    </div>


                    <button

                        type="button"

                        className="acm-add-button"

                        onClick={
                            handleAdd
                        }

                    >

                        <FaPlus />

                        Add Category

                    </button>


                </div>


            </div>



            {/* NOTIFICATION */}

            {

                notification

                &&

                <div

                    className={

                        notification.type ===
                            "success"

                            ?

                            "acm-notification acm-notification-success"

                            :

                            "acm-notification acm-notification-error"

                    }

                >


                    <div className="acm-notification-icon">


                        {

                            notification.type ===
                                "success"

                                ?

                                <FaCheck />

                                :

                                <FaTriangleExclamation />

                        }


                    </div>


                    <span>

                        {
                            notification.message
                        }

                    </span>


                    <button

                        type="button"

                        onClick={
                            () =>
                                setNotification(
                                    null
                                )
                        }

                    >

                        <FaXmark />

                    </button>


                </div>

            }



            {/* CATEGORY CONTENT */}

            <section className="acm-content-card">


                <div className="acm-card-header">


                    <div>


                        <h2>

                            Category Directory

                        </h2>


                        <p>

                            View and manage your complete product category structure.

                        </p>


                    </div>


                    <span className="acm-directory-count">

                        {
                            categories.length
                        }

                        {" "}

                        categories

                    </span>


                </div>

                {/* QUICK SEARCH */}

                <div className="acm-search-section">


                    <div className="acm-search-wrapper">


                        <FaSearch className="acm-search-icon" />


                        <input

                            type="text"

                            className="acm-search-input"

                            placeholder="Quick search by category, parent or description..."

                            value={
                                searchTerm
                            }

                            onChange={
                                e =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                            }

                        />


                        {

                            searchTerm

                            &&

                            <button

                                type="button"

                                className="acm-search-clear"

                                onClick={
                                    () =>
                                        setSearchTerm("")
                                }

                                aria-label="Clear search"

                            >

                                <FaXmark />

                            </button>

                        }


                    </div>


                    <div className="acm-search-result">


                        {

                            searchTerm

                                ?

                                <>

                                    <strong>

                                        {
                                            filteredCategories.length
                                        }

                                    </strong>

                                    {" "}

                                    {
                                        filteredCategories.length === 1

                                            ? "result"

                                            : "results"
                                    }

                                </>

                                :

                                <span>

                                    Search directory

                                </span>

                        }


                    </div>


                </div>


                <div className="acm-table-container">


                    {

                        loading

                            ?

                            <div className="acm-loading-table">


                                {

                                    Array.from({

                                        length: 6

                                    }).map(

                                        (_, index) => (

                                            <div

                                                className="acm-skeleton-row"

                                                key={
                                                    index
                                                }

                                            >


                                                <div className="acm-skeleton-number" />


                                                <div className="acm-skeleton-category">


                                                    <div className="acm-skeleton-icon" />


                                                    <div className="acm-skeleton-text acm-skeleton-name" />


                                                </div>


                                                <div className="acm-skeleton-text acm-skeleton-parent" />


                                                <div className="acm-skeleton-text acm-skeleton-description" />


                                                <div className="acm-skeleton-status" />


                                                <div className="acm-skeleton-actions" />


                                            </div>

                                        )

                                    )

                                }


                            </div>

                            :

                            <CategoryTable

                                categories={
                                    filteredCategories
                                }

                                 searchTerm={
                                    searchTerm
                                }

                                onClearSearch={
                                    () =>
                                        setSearchTerm("")
                                }

                                onEdit={
                                    handleEdit
                                }

                                onDelete={
                                    handleDelete
                                }

                                deletingId={
                                    deletingId
                                }

                            />

                    }


                </div>


            </section>



            {/* CATEGORY MODAL */}

            <CategoryForm

                show={
                    showModal
                }

                onHide={
                    handleCloseModal
                }

                category={
                    selectedCategory
                }

                categories={
                    categories
                }

                onSave={
                    handleSave
                }

                onEdit={
                    handleUpdate
                }

            />


        </div>

    );

}


export default AdminCategoryManagement;