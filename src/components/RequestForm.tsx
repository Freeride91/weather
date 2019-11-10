import React, { useState } from 'react'
import { Collapse } from 'reactstrap';
import { defaultCity } from '../App';

type FormE = React.FormEvent<HTMLFormElement>;
interface IProps {
    fetchData: (reqCity: string) => void;
}

const RequestForm: React.FC<IProps> = ({ fetchData }) => {
    const [city, setCity] = useState<string>(defaultCity);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = (): void => setIsOpen(!isOpen);

    const handleSubmit = (e: FormE): void => {
        e.preventDefault();
        fetchData(city);
    }

    return (
        <>
            <Collapse isOpen={isOpen}>
                <div className="formContainer">
                    <form className="requestForm px-3 py-2" onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="city" className=""><i className="fas fa-map-marker-alt"></i>&nbsp; Település</label>
                            <input
                                className="form-control"
                                type="text"
                                name="city"
                                value={city}
                                onChange={e => setCity(e.target.value)} />
                        </div>
                        <button type="submit" className="">
                            Lekér
                        </button>
                    </form>
                </div>
            </Collapse>
            <div className="toggleContainer">
                <button className="toggleButton" onClick={toggle}>
                    {!isOpen ?
                        <>Települést választ &nbsp; <i className="fas fa-chevron-down orange"></i></>
                        :
                        <> <i className="fas fa-chevron-up orange"></i></>}
                </button>
            </div>
        </>
    );
}

export default RequestForm;