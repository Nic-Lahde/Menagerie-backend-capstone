import { Card, CardBody, CardTitle, Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const PetDetails = ({ pet, setSelectedPet, setPets }) => {

    const [editMode, setEditMode] = useState(false)

    const [petToEdit, setPetToEdit] = useState(pet)

    const [genes, setGenes] = useState([])
    const [selectedGeneId, setSelectedGeneId] = useState("");

    useEffect(() => {
        fetch('/api/Gene/').then(res => (res.json())).then(res => setGenes(res))
    }, [])

    const navigate = useNavigate();

    const [archiveModal, setArchiveModal] = useState(false);

    const [geneModal, setGeneModal] = useState(false);

    const archiveToggle = () => setArchiveModal(!archiveModal);

    const geneToggle = () => setGeneModal(!geneModal);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch("/api/pet", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(petToEdit)
        }).then(res => res.json()).then((response) => {
            setPets(response)
            setSelectedPet(null)
            navigate("/")
        })
    }
    const handleGeneSubmit = (id) => {
        fetch("/api/pet/AddGene/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pet)
        }).then(res => res.json()).then((response) => {
            setPets(response)
            setSelectedPet(null)
            navigate("/")
        })
    }

    const handleArchiveSubmit = (e) => {
        e.preventDefault();
        archiveToggle();
        fetch("/api/pet/archive", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pet)
        }).then(res => res.json()).then((response) => {
            setPets(response)
            setSelectedPet(null)
            navigate("/")
        })
    }



    if (editMode) {
        return (
            <Form onSubmit={handleEditSubmit}>
                <fieldset>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={petToEdit.name}
                            onChange={(e) => setPetToEdit({ ...petToEdit, name: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="speciesCommon">Species Common Name</Label>
                        <Input
                            id="speciesCommon"
                            type="text"
                            value={petToEdit.speciesCommon}
                            onChange={(e) => setPetToEdit({ ...petToEdit, speciesCommon: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="speciesLatin">Species Latin Name</Label>
                        <Input
                            id="speciesLatin"
                            type="text"
                            value={petToEdit.speciesLatin}
                            onChange={(e) => setPetToEdit({ ...petToEdit, speciesLatin: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dob">Date of Birth (estimating is OK)</Label>
                        <Input
                            id="dob"
                            type="text"
                            value={petToEdit.dob}
                            onChange={(e) => setPetToEdit({ ...petToEdit, dob: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Sex</Label>
                        <FormGroup check>
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
                        <FormGroup check>
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
                        <FormGroup check>
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
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageUrl">ImageUrl</Label>
                        <Input
                            id="imageUrl"
                            type="text"
                            value={petToEdit.imageUrl}
                            onChange={(e) => setPetToEdit({ ...petToEdit, imageUrl: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="foodInterval">How many days between feedings?</Label>
                        <Input
                            id="foodInterval"
                            type="number"
                            value={petToEdit.foodInterval}
                            onChange={(e) => setPetToEdit({ ...petToEdit, foodInterval: parseInt(e.target.value) })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input
                            id="notes"
                            type="text"
                            value={petToEdit.notes}
                            onChange={(e) => setPetToEdit({ ...petToEdit, notes: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Save Changes</Button>
                        <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        );
    }

    return (
        <Col md="12">
            <Card style={{
                width: '70rem'
            }}>
                <CardBody>
                    <img src={pet.imageUrl} alt="image of pet" className="img-thumbnail" style={{ width: "800px", height: "600px" }} />
                    <CardTitle tag="h5">
                        {pet.name}
                    </CardTitle>
                    <p>{pet.speciesCommon}</p>
                    <p>{pet.speciesLatin}</p>
                    <p>{pet.sex}</p>
                    <p>Date of birth: {pet.dob}</p>
                    <p>Feed every {pet.foodInterval} days</p>
                    <h6>Notes:</h6>
                    {pet.notes ? (<p>{pet.notes}</p>
                    ) : (
                        <p>None</p>)}

                    <h6>Genes:</h6>
                    {pet.genes.length > 0 ? (
                        <div>
                            {pet.genes.map((gene) => (
                                <p key={gene.id}>{gene.name}</p>
                            ))}
                        </div>
                    ) : (
                        <p>None</p>
                    )}
                    <Button onClick={geneToggle}>Add a gene</Button>
                    <h6>Traits:</h6>
                    {pet.traits.length > 0 ? (
                        <div>
                            {pet.traits.map((trait) => (
                                <p key={trait.id}>{trait.name}</p>
                            ))}
                        </div>
                    ) : (
                        <p>None</p>
                    )}
                </CardBody>
            </Card>
            <Modal
                isOpen={archiveModal}
                toggle={archiveToggle}
            >
                <ModalHeader toggle={archiveToggle}>Send {pet.name} to the archive?</ModalHeader>
                <ModalBody>
                    Your pet will be marked as inactive and no longer appear alongside your other pets. This action is irreversible.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleArchiveSubmit}>
                        Send to the archive
                    </Button>{' '}
                    <Button color="secondary" onClick={archiveToggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal
                isOpen={geneModal}
                toggle={geneToggle}
            >
                <ModalHeader toggle={geneToggle}>Add a gene to {pet.name}?</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="geneSelect">Select a gene:</Label>
                            <Input
                                type="select"
                                name="geneSelect"
                                id="geneSelect"
                                value={selectedGeneId}
                                onChange={(e) => setSelectedGeneId(e.target.value)}
                            >
                                <option value="">Select a gene</option>
                                {genes.map((gene) => (
                                    <option key={gene.id} value={gene.id}>
                                        {gene.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleGeneSubmit(selectedGeneId)}>
                        Add this gene
                    </Button>{' '}
                    <Button color="secondary" onClick={geneToggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Button onClick={() => setEditMode(true)} >Edit</Button>
            <Button onClick={() => setSelectedPet(null)} >View All</Button>
            <Button color="danger" onClick={archiveToggle}>
                Add this pet to the archive
            </Button>
        </Col>
    )
}