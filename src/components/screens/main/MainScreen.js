import './MainScreen.scss';
import {Button, Card, Elevation, Intent, HTMLSelect, Callout} from '@blueprintjs/core';
import {useState, useContext} from 'react';
import {useLocalStorage} from "react-use";
import HelpDrawer from "../../modals/help-drawer/HelpDrawer";
import CalculatorContext from "../../../context/CalculatorContext";
import InputList from "../../features/input-list/InputList";
import InfoCard from "../../features/info-card/InfoCard";
import filesize from 'filesize';
import numeral from 'numeral';
import {Doughnut} from "react-chartjs-2";

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
        avgThroughput
    } = output;

    /*

                        <Button minimal icon="help" onClick={() => {
                            setHelpOpen(true);
                        }}/>
     */

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
                                    <div className="MainScreenCard__header__text">Inputs</div>
                                    <Button icon="plus" minimal onClick={() => {
                                        addInput();
                                    }} />
                                </div>
                                <InputList />
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
                                            <InfoCard name="Total Size" value={filesize(totalSize)}/>
                                        </div>
                                        <div className="col-xs-6">
                                            <InfoCard name="# of Records" value={numeral(totalRecords).format('0a')} />
                                        </div>
                                        <div className="col-xs-6">
                                            <InfoCard name="Average Throughput" value={filesize(avgThroughput)} units={"/s"}/>
                                        </div>
                                        <div className="col-xs-12">
                                            <hr />
                                        </div>
                                        <div className="col-xs-12 col-sm-6">
                                        </div>
                                        <div className="col-xs-6">
                                            <Doughnut
                                                data={output.pieChartData}
                                                legend={{
                                                display: false
                                            }}
                                                options={{
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
