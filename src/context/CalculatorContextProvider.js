import CalculatorContext from "./CalculatorContext";
import { useMemo, useState } from "react";
import {useList} from "react-use";
import moment from 'moment';
import filesize from 'filesize';

function CalculatorContextProvider(props) {
    const [inputs, {
        push,
        updateAt,
        removeAt
    }] = useList([]);
    const [durationIntervalNum, setDurationIntervalNum] = useState(1);
    const [durationIntervalUnit, setDurationIntervalUnit] = useState("days");

    // Compute normalized rates in bytes for all units
    const normalizedRates = inputs.map(({
        color,
        intervalNum,
        intervalUnit,
        sizeNum,
        sizeUnit
                                        }) => {
        const duration = moment.duration(intervalNum, intervalUnit);
        const durationNumSeconds = duration.asSeconds();
        return {
            bytesPerSecond: sizeNum / durationNumSeconds,
            recordsPerSecond: 1 / durationNumSeconds,
            color
        };
    });

    const outputDurationSeconds = moment.duration(durationIntervalNum, durationIntervalUnit).asSeconds();

    let totalDataBytes = 0;
    let totalRecords = 0;
    let avgThroughput = 0;
    const pieChartData = {
        datasets: [{
            data: [],
            backgroundColor: [],
            borderWidth: 0
        }],
        labels: []
    }
    normalizedRates.forEach((rate, i) => {
        avgThroughput += rate.bytesPerSecond;
        totalDataBytes += rate.bytesPerSecond * outputDurationSeconds;
        totalRecords += rate.recordsPerSecond * outputDurationSeconds;
        pieChartData.datasets[0].data.push(rate.bytesPerSecond * outputDurationSeconds);
        pieChartData.datasets[0].backgroundColor.push(rate.color.hex);
        pieChartData.labels.push(`Input ${i + 1}`);
    })
    if (normalizedRates.length === 0) {
        pieChartData.datasets[0].data.push(100);
        pieChartData.datasets[0].backgroundColor.push("#738694");
        pieChartData.labels.push("No Data");
    }

    const output = {
        totalSize: totalDataBytes,
        totalRecords: totalRecords,
        avgThroughput,
        pieChartData
    };

    const colorOptions = ['#2965CC', '#29A634', '#D99E0B', '#D13913', '#8F398F', '#00B3A4', '#DB2C6F', '#9BBF30', '#96622D', '#7157D9'];

    const context = useMemo(() => ({
        inputs,
        output,
        addInput: () => {
            push({
                    color: {
                        hex: colorOptions[(inputs.length) % colorOptions.length]
                    },
                    sizeNum: 1,
                    sizeUnit: "bytes",
                    intervalNum: 1,
                    intervalUnit: "seconds"
                });
        },
        removeInput: (idx) => {
            removeAt(idx);
        },
        modifyInput: (newItem, i) => {
            updateAt(i, newItem);
        },
        durationIntervalNum,
        setDurationIntervalNum,
        durationIntervalUnit,
        setDurationIntervalUnit
    }), [
        inputs,
        push,
        updateAt,
        removeAt,
        durationIntervalNum,
        setDurationIntervalNum,
        durationIntervalUnit,
        setDurationIntervalUnit
    ]);

    return (<CalculatorContext.Provider value={context} {...props} />);
}

export default CalculatorContextProvider;
