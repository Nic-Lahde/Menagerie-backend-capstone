import { useState } from "react"
import { Button, Form, FormGroup, Label, Input, Col, Card, Container } from "reactstrap";
import { useNavigate } from "react-router-dom"
import { getToken } from "../modules/authManager";

export const PetForm = ({ userProfile }) => {
    const [newPet, setNewPet] = useState({
        name: "",
        userProfileId: userProfile.id,
        speciesCommon: "",
        speciesLatin: "",
        dob: "",
        foodInterval: 0,
        imageUrl: "",
        sexId: 0,
        notes: ""
    })

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        getToken().then((token) => {
            fetch("/api/pet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPet)
            })
                .then(() => {
                    navigate("/");
                });
        });
    };

    return (
        <Container className="d-flex justify-content-center">
            <Card fluid className="bg-success text-white mt-5 mr-5 ml-5" style={{
                width: '60rem'
            }}>
                <Form onSubmit={handleSubmit}>
                    <fieldset className="mt-3 ml-5">
                        <FormGroup row>
                            <Label for="name" sm={{ size: 2, offset: 1 }}>Name</Label>
                            <Col sm={4}>
                                <Input
                                    id="name"
                                    type="text"
                                    value={newPet.name}
                                    onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                                    bsSize="sm"
                                />
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Label for="speciesCommon" sm={{ size: 2, offset: 1 }}>Species Common Name</Label>
                            <Col sm={4}>
                                <Input
                                    id="speciesCommon"
                                    type="text"
                                    value={newPet.speciesCommon}
                                    onChange={(e) => setNewPet({ ...newPet, speciesCommon: e.target.value })}
                                    bsSize="sm"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="speciesLatin" sm={{ size: 2, offset: 1 }}>Species Latin Name</Label>
                            <Col sm={4}>
                                <Input
                                    id="speciesLatin"
                                    type="text"
                                    value={newPet.speciesLatin}
                                    onChange={(e) => setNewPet({ ...newPet, speciesLatin: e.target.value })}
                                    bsSize="sm"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="dob" sm={{ size: 2, offset: 1 }}>Date of Birth (estimating is OK)</Label>
                            <Col sm={2}>
                                <Input
                                    id="dob"
                                    type="text"
                                    value={newPet.dob}
                                    onChange={(e) => setNewPet({ ...newPet, dob: e.target.value })}
                                    bsSize="sm"
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={{ size: 2, offset: 1 }}>Sex</Label>
                            <Col sm={3}>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sex"
                                            value={1}
                                            checked={newPet.sexId === 1}
                                            onChange={(e) =>
                                                setNewPet({ ...newPet, sexId: parseInt(e.target.value) })
                                            }
                                        />
                                        Male
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sex"
                                            value={2}
                                            checked={newPet.sexId === 2}
                                            onChange={(e) =>
                                                setNewPet({ ...newPet, sexId: parseInt(e.target.value) })
                                            }
                                        />
                                        Female
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sex"
                                            value={3}
                                            checked={newPet.sexId === 3}
                                            onChange={(e) =>
                                                setNewPet({ ...newPet, sexId: parseInt(e.target.value) })
                                            }
                                        />
                                        Undetermined
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="imageUrl" sm={{ size: 2, offset: 1 }}>ImageUrl</Label>
                            <Col sm={6}>
                                <Input
                                    id="imageUrl"
                                    type="text"
                                    value={newPet.imageUrl}
                                    onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.value })}
                                    bsSize="sm"
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="foodInterval" sm={{ size: 2, offset: 1 }}>How many days between feedings?</Label>
                            <Col sm={2}>
                                <Input
                                    id="foodInterval"
                                    type="number"
                                    value={newPet.foodInterval}
                                    onChange={(e) => setNewPet({ ...newPet, foodInterval: parseInt(e.target.value) })}
                                    bsSize="sm"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="notes" sm={{ size: 2, offset: 1 }}>Notes</Label>
                            <Col sm={6}>
                                <Input
                                    id="notes"
                                    type="text"
                                    value={newPet.notes}
                                    onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })}
                                    bsSize="sm"
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col sm={{ size: 6, offset: 3 }}>
                                <Button className="bg-dark">Save</Button>
                            </Col>
                        </FormGroup>
                    </fieldset>
                </Form>
            </Card>
        </Container>
    );
}