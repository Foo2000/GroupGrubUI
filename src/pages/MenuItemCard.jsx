import styles from './MenuItemCard.module.css';

export const MenuItemCard = ({ name, img, description, cost, quantity, handleQuantityChange, menuItemID }) => {
    return (
        <div className={styles.menuItemCard}>
            <img src={img} alt={name} className={styles.menuItemCardImg} />
            <h2 className={styles.menuItemCardName}>{name}</h2>
            <div className={styles.menuItemCardDescription}>
                {description}
            </div>
            <div className={styles.menuItemCardCost}>
                ${cost}
            </div>
            <label className={styles.menuItemCardQuantity}>
                <strong>Quantity:</strong>
                <input
                    type="number"
                    min="0"
                    value={quantity || 0}
                    onChange={(e) => handleQuantityChange(menuItemID, parseInt(e.target.value, 10) || 0)}
                />
            </label>
        </div>
    );
};
