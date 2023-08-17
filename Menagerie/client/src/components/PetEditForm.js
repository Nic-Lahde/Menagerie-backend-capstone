import { Card, Col, Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useState } from "react";
import { getToken } from "../modules/authManager";
import { UploadWidget } from "./UploadWidget";

export const PetEditForm = ({ pet, setEditMode, setSelectedPet }) => {
    const [petToEdit, setPetToEdit] = useState(pet)
    const handleEditSubmit = (e) => {
        e.preventDefault();
        getToken().then((token) => {
            fetch("/api/pet", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(petToEdit)
            })
                .then(res => res.json())
                .then((response) => {
                    setSelectedPet(response);
                    setEditMode(false);
                });
        });
    };
    return (
        <Container className="d-flex justify-content-center">
            <Card fluid className="bg-success text-white mt-5 mr-5 ml-5" style={{
                width: '60rem'
            }}>
                <Form onSubmit={handleEditSubmit}>
                    <fieldset className="mt-3 ml-5">
                        <UploadWidget newPet={petToEdit} setNewPet={setPetToEdit} />
                        <FormGroup row>
                            <Label sm={{ size: 2, offset: 1 }} for="name">Name</Label>
                            <Col sm={4}>
                                <Input
                                    id="name"
                                    type="text"
                                    value={petToEdit.name}
                                    onChange={(e) => setPetToEdit({ ...petToEdit, name: e.target.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={{ size: 2, offset: 1 }} for="speciesCommon">Species Common Name</Label>
                            <Col sm={4}>
                                <Input
                                    id="speciesCommon"
                                    type="text"
                                    value={petToEdit.speciesCommon}
                                    onChange={(e) => setPetToEdit({ ...petToEdit, speciesCommon: e.target.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={{ size: 2, offset: 1 }} for="speciesLatin">Species Latin Name</Label>
                            <Col sm={4}>
                                <Input
                                    id="speciesLatin"
                                    type="text"
                                    value={petToEdit.speciesLatin}
                                    onChange={(e) => setPetToEdit({ ...petToEdit, speciesLatin: e.target.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={{ size: 2, offset: 1 }} for="dob">Date of Birth (estimating is OK)</Label>
                            <Col sm={2}>
                                <Input
                                    id="dob"
                                    type="text"
                                    value={petToEdit.dob}
                                    onChange={(e) => setPetToEdit({ ...petToEdit, dob: e.target.value })}
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
                                            name="sexId"
                                            value="1"
                                            checked={petToEdit.sexId === 1}
                                            onChange={(e) => setPetToEdit({ ...petToEdit, sexId: parseInt(e.target.value) })}
                                        />{" "}
                                        Male
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sexId"
                                            value="2"
                                            checked={petToEdit.sexId === 2}
                                            onChange={(e) => setPetToEdit({ ...petToEdit, sexId: parseInt(e.target.value) })}
                                        />{" "}
                                        Female
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sexId"
                                            value="3"
                                            checked={petToEdit.sexId === 3}
                                            onChange={(e) => setPetToEdit({ ...petToEdit, sexId: parseInt(e.target.value) })}
                                        />{" "}
                                        Undetermined
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={{ size: 2, offset: 1 }} for="foodInterval">How many days between feedings?</Label>
                            <Col sm={2}>
                                <Input
                                    id="foodInterval"
                                    type="number"
                                    value={petToEdit.foodInterval}
                                    onChange={(e) => setPetToEdit({ ...petToEdit, foodInterval: parseInt(e.target.value) })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={{ size: 2, offset: 1 }} for="notes">Notes</Label>
                            <Col sm={6}>
                                <Input
                                    id="notes"
                                    type="text"
                                    value={petToEdit.notes}
                                    onChange={(e) => setPetToEdit({ ...petToEdit, notes: e.target.value })}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" className="mr-5">Save Changes</Button>
                            <Button onClick={() => setEditMode(false)}>Cancel</Button>
                        </FormGroup>
                    </fieldset>
                </Form>
            </Card>
        </Container>)
}