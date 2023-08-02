import { Card, CardBody, CardTitle, Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container } from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getToken } from "../modules/authManager";
import { UploadWidget } from "./UploadWidget";

export const PetDetails = ({ pet, setSelectedPet, setPets, userProfile }) => {

    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false)
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

    const [archiveModal, setArchiveModal] = useState(false);
    const archiveToggle = () => setArchiveModal(!archiveModal);
    const handleArchiveSubmit = (e) => {
        e.preventDefault();
        archiveToggle();

        getToken().then((token) => {
            fetch("/api/pet/archive", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pet)
            })
                .then(res => res.json())
                .then((response) => {
                    setPets(response);
                    setSelectedPet(null);
                    navigate("/");
                });
        });
    };

    const [geneModal, setGeneModal] = useState(false);
    const geneToggle = () => setGeneModal(!geneModal);
    const [genes, setGenes] = useState([])
    const [selectedGeneId, setSelectedGeneId] = useState("");
    useEffect(() => {
        if (userProfile) {
            getToken().then((token) => {
                fetch('/api/Gene/', {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => setGenes(res));
            });
        }
    }, [userProfile]);
    const handleGeneSubmit = (id) => {
        getToken().then((token) => {
            fetch("/api/pet/AddGene/" + id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pet)
            })
                .then(res => res.json())
                .then((response) => {
                    setSelectedPet(response);
                    geneToggle();
                });
        });
    };

    const handleRemoveGene = (petGeneId) => {
        getToken().then((token) => {
            fetch(`/api/pet/removeGene/${petGeneId}/${pet.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then((response) => {
                    setSelectedPet(response);
                });
        });
    };

    const [traitModal, setTraitModal] = useState(false);
    const traitToggle = () => setTraitModal(!traitModal);
    const [traits, setTraits] = useState([])
    const [selectedTraitId, setSelectedTraitId] = useState("");
    const [selectedTraitPercentage, setSelectedTraitPercentage] = useState("");
    useEffect(() => {
        if (userProfile) {
            getToken().then((token) => {
                fetch('/api/Trait/', {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(res => res.json())
                    .then(res => setTraits(res));
            });
        }
    }, [userProfile]);
    const getAvailableTraits = () => {
        const existingTraitIds = pet.traits.map((trait) => trait.id);
        return traits.filter((trait) => !existingTraitIds.includes(trait.id));
    };
    const handleTraitSubmit = () => {
        getToken().then((token) => {
            fetch(`/api/pet/AddTrait/${selectedTraitId}/${selectedTraitPercentage}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pet)
            })
                .then(res => res.json())
                .then((response) => {
                    setSelectedPet(response);
                    traitToggle();
                });
        });
    };
    const handleRemoveTrait = (petTraitId) => {
        getToken().then((token) => {
            fetch(`/api/pet/removeTrait/${petTraitId}/${pet.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then((response) => {
                    setSelectedPet(response);
                });
        });
    };


    const [feedingModal, setFeedingModal] = useState(false);
    const feedingToggle = () => setFeedingModal(!feedingModal);
    const [newFeeding, setNewFeeding] = useState({
        petId: pet.id,
        food: "",
        date: null
    });
    const handleFeedingSubmit = () => {
        getToken().then((token) => {
            fetch(`/api/feeding/${pet.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newFeeding)
            })
                .then(res => res.json())
                .then((response) => {
                    setSelectedPet(response);
                    feedingToggle();
                });
        });
    };

    const handleRemoveFeeding = (feedingId) => {
        getToken().then((token) => {
            fetch(`/api/feeding/${feedingId}/${pet.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then((response) => {
                    setSelectedPet(response);
                });
        });
    };

    function formatDate(inputDate) {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;
    }

    if (editMode) {
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
            </Container>
        );
    }

    return (
        <Col md="12" className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
                <Card className="bg-success text-white mt-5 mb-5" style={{
                    width: '70rem'
                }}>
                    <CardBody>
                        <img src={pet.imageUrl} alt="image of pet" className="img-thumbnail mt-3" style={{ width: "800px", height: "600px" }} />
                        <CardTitle tag="h5">
                            {pet.name}
                        </CardTitle>
                        <Button className="mb-5 ml-5 mt-5 bg-dark" onClick={() => setSelectedPet(null)} >View All</Button>
                        <Button className="mb-5 ml-5 mt-5 bg-dark" onClick={() => setEditMode(true)} >Edit</Button>
                        <Button className="mb-5 ml-5 mt-5 bg-danger" onClick={archiveToggle}>
                            Add to archive
                        </Button>
                        <p>{pet.speciesCommon}</p>
                        <p>{pet.speciesLatin}</p>
                        <p>{pet.sex}</p>
                        <p>Date of birth: {pet.dob}</p>
                        <p>Feed every {pet.foodInterval} days</p>
                        <h6>Past feedings:</h6>
                        {pet.feedings.length > 0 ? (
                            <div>
                                {pet.feedings.map((feeding) => (
                                    <p key={`feeding-${feeding.id}`}>{feeding.food} on {formatDate(feeding.date)} <Button size="sm" className="ml-2 bg-danger" onClick={() => handleRemoveFeeding(feeding.id)}>Remove</Button></p>
                                ))}
                            </div>
                        ) : (
                            <p>None</p>
                        )}
                        <Button className="mb-2 mt-2 bg-dark" onClick={feedingToggle}>Add a feeding</Button>
                        <h6>Notes:</h6>
                        {pet.notes ? (<p>{pet.notes}</p>
                        ) : (
                            <p>None</p>)}

                        <h6>Genes:</h6>
                        {pet.genes.length > 0 ? (
                            <div>
                                {pet.displayGenes.map((gene) => (
                                    <p key={`gene-${gene.petGeneId}`}>{gene.name}  <Button size="sm" className="ml-2 bg-danger" onClick={() => handleRemoveGene(gene.petGeneId)}>Remove</Button></p>
                                ))}
                            </div>
                        ) : (
                            <p>None</p>
                        )}
                        <Button className="mb-2 mt-2 bg-dark" onClick={geneToggle}>Add a gene</Button>
                        <h6>Traits:</h6>
                        {pet.traits.length > 0 ? (
                            <div>
                                {pet.traits.map((trait) => (
                                    <p key={`trait-${trait.id}`}>{trait.name} {trait.percentage}%<Button size="sm" className="ml-2 bg-danger" onClick={() => handleRemoveTrait(trait.petTraitId)}>Remove</Button></p>
                                ))}
                            </div>
                        ) : (
                            <p>None</p>
                        )}
                        <Button className="mb-2 mt-2 bg-dark" onClick={traitToggle}>Add a trait</Button>
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
                        <Button color="danger" onClick={handleArchiveSubmit}>
                            Send to the archive
                        </Button>{' '}
                        <Button color="dark" onClick={archiveToggle}>
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
                        <Button color="dark" onClick={() => handleGeneSubmit(selectedGeneId)}>
                            Add this gene
                        </Button>{' '}
                        <Button color="dark" onClick={geneToggle}>
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
                        <Button color="dark" onClick={() => handleTraitSubmit()}>
                            Add this trait
                        </Button>{' '}
                        <Button color="dark" onClick={traitToggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={feedingModal} toggle={feedingToggle}>
                    <ModalHeader toggle={feedingToggle}>When and what did you feed {pet.name}?</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="foodInput">Food</Label>
                                <Input
                                    type="text"
                                    id="foodInput"
                                    value={newFeeding.food}
                                    onChange={(e) =>
                                        setNewFeeding({ ...newFeeding, food: e.target.value })
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="dateInput">Date</Label>
                                <Input
                                    type="date"
                                    id="dateInput"
                                    value={newFeeding.date}
                                    onChange={(e) =>
                                        setNewFeeding({ ...newFeeding, date: e.target.value })
                                    }
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="dark" onClick={() => handleFeedingSubmit()}>
                            Save Feeding
                        </Button>{" "}
                        <Button color="dark" onClick={feedingToggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </Col>
    )
}