import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import CategoryForm from "../../components/CategoryForm";
import CategoryTable from "../../components/CategoryTable";

import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";
import { create } from "axios";

function AdminCategoryManagement() {

    const [categories, setCategories] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try{
            const response = await getAllCategories();

            setCategories(response.data.data);

        }
        catch(error) {
            console.log(error);
        }

    };

    const handleAdd = () => {

        setSelectedCategory(null);

        setShowModal(true);

    };

    const handleEdit = (category) => {

        setSelectedCategory(category);

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        try{

            const response = await deleteCategory(id);

            alert(response.data.message);

            fetchCategories();

        }
        catch(error) {
            console.log(error);
        }

    };

    const handleSave = async (formData) => {

        try{

            const response = await createCategory(formData);

            alert(response.data.message);

            fetchCategories();

        }
        catch(error) {
            console.log(error);
        }

    };

    const handleUpdate = async (formData) => {

        try{

            const response = await updateCategory(formData);

            alert(response.data.message);

            fetchCategories();
        }
        catch(error){
            console.log(error);
        }
    };

    return (

        <>
            <Container fluid>

                <Row className="mb-4 align-items-center">

                    <Col>

                        <h2 className="fw-bold">

                            Category Management

                        </h2>

                        <p className="text-muted mb-0">

                            Manage product categories and hierarchy.

                        </p>

                    </Col>

                    <Col
                        xs="auto"
                    >

                        <Button
                            variant="dark"
                            onClick={handleAdd}
                        >

                            <FaPlus className="me-2" />

                            Add Category

                        </Button>

                    </Col>

                </Row>

                <Card
                    className="shadow-sm border-0 rounded-4"
                >

                    <Card.Body>

                        <CategoryTable

                            categories={categories}

                            loading={loading}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />

                    </Card.Body>

                </Card>

            </Container>

            <CategoryForm

                show={showModal}

                onHide={() => setShowModal(false)}

                category={selectedCategory}

                categories={categories}

                onSave={handleSave}

                onEdit={handleUpdate}

            />
        </>

    );

}

export default AdminCategoryManagement;