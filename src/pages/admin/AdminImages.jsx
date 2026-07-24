import {
    useEffect,
    useRef,
    useState
}
from "react";

import {
    FaArrowRotateRight,
    FaBoxOpen,
    FaCloudArrowUp,
    FaImage,
    FaImages,
    FaPen,
    FaTrash,
    FaTriangleExclamation,
    FaXmark
}
from "react-icons/fa6";

import {
    getProducts
}
from "../../services/productService";

import {
    getProductImages,
    addProductImage,
    updateProductImage,
    deleteProductImage
}
from "../../services/productImageService";

import {
    uploadProductImage
}
from "../../services/uploadService";

import "../../css/admin/AdminImages.css";

import {
    getImageUrl
}
from "../../utils/imageUrl";


function AdminImages() {

    const [products, setProducts] =
        useState([]);

    const [images, setImages] =
        useState([]);

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [preview, setPreview] =
        useState(null);

    const [selectedProduct, setSelectedProduct] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    const [loadingProducts, setLoadingProducts] =
        useState(true);

    const [loadingImages, setLoadingImages] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState(null);

    const [notification, setNotification] =
        useState(null);

    const fileInputRef =
        useRef(null);

    const [formData, setFormData] =
        useState({

            productId: "",

            imageUrl: "",

            displayOrder: "",

            altText: ""

        });


    useEffect(() => {

        fetchProducts();

    }, []);


    useEffect(() => {

        return () => {

            if (
                preview &&
                preview.startsWith("blob:")
            ) {

                URL.revokeObjectURL(
                    preview
                );

            }

        };

    }, [preview]);


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


    const fetchProducts =
        async () => {

            try {

                setLoadingProducts(
                    true
                );

                const response =
                    await getProducts();

                setProducts(

                    Array.isArray(
                        response.data
                    )

                        ?

                        response.data

                        :

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

                    "Unable to load products."

                );

            }
            finally {

                setLoadingProducts(
                    false
                );

            }

        };


    const fetchImages =
        async (productId) => {

            if (!productId) {

                setImages([]);

                return;

            }

            try {

                setLoadingImages(
                    true
                );

                const response =
                    await getProductImages(
                        productId
                    );

                setImages(

                    Array.isArray(
                        response.data
                    )

                        ?

                        response.data

                        :

                        response.data?.data
                        ||
                        []

                );

            }
            catch (error) {

                console.error(
                    error
                );

                setImages([]);

                showNotification(

                    "error",

                    "Unable to load product images."

                );

            }
            finally {

                setLoadingImages(
                    false
                );

            }

        };


    const handleProductChange =
        (e) => {

            const productId =
                e.target.value;

            resetForm(
                productId
            );

            setSelectedProduct(
                productId
            );

            setFormData(
                previous => ({

                    ...previous,

                    productId

                })
            );

            if (productId) {

                fetchImages(
                    productId
                );

            }
            else {

                setImages([]);

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


    const clearPreview =
        () => {

            if (
                preview &&
                preview.startsWith("blob:")
            ) {

                URL.revokeObjectURL(
                    preview
                );

            }

            setPreview(
                null
            );

            setSelectedFile(
                null
            );

            if (
                fileInputRef.current
            ) {

                fileInputRef.current.value =
                    "";

            }

        };


    const resetForm =
        (
            productId =
                selectedProduct
        ) => {

            setEditingId(
                null
            );

            clearPreview();

            setFormData({

                productId,

                imageUrl: "",

                displayOrder: "",

                altText: ""

            });

        };


    const handleFileChange =
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


            if (
                file.size >
                10 * 1024 * 1024
            ) {

                showNotification(

                    "error",

                    "Image size must be less than 10 MB."

                );

                return;

            }


            if (
                preview &&
                preview.startsWith("blob:")
            ) {

                URL.revokeObjectURL(
                    preview
                );

            }


            setSelectedFile(
                file
            );

            setPreview(

                URL.createObjectURL(
                    file
                )

            );

        };


    const handleSubmit =
        async (e) => {

            e.preventDefault();


            if (
                !selectedProduct
            ) {

                showNotification(

                    "error",

                    "Please select a product first."

                );

                return;

            }


            if (
                !editingId &&
                !selectedFile
            ) {

                showNotification(

                    "error",

                    "Please select an image to upload."

                );

                return;

            }


            try {

                setSubmitting(
                    true
                );


                if (editingId) {

                    const response =
                        await updateProductImage({

                            id:
                                editingId,

                            ...formData

                        });


                    showNotification(

                        "success",

                        response.data?.message
                        ||
                        "Image updated successfully."

                    );

                }
                else {

                    const uploadResponse =
                        await uploadProductImage(
                            selectedFile
                        );


                    const imageUrl =
                        uploadResponse.data
                            .imageUrl;


                    const response =
                        await addProductImage({

                            productId:
                                formData.productId,

                            imageUrl,

                            displayOrder:

                                formData.displayOrder
                                ||
                                images.length + 1,

                            altText:

                                formData.altText
                                ||
                                selectedProductData?.name
                                ||
                                "Product image"

                        });


                    showNotification(

                        "success",

                        response.data?.message
                        ||
                        "Image added successfully."

                    );

                }


                resetForm();

                await fetchImages(
                    selectedProduct
                );

            }
            catch (error) {

                console.error(
                    error
                );


                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to save the image."

                );

            }
            finally {

                setSubmitting(
                    false
                );

            }

        };


    const handleEdit =
        (image) => {

            setEditingId(
                image.id
            );


            setSelectedFile(
                null
            );


            setPreview(
                null
            );


            if (
                fileInputRef.current
            ) {

                fileInputRef.current.value =
                    "";

            }


            setFormData({

                productId:
                    selectedProduct,

                imageUrl:
                    image.imageUrl,

                displayOrder:
                    image.displayOrder
                    ??
                    "",

                altText:
                    image.altText
                    ||
                    ""

            });


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        };


    const handleDelete =
        async (id) => {

            const confirmed =
                window.confirm(

                    "Are you sure you want to delete this product image?"

                );


            if (!confirmed) {

                return;

            }


            try {

                setDeletingId(
                    id
                );


                const response =
                    await deleteProductImage(
                        id
                    );


                showNotification(

                    "success",

                    response.data?.message
                    ||
                    "Image deleted successfully."

                );


                await fetchImages(
                    selectedProduct
                );

            }
            catch (error) {

                console.error(
                    error
                );


                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to delete the image."

                );

            }
            finally {

                setDeletingId(
                    null
                );

            }

        };


    const selectedProductData =
        products.find(

            product =>
                String(
                    product.id
                ) ===
                String(
                    selectedProduct
                )

        );


    return (

        <div className="aim-page">


            {/* HEADER */}

            <div className="aim-header">


                <div>


                    <span className="aim-eyebrow">

                        CATALOG MANAGEMENT

                    </span>


                    <h1>

                        Product Images

                    </h1>


                    <p>

                        Upload and organize high-quality
                        product visuals for your storefront.

                    </p>


                </div>


                {

                    selectedProductData

                    &&

                    <div className="aim-selected-product">


                        <div className="aim-selected-icon">

                            <FaBoxOpen />

                        </div>


                        <div>


                            <span>

                                Managing images for

                            </span>


                            <strong>

                                {
                                    selectedProductData.name
                                }

                            </strong>


                        </div>


                    </div>

                }


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

                            "aim-notification aim-notification-success"

                            :

                            "aim-notification aim-notification-error"

                    }

                >


                    <div className="aim-notification-icon">

                        {

                            notification.type ===
                            "success"

                                ?

                                <FaImage />

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



            {/* MANAGEMENT PANEL */}

            <section className="aim-management-card">


                <div className="aim-management-header">


                    <div>


                        <span className="aim-section-label">

                            IMAGE MANAGER

                        </span>


                        <h2>

                            {

                                editingId

                                    ?

                                    "Update image details"

                                    :

                                    "Add a new product image"

                            }

                        </h2>


                    </div>


                    {

                        editingId

                        &&

                        <button

                            type="button"

                            className="aim-cancel-edit"

                            onClick={
                                () =>
                                    resetForm()
                            }

                        >

                            <FaXmark />

                            Cancel Editing

                        </button>

                    }


                </div>



                {/* PRODUCT SELECTOR */}

                <div className="aim-product-selector">


                    <label>

                        Select Product

                    </label>


                    <select

                        value={
                            selectedProduct
                        }

                        onChange={
                            handleProductChange
                        }

                        disabled={
                            loadingProducts
                        }

                    >


                        <option value="">

                            {

                                loadingProducts

                                    ?

                                    "Loading products..."

                                    :

                                    "Choose a product to manage"

                            }

                        </option>


                        {

                            products.map(

                                product => (

                                    <option

                                        key={
                                            product.id
                                        }

                                        value={
                                            product.id
                                        }

                                    >

                                        {
                                            product.name
                                        }

                                    </option>

                                )

                            )

                        }


                    </select>


                    <p>

                        Select a product to upload,
                        edit and organize its images.

                    </p>


                </div>



                {

                    selectedProduct

                    &&

                    <form

                        className="aim-form"

                        onSubmit={
                            handleSubmit
                        }

                    >


                        <div className="aim-form-grid">



                            {/* UPLOAD AREA */}

                            <div className="aim-upload-column">


                                <label className="aim-field-label">

                                    Product Image

                                </label>


                                {

                                    editingId

                                        ?

                                        <div className="aim-edit-image-preview">


                                            <img

                                                src={
                                                    getImageUrl(
                                                        formData.imageUrl
                                                    )
                                                }

                                                alt={
                                                    formData.altText
                                                    ||
                                                    "Product"
                                                }

                                            />


                                            <div className="aim-edit-overlay">


                                                <FaPen />


                                                <span>

                                                    Editing existing image

                                                </span>


                                            </div>


                                        </div>


                                        :

                                        <label className="aim-upload-area">


                                            <input

                                                ref={
                                                    fileInputRef
                                                }

                                                type="file"

                                                accept="image/*"

                                                onChange={
                                                    handleFileChange
                                                }

                                            />


                                            {

                                                preview

                                                    ?

                                                    <div className="aim-preview-container">


                                                        <img

                                                            src={
                                                                preview
                                                            }

                                                            alt="Upload preview"

                                                        />


                                                        <button

                                                            type="button"

                                                            className="aim-remove-preview"

                                                            onClick={
                                                                (event) => {

                                                                    event.preventDefault();

                                                                    clearPreview();

                                                                }
                                                            }

                                                        >

                                                            <FaXmark />

                                                        </button>


                                                        <div className="aim-preview-information">


                                                            <strong>

                                                                {
                                                                    selectedFile
                                                                        ?.name
                                                                }

                                                            </strong>


                                                            <span>

                                                                {

                                                                    selectedFile

                                                                    &&

                                                                    `${(
                                                                        selectedFile.size
                                                                        /
                                                                        1024
                                                                        /
                                                                        1024
                                                                    ).toFixed(
                                                                        2
                                                                    )} MB`

                                                                }

                                                            </span>


                                                        </div>


                                                    </div>

                                                    :

                                                    <div className="aim-upload-placeholder">


                                                        <div className="aim-upload-icon">

                                                            <FaCloudArrowUp />

                                                        </div>


                                                        <strong>

                                                            Choose product image

                                                        </strong>


                                                        <p>

                                                            Click here to browse
                                                            an image from your device.

                                                        </p>


                                                        <span>

                                                            JPG, PNG or WEBP • Max 10 MB

                                                        </span>


                                                    </div>

                                            }


                                        </label>

                                }


                            </div>



                            {/* DETAILS */}

                            <div className="aim-details-column">


                                <div className="aim-field-group">


                                    <label>

                                        Display Order

                                    </label>


                                    <input

                                        type="number"

                                        min="1"

                                        name="displayOrder"

                                        placeholder="Example: 1"

                                        value={
                                            formData.displayOrder
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />


                                    <span>

                                        Lower numbers appear first
                                        in the product gallery.

                                    </span>


                                </div>


                                <div className="aim-field-group">


                                    <label>

                                        Alternative Text

                                    </label>


                                    <textarea

                                        name="altText"

                                        rows="4"

                                        placeholder={
                                            `Describe the image, for example: ${
                                                selectedProductData?.name
                                                ||
                                                "Product"
                                            } front view`
                                        }

                                        value={
                                            formData.altText
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />


                                    <span>

                                        Helps accessibility and
                                        provides context when an
                                        image cannot load.

                                    </span>


                                </div>


                                <button

                                    type="submit"

                                    className={

                                        editingId

                                            ?

                                            "aim-submit-button aim-update-button"

                                            :

                                            "aim-submit-button"

                                    }

                                    disabled={
                                        submitting
                                    }

                                >


                                    {

                                        submitting

                                            ?

                                            <>

                                                <FaArrowRotateRight
                                                    className="aim-spin"
                                                />

                                                Saving...

                                            </>

                                            :

                                            editingId

                                                ?

                                                <>

                                                    <FaPen />

                                                    Update Image

                                                </>

                                                :

                                                <>

                                                    <FaCloudArrowUp />

                                                    Upload Image

                                                </>

                                    }


                                </button>


                            </div>


                        </div>


                    </form>

                }


            </section>



            {/* IMAGE GALLERY */}

            <section className="aim-gallery-section">


                <div className="aim-gallery-header">


                    <div>


                        <span className="aim-section-label">

                            PRODUCT GALLERY

                        </span>


                        <h2>

                            Uploaded Images

                        </h2>


                        <p>

                            {

                                selectedProduct

                                    ?

                                    `Manage the images currently assigned to ${
                                        selectedProductData?.name
                                        ||
                                        "this product"
                                    }.`

                                    :

                                    "Select a product to view its image gallery."

                            }

                        </p>


                    </div>


                    {

                        selectedProduct

                        &&

                        <span className="aim-image-count">

                            <FaImages />

                            {
                                images.length
                            }

                            {" "}

                            {

                                images.length === 1

                                    ?

                                    "image"

                                    :

                                    "images"

                            }

                        </span>

                    }


                </div>



                {/* NO PRODUCT SELECTED */}

                {

                    !selectedProduct

                    &&

                    <div className="aim-empty-state">


                        <div className="aim-empty-icon">

                            <FaBoxOpen />

                        </div>


                        <h3>

                            Select a product first

                        </h3>


                        <p>

                            Choose a product from the selector
                            above to manage its image gallery.

                        </p>


                    </div>

                }



                {/* LOADING */}

                {

                    selectedProduct
                    &&
                    loadingImages

                    &&

                    <div className="aim-gallery-grid">


                        {

                            Array.from({

                                length: 6

                            }).map(

                                (_, index) => (

                                    <div

                                        className="aim-image-skeleton"

                                        key={
                                            index
                                        }

                                    >


                                        <div className="aim-skeleton-picture" />


                                        <div className="aim-skeleton-body">


                                            <div className="aim-skeleton-title" />


                                            <div className="aim-skeleton-text" />


                                            <div className="aim-skeleton-actions" />


                                        </div>


                                    </div>

                                )

                            )

                        }


                    </div>

                }



                {/* EMPTY GALLERY */}

                {

                    selectedProduct
                    &&
                    !loadingImages
                    &&
                    images.length === 0

                    &&

                    <div className="aim-empty-state">


                        <div className="aim-empty-icon">

                            <FaImages />

                        </div>


                        <h3>

                            No product images yet

                        </h3>


                        <p>

                            Upload the first image for
                            this product using the form above.

                        </p>


                    </div>

                }



                {/* IMAGES */}

                {

                    selectedProduct
                    &&
                    !loadingImages
                    &&
                    images.length > 0

                    &&

                    <div className="aim-gallery-grid">


                        {

                            [...images]

                                .sort(

                                    (a, b) =>

                                        Number(
                                            a.displayOrder
                                            ||
                                            0
                                        )

                                        -

                                        Number(
                                            b.displayOrder
                                            ||
                                            0
                                        )

                                )

                                .map(

                                    image => (

                                        <article

                                            className="aim-image-card"

                                            key={
                                                image.id
                                            }

                                        >


                                            <div className="aim-image-wrapper">


                                                <img

                                                    src={
                                                        getImageUrl(
                                                            image.imageUrl
                                                        )
                                                    }

                                                    alt={
                                                        image.altText
                                                        ||
                                                        selectedProductData?.name
                                                        ||
                                                        "Product"
                                                    }

                                                />


                                                <span className="aim-order-badge">

                                                    #

                                                    {
                                                        image.displayOrder
                                                        ??
                                                        "—"
                                                    }

                                                </span>


                                            </div>


                                            <div className="aim-image-card-body">


                                                <div>


                                                    <span className="aim-card-label">

                                                        ALT TEXT

                                                    </span>


                                                    <p>

                                                        {
                                                            image.altText
                                                            ||
                                                            "No alternative text provided."
                                                        }

                                                    </p>


                                                </div>


                                                <div className="aim-image-actions">


                                                    <button

                                                        type="button"

                                                        className="aim-edit-button"

                                                        onClick={
                                                            () =>
                                                                handleEdit(
                                                                    image
                                                                )
                                                        }

                                                    >

                                                        <FaPen />

                                                        Edit

                                                    </button>


                                                    <button

                                                        type="button"

                                                        className="aim-delete-button"

                                                        onClick={
                                                            () =>
                                                                handleDelete(
                                                                    image.id
                                                                )
                                                        }

                                                        disabled={

                                                            deletingId ===
                                                            image.id

                                                        }

                                                    >

                                                        {

                                                            deletingId ===
                                                            image.id

                                                                ?

                                                                <FaArrowRotateRight
                                                                    className="aim-spin"
                                                                />

                                                                :

                                                                <FaTrash />

                                                        }


                                                        {

                                                            deletingId ===
                                                            image.id

                                                                ?

                                                                "Deleting"

                                                                :

                                                                "Delete"

                                                        }

                                                    </button>


                                                </div>


                                            </div>


                                        </article>

                                    )

                                )

                        }


                    </div>

                }


            </section>


        </div>

    );

}


export default AdminImages;