import {
    useEffect,
    useRef,
    useState,
    useMemo
}
    from "react";

import api
    from "../../services/api";

import {
    uploadBrandImage
}
    from "../../services/uploadService";

import {
    IMAGE_BASE_URL
}
    from "../../config";

import {
    FaBuilding,
    FaGlobe,
    FaLocationDot,
    FaImage,
    FaPen,
    FaTrashCan,
    FaPlus,
    FaXmark,
    FaCheck,
    FaTriangleExclamation,
    FaArrowUpRightFromSquare,
    FaCloudArrowUp,
    FaRotateLeft
}
    from "react-icons/fa6";

import {
    FaSearch
}
    from "react-icons/fa";

import "../../css/admin/AdminBrands.css";


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


    const [editingId, setEditingId] =
        useState(null);


    const [logoFile, setLogoFile] =
        useState(null);


    const [logoPreview, setLogoPreview] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    const [submitting, setSubmitting] =
        useState(false);


    const [deletingId, setDeletingId] =
        useState(null);


    const [notification, setNotification] =
        useState(null);


    const fileInputRef =
        useRef(null);

    const [
        formOpen,
        setFormOpen
    ] = useState(false);


    const [
        searchTerm,
        setSearchTerm
    ] = useState("");



    useEffect(() => {

        fetchBrands();

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



    const fetchBrands =
        async () => {

            try {

                setLoading(
                    true
                );


                const response =
                    await api.get(
                        "/brand"
                    );


                setBrands(

                    Array.isArray(
                        response.data
                    )

                        ?

                        response.data

                        :

                        []

                );

            }

            catch (error) {

                console.error(
                    error
                );


                showNotification(

                    "error",

                    "We couldn't load the brands. Please try again."

                );

            }

            finally {

                setLoading(
                    false
                );

            }

        };



    const handleChange =
        (e) => {

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



    const generateSlug =
        (text) => {

            return text

                .toLowerCase()

                .trim()

                .replace(
                    /\s+/g,
                    "-"
                )

                .replace(
                    /[^a-z0-9-]/g,
                    ""
                );

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


            setEditingId(
                null
            );


            setLogoFile(
                null
            );


            setLogoPreview(
                null
            );


            if (
                fileInputRef.current
            ) {

                fileInputRef.current.value =
                    "";

            }

        };


    const handleAddBrand =
        () => {

            resetForm();

            setFormOpen(
                true
            );


            setTimeout(
                () => {

                    document
                        .querySelector(
                            ".sab-form-card"
                        )
                        ?.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                },
                50
            );

        };


    const handleCancelForm =
        () => {

            resetForm();

            setFormOpen(
                false
            );

        };



    const handleSubmit =
        async (e) => {

            e.preventDefault();


            if (
                !formData.name.trim()
            ) {

                showNotification(

                    "error",

                    "Please enter a brand name."

                );

                return;

            }


            try {

                setSubmitting(
                    true
                );


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

                    name:
                        formData.name.trim(),

                    slug:
                        generateSlug(
                            formData.name
                        ),

                    logoUrl

                };


                if (editingId) {

                    await api.put(

                        "/brand",

                        {

                            id:
                                editingId,

                            ...brandData

                        }

                    );


                    showNotification(

                        "success",

                        "Brand updated successfully."

                    );

                }

                else {

                    await api.post(

                        "/brand",

                        brandData

                    );


                    showNotification(

                        "success",

                        "New brand added successfully."

                    );

                }


                resetForm();

                setFormOpen(
                    false
                );

                await fetchBrands();

            }

            catch (error) {

                console.error(
                    error
                );


                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "The operation could not be completed."

                );

            }

            finally {

                setSubmitting(
                    false
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
                    brand.name || "",

                slug:
                    brand.slug || "",

                logoUrl:
                    brand.logoUrl || "",

                description:
                    brand.description || "",

                website:
                    brand.website || "",

                country:
                    brand.country || ""

            });


            setLogoFile(
                null
            );


            setLogoPreview(

                brand.logoUrl

                    ?

                    `${IMAGE_BASE_URL}${brand.logoUrl}`

                    :

                    null

            );

            setFormOpen(
                true
            );


            setTimeout(
                () => {

                    document
                        .querySelector(
                            ".sab-form-card"
                        )
                        ?.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                },
                50
            );

        };



    const handleDelete =
        async (id) => {

            const confirmed =
                window.confirm(

                    "Are you sure you want to delete this brand?"

                );


            if (!confirmed) {

                return;

            }


            try {

                setDeletingId(
                    id
                );


                await api.delete(

                    `/brand/${id}`

                );


                showNotification(

                    "success",

                    "Brand deleted successfully."

                );


                await fetchBrands();

            }

            catch (error) {

                console.error(
                    error
                );


                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to delete this brand."

                );

            }

            finally {

                setDeletingId(
                    null
                );

            }

        };



    const handleImageChange =
        (e) => {

            const file =
                e.target.files?.[0];


            if (!file) {

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                showNotification(

                    "error",

                    "Please select a valid image file."

                );

                return;

            }


            setLogoFile(
                file
            );


            setLogoPreview(

                URL.createObjectURL(
                    file
                )

            );

        };


    const filteredBrands =
        useMemo(() => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            if (!search) {

                return brands;

            }


            return brands.filter(

                brand => {

                    const name =
                        brand.name
                            ?.toLowerCase()
                        || "";


                    const slug =
                        brand.slug
                            ?.toLowerCase()
                        || "";


                    const country =
                        brand.country
                            ?.toLowerCase()
                        || "";


                    const description =
                        brand.description
                            ?.toLowerCase()
                        || "";


                    const website =
                        brand.website
                            ?.toLowerCase()
                        || "";


                    return (

                        name.includes(
                            search
                        )

                        ||

                        slug.includes(
                            search
                        )

                        ||

                        country.includes(
                            search
                        )

                        ||

                        description.includes(
                            search
                        )

                        ||

                        website.includes(
                            search
                        )

                    );

                }

            );

        }, [
            brands,
            searchTerm
        ]);


    return (

        <div className="sab-page">


            {/* PAGE HEADER */}

            <div className="sab-page-header">


                <div>


                    <span className="sab-eyebrow">

                        CATALOG MANAGEMENT

                    </span>


                    <h1>

                        Brand Management

                    </h1>


                    <p>

                        Manage the brands available across
                        your ShopSphere catalog.

                    </p>


                </div>


                <div className="sab-header-actions">


                    <div className="sab-brand-count">


                        <strong>

                            {brands.length}

                        </strong>


                        <span>

                            Total Brands

                        </span>


                    </div>


                    <button

                        type="button"

                        className="sab-add-brand-button"

                        onClick={
                            formOpen

                                ? handleCancelForm

                                : handleAddBrand
                        }

                    >


                        {

                            formOpen

                                ?

                                <>

                                    <FaXmark />

                                    Close Form

                                </>

                                :

                                <>

                                    <FaPlus />

                                    Add Brand

                                </>

                        }


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

                            "sab-notification sab-notification-success"

                            :

                            "sab-notification sab-notification-error"

                    }

                >


                    <div className="sab-notification-icon">

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



            {/* FORM */}

            {
                formOpen

                &&

                <section className="sab-form-card">


                    <div className="sab-section-header">


                        <div className="sab-section-icon">

                            {

                                editingId

                                    ?

                                    <FaPen />

                                    :

                                    <FaPlus />

                            }

                        </div>


                        <div>


                            <h2>

                                {

                                    editingId

                                        ?

                                        "Update Brand"

                                        :

                                        "Add New Brand"

                                }

                            </h2>


                            <p>

                                {

                                    editingId

                                        ?

                                        "Modify the selected brand information."

                                        :

                                        "Add a new manufacturer or brand to your product catalog."

                                }

                            </p>


                        </div>


                    </div>



                    <form

                        onSubmit={
                            handleSubmit
                        }

                        className="sab-form"

                    >


                        <div className="sab-form-grid">


                            {/* LEFT COLUMN */}

                            <div className="sab-form-fields">


                                <div className="sab-field">


                                    <label>

                                        Brand Name

                                        <span>

                                            *

                                        </span>

                                    </label>


                                    <div className="sab-input-wrapper">


                                        <FaBuilding />


                                        <input

                                            type="text"

                                            name="name"

                                            placeholder="e.g. Apple"

                                            value={
                                                formData.name
                                            }

                                            onChange={
                                                handleChange
                                            }

                                            required

                                        />


                                    </div>


                                    {

                                        formData.name

                                        &&

                                        <small>

                                            Slug: {

                                                generateSlug(
                                                    formData.name
                                                )

                                            }

                                        </small>

                                    }


                                </div>



                                <div className="sab-two-column">


                                    <div className="sab-field">


                                        <label>

                                            Country

                                        </label>


                                        <div className="sab-input-wrapper">


                                            <FaLocationDot />


                                            <input

                                                type="text"

                                                name="country"

                                                placeholder="e.g. USA"

                                                value={
                                                    formData.country
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                            />


                                        </div>


                                    </div>



                                    <div className="sab-field">


                                        <label>

                                            Website

                                        </label>


                                        <div className="sab-input-wrapper">


                                            <FaGlobe />


                                            <input

                                                type="url"

                                                name="website"

                                                placeholder="https://example.com"

                                                value={
                                                    formData.website
                                                }

                                                onChange={
                                                    handleChange
                                                }

                                            />


                                        </div>


                                    </div>


                                </div>



                                <div className="sab-field">


                                    <label>

                                        Description

                                    </label>


                                    <textarea

                                        name="description"

                                        rows="5"

                                        placeholder="Write a short description about this brand..."

                                        value={
                                            formData.description
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />


                                    <div className="sab-character-count">

                                        {
                                            formData.description.length
                                        }

                                        {" "}characters

                                    </div>


                                </div>


                            </div>



                            {/* IMAGE UPLOAD */}

                            <div className="sab-logo-section">


                                <label className="sab-logo-label">

                                    Brand Logo

                                </label>


                                <input

                                    ref={
                                        fileInputRef
                                    }

                                    type="file"

                                    accept="image/*"

                                    onChange={
                                        handleImageChange
                                    }

                                    hidden

                                />


                                <button

                                    type="button"

                                    className="sab-upload-area"

                                    onClick={
                                        () =>
                                            fileInputRef.current?.click()
                                    }

                                >


                                    {

                                        logoPreview

                                            ?

                                            <img

                                                src={
                                                    logoPreview
                                                }

                                                alt="Brand preview"

                                            />

                                            :

                                            <>

                                                <div className="sab-upload-icon">

                                                    <FaCloudArrowUp />

                                                </div>


                                                <strong>

                                                    Upload Brand Logo

                                                </strong>


                                                <span>

                                                    PNG, JPG or WEBP

                                                </span>

                                            </>

                                    }


                                </button>


                                {

                                    logoFile

                                    &&

                                    <div className="sab-selected-file">

                                        <FaImage />

                                        <span>

                                            {
                                                logoFile.name
                                            }

                                        </span>

                                    </div>

                                }


                            </div>


                        </div>



                        {/* FORM ACTIONS */}

                        <div className="sab-form-actions">


                            {

                                editingId

                                &&

                                <button

                                    type="button"

                                    className="sab-cancel-button"

                                    onClick={
                                        handleCancelForm
                                    }

                                    disabled={
                                        submitting
                                    }

                                >

                                    <FaRotateLeft />

                                    {
                                        editingId

                                            ? "Cancel Editing"

                                            : "Cancel"
                                    }

                                </button>

                            }


                            <button

                                type="submit"

                                className="sab-submit-button"

                                disabled={
                                    submitting
                                }

                            >

                                {

                                    submitting

                                        ?

                                        <>

                                            <span className="sab-button-spinner" />

                                            Saving...

                                        </>

                                        :

                                        editingId

                                            ?

                                            <>

                                                <FaPen />

                                                Update Brand

                                            </>

                                            :

                                            <>

                                                <FaPlus />

                                                Add Brand

                                            </>

                                }

                            </button>


                        </div>


                    </form>


                </section>

            }



            {/* BRANDS TABLE */}

            <section className="sab-table-card">


                <div className="sab-table-header">


                    <div>


                        <h2>

                            Brand Directory

                        </h2>


                        <p>

                            All brands currently available in your catalog.

                        </p>


                    </div>


                    <span className="sab-table-count">

                        {
                            brands.length
                        }

                        {" "}brands

                    </span>


                </div>

                {/* QUICK SEARCH */}

                <div className="sab-search-section">


                    <div className="sab-search-wrapper">


                        <FaSearch className="sab-search-icon" />


                        <input

                            type="text"

                            className="sab-search-input"

                            placeholder="Quick search by brand, country, slug or website..."

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

                                className="sab-search-clear"

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


                    <div className="sab-search-result">


                        {

                            searchTerm

                                ?

                                <>

                                    <strong>

                                        {filteredBrands.length}

                                    </strong>

                                    {" "}

                                    {
                                        filteredBrands.length === 1

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



                {

                    loading

                        ?

                        <div className="sab-loading">


                            {

                                Array.from({

                                    length: 5

                                }).map(

                                    (_, index) => (

                                        <div

                                            key={
                                                index
                                            }

                                            className="sab-skeleton-row"

                                        >

                                            <div className="sab-skeleton-logo" />

                                            <div className="sab-skeleton-line sab-skeleton-name" />

                                            <div className="sab-skeleton-line sab-skeleton-country" />

                                            <div className="sab-skeleton-actions" />

                                        </div>

                                    )

                                )

                            }


                        </div>


                        :

                        filteredBrands.length === 0

                            ?

                            <div className="sab-empty-state">


                                <div className="sab-empty-icon">

                                    {

                                        searchTerm

                                            ? <FaSearch />

                                            : <FaBuilding />

                                    }

                                </div>


                                <h3>

                                    {

                                        searchTerm

                                            ? "No matching brands found"

                                            : "No brands yet"

                                    }

                                </h3>


                                <p>

                                    {

                                        searchTerm

                                            ?

                                            `No brands match "${searchTerm}". Try a different search term.`

                                            :

                                            "Click Add Brand to create the first brand in your catalog."

                                    }

                                </p>


                                {

                                    searchTerm

                                    &&

                                    <button

                                        type="button"

                                        className="sab-clear-search-button"

                                        onClick={
                                            () =>
                                                setSearchTerm("")
                                        }

                                    >

                                        <FaXmark />

                                        Clear Search

                                    </button>

                                }


                            </div>


                            :

                            <div className="sab-table-wrapper">


                                <table className="sab-table">


                                    <thead>

                                        <tr>

                                            <th>

                                                ID

                                            </th>

                                            <th>

                                                Brand

                                            </th>

                                            <th>

                                                Country

                                            </th>

                                            <th>

                                                Website

                                            </th>

                                            <th>

                                                Actions

                                            </th>

                                        </tr>

                                    </thead>



                                    <tbody>


                                        {

                                            filteredBrands.map(

                                                brand => (

                                                    <tr

                                                        key={
                                                            brand.id
                                                        }

                                                    >


                                                        <td>


                                                            <span className="sab-brand-id">

                                                                BRAND-{

                                                                    String(
                                                                        brand.id
                                                                    ).padStart(
                                                                        3,
                                                                        "0"
                                                                    )

                                                                }

                                                            </span>


                                                        </td>



                                                        <td>


                                                            <div className="sab-brand-info">


                                                                <div className="sab-brand-logo">


                                                                    {

                                                                        brand.logoUrl

                                                                            ?

                                                                            <img

                                                                                src={
                                                                                    `${IMAGE_BASE_URL}${brand.logoUrl}`
                                                                                }

                                                                                alt={
                                                                                    brand.name
                                                                                }

                                                                            />

                                                                            :

                                                                            <FaBuilding />

                                                                    }


                                                                </div>



                                                                <div>


                                                                    <strong>

                                                                        {
                                                                            brand.name
                                                                        }

                                                                    </strong>


                                                                    <span>

                                                                        {
                                                                            brand.slug
                                                                        }

                                                                    </span>


                                                                </div>


                                                            </div>


                                                        </td>



                                                        <td>


                                                            <div className="sab-country">

                                                                <FaLocationDot />

                                                                {

                                                                    brand.country
                                                                    ||
                                                                    "Not specified"

                                                                }

                                                            </div>


                                                        </td>



                                                        <td>


                                                            {

                                                                brand.website

                                                                    ?

                                                                    <a

                                                                        href={
                                                                            brand.website
                                                                        }

                                                                        target="_blank"

                                                                        rel="noreferrer"

                                                                        className="sab-website-link"

                                                                    >

                                                                        Visit website

                                                                        <FaArrowUpRightFromSquare />

                                                                    </a>

                                                                    :

                                                                    <span className="sab-not-available">

                                                                        Not available

                                                                    </span>

                                                            }


                                                        </td>



                                                        <td>


                                                            <div className="sab-actions">


                                                                <button

                                                                    type="button"

                                                                    className="sab-action-button sab-edit-button"

                                                                    onClick={
                                                                        () =>
                                                                            handleEdit(
                                                                                brand
                                                                            )
                                                                    }

                                                                    title="Edit brand"

                                                                >

                                                                    <FaPen />

                                                                </button>



                                                                <button

                                                                    type="button"

                                                                    className="sab-action-button sab-delete-button"

                                                                    onClick={
                                                                        () =>
                                                                            handleDelete(
                                                                                brand.id
                                                                            )
                                                                    }

                                                                    disabled={
                                                                        deletingId ===
                                                                        brand.id
                                                                    }

                                                                    title="Delete brand"

                                                                >

                                                                    {

                                                                        deletingId ===
                                                                            brand.id

                                                                            ?

                                                                            <span className="sab-small-spinner" />

                                                                            :

                                                                            <FaTrashCan />

                                                                    }

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


export default AdminBrands;