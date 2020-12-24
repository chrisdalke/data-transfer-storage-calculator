import CalculatorContext from "./CalculatorContext";
import { useMemo, useState } from "react";
import {useList} from "react-use";
import moment from 'moment';

function CalculatorContextProvider(props) {
    const [inputs, {
        push,
        updateAt,
        removeAt
    }] = useList([{
        color: {hex: "#2965CC"},
        intervalNum: 100,
        intervalUnit: "milliseconds",
        sizeNum: 32,
        sizeUnit: "bytes"
    }]);
    console.log(inputs);
    const [durationIntervalNum, setDurationIntervalNum] = useState(1);
    const [durationIntervalUnit, setDurationIntervalUnit] = useState("years");

    // Compute normalized rates in bytes for all units
    const normalizedRates = inputs.map(({
        color,
        intervalNum,
        intervalUnit,
        sizeNum,
        sizeUnit
                                        }) => {

        let sizeNumBytes = sizeNum;
        if (sizeUnit === "byte") {
            sizeNumBytes = sizeNum;
        } else if (sizeUnit === "kilobyte") {
            sizeNumBytes = sizeNum * 1000;
        } else if (sizeUnit === "megabyte") {
            sizeNumBytes = sizeNum * 1000 * 1000;
        } else if (sizeUnit === "gigabyte") {
            sizeNumBytes = sizeNum * 1000 * 1000 * 1000;
        } else if (sizeUnit === "terabyte") {
            sizeNumBytes = sizeNum * 1000 * 1000 * 1000 * 1000;
        }

        const duration = moment.duration(intervalNum, intervalUnit);
        const durationNumSeconds = duration.asSeconds();
        return {
            bytesPerSecond: sizeNumBytes / durationNumSeconds,
            recordsPerSecond: 1 / durationNumSeconds,
            color
        };
    });

    const outputDurationSeconds = moment.duration(durationIntervalNum, durationIntervalUnit).asSeconds();
    const startTimestamp = moment();
    const endTimestamp = moment().add(outputDurationSeconds, "seconds");

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
    const lineChartData = {
        datasets: [],
        labels: []
    }
    normalizedRates.forEach((rate, i) => {
        avgThroughput += rate.bytesPerSecond;
        totalDataBytes += rate.bytesPerSecond * outputDurationSeconds;
        totalRecords += rate.recordsPerSecond * outputDurationSeconds;
        pieChartData.datasets[0].data.push(rate.bytesPerSecond * outputDurationSeconds);
        pieChartData.datasets[0].backgroundColor.push(rate.color.hex);
        pieChartData.labels.push(`Input ${i + 1}`);

        const lineChartDataSet = {
            label: `Input ${i + 1}`,
            data: [{
                x: startTimestamp,
                y: 0
            }, {
                x: endTimestamp,
                y: rate.bytesPerSecond * outputDurationSeconds
            }],
            borderColor: rate.color.hex
        }
        lineChartData.datasets.push(lineChartDataSet);
        lineChartData.labels.push(`Input ${i + 1}`);
    })
    if (normalizedRates.length === 0) {
        pieChartData.datasets[0].data.push(100);
        pieChartData.datasets[0].backgroundColor.push("#738694");
        pieChartData.labels.push("No Data");
    }

    const colorOptions = useMemo(() =>
        ['#2965CC', '#29A634', '#D99E0B', '#D13913', '#8F398F', '#00B3A4', '#DB2C6F', '#9BBF30', '#96622D', '#7157D9'],
    []);

    const context = {
        inputs,
        output: {
            totalSize: totalDataBytes,
            totalRecords: totalRecords,
            avgThroughput,
            pieChartData,
            lineChartData,
            startTimestamp,
            endTimestamp
        },
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
    };

    return (<CalculatorContext.Provider value={context} {...props} />);
}

export default CalculatorContextProvider;
