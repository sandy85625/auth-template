import NFTForm from "../../../components/forms/program/ProgramFormLanding"
import React from "react"
import withAuth from "../../../hocs/withAuth"

const CreateNewCollection: React.FC = () => {
    return (
        <div className="bg-blue-200">
            <NFTForm />
        </div>
    )
}

export default withAuth(CreateNewCollection);
