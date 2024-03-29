import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ApplicationFilterSidebar from '../../components/applications/list/application-filter-sidebar';
import ApplicationSortHeader from '../../components/applications/list/application-sort-header';
import ApplicationPetCard from '../../components/applications/list/application-pet-cards';
import PaginationButtons from '../../components/pagination-buttons';
import Error403Component from '../../components/403';


const ListApplications = () => {
    const [applications, setApplications] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const FORBIDDEN_STATUS_CODE = 403;
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access_token');
    const [denied, setDenied] = useState(false);

    const handleInputChange = (e) => {
        setSearchParams({
            ...query,
            [e.target.id]: e.target.value,
        });
    };

    const handleFilterChange = (e, field) => {
        setSearchParams({
            ...query,
            [field]: e,
        });
    }

    const handleSort = (e) => {
        setSearchParams({
            ...query,
            ['sort_by']: e.target.id, // changed this in application-sort-header (id=name to id=pet_listing_name)
        });
        fetchApplications();
    };

    // useMemo to store search parameters
    const query = useMemo(
        () => ({
            page: parseInt(searchParams.get("page") ?? 1),

            pet_listing_name: searchParams.get("pet_listing_name") ?? "",
            pet_listing_location: searchParams.get("pet_listing_location") ?? "",
            pet_listing_animal: searchParams.get("pet_listing_animal") ?? "",
            pet_listing_breed: searchParams.get("pet_listing_breed") ?? "",

            // application_status: searchParams.get("application_status") ?? "available", // was causing errors but idk if intended
            application_status: searchParams.get("application_status") ?? "pending",
            sort_by: searchParams.get("sort_by") ?? "",
        }),
        [searchParams],
    );

    useEffect(() => {
        fetchApplications();
    }, [query]);

    const fetchApplications = async () => {
        try {
            // Set queryParams to pass into request
            const queryParams = new URLSearchParams({
                page: query.page,

                pet_listing_name: query.pet_listing_name,
                pet_listing_location: query.pet_listing_location,
                pet_listing_animal: query.pet_listing_animal,
                pet_listing_breed: query.pet_listing_breed,

                application_status: query.application_status,
                sort_by: query.sort_by,
            });

            const response = await fetch(`http://localhost:8000/applications/?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const data = await response.json();

            if (response.status === FORBIDDEN_STATUS_CODE) {
                setDenied(true);
            }

            // setApplications(data.results); // map crashing cause of this, data.results isnt a thing
            setApplications(data.results); // nvm was supposed to be this not data.application_status

            setTotalPages(
                Math.ceil(Number(data.count) / 15)
            );

        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    if (denied) {
        return (
            <div data-bs-theme="petpal">
                <Error403Component></Error403Component>
            </div>
        )
    }

    return (
        <>
            <div data-bs-theme="petpal">

                <div className="main h-100">

                    <ApplicationSortHeader query={query} handleSort={handleSort} />

                    <div className="d-flex row-to-column w-100">

                        <ApplicationFilterSidebar query={query} handleInputChange={handleInputChange} handleFilterChange={handleFilterChange}></ApplicationFilterSidebar>
                        
                        <div className="d-flex flex-column w-100">
                            
                            <div className="listing-grid">

                                {applications.map((application) => (
                                    <>
                                        <ApplicationPetCard key={application.id} application={application}></ApplicationPetCard>
                                    </>
                                ))}
                            </div>

                            <div className="d-flex w-100 justify-content-center">
                                <PaginationButtons query={query} totalPages={totalPages} setSearchParams={setSearchParams} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListApplications;