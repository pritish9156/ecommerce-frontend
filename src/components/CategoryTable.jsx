import {
    FaEdit,
    FaTrash,
    FaFolderOpen,
    FaFolder,
    FaArrowRight,
    FaLayerGroup,
    FaSearch
} from "react-icons/fa";

import {
    FaCircleCheck,
    FaCircleXmark,
    FaFolderTree,
    FaXmark
} from "react-icons/fa6";

import "../css/components/CategoryTable.css";


function CategoryTable({

    categories = [],
    searchTerm = "",
    onClearSearch,
    onEdit,
    onDelete

}) {

    return (

        <div className="ct-container">


            {/* TABLE HEADER */}

            <div className="ct-topbar">

                <div className="ct-topbar-left">

                    <div className="ct-topbar-icon">

                        <FaLayerGroup />

                    </div>

                    <div>

                        <h3>

                            Category Directory

                        </h3>

                        <p>

                            Manage your catalog structure
                            and product organization.

                        </p>

                    </div>

                </div>


                <div className="ct-count">

                    <span>

                        {
                            categories.length
                        }

                    </span>

                    {
                        categories.length === 1

                            ?

                            "Category"

                            :

                            "Categories"
                    }

                </div>

            </div>


            {/* TABLE */}

            <div className="ct-table-wrapper">

                <table className="ct-table">

                    <thead>

                        <tr>

                            <th className="ct-number-column">

                                #

                            </th>

                            <th>

                                Category

                            </th>

                            <th>

                                Hierarchy

                            </th>

                            <th>

                                Description

                            </th>

                            <th>

                                Status

                            </th>

                            <th className="ct-actions-heading">

                                Actions

                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {

                            categories.length === 0

                                ?

                                (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="ct-empty-cell"

                                        >

                                            <div className="ct-empty-state">


                                                <div className="ct-empty-icon">

                                                    {

                                                        searchTerm

                                                            ? <FaSearch />

                                                            : <FaFolderOpen />

                                                    }

                                                </div>


                                                <h4>

                                                    {

                                                        searchTerm

                                                            ? "No matching categories found"

                                                            : "No categories yet"

                                                    }

                                                </h4>


                                                <p>

                                                    {

                                                        searchTerm

                                                            ?

                                                            `No categories match "${searchTerm}". Try a different search term.`

                                                            :

                                                            "Create your first category to start organizing products in your catalog."

                                                    }

                                                </p>


                                                {

                                                    searchTerm

                                                    &&

                                                    <button

                                                        type="button"

                                                        className="ct-clear-search-button"

                                                        onClick={
                                                            onClearSearch
                                                        }

                                                    >

                                                        <FaXmark />

                                                        Clear Search

                                                    </button>

                                                }


                                            </div>

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    categories.map(

                                        (category, index) => {

                                            const isActive =

                                                category.active !== false

                                                &&

                                                category.isActive !== false;


                                            const hasParent =

                                                Boolean(

                                                    category
                                                        .parentCategoryName

                                                );


                                            return (

                                                <tr

                                                    key={
                                                        category.id
                                                    }

                                                    className="ct-row"

                                                >


                                                    {/* NUMBER */}

                                                    <td className="ct-number-column">

                                                        <span className="ct-row-number">

                                                            {
                                                                String(
                                                                    index + 1
                                                                )
                                                                    .padStart(
                                                                        2,
                                                                        "0"
                                                                    )
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* CATEGORY */}

                                                    <td>

                                                        <div className="ct-category-cell">

                                                            <div className="ct-category-icon">

                                                                <FaFolder />

                                                            </div>


                                                            <div className="ct-category-info">

                                                                <span className="ct-category-name">

                                                                    {
                                                                        category.name
                                                                    }

                                                                </span>


                                                                <span className="ct-category-id">

                                                                    Category ID #

                                                                    {
                                                                        category.id
                                                                    }

                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* HIERARCHY */}

                                                    <td>

                                                        {

                                                            hasParent

                                                                ?

                                                                (

                                                                    <div className="ct-hierarchy">

                                                                        <span className="ct-parent-name">

                                                                            {
                                                                                category
                                                                                    .parentCategoryName
                                                                            }

                                                                        </span>


                                                                        <FaArrowRight />


                                                                        <span className="ct-child-name">

                                                                            {
                                                                                category.name
                                                                            }

                                                                        </span>

                                                                    </div>

                                                                )

                                                                :

                                                                (

                                                                    <div className="ct-root-category">

                                                                        <FaFolderTree />

                                                                        Root Category

                                                                    </div>

                                                                )

                                                        }

                                                    </td>


                                                    {/* DESCRIPTION */}

                                                    <td>

                                                        {

                                                            category.description

                                                                ?

                                                                (

                                                                    <p

                                                                        className="ct-description"

                                                                        title={
                                                                            category.description
                                                                        }

                                                                    >

                                                                        {
                                                                            category.description
                                                                        }

                                                                    </p>

                                                                )

                                                                :

                                                                (

                                                                    <span className="ct-no-description">

                                                                        No description provided

                                                                    </span>

                                                                )

                                                        }

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        <span

                                                            className={

                                                                isActive

                                                                    ?

                                                                    "ct-status ct-status-active"

                                                                    :

                                                                    "ct-status ct-status-inactive"

                                                            }

                                                        >

                                                            {

                                                                isActive

                                                                    ?

                                                                    <FaCircleCheck />

                                                                    :

                                                                    <FaCircleXmark />

                                                            }


                                                            {

                                                                isActive

                                                                    ?

                                                                    "Active"

                                                                    :

                                                                    "Inactive"

                                                            }

                                                        </span>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>

                                                        <div className="ct-actions">


                                                            <button

                                                                type="button"

                                                                className="
                                                                    ct-action-btn
                                                                    ct-edit-btn
                                                                "

                                                                onClick={() =>

                                                                    onEdit(
                                                                        category
                                                                    )

                                                                }

                                                                title="Edit category"

                                                                aria-label={
                                                                    `Edit ${category.name}`
                                                                }

                                                            >

                                                                <FaEdit />

                                                                <span>

                                                                    Edit

                                                                </span>

                                                            </button>


                                                            <button

                                                                type="button"

                                                                className="
                                                                    ct-action-btn
                                                                    ct-delete-btn
                                                                "

                                                                onClick={() =>

                                                                    onDelete(
                                                                        category.id
                                                                    )

                                                                }

                                                                title="Delete category"

                                                                aria-label={
                                                                    `Delete ${category.name}`
                                                                }

                                                            >

                                                                <FaTrash />

                                                            </button>


                                                        </div>

                                                    </td>


                                                </tr>

                                            );

                                        }

                                    )

                                )

                        }

                    </tbody>

                </table>

            </div>


            {/* MOBILE CARDS */}

            <div className="ct-mobile-list">

                {

                    categories.length > 0

                    &&

                    categories.map(

                        (category, index) => {

                            const isActive =

                                category.active !== false

                                &&

                                category.isActive !== false;


                            return (

                                <div

                                    className="ct-mobile-card"

                                    key={
                                        category.id
                                    }

                                >

                                    <div className="ct-mobile-card-header">

                                        <div className="ct-category-cell">

                                            <div className="ct-category-icon">

                                                <FaFolder />

                                            </div>


                                            <div className="ct-category-info">

                                                <span className="ct-category-name">

                                                    {
                                                        category.name
                                                    }

                                                </span>

                                                <span className="ct-category-id">

                                                    Category #

                                                    {
                                                        String(
                                                            index + 1
                                                        )
                                                            .padStart(
                                                                2,
                                                                "0"
                                                            )
                                                    }

                                                </span>

                                            </div>

                                        </div>


                                        <span

                                            className={

                                                isActive

                                                    ?

                                                    "ct-status ct-status-active"

                                                    :

                                                    "ct-status ct-status-inactive"

                                            }

                                        >

                                            {

                                                isActive

                                                    ?

                                                    <FaCircleCheck />

                                                    :

                                                    <FaCircleXmark />

                                            }

                                            {

                                                isActive

                                                    ?

                                                    "Active"

                                                    :

                                                    "Inactive"

                                            }

                                        </span>

                                    </div>


                                    <div className="ct-mobile-content">

                                        <div className="ct-mobile-field">

                                            <span className="ct-mobile-label">

                                                Parent Category

                                            </span>

                                            <strong>

                                                {

                                                    category
                                                        .parentCategoryName

                                                    ||

                                                    "Root Category"

                                                }

                                            </strong>

                                        </div>


                                        <div className="ct-mobile-field">

                                            <span className="ct-mobile-label">

                                                Description

                                            </span>

                                            <p>

                                                {

                                                    category.description

                                                    ||

                                                    "No description provided."

                                                }

                                            </p>

                                        </div>

                                    </div>


                                    <div className="ct-mobile-actions">

                                        <button

                                            type="button"

                                            className="
                                                ct-action-btn
                                                ct-edit-btn
                                            "

                                            onClick={() =>

                                                onEdit(
                                                    category
                                                )

                                            }

                                        >

                                            <FaEdit />

                                            Edit Category

                                        </button>


                                        <button

                                            type="button"

                                            className="
                                                ct-action-btn
                                                ct-delete-btn
                                            "

                                            onClick={() =>

                                                onDelete(
                                                    category.id
                                                )

                                            }

                                        >

                                            <FaTrash />

                                        </button>

                                    </div>

                                </div>

                            );

                        }

                    )

                }

            </div>

        </div>

    );

}

export default CategoryTable;