import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom/';

function UpdateSeekerProfile(props) {
    const id = props.data.id
    const [error, setError] = useState("")
    const [sex, setSex] = useState('');
    const [personality, setPersonality] = useState('');
    const accessToken = localStorage.getItem('access_token');
    const [age, setAge] = useState('');
    const [size, setSize] = useState('');
    const [isValError, setisValError] = useState(false)
    const navigate = useNavigate()
    const [isPass, setIsPass]= useState(false)

    function pass(event){
        if(event.target.value){
            setIsPass(true)
        }
        else{
            setIsPass(false)
        }
    }
    
    function handleSave(event){
        event.preventDefault();

        if (!accessToken) {
            navigate(`/accounts`);
            return;
          }
        const formData = new FormData(event.target);
        formData.set('pref_sex', sex);
        formData.set('pref_size', size);
        formData.set('pref_personality', personality);
        formData.set('pref_age', age);
        const keysToDelete = [];

        for (const [key, value] of formData.entries()) {
            if (!value) {
                keysToDelete.push(key);
            }
        }

        for (const keyToDelete of keysToDelete) {
            formData.delete(keyToDelete);
        }    
    
        fetch(`http://127.0.0.1:8000/accounts/${id}/profile/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`},
                body: formData
            })
            

            .then(response => {
                if (response.status == 400) {
                    console.log("response is 400")
                    setisValError(true)
                }
                else{
                    setisValError(false)
                }
                return response.json();
            })
            // add in proper error displays
            .catch(error => {
                console.error(error);
                setError(error.toString());
            });
        }
    
    

    return (
        <>
            <div data-bs-theme="petpal">
                <div className="main">
                    <div className="mh-100 d-flex flex-row mx-0 justify-content-center">
                    <div className="d-flex w-75 flex-column pt-5 align-items-center justify-center bg-primary-brown">
                        <form onSubmit={handleSave}>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="first_name">First Name</label>
                            <div className="col-sm-10">
                            <input type="text" name="first_name" className="form-control bg-primary-cream font-plain" id="first_name" placeholder="John"/>
                            </div>
                        </div> 
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="last_name">Last Name</label>
                            <div className="col-sm-10">
                            <input type="text" name="last_name" className="form-control bg-primary-cream font-plain" id="last_name" placeholder="Doe" />
                            </div>
                        </div> 
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="username">Username</label>
                            <div className="col-sm-10">
                            <input type="text" name="username" className="form-control bg-primary-cream font-plain" id="username" placeholder="username123" />
                            </div>
                        </div> 
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="password">Password</label>
                            <div className="col-sm-10">
                            <input onChange={pass} type="password" name="password" className="form-control bg-primary-cream font-plain" id="password" />
                            </div>
                        </div>
                        {isPass && (
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="confirmpassword">
                            Verify Password
                            </label>
                            <div className="col-sm-10">
                            <input
                                type="password"
                                name="confirmpassword"
                                className="form-control bg-primary-cream font-plain"
                                id="confirmpassword"
                                required
                            />
                            </div>
                        </div>
                        )}
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="email">Email</label>
                            <div className="col-sm-10">
                            <input type="email" name="email" className="form-control bg-primary-cream font-plain" id="email" />
                            </div>
                        </div>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="phonenumber">Phone Number</label>
                            <div className="col-sm-10">
                            <input type="text" name="phonenumber" className="form-control bg-primary-cream font-plain" id="phonenumber" />
                            </div>
                        </div>
                        <h4 className="text-primary-cream pt-5 pb-0">Pet Preferences</h4>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="location">Preferred Location</label>
                            <div className="col-sm-10">
                            <input type="text" name="pref_location" className="form-control bg-primary-cream font-plain" id="location"/>
                            </div>
                        </div>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="animal">Preferred Animal</label>
                            <div className="col-sm-10">
                            <input type="text" name="pref_animal" className="form-control bg-primary-cream font-plain" id="animal"  />
                            </div>
                        </div>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="breed">Preferred Breed</label>
                            <div className="col-sm-10">
                            <input type="text" name="pref_breed" className="form-control bg-primary-cream font-plain" id="breed" />
                            </div>
                        </div>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="colour">Preferred Colour</label>
                            <div className="col-sm-10">
                            <input type="text" name="pref_colour" className="form-control bg-primary-cream font-plain" id="colour"  />
                            </div>
                        </div>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="age">Preferred Age</label>
                            <Form.Select className="form-select form-select-sm font-plain w-auto border fs-5 mx-3"
                                aria-label="age"
                                id="age"
                                onChange={(e) => setAge(e.target.value)}>
                                <option value=""></option>
                                <option value="newborn">newborn</option>
                                <option value="young">young</option>
                                <option value="adult">adult</option>
                                <option value="senior">senior</option>
                            </Form.Select>
                        </div>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="size">Preferred Size</label>
                            <Form.Select className="form-select form-select-sm font-plain w-auto border fs-5 mx-3"
                                aria-label="size"
                                id="size"
                                onChange={(e) => setSize(e.target.value)}>
                                <option value=""></option>
                                <option value="S">small</option>
                                <option value="M">medium</option>
                                <option value="L">large</option>
                                <option value="XL">extra large</option>
                            </Form.Select>
                        </div>
                        <label className="row-form-label text-primary-cream h5" htmlFor="sex">Preferred Sex</label>
                        <Form.Select className="form-select form-select-sm font-plain w-auto border fs-5 mx-1"
                                aria-label="sex"
                                id="sex"
                                onChange={(e) => setSex(e.target.value)}>
                                <option value=""></option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </Form.Select>
                        <div className="form-group row text-primary-cream">
                            <label className="row-form-label h5" htmlFor="personality">Preferred Personality</label>
                            <Form.Select className="form-select form-select-sm font-plain w-auto border fs-5 mx-3"
                                aria-label="personality"
                                id="personality"
                                onChange={(e) => setPersonality(e.target.value)}>
                                <option value=""></option>
                                <option value="very active">very active</option>
                                <option value="active">active</option>
                                <option value="laid-back">laid-back</option>
                                <option value="lap">lap-pet</option>
                            </Form.Select>
                        </div>
                        <p className="smallpar">{error}</p>
                        {isValError &&
                        <p className="smallpar">One or more fields are invalid. Please review your input</p>
                        }
                        <button type="submit" className="btn btn-lg btn-primary-orange m-3 shadow-sm" required>Save</button>
                        <button className="btn btn-lg btn-primary-cream m-3 shadow-sm" onClick={props.displayUpdate}>Back</button>
                        </form>
                    </div>
                </div>   
                </div>
            </div>
        </>
    );
}

export default UpdateSeekerProfile;

