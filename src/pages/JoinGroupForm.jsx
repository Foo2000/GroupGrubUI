import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './JoinGroupForm.module.css';

const JoinGroupForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mode = location.state.mode;

    const groupInfo =  location.state.groupData;
    const groupID = groupInfo.groupID;
    console.log(groupInfo.participantIDs);

    const [participantUUID, setParticipantUUID] = useState("");
    const [updatedGroupData, setUpdatedGroupData] = useState(groupInfo);
    const handleCancel=()=>{
        navigate(-1);
    }
    const handleInputChange = (e)=>{
        setParticipantUUID(e.target.value);
    }





    const handleSubmit = async (e) => {
        e.preventDefault();

        const newParticipantIDs =[...updatedGroupData.participantIDs, participantUUID];
        const newGroupInfo = {...updatedGroupData, participantIDs: newParticipantIDs};

        setUpdatedGroupData(newGroupInfo);

        try {

            //try to put
            const response = await fetch(`http://localhost:8081/groups/${groupID}`, {
                method: 'put',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroupInfo),
            });
            if (response.status === 200) {
                console.log("successfully added participant UUID to group!");
            }else{
                console.log("error occured");
            }

            // Redirect back to the group page or a success page
            navigate(`/group/${groupID}`,  { state: { newJoin: true } });
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>

                <h2>{mode === "join" ? "Join Group" : "Edit Group"}</h2>
                {mode === "join" ? (
                    <div className={styles.formField}>
                        <label>
                            Participant UUID:
                        </label>
                        <input
                            type="text"
                            value={participantUUID}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                ): (
                    <div className={styles.formField}>
                        <label>
                            Participant UUID:
                        </label>
                        <input
                            type="text"
                            value={participantUUID}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}

                <div className={`d-grid gap-5 d-md-flex justify-content-md-center ${styles.buttonContainer}`}>

                    <button type="submit" className="btn btn-light btn-rounded" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn btn-warning btn-rounded">Join</button>
                </div>
            </form>
        </div>
    );
};

export default JoinGroupForm;
