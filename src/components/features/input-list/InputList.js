import './InputList.scss';
import {useContext} from "react";
import CalculatorContext from "../../../context/CalculatorContext";
import {Button, NonIdealState, Popover} from "@blueprintjs/core";
import {TwitterPicker} from "react-color";

function InputListItem(props) {
    const {
        color,
        sizeNum,
        sizeUnit,
        intervalNum,
        intervalUnit,
        onDelete,
        onModify
    } = props;

    const style={
        backgroundColor: color.hex
    }

    return (
        <div className="InputListItem" ><Popover content={(
            <TwitterPicker
                colors={['#2965CC', '#29A634', '#D99E0B', '#D13913', '#8F398F', '#00B3A4', '#DB2C6F', '#9BBF30', '#96622D', '#7157D9']}
                triangle="hide" color={color} onChange={(newColor) => {
                    console.log(newColor);
                onModify({
                    color: {
                        hex: newColor.hex,
                        rgb: `rgb(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b})`
                    },
                    sizeNum,
                    sizeUnit,
                    intervalNum,
                    intervalUnit
                });
            }} />
        )}>
            <div className="InputListItem__colorButton" style={style}>
            </div>
        </Popover>
            {sizeNum} {sizeUnit} every {intervalNum} {intervalUnit}
            <Button minimal className="InputListItem__button" onClick={onDelete} icon="cross"/>
        </div>);
}
function InputList() {
    const {
        inputs,
        removeInput,
        modifyInput
    } = useContext(CalculatorContext);

    const inputItems = inputs.map(({
                                       color,
                                       sizeNum,
                                       sizeUnit,
                                       intervalNum,
                                       intervalUnit
                                   }, i) => (<InputListItem
        color={color}
        sizeNum={sizeNum}
        sizeUnit={sizeUnit}
        intervalNum={intervalNum}
        intervalUnit={intervalUnit}
        onDelete={() => removeInput(i)}
        onModify={(newItem) => modifyInput(newItem, i)}
    />));

    return (<div className="InputList">
        {inputItems}
        {inputItems.length === 0 && (
            <NonIdealState icon="satellite" className="InputList__zeroState" description="Add an input to calculate data transfer & storage numbers for a time interval." />
        )}
    </div>);
}

export default InputList;
