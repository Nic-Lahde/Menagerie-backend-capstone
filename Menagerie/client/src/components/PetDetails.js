import { Card, CardBody, CardTitle, Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const PetDetails = ({ pet, setSelectedPet, setPets, userProfile }) => {

    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false)
    const [petToEdit, setPetToEdit] = useState(pet)
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


    const [archiveModal, setArchiveModal] = useState(false);
    const archiveToggle = () => setArchiveModal(!archiveModal);
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

    const [geneModal, setGeneModal] = useState(false);
    const geneToggle = () => setGeneModal(!geneModal);
    const [genes, setGenes] = useState([])
    const [selectedGeneId, setSelectedGeneId] = useState("");
    useEffect(() => {
        fetch('/api/Gene/').then(res => (res.json())).then(res => setGenes(res))
    }, [])
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
    const handleRemoveGene = (petGeneId) => {
        fetch(`/api/pet/removeGene/${petGeneId}/${userProfile.id}`, {
            method: "DELETE"
        }).then(res => res.json())
            .then(response => {
                setPets(response)
                setSelectedPet(null)
                navigate("/");
            })
    }

    const [traitModal, setTraitModal] = useState(false);
    const traitToggle = () => setTraitModal(!traitModal);
    const [traits, setTraits] = useState([])
    const [selectedTraitId, setSelectedTraitId] = useState("");
    const [selectedTraitPercentage, setSelectedTraitPercentage] = useState("");
    useEffect(() => {
        fetch('/api/Trait/').then(res => (res.json())).then(res => setTraits(res))
    }, [])
    const getAvailableTraits = () => {
        const existingTraitIds = pet.traits.map((trait) => trait.id);
        return traits.filter((trait) => !existingTraitIds.includes(trait.id));
    };
    const handleTraitSubmit = () => {
        fetch(`/api/pet/AddTrait/${selectedTraitId}/${selectedTraitPercentage}`, {
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
                    <h6>Past feedings:</h6>
                    {pet.feedings.length > 0 ? (
                        <div>
                            {pet.feedings.map((feeding) => (
                                <p key={`feeding-${feeding.id}`}>{feeding.food} on {feeding.date}</p>
                            ))}
                        </div>
                    ) : (
                        <p>None</p>
                    )}
                    <h6>Notes:</h6>
                    {pet.notes ? (<p>{pet.notes}</p>
                    ) : (
                        <p>None</p>)}

                    <h6>Genes:</h6>
                    {pet.genes.length > 0 ? (
                        <div>
                            {pet.genes.map((gene) => (
                                <p key={`gene-${gene.petGeneId}`}>{gene.name}  <Button onClick={() => handleRemoveGene(gene.petGeneId)}>Remove this gene</Button></p>
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
                                <p key={`trait-${trait.id}`}>{trait.name} {trait.percentage}%</p>
                            ))}
                        </div>
                    ) : (
                        <p>None</p>
                    )}
                    <Button onClick={traitToggle}>Add a trait</Button>
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
            <Modal
                isOpen={traitModal}
                toggle={traitToggle}
            >
                <ModalHeader toggle={traitToggle}>Add a trait to {pet.name}?</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="traitSelect">Select a trait:</Label>
                            <Input
                                type="select"
                                name="traitSelect"
                                id="traitSelect"
                                value={selectedTraitId}
                                onChange={(e) => setSelectedTraitId(e.target.value)}
                            >
                                <option value="">Select a trait</option>
                                {getAvailableTraits().map((trait) => (
                                    <option key={trait.id} value={trait.id}>
                                        {trait.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="traitPercentageSelect">Select a percentage:</Label>
                            <Input
                                type="select"
                                name="traitPercentageSelect"
                                id="traitPercentageSelect"
                                value={selectedTraitPercentage}
                                onChange={(e) => setSelectedTraitPercentage(e.target.value)}
                            >
                                <option value="">Select a percentage</option>
                                <option value="100">100%</option>
                                <option value="87.5">87.5%</option>
                                <option value="75">75%</option>
                                <option value="62.5">62.5%</option>
                                <option value="50">50%</option>
                                <option value="37.5">37.5%</option>
                                <option value="25">25%</option>
                                <option value="12.5">12.5%</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleTraitSubmit()}>
                        Add this trait
                    </Button>{' '}
                    <Button color="secondary" onClick={traitToggle}>
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