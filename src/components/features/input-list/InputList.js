import './InputList.scss';
import {useContext} from "react";
import CalculatorContext from "../../../context/CalculatorContext";
import {Button, ControlGroup, HTMLSelect, NonIdealState, NumericInput, Popover} from "@blueprintjs/core";
import {TwitterPicker} from "react-color";

function InputListItem(props) {
    const {
        name,
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
            {name} <Button minimal small className="InputListItem__button" onClick={onDelete} icon="cross" />
            <div className="InputListItem__row">
            <ControlGroup fill>
                <NumericInput
                    fill
                    value={sizeNum}
                    min={0}
                    onValueChange={(valueAsNumber) => {
                    onModify({
                        color,
                        sizeNum: valueAsNumber,
                        sizeUnit,
                        intervalNum,
                        intervalUnit
                    });
                }} />
                <HTMLSelect fill value={sizeUnit} onChange={(event) => {
                    onModify({
                        color,
                        sizeNum,
                        sizeUnit: event.currentTarget.value,
                        intervalNum,
                        intervalUnit
                    });
                }}>
                    <option value="byte">bytes</option>
                    <option value="kilobyte">kilobytes</option>
                    <option value="megabyte">megabytes</option>
                    <option value="gigabyte">gigabytes</option>
                    <option value="terabyte">terabytes</option>
                </HTMLSelect>
            </ControlGroup><div className="InputListItem__rowLabel">
                every
            </div>
            <ControlGroup fill>
                <NumericInput
                    fill
                    value={intervalNum} min={1} onValueChange={(valueAsNumber) => {
                    onModify({
                        color,
                        sizeNum,
                        sizeUnit,
                        intervalNum: valueAsNumber,
                        intervalUnit
                    });
                }} />
                <HTMLSelect fill value={intervalUnit} onChange={(event) => {
                    onModify({
                        color,
                        sizeNum,
                        sizeUnit,
                        intervalNum,
                        intervalUnit: event.currentTarget.value
                    });
                }}>
                    <option value="milliseconds">milliseconds</option>
                    <option value="seconds">seconds</option>
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="months">months</option>
                    <option value="years">years</option>
                </HTMLSelect>
            </ControlGroup>
            </div>
        </div>);
}
function InputList({darkMode}) {
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
        name={`Input ${i+1}`}
        color={color}
        sizeNum={sizeNum}
        sizeUnit={sizeUnit}
        intervalNum={intervalNum}
        intervalUnit={intervalUnit}
        onDelete={() => removeInput(i)}
        onModify={(newItem) => modifyInput(newItem, i)}
    />));

    return (<div className={darkMode ? "InputList dark-scrollbar" : "InputList light-scrollbar"}>
        {inputItems}
        {inputItems.length === 0 && (
            <NonIdealState icon="satellite" className="InputList__zeroState" description="Add an input to calculate data transfer & storage numbers for a time interval." />
        )}
    </div>);
}

export default InputList;
