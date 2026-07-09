import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UserForm({

    initialValues,

    onSubmit,

    buttonText

})
{
    const [formData, setFormData] =
        useState({

            name: "",

            email: "",

            role: "",

            skills: ""

        });

    useEffect(() => {

        if (initialValues) {

            setFormData({

                name:
                    initialValues.name || "",

                email:
                    initialValues.email || "",

                role:
                    initialValues.role || "",

                skills:
                    initialValues.skills || ""

            });

        }

    }, [initialValues]);

    const handleChange = (e) => {

        const { name, value } =
            e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSubmit = (e) => {
    e.preventDefault();

    // Empty fields
    if (
        !formData.name ||
        !formData.email
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Name validation
    if (!/^[A-Za-z ]+$/.test(formData.name)) {
        alert("Name should contain only letters.");
        return;
    }

    // Email validation
    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
        alert("Please enter a valid email.");
        return;
    }

    // Duplicate email validation
    

    onSubmit(formData);
};
    return (

        <Form onSubmit={handleSubmit}>  

            <Row className="g-3">

                <Col md={6}>

                    <Form.Group className="mb-3">
  <Form.Label>
    Name <span className="text-danger">*</span>
  </Form.Label>

  <Form.Control
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
  />
</Form.Group>

                </Col>

                <Col md={6}>

                    <Form.Group className="mb-3">
  <Form.Label>
    Email <span className="text-danger">*</span>
  </Form.Label>

  <Form.Control
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
  />
</Form.Group>

                </Col>
            
                <Col md={6}>

                    <Form.Control

                        name="role"

                        placeholder="Role"

                        value={formData.role}

                        onChange={handleChange}


                    />

                </Col>

                <Col md={6}>

                    <Form.Control

                        name="skills"

                        placeholder="Skills"

                        value={formData.skills}

                        onChange={handleChange}
                    />
  
                </Col>

            </Row>

            <Button
                className="mt-4"
                type="submit"
            >
                {buttonText}
            </Button>

        </Form>

    );

}

export default UserForm;