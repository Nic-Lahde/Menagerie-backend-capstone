import { useEffect, useRef } from "react"
import { Button } from "reactstrap"

export const UploadWidget = ({ newPet, setNewPet }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'drzqaj7uz',
            uploadPreset: 'ek4e5js9'
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                setNewPet({ ...newPet, imageUrl: result.info.url })
            }
        })
    }, [])
    return (
        <Button color="dark" className="mb-2" onClick={() => widgetRef.current.open()}>Upload Image</Button>
    )
}