import { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, Input, Label, Row, Button } from "reactstrap";
import { getToken } from "../modules/authManager";

export const ClutchCalculator = ({ userProfile }) => {
    const [genes, setGenes] = useState([])

    const [traits, setTraits] = useState([])

    const [sireGenes, setSireGenes] = useState([])
    const [selectedSireGene, setSelectedSireGene] = useState()
    const [displaySireGenes, setDisplaySireGenes] = useState([])
    const [sireTraits, setSireTraits] = useState([])
    const [selectedSirePercentage, setSelectedSirePercentage] = useState(100);
    const [selectedSireTrait, setSelectedSireTrait] = useState()

    const [damGenes, setDamGenes] = useState([])
    const [selectedDamGene, setSelectedDamGene] = useState()
    const [displayDamGenes, setDisplayDamGenes] = useState([])
    const [damTraits, setDamTraits] = useState([])
    const [selectedDamPercentage, setSelectedDamPercentage] = useState(100);
    const [selectedDamTrait, setSelectedDamTrait] = useState()

    const [offspringGenes, setOffspringGenes] = useState([]);
    const [offspringTraits, setOffspringTraits] = useState([])


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

    useEffect(() => {
        setDisplaySireGenes([]);
        const newDisplaySireGenes = prepareGenesForDisplay(sireGenes);
        setDisplaySireGenes(newDisplaySireGenes)
    }, [sireGenes]);

    useEffect(() => {
        setDisplayDamGenes([]);
        const newDisplayDamGenes = prepareGenesForDisplay(damGenes);
        setDisplayDamGenes(newDisplayDamGenes)
    }, [damGenes]);

    const prepareGenesForDisplay = (genes) => {
        const geneMap = new Map();

        genes.forEach((gene) => {
            const geneName = gene.name;
            if (!geneMap.has(geneName)) {
                geneMap.set(geneName, { count: 1, gene });
            } else {
                geneMap.get(geneName).count++;
                if (gene.isCoDominant) {
                    geneMap.set(geneName, { count: geneMap.get(geneName).count, gene });
                }
            }
        });
        const displayGenes = [];
        geneMap.forEach(({ count, gene }) => {
            if (count === 1) {
                if (gene.isCoDominant) {
                    displayGenes.push(gene);
                } else {
                    displayGenes.push({ ...gene, name: `${gene.name}(het)` });
                }
            } else {
                if (gene.isCoDominant) {
                    displayGenes.push({ ...gene, name: `${gene.name}(super)` });
                } else {
                    displayGenes.push({ ...gene, name: `${gene.name}(visual)` });
                }
            }
        });

        return displayGenes;
    };

    const handleGeneSelect = (event, type) => {
        const selectedGeneId = parseInt(event.target.value);
        const selectedGene = genes.find((gene) => gene.id === selectedGeneId);
        if (type === "sire") {
            setSelectedSireGene(selectedGene);
        } else if (type === "dam") {
            setSelectedDamGene(selectedGene);
        }
    };
    const handleTraitSelect = (event, type) => {
        const selectedTraitId = parseInt(event.target.value);
        const selectedTrait = traits.find((trait) => trait.id === selectedTraitId);
        if (type === "sire") {
            setSelectedSireTrait({ ...selectedTrait, percentage: selectedSirePercentage });
        } else if (type === "dam") {
            setSelectedDamTrait({ ...selectedTrait, percentage: selectedDamPercentage });
        }
    };
    const calculateOffspringGenes = () => {
        const offspringGenes = [];
        const countGenes = (genes) => {
            const geneMap = new Map();
            genes.forEach((gene) => {
                const geneName = gene.name;
                if (!geneMap.has(geneName)) {
                    geneMap.set(geneName, { count: 1 });
                } else {
                    geneMap.get(geneName).count++;
                }
            });
            return geneMap;
        };

        const sireGeneMap = countGenes(sireGenes);
        const damGeneMap = countGenes(damGenes);

        const getOffspringGeneCount = (geneName) => {
            const sireCount = sireGeneMap.has(geneName) ? sireGeneMap.get(geneName).count : 0;
            const damCount = damGeneMap.has(geneName) ? damGeneMap.get(geneName).count : 0;

            if (sireCount === 0 && damCount === 0) return 0;
            if (sireCount === 2 && damCount === 2) return 2;
            if (sireCount === 2 && damCount === 0) return 1;
            if (sireCount === 0 && damCount === 2) return 1;

            const totalGeneCount = sireCount + damCount;

            if (totalGeneCount === 3) {
                return Math.random() < 0.5 ? 1 : 2;
            }

            if (totalGeneCount === 2) {
                const randomValue = Math.random();
                if (randomValue < 0.25) return 0;
                if (randomValue < 0.75) return 1;
                return 2;
            }

            return Math.random() < 0.5 ? 0 : 1;
        };

        genes.forEach((gene) => {
            const geneName = gene.name;
            const offspringGeneCount = getOffspringGeneCount(geneName);
            for (let i = 0; i < offspringGeneCount; i++) {
                offspringGenes.push({ ...gene });
            }
        });



        const displayOffspringGenes = prepareGenesForDisplay(offspringGenes)

        setOffspringGenes(displayOffspringGenes);
    };
    const calculateOffspringTraits = () => {
        const offspringTraitMap = new Map();

        const combineTraits = (traitName, sirePercentage, damPercentage) => {
            if (!offspringTraitMap.has(traitName)) {
                offspringTraitMap.set(traitName, 0);
            }

            const inheritedPercentage = (sirePercentage + damPercentage) / 2;
            offspringTraitMap.set(traitName, inheritedPercentage);
        };

        sireTraits.forEach((sireTrait) => {
            const { name: traitName, percentage: sirePercentage } = sireTrait;
            const damTrait = damTraits.find((trait) => trait.name === traitName);

            if (damTrait) {
                const damPercentage = damTrait.percentage;
                combineTraits(traitName, sirePercentage, damPercentage);
            } else {
                combineTraits(traitName, sirePercentage, 0);
            }
        });

        damTraits.forEach((damTrait) => {
            const { name: traitName, percentage: damPercentage } = damTrait;
            const sireTrait = sireTraits.find((trait) => trait.name === traitName);

            if (!sireTrait) {
                combineTraits(traitName, 0, damPercentage);
            }
        });

        const offspringTraits = Array.from(offspringTraitMap, ([name, percentage]) => ({
            name,
            percentage,
        }));

        setOffspringTraits(offspringTraits);
    };
    const calculateOffspring = () => {
        calculateOffspringGenes();
        calculateOffspringTraits();
    }
    if (userProfile) {
        return (
            <>
                <Row className="justify-content-evenly">
                    <Card style={{ width: '40rem' }} className="mb-5 ml-5 mt-5 mt-5 bg-success text-white">
                        <CardBody>
                            <CardTitle>Sire</CardTitle>
                            <Label for="sireGeneSelect">Select Gene:</Label>
                            <Input
                                type="select"
                                name="sireGeneSelect"
                                id="sireGeneSelect"
                                onChange={(e) => handleGeneSelect(e, "sire")}
                            >
                                <option value="">Select a gene</option>
                                {genes.map((gene) => (
                                    <option key={gene.id} value={gene.id}>
                                        {gene.name}
                                    </option>
                                ))}
                            </Input>
                            {selectedSireGene ? (
                                <Button className="mb-2 mt-2 bg-dark text-white"
                                    onClick={() => setSireGenes((prevSireGenes) => [...prevSireGenes, selectedSireGene])}>Add Gene
                                </Button>) : ("")}

                            <div className="mb-5">Selected Genes: {displaySireGenes.map((gene) => (
                                <div key={gene?.id}>{gene?.name}</div>
                            ))}</div>
                            <Label for="sireTraitSelect">Select Trait:</Label>
                            <Input
                                type="select"
                                name="sireTraitSelect"
                                id="sireTraitSelect"
                                onChange={(e) => handleTraitSelect(e, "sire")}
                            >
                                <option value="">Select a trait</option>
                                {traits.map((trait) => (
                                    <option key={trait.id} value={trait.id}>
                                        {trait.name}
                                    </option>
                                ))}
                            </Input>
                            <Label for="sirePercentage">Percentage:</Label>
                            <Input
                                type="number"
                                name="sirePercentage"
                                id="sirePercentage"
                                value={selectedSirePercentage}
                                min="1"
                                max="100"
                                onChange={(e) => setSelectedSirePercentage(parseInt(e.target.value))}
                            />
                            {selectedSireTrait ? (
                                <Button className="mb-2 mt-2 bg-dark text-white"
                                    onClick={() => setSireTraits((prevSireTraits) => [...prevSireTraits, { ...selectedSireTrait, percentage: selectedSirePercentage }])}>Add Trait
                                </Button>) : ("")}

                            <div className="mb-5">Selected Traits: {sireTraits.map((trait) => (
                                <div key={trait?.id}>{trait?.name} {trait?.percentage}%</div>
                            ))}</div>
                        </CardBody>
                    </Card>

                    <Card style={{ width: '40rem' }} className="mb-5 ml-5 mt-5 mt-5 bg-success text-white">
                        <CardBody>
                            <CardTitle>Dam</CardTitle>
                            <Label for="damGeneSelect">Select Gene:</Label>
                            <Input
                                type="select"
                                name="damGeneSelect"
                                id="damGeneSelect"
                                onChange={(e) => handleGeneSelect(e, "dam")}
                            >
                                <option value="">Select a gene</option>
                                {genes.map((gene) => (
                                    <option key={gene.id} value={gene.id}>
                                        {gene.name}
                                    </option>
                                ))}
                            </Input>
                            {selectedDamGene ? (
                                <Button className="mb-2 mt-2 bg-dark text-white"
                                    onClick={() => setDamGenes((prevDamGenes) => [...prevDamGenes, selectedDamGene])}>Add Gene
                                </Button>) : ("")}
                            <div className="mb-5" >Selected Genes: {displayDamGenes.map((gene) => (
                                <div key={gene?.id}>{gene?.name}</div>
                            ))}</div>
                            <Label for="damTraitSelect">Select Trait:</Label>
                            <Input
                                type="select"
                                name="damTraitSelect"
                                id="damTraitSelect"
                                onChange={(e) => handleTraitSelect(e, "dam")}
                            >
                                <option value="">Select a trait</option>
                                {traits.map((trait) => (
                                    <option key={trait.id} value={trait.id}>
                                        {trait.name}
                                    </option>
                                ))}
                            </Input>
                            <Label for="damPercentage">Percentage:</Label>
                            <Input
                                type="number"
                                name="damPercentage"
                                id="damPercentage"
                                value={selectedDamPercentage}
                                min="1"
                                max="100"
                                onChange={(e) => setSelectedDamPercentage(parseInt(e.target.value))}
                            />
                            {selectedDamTrait ? (
                                <Button className="mb-2 mt-2 bg-dark text-white"
                                    onClick={() => setDamTraits((prevDamTraits) => [...prevDamTraits, { ...selectedDamTrait, percentage: selectedDamPercentage }])}>Add Trait
                                </Button>) : ("")}

                            <div className="mb-5">Selected Traits: {damTraits.map((trait) => (
                                <div key={trait?.id}>{trait?.name} {trait?.percentage}%</div>
                            ))}</div>
                        </CardBody>
                    </Card>
                </Row>
                <Row className="justify-content-evenly">
                    <Card style={{ width: '40rem' }} className="mb-5 ml-5 bg-success text-white">
                        <CardBody>
                            <CardTitle>Offspring</CardTitle>
                            <h6>Genes:</h6>
                            {offspringGenes.length > 0 ? (
                                <div>
                                    {offspringGenes.map((gene) => (
                                        <p key={`gene-${gene.name}`}>{gene.name}</p>
                                    ))}
                                </div>
                            ) : (
                                <p>None</p>
                            )}
                            <h6>Traits:</h6>
                            {offspringTraits.length > 0 ? (
                                <div>
                                    {offspringTraits.map((trait) => (
                                        <p key={`trait-${trait.name}`}>{trait.name} {trait.percentage}%</p>
                                    ))}
                                </div>
                            ) : (
                                <p>None</p>
                            )}
                            <Button className="mb-2 mt-2 bg-dark text-white" onClick={calculateOffspring}>Simulate offspring</Button>
                        </CardBody>
                    </Card>
                </Row>
            </>
        );
    };
}