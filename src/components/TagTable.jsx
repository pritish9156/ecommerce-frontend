import {
    FaEdit,
    FaTrash,
    FaTag,
    FaTags,
    FaSearch
}
    from "react-icons/fa";

import {
    FaCircleCheck,
    FaCircleXmark,
    FaXmark
}
    from "react-icons/fa6";

import "../css/admin/TagTable.css";


function TagTable({

    tags = [],

    searchTerm = "",

    onClearSearch,

    onEdit,

    onDelete,

    deletingId

}) {

    return (

        <div className="tt-container">


            {/* DIRECTORY HEADER */}

            <div className="tt-topbar">


                <div className="tt-topbar-left">


                    <div className="tt-topbar-icon">

                        <FaTags />

                    </div>


                    <div>

                        <h3>

                            Tag Directory

                        </h3>


                        <p>

                            Manage reusable product labels
                            and catalog classification.

                        </p>

                    </div>


                </div>


                <div className="tt-count">

                    <span>

                        {tags.length}

                    </span>


                    {
                        tags.length === 1

                            ? "Tag"

                            : "Tags"
                    }

                </div>


            </div>



            {/* DESKTOP TABLE */}

            <div className="tt-table-wrapper">


                <table className="tt-table">


                    <thead>

                        <tr>


                            <th className="tt-number-column">

                                #

                            </th>


                            <th>

                                Tag

                            </th>


                            <th>

                                Description

                            </th>


                            <th>

                                Status

                            </th>


                            <th className="tt-actions-heading">

                                Actions

                            </th>


                        </tr>

                    </thead>


                    <tbody>


                        {

                            tags.length === 0

                                ?

                                (

                                    <tr>

                                        <td

                                            colSpan="5"

                                            className="tt-empty-cell"

                                        >

                                            <div className="tt-empty-state">


                                                <div className="tt-empty-visual">


                                                    <div className="
                    tt-empty-circle
                    tt-circle-one
                " />


                                                    <div className="
                    tt-empty-circle
                    tt-circle-two
                " />


                                                    <div className="tt-empty-icon">

                                                        {

                                                            searchTerm

                                                                ? <FaSearch />

                                                                : <FaTags />

                                                        }

                                                    </div>


                                                </div>


                                                <h4>

                                                    {

                                                        searchTerm

                                                            ? "No matching tags found"

                                                            : "Your tag directory is empty"

                                                    }

                                                </h4>


                                                <p>

                                                    {

                                                        searchTerm

                                                            ?

                                                            `No tags match "${searchTerm}". Try a different search term.`

                                                            :

                                                            "Create your first tag to start grouping related products with reusable catalog labels."

                                                    }

                                                </p>


                                                {

                                                    searchTerm

                                                        ?

                                                        <button

                                                            type="button"

                                                            className="tt-clear-search-button"

                                                            onClick={
                                                                onClearSearch
                                                            }

                                                        >

                                                            <FaXmark />

                                                            Clear Search

                                                        </button>

                                                        :

                                                        <div className="tt-empty-hint">

                                                            <FaTag />

                                                            Tags make product classification
                                                            more flexible.

                                                        </div>

                                                }


                                            </div>

                                        </td>

                                    </tr>

                                )

                                :

                                tags.map(

                                    (
                                        tag,
                                        index
                                    ) => {


                                        const isActive =

                                            tag.active !== false

                                            &&

                                            tag.isActive !== false;


                                        return (

                                            <tr

                                                key={
                                                    tag.id
                                                }

                                                className="tt-row"

                                            >


                                                {/* NUMBER */}

                                                <td className="tt-number-column">


                                                    <span className="tt-row-number">

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



                                                {/* TAG */}

                                                <td>


                                                    <div className="tt-tag-cell">


                                                        <div className="tt-tag-icon">

                                                            <FaTag />

                                                        </div>


                                                        <div className="tt-tag-info">


                                                            <span className="tt-tag-name">

                                                                {
                                                                    tag.name
                                                                }

                                                            </span>


                                                            <span className="tt-tag-id">

                                                                Tag ID #

                                                                {
                                                                    tag.id
                                                                }

                                                            </span>


                                                        </div>


                                                    </div>


                                                </td>



                                                {/* DESCRIPTION */}

                                                <td>


                                                    {

                                                        tag.description

                                                            ?

                                                            <p

                                                                className="tt-description"

                                                                title={
                                                                    tag.description
                                                                }

                                                            >

                                                                {
                                                                    tag.description
                                                                }

                                                            </p>

                                                            :

                                                            <span className="tt-no-description">

                                                                No description provided

                                                            </span>

                                                    }


                                                </td>



                                                {/* STATUS */}

                                                <td>


                                                    <span

                                                        className={

                                                            isActive

                                                                ?

                                                                "tt-status tt-status-active"

                                                                :

                                                                "tt-status tt-status-inactive"

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


                                                    <div className="tt-actions">


                                                        <button

                                                            type="button"

                                                            className="
                                                                tt-action-btn
                                                                tt-edit-btn
                                                            "

                                                            onClick={
                                                                () =>
                                                                    onEdit(
                                                                        tag
                                                                    )
                                                            }

                                                            title="Edit tag"

                                                        >

                                                            <FaEdit />

                                                            <span>

                                                                Edit

                                                            </span>

                                                        </button>


                                                        <button

                                                            type="button"

                                                            className="
                                                                tt-action-btn
                                                                tt-delete-btn
                                                            "

                                                            onClick={
                                                                () =>
                                                                    onDelete(
                                                                        tag.id
                                                                    )
                                                            }

                                                            disabled={
                                                                deletingId ===
                                                                tag.id
                                                            }

                                                            title="Delete tag"

                                                        >


                                                            {

                                                                deletingId ===
                                                                    tag.id

                                                                    ?

                                                                    <span className="tt-delete-spinner" />

                                                                    :

                                                                    <FaTrash />

                                                            }


                                                        </button>


                                                    </div>


                                                </td>


                                            </tr>

                                        );

                                    }

                                )

                        }


                    </tbody>


                </table>


            </div>



            {/* MOBILE CARDS */}

            <div className="tt-mobile-list">


                {

                    tags.length > 0

                    &&

                    tags.map(

                        (
                            tag,
                            index
                        ) => {


                            const isActive =

                                tag.active !== false

                                &&

                                tag.isActive !== false;


                            return (

                                <div

                                    className="tt-mobile-card"

                                    key={
                                        tag.id
                                    }

                                >


                                    <div className="tt-mobile-card-header">


                                        <div className="tt-tag-cell">


                                            <div className="tt-tag-icon">

                                                <FaTag />

                                            </div>


                                            <div className="tt-tag-info">


                                                <span className="tt-tag-name">

                                                    {
                                                        tag.name
                                                    }

                                                </span>


                                                <span className="tt-tag-id">

                                                    Tag #

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

                                                    "tt-status tt-status-active"

                                                    :

                                                    "tt-status tt-status-inactive"

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



                                    <div className="tt-mobile-content">


                                        <div className="tt-mobile-field">


                                            <span className="tt-mobile-label">

                                                Description

                                            </span>


                                            <p>

                                                {
                                                    tag.description

                                                    ||

                                                    "No description provided."
                                                }

                                            </p>


                                        </div>


                                    </div>



                                    <div className="tt-mobile-actions">


                                        <button

                                            type="button"

                                            className="
                                                tt-action-btn
                                                tt-edit-btn
                                            "

                                            onClick={
                                                () =>
                                                    onEdit(
                                                        tag
                                                    )
                                            }

                                        >

                                            <FaEdit />

                                            Edit Tag

                                        </button>


                                        <button

                                            type="button"

                                            className="
                                                tt-action-btn
                                                tt-delete-btn
                                            "

                                            onClick={
                                                () =>
                                                    onDelete(
                                                        tag.id
                                                    )
                                            }

                                            disabled={
                                                deletingId ===
                                                tag.id
                                            }

                                        >


                                            {

                                                deletingId ===
                                                    tag.id

                                                    ?

                                                    <span className="tt-delete-spinner" />

                                                    :

                                                    <FaTrash />

                                            }


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


export default TagTable;