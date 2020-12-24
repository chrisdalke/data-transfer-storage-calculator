import './InfoCard.scss';
import {Button, Tooltip} from '@blueprintjs/core';

function InfoCard({name, value, units, description}) {
    return (
        <div className="InfoCard">
            <div className="InfoCard__name">
                {name || ''}
            </div>
            <div className="InfoCard__value">
                {value || '0'}{units || ''}
                {description && (
                    <Tooltip content={description}>
                        <Button className="helpButton" small minimal icon="help" />
                    </Tooltip>
                )}
            </div>
        </div>
    );
}

export default InfoCard;
