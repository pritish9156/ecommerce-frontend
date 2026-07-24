import { useEffect, useState } from "react";

import {
    Modal,
    Form
} from "react-bootstrap";

import {
    FaLayerGroup,
    FaPen,
    FaPlus,
    FaTimes,
    FaTag,
    FaAlignLeft,
    FaSitemap,
    FaCheck
} from "react-icons/fa";

import SearchableDropdown from "./common/SearchableDropdown";

import "../css/components/CategoryForm.css";


function CategoryForm({

    show,
    onHide,
    category,
    categories = [],
    onSave,
    onEdit

}) {

    const [formData, setFormData] =
        useState({

            id: "",

            name: "",

            description: "",

            parentCategoryId: ""

        });


    const [submitting, setSubmitting] =
        useState(false);


    useEffect(() => {

        if (category) {

            setFormData({

                id:
                    category.id,

                name:
                    category.name || "",

                description:
                    category.description || "",

                parentCategoryId:
                    category.parentCategoryId || ""

            });

        } else {

            setFormData({

                id: "",

                name: "",

                description: "",

                parentCategoryId: ""

            });

        }

    }, [category, show]);


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };


    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (submitting)
                return;

            try {

                setSubmitting(true);

                if (category) {

                    await onEdit(
                        formData
                    );

                } else {

                    await onSave(
                        formData
                    );

                }

                onHide();

            } catch (error) {

                console.error(
                    "Category operation failed:",
                    error
                );

            } finally {

                setSubmitting(false);

            }

        };


    const handleClose = () => {

        if (submitting)
            return;

        onHide();

    };


    const selectedParent =
        categories.find(

            item =>
                String(item.id)
                ===
                String(
                    formData.parentCategoryId
                )

        );


    return (

        <Modal

            show={show}

            onHide={handleClose}

            centered

            size="lg"

            backdrop={
                submitting
                    ?
                    "static"
                    :
                    true
            }

            keyboard={
                !submitting
            }

            dialogClassName="
                category-form-modal
            "

            contentClassName="
                category-form-content
            "

        >

            <Form
                onSubmit={
                    handleSubmit
                }
            >

                {/* HEADER */}

                <div className="cf-header">

                    <div className="cf-header-content">

                        <div className="cf-header-icon">

                            {
                                category

                                    ?

                                    <FaPen />

                                    :

                                    <FaPlus />

                            }

                        </div>


                        <div>

                            <span className="cf-eyebrow">

                                Category Management

                            </span>

                            <h2 className="cf-title">

                                {
                                    category

                                        ?

                                        "Edit Category"

                                        :

                                        "Create New Category"
                                }

                            </h2>

                            <p className="cf-subtitle">

                                {
                                    category

                                        ?

                                        "Update category information and hierarchy."

                                        :

                                        "Organize your catalog with a new product category."
                                }

                            </p>

                        </div>

                    </div>


                    <button

                        type="button"

                        className="cf-close-btn"

                        onClick={
                            handleClose
                        }

                        disabled={
                            submitting
                        }

                        aria-label="Close"

                    >

                        <FaTimes />

                    </button>

                </div>


                {/* BODY */}

                <div className="cf-body">

                    <div className="cf-form-section">

                        <div className="cf-section-heading">

                            <div className="cf-section-icon">

                                <FaLayerGroup />

                            </div>

                            <div>

                                <h5>

                                    Category Details

                                </h5>

                                <p>

                                    Add the basic information
                                    used to identify this category.

                                </p>

                            </div>

                        </div>


                        <div className="cf-field">

                            <label
                                htmlFor="category-name"
                                className="cf-label"
                            >

                                <FaTag />

                                Category Name

                                <span className="cf-required">

                                    *

                                </span>

                            </label>


                            <div className="cf-input-wrapper">

                                <input

                                    id="category-name"

                                    type="text"

                                    name="name"

                                    className="cf-input"

                                    placeholder="
                                        e.g. Smartphones, Laptops, Footwear
                                    "

                                    value={
                                        formData.name
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    required

                                    autoComplete="off"

                                    disabled={
                                        submitting
                                    }

                                />

                            </div>


                            <span className="cf-field-hint">

                                Use a clear and concise
                                category name.

                            </span>

                        </div>


                        <div className="cf-field">

                            <label
                                htmlFor="parent-category"
                                className="cf-label"
                            >

                                <FaSitemap />

                                Parent Category

                            </label>


                            <SearchableDropdown
                                items={categories}
                                value={formData.parentCategoryId}
                                onChange={(id) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        parentCategoryId: id
                                    }))
                                }
                                icon={<FaSitemap />}
                                placeholder="Search parent category..."
                                emptyText="No Parent Category"
                            />


                            {

                                selectedParent

                                &&

                                <div className="cf-parent-preview">

                                    <div className="cf-parent-preview-icon">

                                        <FaSitemap />

                                    </div>

                                    <div>

                                        <span>

                                            This category will appear under

                                        </span>

                                        <strong>

                                            {
                                                selectedParent.name
                                            }

                                        </strong>

                                    </div>

                                </div>

                            }

                        </div>


                        <div className="cf-field cf-field-last">

                            <div className="cf-label-row">

                                <label
                                    htmlFor="category-description"
                                    className="cf-label"
                                >

                                    <FaAlignLeft />

                                    Description

                                </label>


                                <span className="cf-character-count">

                                    {
                                        formData
                                            .description
                                            .length
                                    }

                                    / 500

                                </span>

                            </div>


                            <textarea

                                id="category-description"

                                rows="5"

                                maxLength="500"

                                name="description"

                                className="cf-textarea"

                                placeholder="
                                    Describe what kind of
                                    products belong in this
                                    category...
                                "

                                value={
                                    formData.description
                                }

                                onChange={
                                    handleChange
                                }

                                disabled={
                                    submitting
                                }

                            />

                        </div>

                    </div>


                    {/* INFORMATION PANEL */}

                    <div className="cf-info-panel">

                        <div className="cf-info-icon">

                            <FaLayerGroup />

                        </div>

                        <div>

                            <strong>

                                Catalog organization matters

                            </strong>

                            <p>

                                A clear category hierarchy
                                helps customers discover
                                relevant products and improves
                                related-product recommendations.

                            </p>

                        </div>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="cf-footer">

                    <button

                        type="button"

                        className="cf-btn cf-btn-cancel"

                        onClick={
                            handleClose
                        }

                        disabled={
                            submitting
                        }

                    >

                        Cancel

                    </button>


                    <button

                        type="submit"

                        className="cf-btn cf-btn-primary"

                        disabled={
                            submitting
                            ||
                            !formData.name.trim()
                        }

                    >

                        {

                            submitting

                                ?

                                <>

                                    <span className="cf-spinner" />

                                    {
                                        category

                                            ?

                                            "Updating..."

                                            :

                                            "Creating..."
                                    }

                                </>

                                :

                                <>

                                    <FaCheck />

                                    {
                                        category

                                            ?

                                            "Save Changes"

                                            :

                                            "Create Category"
                                    }

                                </>

                        }

                    </button>

                </div>

            </Form>

        </Modal>

    );

}

export default CategoryForm;