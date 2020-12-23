import './InfoCard.scss';

function InfoCard({name, value, units, description}) {
    return (
        <div className="InfoCard">
            <div className="InfoCard__name">
                {name || ''}
            </div>
            <div className="InfoCard__value">
                {value || '0'}{units || ''}
            </div>
            <div className="InfoCard__description">
                {description || ''}
            </div>
        </div>
    );
}

export default InfoCard;
