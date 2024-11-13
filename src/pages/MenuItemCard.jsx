import styles from './MenuItemCard.module.css';

export const MenuItemCard = ({ name, img, description, cost }) => {
    return (
        <div className={styles.menuItemCard}>
            <img src='/burger.png' alt={name} className={styles.menuItemCardImg} />
            <h2 className={styles.menuItemCardName}>{name}</h2>
            <div className={styles.menuItemCardDescription}>
                {description}
            </div>
            <div className={styles.menuItemCardCost}>
                {cost}
            </div>
        </div>
    );
};
