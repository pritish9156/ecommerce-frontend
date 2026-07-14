import { FaEdit, FaTrash, FaFolderOpen } from "react-icons/fa";

function CategoryTable({
    categories,
    onEdit,
    onDelete
}) {

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>

                                <th style={{ width: "70px" }}>
                                    #
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Parent Category
                                </th>

                                <th>
                                    Description
                                </th>

                                <th style={{ width: "120px" }}>
                                    Status
                                </th>

                                <th style={{ width: "170px" }}>
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                categories.length === 0 ?

                                    (
                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-5"
                                            >

                                                <FaFolderOpen
                                                    size={45}
                                                    className="text-secondary mb-3"
                                                />

                                                <h5 className="fw-bold">

                                                    No Categories Found

                                                </h5>

                                                <p className="text-muted mb-0">

                                                    Start by creating your first category.

                                                </p>

                                            </td>

                                        </tr>

                                    )

                                    :

                                    (

                                        categories.map((category, index) => (

                                            <tr
                                                key={category.id}
                                            >

                                                <td>

                                                    {index + 1}

                                                </td>

                                                <td>

                                                    <div className="fw-semibold">

                                                        {category.name}

                                                    </div>

                                                </td>

                                                <td>

                                                    {
                                                        category.parentCategoryName ??

                                                        <span className="text-muted">

                                                            —

                                                        </span>
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        category.description ||

                                                        <span className="text-muted">

                                                            No Description

                                                        </span>
                                                    }

                                                </td>

                                                <td>

                                                    <span className="badge bg-success">

                                                        Active

                                                    </span>

                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-outline-dark btn-sm me-2"
                                                        onClick={() => onEdit(category)}
                                                    >

                                                        <FaEdit />

                                                    </button>

                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => onDelete(category.id)}
                                                    >

                                                        <FaTrash />

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default CategoryTable;