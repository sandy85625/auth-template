import NFTForm from "../../components/forms/program/CollectionsFormLanding"
import React from "react"
import Navbar from "../../components/navbars/DashboardNavbar";

const CreateNewCollection: React.FC = () => {
    return (
        <div className="bg-gray-200">
            <Navbar />
            <NFTForm />
        </ div>
    )
}

export default CreateNewCollection;
