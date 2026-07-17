import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
    Row,
    Col
} from "react-bootstrap";

function TagForm({

    show,
    onHide,
    tag,
    tags,
    onSave,
    onEdit

}) {

    const [formData, setFormData] = useState({

        id: "",

        name: "",

        description: "",

    });

    useEffect(() => {

        if(tag) {

            setFormData({

                id: tag.id,
                name: tag.name,
                description: tag.description,
            });
        }
        else {
            setFormData({
                id: "",
                name: "",
                description: "",
            })
        }

    }, [tag, show]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name] : e.target.value

        })

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

        onHide();

    };

    const handleUpdate = () => {

        onEdit(formData);

        onHide();

    };

    return (

        <Modal

            show={show}

            onHide={onHide}

            centered

            size="lg"

        >

            <Form
                onSubmit={handleSubmit}
            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        {

                            tag

                                ?

                                "Update Tag"

                                :

                                "Create Tag"

                        }

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <Row>

                        <Col md={12}>

                            <Form.Group
                                className="mb-3"
                            >

                                <Form.Label>

                                    Tag Name

                                </Form.Label>

                                <Form.Control

                                    type="text"

                                    name="name"

                                    placeholder="Enter tag name"

                                    value={formData.name}

                                    onChange={handleChange}

                                    required

                                />

                            </Form.Group>

                        </Col>

                        <Col md={12}>

                            <Form.Group>

                                <Form.Label>

                                    Description

                                </Form.Label>

                                <Form.Control

                                    as="textarea"

                                    rows={4}

                                    name="description"

                                    placeholder="Enter tag description"

                                    value={formData.description}

                                    onChange={handleChange}

                                />

                            </Form.Group>

                        </Col>

                    </Row>

                </Modal.Body>

                <Modal.Footer>

                    <Button

                        variant="secondary"

                        onClick={onHide}

                    >

                        Cancel

                    </Button>

                    {

                        tag

                            ?

                        <Button

                            variant="dark"

                            onClick={handleUpdate}

                        >

                            Update Tag

                        </Button>

                            :

                        <Button

                            variant="dark"

                            type="submit"

                        >
                            Create Tag

                        </Button>

                        }

                </Modal.Footer>

            </Form>

        </Modal>

    );

}

export default TagForm;