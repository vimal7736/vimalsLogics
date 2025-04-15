import { useState } from "react"




const useForm = (initialValues, onSubmit) => {
    const [values, setValue] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values)
    };

    const resetValue = () => {
        setValue(initialValues)
    }



    return {
        values,
        handleChange,
        handleSubmit,
        resetValue

    }
}

export default useForm