import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import TagForm from "../../components/TagForm";
import TagTable from "../../components/TagTable";

import {
    createTag,
    getAllTags,
    updateTag,
    deleteTag
} from "../../services/tagsService";

function AdminTags() {

    const [tags, setTags] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedTag, setSelectedTag] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchTags();

    }, []);

    const fetchTags = async () => {

        try{
            const response = await getAllTags();

            setTags(response.data.data);

        }
        catch(error) {
            console.log(error);
        }

    };

    const handleAdd = () => {

        setSelectedTag(null);

        setShowModal(true);

    };

    const handleEdit = (tag) => {

        setSelectedTag(tag);

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        try{

            const response = await deleteTag(id);

            alert(response.data.message);

            fetchTags();

        }
        catch(error) {
            console.log(error);
        }

    };

    const handleSave = async (formData) => {

        try{

            const response = await createTag(formData);

            alert(response.data.message);

            fetchTags();

        }
        catch(error) {
            console.log(error);
        }

    };

    const handleUpdate = async (formData) => {

        try{

            const response = await updateTag(formData);

            alert(response.data.message);

            fetchTags();
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

                            Tags Management

                        </h2>

                        <p className="text-muted mb-0">

                            Manage product Tags.

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

                            Add Tag

                        </Button>

                    </Col>

                </Row>

                <Card
                    className="shadow-sm border-0 rounded-4"
                >

                    <Card.Body>

                        <TagTable

                            tags={tags}

                            loading={loading}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />

                    </Card.Body>

                </Card>

            </Container>

            <TagForm

                show={showModal}

                onHide={() => setShowModal(false)}

                tag={selectedTag}

                tags={tags}

                onSave={handleSave}

                onEdit={handleUpdate}

            />
        </>

    );

}

export default AdminTags;