import { Card, CardBody, CardTitle, Col } from "reactstrap";
export const PetDetails = ({ pet, setSelectedPet }) => {
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
                    <p>{pet.dOB}</p>
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
            <button onClick={() => setSelectedPet(null)} >View All</button>
        </Col>
    )
}