import React, { useEffect, useState } from "react";
import { Button, Row, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter } from "reactstrap";


export const Genetics = ({ userProfile }) => {

    const [genes, setGenes] = useState([])

    const [traits, setTraits] = useState([])

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
    useEffect(() => {
        if (userProfile) {
            fetch('/api/Gene/').then(res => (res.json())).then(res => setGenes(res))
        }
    }, [userProfile])
    useEffect(() => {
        if (userProfile) {
            fetch('/api/Trait/').then(res => (res.json())).then(res => setTraits(res))
        }
    }, [userProfile])
    const handleGeneSubmit = (gene) => {
        fetch("/api/gene", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gene)
        }).then(res => (res.json())).then(res => setGenes(res))
        setNewGene({
            name: "",
            isCoDominant: false,
        });
        geneToggle();
    }
    const handleTraitSubmit = (trait) => {
        fetch("/api/Trait", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trait)
        }).then(res => (res.json())).then(res => setTraits(res))
        setNewTrait({
            name: ""
        });
        traitToggle();
    }
    const handleGeneDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this gene?")) {
            fetch('/api/Gene/' + id, {
                method: "DELETE"
            }).then(res => res.json())
                .then(response => {
                    setGenes(response);
                })
        }
    }
    const handleTraitDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this trait?")) {
            fetch('/api/Trait/' + id, {
                method: "DELETE"
            }).then(res => res.json())
                .then(response => {
                    setTraits(response);
                })
        }
    }
    return (
        <>
            {userProfile ? (
                <>

                    <h1>View and add genes and traits</h1>
                    <h3>Genes</h3>
                    <Row className="justify-content-evenly">
                        {genes.map((gene) => (
                            <p>{gene.name} {gene.isCoDominant ? (<p>CoDominant</p>) : (<p>Heterozygous</p>)} <Button onClick={() => handleGeneDelete(gene.id)}>Delete</Button></p>
                        ))}
                    </Row>
                    <Button onClick={geneToggle}>Add a gene</Button>
                    <h3>Traits</h3>
                    <Row className="justify-content-evenly">
                        {traits.map((trait) => (
                            <p>{trait.name}<Button onClick={() => handleTraitDelete(trait.id)}>Delete</Button></p>
                        ))}
                    </Row>
                    <Button onClick={traitToggle}>Add a trait</Button>
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
                                        value={newGene.isCoDominant ? "CoDominant" : "Heterozygous"}
                                        onChange={(e) => setNewGene({ ...newGene, isCoDominant: e.target.value === "CoDominant" })}
                                    >
                                        <option value="CoDominant">CoDominant</option>
                                        <option value="Heterozygous">Heterozygous</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => handleGeneSubmit(newGene)}>
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
                            <Button color="primary" onClick={() => handleTraitSubmit(newTrait)}>
                                Add this trait
                            </Button>{' '}
                            <Button color="secondary" onClick={traitToggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </>
            ) : (
                ""
            )}
        </>
    );
}