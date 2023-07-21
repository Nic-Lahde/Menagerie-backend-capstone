import { useState } from "react"
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom"

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
        fetch("/api/pet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPet)
        }).then(() => {
            navigate("/");
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            <fieldset>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={newPet.name}
                        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="speciesCommon">Species Common Name</Label>
                    <Input
                        id="speciesCommon"
                        type="text"
                        value={newPet.speciesCommon}
                        onChange={(e) => setNewPet({ ...newPet, speciesCommon: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="speciesLatin">Species Latin Name</Label>
                    <Input
                        id="speciesLatin"
                        type="text"
                        value={newPet.speciesLatin}
                        onChange={(e) => setNewPet({ ...newPet, speciesLatin: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dob">Date of Birth (estimating is OK)</Label>
                    <Input
                        id="dob"
                        type="text"
                        value={newPet.dob}
                        onChange={(e) => setNewPet({ ...newPet, dob: e.target.value })}
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
                                checked={newPet.sexId === 1}
                                onChange={(e) => setNewPet({ ...newPet, sexId: parseInt(e.target.value) })}
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
                                checked={newPet.sexId === 2}
                                onChange={(e) => setNewPet({ ...newPet, sexId: parseInt(e.target.value) })}
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
                                checked={newPet.sexId === 3}
                                onChange={(e) => setNewPet({ ...newPet, sexId: parseInt(e.target.value) })}
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
                        value={newPet.imageUrl}
                        onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="foodInterval">How many days between feedings?</Label>
                    <Input
                        id="foodInterval"
                        type="number"
                        value={newPet.foodInterval}
                        onChange={(e) => setNewPet({ ...newPet, foodInterval: parseInt(e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input
                        id="notes"
                        type="text"
                        value={newPet.notes}
                        onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Button>Save</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}