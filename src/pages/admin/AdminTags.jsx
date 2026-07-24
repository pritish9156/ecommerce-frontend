import {
    useEffect,
    useState,
    useMemo
}
    from "react";

import {
    FaPlus,
    FaTags,
    FaCheck,
    FaTriangleExclamation,
    FaXmark,
}
    from "react-icons/fa6";

import {
    FaSearch
}
    from "react-icons/fa";

import TagForm
    from "../../components/TagForm";

import TagTable
    from "../../components/TagTable";

import {
    createTag,
    getAllTags,
    updateTag,
    deleteTag
}
    from "../../services/tagsService";

import "../../css/admin/AdminTags.css";


function AdminTags() {

    const [
        tags,
        setTags
    ] = useState([]);


    const [
        showModal,
        setShowModal
    ] = useState(false);


    const [
        selectedTag,
        setSelectedTag
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        deletingId,
        setDeletingId
    ] = useState(null);


    const [
        notification,
        setNotification
    ] = useState(null);

    const [
        searchTerm,
        setSearchTerm
    ] = useState("");


    useEffect(() => {

        fetchTags();

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


    const showNotification = (
        type,
        message
    ) => {

        setNotification({

            type,

            message

        });

    };


    const fetchTags =
        async () => {

            try {

                setLoading(
                    true
                );


                const response =
                    await getAllTags();


                setTags(

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

                    "Unable to load tags."

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

            setSelectedTag(
                null
            );

            setShowModal(
                true
            );

        };


    const handleEdit =
        tag => {

            setSelectedTag(
                tag
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

            setSelectedTag(
                null
            );

        };


    const handleDelete =
        async id => {

            const confirmed =
                window.confirm(

                    "Are you sure you want to delete this tag?"

                );


            if (!confirmed) {

                return;

            }


            try {

                setDeletingId(
                    id
                );


                const response =
                    await deleteTag(
                        id
                    );


                showNotification(

                    "success",

                    response.data?.message

                    ||

                    "Tag deleted successfully."

                );


                await fetchTags();

            }
            catch (error) {

                console.error(
                    error
                );


                showNotification(

                    "error",

                    error.response?.data?.message

                    ||

                    "Unable to delete tag."

                );

            }
            finally {

                setDeletingId(
                    null
                );

            }

        };


    const handleSave =
        async formData => {

            try {

                const response =
                    await createTag(
                        formData
                    );


                showNotification(

                    "success",

                    response.data?.message

                    ||

                    "Tag created successfully."

                );


                await fetchTags();


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

                    "Unable to create tag."

                );


                throw error;

            }

        };


    const handleUpdate =
        async formData => {

            try {

                const response =
                    await updateTag(
                        formData
                    );


                showNotification(

                    "success",

                    response.data?.message

                    ||

                    "Tag updated successfully."

                );


                await fetchTags();


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

                    "Unable to update tag."

                );


                throw error;

            }

        };

    const filteredTags =
        useMemo(() => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            if (!search) {

                return tags;

            }


            return tags.filter(

                tag => {

                    const name =
                        tag.name
                            ?.toLowerCase()
                        || "";


                    const description =
                        tag.description
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

                    );

                }

            );

        }, [
            tags,
            searchTerm
        ]);


    return (

        <div className="atm-page">


            {/* PAGE HEADER */}

            <div className="atm-header">


                <div className="atm-header-content">


                    <span className="atm-eyebrow">

                        CATALOG MANAGEMENT

                    </span>


                    <h1>

                        Tag Management

                    </h1>


                    <p>

                        Create and manage reusable product
                        tags to improve catalog organization
                        and product discovery.

                    </p>


                </div>


                <div className="atm-header-actions">


                    <div className="atm-tag-count">


                        <div className="atm-count-icon">

                            <FaTags />

                        </div>


                        <div>

                            <strong>

                                {tags.length}

                            </strong>


                            <span>

                                Total Tags

                            </span>

                        </div>


                    </div>


                    <button

                        type="button"

                        className="atm-add-button"

                        onClick={
                            handleAdd
                        }

                    >

                        <FaPlus />

                        Add Tag

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

                            "atm-notification atm-notification-success"

                            :

                            "atm-notification atm-notification-error"

                    }

                >


                    <div className="atm-notification-icon">


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



            {/* TAG CONTENT */}

            <section className="atm-content-card">


                <div className="atm-card-header">


                    <div>


                        <h2>

                            Tag Directory

                        </h2>


                        <p>

                            View and manage reusable labels
                            available across your product catalog.

                        </p>


                    </div>


                    <span className="atm-directory-count">

                        {tags.length}

                        {" "}

                        {
                            tags.length === 1

                                ? "tag"

                                : "tags"
                        }

                    </span>


                </div>

                {/* QUICK SEARCH */}

                <div className="atm-search-section">


                    <div className="atm-search-wrapper">


                        <FaSearch className="atm-search-icon" />


                        <input

                            type="text"

                            className="atm-search-input"

                            placeholder="Quick search by tag name or description..."

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

                                className="atm-search-clear"

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


                    <div className="atm-search-result">


                        {

                            searchTerm

                                ?

                                <>

                                    <strong>

                                        {
                                            filteredTags.length
                                        }

                                    </strong>

                                    {" "}

                                    {
                                        filteredTags.length === 1

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


                <div className="atm-table-container">


                    {

                        loading

                            ?

                            <div className="atm-loading-table">


                                {

                                    Array.from({

                                        length: 6

                                    }).map(

                                        (_, index) => (

                                            <div

                                                className="atm-skeleton-row"

                                                key={
                                                    index
                                                }

                                            >


                                                <div className="atm-skeleton-number" />


                                                <div className="atm-skeleton-tag">


                                                    <div className="atm-skeleton-icon" />


                                                    <div className="atm-skeleton-text atm-skeleton-name" />


                                                </div>


                                                <div className="atm-skeleton-text atm-skeleton-description" />


                                                <div className="atm-skeleton-status" />


                                                <div className="atm-skeleton-actions" />


                                            </div>

                                        )

                                    )

                                }


                            </div>

                            :

                            <TagTable
       
                                tags={filteredTags}

                                onEdit={
                                    handleEdit
                                }

                                searchTerm={
                                    searchTerm
                                }

                                onClearSearch={
                                    () =>
                                        setSearchTerm("")
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



            {/* TAG MODAL */}

            <TagForm

                show={
                    showModal
                }

                onHide={
                    handleCloseModal
                }

                tag={
                    selectedTag
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


export default AdminTags;