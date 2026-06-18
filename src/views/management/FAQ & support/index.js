import { CCard, CCardBody } from "@coreui/react";
import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import SimpleInput from "src/components/common/simpleInput";
import api from "src/utils/api";
import { toast } from "react-toastify";

const Index = () => {
    const services = [
        "Home Page",
        "Home Doctor",
        "Veterinary",
        "Yoga",
        "Nursingcare",
        "Woundcare",
        "Eldercare",
        "Physiothraphy",
        "Blood Test",
    ];

    const [faqList, setFaqList] = useState([]);

    const getHomeFaq = async () => {
        try {
            const response = await api.get("/getHomeFaq");

            const data = response?.data || [];
            console.log("Fetched FAQ Data:", data);
            console.log("Fetched response:", response?.data);
            const groupedFaqs = services.map((service) => {
                const serviceFaqs = data.filter(
                    (item) => item.service === service
                );

                return {
                    service,
                    faqs:
                        serviceFaqs.length > 0
                            ? serviceFaqs
                            : [
                                {
                                    question: "",
                                    answer: "",
                                },
                            ],
                };
            });

            setFaqList(groupedFaqs);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHomeFaq();
    }, []);

    const addFaq = (serviceIndex) => {
        const updated = [...faqList];

        updated[serviceIndex].faqs.push({
            question: "",
            answer: "",
        });

        setFaqList(updated);
    };

    const delHomefaq = (serviceIndex, faqIndex, faqId) => {

        if (faqId && faqId !== "null") {


            api.post("/delHomeFaq", {
                faqId
            });
        }
        const updated = [...faqList];

        updated[serviceIndex].faqs = updated[
            serviceIndex
        ].faqs.filter((_, index) => index !== faqIndex);

        // if (updated[serviceIndex].faqs.length === 0 ) {
        //     updated[serviceIndex].faqs.push({
        //         question: "",
        //         answer: "",
        //     });
        // }

        setFaqList(updated);

    };

    const handleQuestionChange = (
        serviceIndex,
        faqIndex,
        value
    ) => {
        const updated = [...faqList];

        updated[serviceIndex].faqs[faqIndex].question =
            value;

        setFaqList(updated);
    };

    const handleAnswerChange = (
        serviceIndex,
        faqIndex,
        value
    ) => {
        const updated = [...faqList];

        updated[serviceIndex].faqs[faqIndex].answer =
            value;

        setFaqList(updated);
    };

    const submitServiceFaq = async (
        serviceItem
    ) => {
        try {
            const validFaqs = serviceItem.faqs.filter(
                (faq) =>
                    faq.question?.trim() &&
                    faq.answer?.trim()
            );

            if (validFaqs.length === 0) {
                toast.error(
                    `Please enter at least one FAQ for ${serviceItem.service}`
                );
                return;
            }

            const payload = {
                service: serviceItem.service,
                faqs: validFaqs,
            };

            const response = await api.post(
                "/createHomeFaq",
                payload
            );

            toast.success(
                response?.data?.message ||
                "FAQs saved successfully"
            );

            getHomeFaq();
        } catch (error) {
            console.log(error);
            toast.error(
                "Error while saving FAQs"
            );
        }
    };

    return (
        <>
            <div className="bdc-container-content">
                <h1 className="bdc-item">
                    FAQ Management
                </h1>
            </div>

            <CCard>
                <CCardBody>
                    {faqList.map(
                        (
                            serviceItem,
                            serviceIndex
                        ) => (
                            <div
                                key={
                                    serviceItem.service
                                }
                                style={{
                                    border:
                                        "1px solid #ddd",
                                    borderRadius: 10,
                                    padding: 15,
                                    marginBottom: 20,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        fontWeight:
                                            "bold",
                                    }}
                                >
                                    {
                                        serviceItem.service
                                    }{" "}
                                    FAQ Section
                                </Typography>

                                {serviceItem.faqs.map(
                                    (
                                        faq,
                                        faqIndex
                                    ) => (
                                        <div
                                            key={
                                                faq._id ||
                                                faqIndex
                                            }
                                            style={{
                                                border:
                                                    "1px solid #eee",
                                                borderRadius: 8,
                                                padding: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <SimpleInput
                                                title={`Question ${faqIndex + 1}`}
                                                value={faq.question || ""}
                                                textArea={true}
                                                onChange={(e) =>
                                                    handleQuestionChange(
                                                        serviceIndex,
                                                        faqIndex,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <SimpleInput
                                                title={`Answer ${faqIndex + 1}`}
                                                textArea={true}
                                                value={faq.answer || ""}
                                                onChange={(e) =>
                                                    handleAnswerChange(
                                                        serviceIndex,
                                                        faqIndex,
                                                        e.target.value
                                                    )
                                                }
                                            />


                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{
                                                    mt: 1,
                                                }}
                                                onClick={() =>
                                                    delHomefaq(
                                                        serviceIndex,
                                                        faqIndex,
                                                        faq?._id || "null",

                                                    )
                                                }
                                            >
                                                Remove FAQ
                                            </Button>
                                        </div>
                                    )
                                )}

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        gap: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            addFaq(
                                                serviceIndex
                                            )
                                        }
                                    >
                                        Add FAQ
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() =>
                                            submitServiceFaq(
                                                serviceItem
                                            )
                                        }
                                    >
                                        Save{" "}
                                        {
                                            serviceItem.service
                                        }
                                    </Button>
                                </div>
                            </div>
                        )
                    )}
                </CCardBody>
            </CCard>
        </>
    );
};

export default Index;