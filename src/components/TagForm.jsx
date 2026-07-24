import {
    useEffect,
    useState
}
from "react";

import {
    Modal,
    Form
}
from "react-bootstrap";

import {
    FaTags,
    FaPen,
    FaPlus,
    FaTimes,
    FaTag,
    FaAlignLeft,
    FaCheck
}
from "react-icons/fa";

import "../css/admin/TagForm.css";


function TagForm({

    show,

    onHide,

    tag,

    onSave,

    onEdit

}) {


    const [
        formData,
        setFormData
    ] = useState({

        id: "",

        name: "",

        description: ""

    });


    const [
        submitting,
        setSubmitting
    ] = useState(false);


    useEffect(() => {


        if (tag) {


            setFormData({

                id:
                    tag.id,

                name:
                    tag.name || "",

                description:
                    tag.description || ""

            });


        }
        else {


            setFormData({

                id: "",

                name: "",

                description: ""

            });


        }


    }, [
        tag,
        show
    ]);


    const handleChange =
        e => {


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


    const handleSubmit =
        async e => {


            e.preventDefault();


            if (submitting) {

                return;

            }


            try {


                setSubmitting(
                    true
                );


                if (tag) {


                    await onEdit(
                        formData
                    );


                }
                else {


                    await onSave(
                        formData
                    );


                }


            }
            catch (error) {


                console.error(

                    "Tag operation failed:",

                    error

                );


            }
            finally {


                setSubmitting(
                    false
                );


            }


        };


    const handleClose =
        () => {


            if (submitting) {

                return;

            }


            onHide();


        };


    return (

        <Modal

            show={
                show
            }

            onHide={
                handleClose
            }

            centered

            size="lg"

            backdrop={

                submitting

                    ? "static"

                    : true

            }

            keyboard={
                !submitting
            }

            dialogClassName="tag-form-modal"

            contentClassName="tag-form-content"

        >


            <Form

                onSubmit={
                    handleSubmit
                }

            >


                {/* HEADER */}

                <div className="tf-header">


                    <div className="tf-header-content">


                        <div className="tf-header-icon">


                            {

                                tag

                                    ?

                                    <FaPen />

                                    :

                                    <FaPlus />

                            }


                        </div>


                        <div>


                            <span className="tf-eyebrow">

                                Tag Management

                            </span>


                            <h2 className="tf-title">


                                {

                                    tag

                                        ?

                                        "Edit Tag"

                                        :

                                        "Create New Tag"

                                }


                            </h2>


                            <p className="tf-subtitle">


                                {

                                    tag

                                        ?

                                        "Update tag information and product classification."

                                        :

                                        "Create a reusable label for organizing related products."

                                }


                            </p>


                        </div>


                    </div>


                    <button

                        type="button"

                        className="tf-close-btn"

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

                <div className="tf-body">


                    <div className="tf-form-section">


                        <div className="tf-section-heading">


                            <div className="tf-section-icon">

                                <FaTags />

                            </div>


                            <div>


                                <h5>

                                    Tag Details

                                </h5>


                                <p>

                                    Add the basic information
                                    used to identify this tag.

                                </p>


                            </div>


                        </div>



                        {/* NAME */}

                        <div className="tf-field">


                            <label

                                htmlFor="tag-name"

                                className="tf-label"

                            >

                                <FaTag />

                                Tag Name


                                <span className="tf-required">

                                    *

                                </span>


                            </label>


                            <div className="tf-input-wrapper">


                                <input

                                    id="tag-name"

                                    type="text"

                                    name="name"

                                    className="tf-input"

                                    placeholder="e.g. Premium, Gaming, Wireless"

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


                            <span className="tf-field-hint">

                                Use a short and meaningful
                                label that can be reused
                                across related products.

                            </span>


                        </div>



                        {/* DESCRIPTION */}

                        <div className="tf-field tf-field-last">


                            <div className="tf-label-row">


                                <label

                                    htmlFor="tag-description"

                                    className="tf-label"

                                >

                                    <FaAlignLeft />

                                    Description

                                </label>


                                <span className="tf-character-count">

                                    {
                                        formData
                                            .description
                                            .length
                                    }

                                    / 500

                                </span>


                            </div>


                            <textarea

                                id="tag-description"

                                rows="5"

                                maxLength="500"

                                name="description"

                                className="tf-textarea"

                                placeholder="Describe when this tag should be used..."

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

                    <div className="tf-info-panel">


                        <div className="tf-info-icon">

                            <FaTags />

                        </div>


                        <div>


                            <strong>

                                Keep your tags meaningful

                            </strong>


                            <p>

                                Reusable tags help connect
                                products across categories
                                and make catalogue organization
                                more flexible.

                            </p>


                        </div>


                    </div>


                </div>



                {/* FOOTER */}

                <div className="tf-footer">


                    <button

                        type="button"

                        className="tf-btn tf-btn-cancel"

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

                        className="tf-btn tf-btn-primary"

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

                                    <span className="tf-spinner" />


                                    {

                                        tag

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

                                        tag

                                            ?

                                            "Save Changes"

                                            :

                                            "Create Tag"

                                    }


                                </>

                        }


                    </button>


                </div>


            </Form>


        </Modal>

    );

}


export default TagForm;