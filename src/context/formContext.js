import { createContext, useContext, useState } from 'react';

export const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
}
export const FormContextProvider = ({ children }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dob, setDob] = useState('');
    const [tob, setTob] = useState('');
    const [pob, setPob] = useState('');
    const [date, setDate] = useState(''); //this is the session date
    const [slot, setSlot] = useState('');
    const [gender, setGender] = useState('');

    return <FormContext.Provider value={{
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        contactNumber, setContactNumber,
        dob, setDob, tob, setTob, pob, setPob, // date, time and place of birth
        date, setDate,
        slot, setSlot,
        gender, setGender

    }}>
        {children}
    </FormContext.Provider>
}
