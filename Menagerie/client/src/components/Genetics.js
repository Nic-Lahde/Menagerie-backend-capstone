import React, { useEffect, useState } from "react";
import { Button, Row, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Col, Container, Card, CardTitle } from "reactstrap";
import { getToken } from "../modules/authManager";

export const Genetics = ({ userProfile }) => {

    const [genes, setGenes] = useState([])

    const [traits, setTraits] = useState([])

    const [deleteId, setDeleteId] = useState()

    const [newGene, setNewGene] = useState({
        name: "",
        isCoDominant: false
    })

    const [newTrait, setNewTrait] = useState({
        name: ""
    })
    const [geneModal, setGeneModal] = useState(false);
    const [traitModal, setTraitModal] = useState(false);
    const geneToggle = () => setGeneModal(!geneModal);
    const traitToggle = () => setTraitModal(!traitModal);
    const [geneDeleteModal, setGeneDeleteModal] = useState(false);
    const [traitDeleteModal, setTraitDeleteModal] = useState(false);
    const geneDeleteToggle = () => setGeneDeleteModal(!geneDeleteModal);
    const traitDeleteToggle = () => setTraitDeleteModal(!traitDeleteModal);
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
    const handleGeneSubmit = (gene) => {
        getToken().then((token) => {
            fetch("/api/gene", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(gene)
            })
                .then(res => res.json())
                .then(res => setGenes(res));

            setNewGene({
                name: "",
                isCoDominant: false,
            });
            geneToggle();
        });
    };
    const handleTraitSubmit = (trait) => {
        getToken().then((token) => {
            fetch("/api/Trait", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(trait)
            })
                .then(res => res.json())
                .then(res => setTraits(res));

            setNewTrait({
                name: ""
            });
            traitToggle();
        });
    };
    const handleGeneDeleteModal = (id) => {
        setDeleteId(id);
        geneDeleteToggle();
    }
    const handleGeneDelete = () => {
        getToken().then((token) => {
            fetch('/api/Gene/' + deleteId, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(response => {
                    setGenes(response);
                });
        });
        geneDeleteToggle();
    };
    const handleTraitDeleteModal = (id) => {
        setDeleteId(id);
        traitDeleteToggle();
    }
    const handleTraitDelete = () => {
        getToken().then((token) => {
            fetch('/api/Trait/' + deleteId, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(response => {
                    setTraits(response);
                });
        });
        traitDeleteToggle();
    };
    return (
        <Container className="d-flex justify-content-center">
            {userProfile ? (
                <Card className="bg-success text-white mt-5 mr-5 ml-5" style={{
                    width: '40rem'
                }}>

                    <CardTitle tag="h2">View and add genes and traits</CardTitle>
                    <Row>
                        <Col md="6">
                            <h3>Genes</h3>
                            <Button className="mb-2 mt-2 bg-dark" onClick={geneToggle}>Add new gene</Button>
                            {genes.map((gene) => (
                                <div key={gene.id}>{gene.name} {gene.isCoDominant ? (<p>CoDominant <Button size="sm" className="ml-2 bg-danger" onClick={() => handleGeneDeleteModal(gene.id)}>Delete</Button></p>) : (<p>Recessive <Button size="sm" className="ml-2 bg-danger" onClick={() => handleGeneDeleteModal(gene.id)}>Delete</Button></p>)}</div>
                            ))}
                        </Col>
                        <Col md="6">
                            <h3>Traits</h3>
                            <p><Button className="mb-2 mt-2 bg-dark" onClick={traitToggle}>Add new trait</Button></p>
                            {traits.map((trait) => (
                                <div key={trait.id}><p>{trait.name} <Button size="sm" className="ml-2 bg-danger" onClick={() => handleTraitDeleteModal(trait.id)}>Delete</Button></p></div>
                            ))}
                        </Col>
                    </Row>
                    <Modal
                        isOpen={geneModal}
                        toggle={geneToggle}
                    >
                        <ModalHeader toggle={geneToggle}>Add a new gene?</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="geneName">Name of gene:</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={newGene.name}
                                        onChange={(e) => setNewGene({ ...newGene, name: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="geneType">Gene Type:</Label>
                                    <Input
                                        type="select"
                                        name="geneType"
                                        value={newGene.isCoDominant ? "CoDominant" : "Recessive"}
                                        onChange={(e) => setNewGene({ ...newGene, isCoDominant: e.target.value === "CoDominant" })}
                                    >
                                        <option value="CoDominant">CoDominant</option>
                                        <option value="Recessive">Recessive</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="dark" onClick={() => handleGeneSubmit(newGene)}>
                                Add this gene
                            </Button>{' '}
                            <Button color="danger" onClick={geneToggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal
                        isOpen={traitModal}
                        toggle={traitToggle}
                    >
                        <ModalHeader toggle={traitToggle}>Add a new trait?</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="traitName">Name of trait:</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={newTrait.name}
                                        onChange={(e) => setNewTrait({ ...newTrait, name: e.target.value })}
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="dark" onClick={() => handleTraitSubmit(newTrait)}>
                                Add this trait
                            </Button>{' '}
                            <Button color="danger" onClick={traitToggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal
                        isOpen={geneDeleteModal}
                        toggle={geneDeleteToggle}
                    >
                        <ModalHeader toggle={geneDeleteToggle}>Delete this gene?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" onClick={() => handleGeneDelete()}>
                                Delete
                            </Button>{' '}
                            <Button color="dark" onClick={geneDeleteToggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Modal
                        isOpen={traitDeleteModal}
                        toggle={traitDeleteToggle}
                    >
                        <ModalHeader toggle={traitDeleteToggle}>Delete this trait?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" onClick={() => handleTraitDelete()}>
                                Delete
                            </Button>{' '}
                            <Button color="dark" onClick={traitDeleteToggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Card>
            ) : (
                ""
            )}
        </Container>
    );
}