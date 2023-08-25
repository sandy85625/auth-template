import NFTForm from "../../../components/forms/program/CollectionsFormLanding"
import React from "react"
import withAuth from "../../../hocs/withAuth"

const CreateNewCollection: React.FC = () => {
    return (
        <div className="bg-gray-200">
            <NFTForm />
        </div>
    )
}

export default withAuth(CreateNewCollection);
