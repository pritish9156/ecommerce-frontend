import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
    Row,
    Col
} from "react-bootstrap";

function CategoryForm({

    show,
    onHide,
    category,
    categories,
    onSave,
    onEdit

}) {

    const [formData, setFormData] = useState({

        id: "",

        name: "",

        description: "",

        parentCategoryId: ""

    });

    useEffect(() => {

        if(category) {

            setFormData({

                id: category.id,
                name: category.name,
                description: category.description,
                parentCategoryId: category.parentCategoryId || ""
            });
        }
        else {
            setFormData({
                id: "",
                name: "",
                description: "",
                parentCategoryId: ""
            })
        }

    }, [category, show]);

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

                            category

                                ?

                                "Update Category"

                                :

                                "Create Category"

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

                                    Category Name

                                </Form.Label>

                                <Form.Control

                                    type="text"

                                    name="name"

                                    placeholder="Enter category name"

                                    value={formData.name}

                                    onChange={handleChange}

                                    required

                                />

                            </Form.Group>

                        </Col>

                        <Col md={12}>

                            <Form.Group
                                className="mb-3"
                            >

                                <Form.Label>

                                    Parent Category

                                </Form.Label>

                                <Form.Select

                                    name="parentCategoryId"

                                    value={formData.parentCategoryId}

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        None

                                    </option>

                                    {

                                        categories

                                            .filter(c => c.id !== formData.id)

                                            .map(category => (

                                                <option

                                                    key={category.id}

                                                    value={category.id}

                                                >

                                                    {category.name}

                                                </option>

                                            ))

                                    }

                                </Form.Select>

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

                                    placeholder="Enter category description"

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

                        category

                            ?

                        <Button

                            variant="dark"

                            onClick={handleUpdate}

                        >

                            Update Category

                        </Button>

                            :

                        <Button

                            variant="dark"

                            type="submit"

                        >
                            Create Category

                        </Button>

                        }

                </Modal.Footer>

            </Form>

        </Modal>

    );

}

export default CategoryForm;