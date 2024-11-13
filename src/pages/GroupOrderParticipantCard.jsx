import React from "react";
import styles from './GroupOrderParticipantCard.module.css';

export const GroupOrderParticipantCard = ({ name, count,totalPrice , participantOrderId, handleRemove}) => {
    return (
        <div key={participantOrderId} className={styles.menuItemCard}>
            <p className={styles.menuItemCardName}>Name: {name}</p>
            <p className={styles.menuItemCardDescription}>Menu item count: {count}</p>
            <p className={styles.menuItemCardDescription}>Total Price: {totalPrice}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={()=>handleRemove(participantOrderId)} type="button" className="btn btn-light btn-rounded" data-mdb-ripple-init>
                    remove
                </button>
                <button type="button" className="btn btn-warning btn-rounded" data-mdb-ripple-init>
                    view
                </button>
            </div>
        </div>
    );
};
