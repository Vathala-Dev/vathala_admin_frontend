import React, { useEffect, useState } from 'react'
import api from 'src/utils/api'




const Index = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        // Your effect logic here
        api.get("/getEnquiryList").then(async response => {
            console.log("getEnquiryList", response.data);
            const data = await response.data;
            setData(data);
            // Handle the response data as needed

        }).catch(error => {
            console.error(error);
        });
    }, [])

    return (
        <>

            <div className="bdc-container-content text-center text-md-start">
                {/* Header */}

                <h1 className="fw-bold mb-3">Enquiry Management</h1>
            </div>

            <div className="bdc-card shadow-sm p-3">
                <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Date & Time</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Location</th>
                                <th>Enquiry Type</th>
                                <th>Message</th>

                                <th>Source</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((item, index) => {
                                    // ✅ Format createdAt
                                    let formattedDate = "—";
                                    if (item.createdAt) {
                                        const parsedDate = new Date(item.createdAt);
                                        if (!isNaN(parsedDate)) {
                                            formattedDate = parsedDate
                                                .toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })
                                                .replace(",", " "); // Replace comma with space
                                        }
                                    }

                                    return (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{formattedDate}</td>
                                            <td>{item.name || "—"}</td>
                                            <td>{item.email || "—"}</td>
                                            <td>{item.mobile || "—"}</td>
                                            <td>{item.location || "—"}</td>
                                            <td>{item.enquiryType || "—"}</td>
                                            <td>{item.message || "—"}</td>
                                            <td>{item.source || "—"}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-muted py-4">
                                        No enquiries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

}

export default Index