import './MainScreen.scss';
import {Button, Card, Elevation, Intent, HTMLSelect, Callout, Tooltip} from '@blueprintjs/core';
import {useState, useContext, useRef} from 'react';
import {useLocalStorage} from "react-use";
import HelpDrawer from "../../modals/help-drawer/HelpDrawer";
import CalculatorContext from "../../../context/CalculatorContext";
import InputList from "../../features/input-list/InputList";
import InfoCard from "../../features/info-card/InfoCard";
import filesize from 'filesize';
import numeral from 'numeral';
import {Doughnut, Line} from "react-chartjs-2";
import Chart from 'chart.js';

function MainScreen() {
    const [darkMode, setDarkMode] = useLocalStorage("darkMode", true);
    const [helpOpen, setHelpOpen] = useState(false);

    const {
        output,
        addInput,
        durationIntervalUnit,
        setDurationIntervalUnit
    } = useContext(CalculatorContext);

    const {
        totalSize,
        totalRecords,
        avgThroughput,
        startTimestamp,
        endTimestamp
    } = output;

    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);
    Chart.defaults.global.defaultFontColor = darkMode ? 'white' : 'black';

    return (
        <div className={darkMode ? 'bp3-dark mainScreen' : 'bp3-light mainScreen'}>
            <div id="header">
                <section>
                <div id="headerNavBar" className="bp3-navbar">
                    <div className="bp3-navbar-group bp3-align-left">
                        <div className="bp3-navbar-heading">Data Transfer & Storage Calculator</div>
                    </div>
                    <div className="bp3-navbar-group bp3-align-right">
                        <Button minimal icon={darkMode ? 'moon' : 'flash'}  onClick={() => {
                            setDarkMode(!darkMode);
                        }}/>
                    </div>
                </div>
                </section>
            </div>
            <div className="sectionWrapper">
                <section>
                    <div className="row start-xs center-xs">
                        <div className="col-xs-12 col-md-4 colMarginBottom">
                            <Card className="MainScreenCard" elevation={Elevation.THREE}>
                                <div className="MainScreenCard__header">
                                    <div className="MainScreenCard__header__text">Inputs
                                        <Tooltip content="Add one or more input streams. Each input represents an amount of data sent at an interval.">
                                            <Button className="helpButton" small minimal icon="help" />
                                        </Tooltip></div>
                                    <Button className="addInputButton" icon="plus" minimal onClick={() => {
                                        addInput();
                                    }} />
                                </div>
                                <InputList darkMode={darkMode} />
                            </Card>
                        </div>
                        <div className="col-xs-12 col-md-8 colMarginBottom">
                            <Card className="MainScreenCard" elevation={Elevation.THREE}>
                                <div className="MainScreenCard__header">
                                    <div className="MainScreenCard__header__text">
                                        <div className="durationSelectContainer">
                                            <p>
                                                Output After
                                            </p>
                                            <HTMLSelect value={durationIntervalUnit} onChange={(event) => {
                                                setDurationIntervalUnit(event.currentTarget.value);
                                            }}>
                                                <option value="seconds">one second</option>
                                                <option value="minutes">one minute</option>
                                                <option value="hours">one hour</option>
                                                <option value="days">one day</option>
                                                <option value="months">one month</option>
                                                <option value="years">one year</option>
                                            </HTMLSelect>
                                        </div>
                                    </div>
                                </div>
                                <div className="MainScreenCard__content">
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <InfoCard name="Total Size" value={filesize(totalSize, {base: 10})} description={"Total data size, not taking into account any compression or storage efficiencies. Values are in metric (base-10) units."}/>
                                        </div>
                                        <div className="col-xs-6">
                                            <InfoCard name="# of Records" value={numeral(totalRecords).format('0a')} description={"Total number of records, if each occurrence of an input at its frequency is one record."}/>
                                        </div>
                                        <div className="col-xs-6">
                                            <InfoCard name="Average Throughput" value={filesize(avgThroughput, {base: 10})} units={"/s"} description={"Average throughput over the output duration, shown as information sent per second. Values are in metric (base-10) units."}/>
                                        </div>
                                    </div>
                                    <div className="row start-xs center-xs">
                                        <div className="col-xs-12">
                                            <hr />
                                        </div>
                                        <div className="col-xs-12 col-sm-6">
                                            <Line
                                                ref={lineChartRef}
                                                data={output.lineChartData}
                                                height={250}
                                                options={{
                                                    title: {
                                                        text: 'Output Size over Time'
                                                    },
                                                    darkMode,
                                                    maintainAspectRatio: false,
                                                    tooltip: {
                                                        enabled: true,
                                                        mode: 'y'
                                                    },
                                                    scales: {
                                                        xAxes: [{
                                                            type: 'time',
                                                            time: {
                                                                min: startTimestamp.valueOf(),
                                                                max: endTimestamp.valueOf()
                                                            }
                                                        }],
                                                        yAxes: [{
                                                            scaleLabel: {
                                                                display: true,
                                                                labelString: 'Total Size (Bytes)'
                                                            }
                                                        }]
                                                    },
                                                    legend: {
                                                        display: false
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="col-xs-6">
                                            <Doughnut
                                                ref={pieChartRef}
                                                data={output.pieChartData}
                                                height={250}
                                                darkMode={darkMode}
                                                options={{
                                                    title: {
                                                        text: 'Output Proportion'
                                                    },
                                                    darkMode,
                                                    maintainAspectRatio: false,
                                                    animation: {
                                                        duration: 100
                                                    }
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-xs-12 colMarginBottom">
                            <Callout intent={Intent.PRIMARY}>
                                Need a solution for organizing and analyzing your hardware data?
                                TelemetryJet is a cloud platform that
                                empowers hardware engineering teams to gain insight from their data.&nbsp;
                                <a href="https://www.telemetryjet.com/">Learn More</a>
                            </Callout>
                        </div>
                    </div>
                </section>
            </div>
            <HelpDrawer
                isOpen={helpOpen}
                onClose={() => setHelpOpen(false)}
                className={darkMode ? 'bp3-dark' : 'bp3-light'}
            />
        </div>
    );
}

export default MainScreen;
