import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';


const CompatibilityQuizComponent = ({ user_id }) => {

    const[formData, setFormData] = useState ({
        adoptingFor: '',
        children: '',
        petOwnerHistory: '',
        currentPets: '',
        preferedAnimal: '',
        preferredBreed: '',
        preferredAge: '',
        preferredSize: '',
        preferredSex: '',
        preferredPersonality: ''
    });
    

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            // fetch the information of the user
            const userInfo = await fetch(`accounts/${user_id}/profile/`);
            
            if (userInfo) {
                setFormData({
                    preferredAnimal: userInfo.pref_animal,
                    preferredBreed: userInfo.pref_breed,
                    preferredAge: userInfo.pref_age,
                    preferredSize: userInfo.pref_size,
                    preferredSex: userInfo.pref_sex,
                    preferredPersonality: userInfo.pref_personality
                });
            }
          } catch (error) {
            console.error('Error fetching user information:', error);
          }
        };
        
        // Call the function to fetch user information
        fetchUserInfo();
      }, [user_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can submit the form data to your Django backend
        if (props.onSubmit) {
            props.onSubmit(formData);
        }
    };

    return (
        <div>
        {/* Questions */}

        {/* I am looking to adopt for ____ */}
        <Form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">I am looking to adopt for</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.adoptingFor}
                onChange={(e) => setFormData({ ...formData, adoptingFor: e.target.value })} required
                >
                <option selected="">(required)</option>
                <option value="myself">myself</option>
                <option value="my family">my family</option>
            </select>
        </div>
        </Form>
        

        {/* I have ___ at home */}
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">I have</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })} required
                >
                <option selected="">(required)</option>
                <option value="kids">kids</option>
                <option value="no kids">no kids</option>
            </select>
        </div>
        <div className="col-12">
            <p className="mb-0">at home</p>
        </div>
        </form>


        {/* I am a ___ pet owner */}
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">I am a</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.petOwnerHistory}
                onChange={(e) => setFormData({ ...formData, petOwnerHistory: e.target.value })} required
                >
                <option selected="">(required)</option>
                <option value="previous">previous</option>
                <option value="first-time">first-time</option>
            </select>
        </div>
        <div className="col-12">
            <p className="mb-0">pet owner</p>
        </div>
        </form>

        {/* I currently have ___  */}
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">I currently have</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.currentPets}
                onChange={(e) => setFormData({ ...formData, currentPets: e.target.value })} required
                >
                <option selected="">(required)</option>
                <option value="none">no pet(s)</option>
                <option value="cat">cat(s)</option>
                <option value="dog">dog(s)</option>
                <option value="both">dog(s) and cat(s)</option>
                <option value="other">other pet(s)</option>
            </select>
        </div>
        </form>


        {/* My ideal pet is (Preferred Age) */}
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">My ideal pet is a(n)</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.preferredAge}
                onChange={(e) => setFormData({ ...formData, preferredAge: e.target.value })} required
                >
                <option selected="">(no age preference)</option>
                <option value="newborn">newborn</option>
                <option value="young">young</option>
                <option value="adult">adult</option>
                <option value="senior">senior</option>
            </select>
        </div>


        {/* I would like to adopt a (Preferred Animal) */}
        </form>
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">I would like to adopt a</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.preferedAnimal}
                onChange={(e) => setFormData({ ...formData, preferedAnimal: e.target.value })} required
                >
                <option selected="">(no gender preference)</option>
                <option value="female">female</option>
                <option value="male">male</option>
            </select>
        </div>
        </form>

        {/* I prefer a pet that is (Preferred Size) */}
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">I prefer a pet that is</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.preferredSize}
                onChange={(e) => setFormData({ ...formData, preferredSize: e.target.value })} required
                >
                <option selected="">(no size preference)</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
                <option value="extra large">extra large</option>
            </select>
        </div>
        </form>


        {/* I prefer a pet that is (Preferred Personality) */}
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">My pet's behaviour should be</p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.preferredPersonality}
                onChange={(e) => setFormData({ ...formData, preferredPersonality: e.target.value })} required
                >
                <option selected="">(no behaviour preference)</option>
                <option value="very active">very active</option>
                <option value="active">active</option>
                <option value="laid-back">laid-back</option>
                <option value="lap-pet">lap-pet</option>
            </select>
        </div>
        </form>

        {/* I prefer my pet to be (Preferred Sex) */}
        <form className="row row-cols-xs-auto gx-3 gy-1 w-100 pt-4 align-items-center">
        <div className="col-12">
            <p className="mb-0">I prefer my pet to be </p>
        </div>
        <div className="col-12">
            <select
                className="form-select form-select-sm font-plain w-auto border border-0"
                aria-label="Default select example"
                value={formData.preferredSex}
                onChange={(e) => setFormData({ ...formData, preferredSex: e.target.value })} required
                >
                <option selected="">(no behaviour preference)</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
        </div>
        </form>

        

    </div>
    );
};

export default CompatibilityQuizComponent;