import './MainScreen.scss';
import {Navbar, Alignment, Button, Card, Elevation, Intent, HTMLSelect, NumericInput} from '@blueprintjs/core';

function MainScreen() {
    return (
        <div className="bp3-light">
            <div id="header">
                <section>
                <div id="headerNavBar" className="bp3-navbar">
                    <div className="bp3-navbar-group bp3-align-left">
                        <div className="bp3-navbar-heading">Data Transfer & Storage Calculator</div>
                    </div>
                    <div className="bp3-navbar-group bp3-align-right">
                        <Button minimal icon="help" />
                        <Button minimal icon="cog" />
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
                                    <div className="MainScreenCard__header__text">1. Inputs</div>
                                    <Button icon="plus" intent={Intent.SUCCESS} />
                                </div>
                                <div className="MainScreenCard__content">

                                </div>
                            </Card>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <div className="row">
                                <div className="col-xs-12 colMarginBottom">
                                    <Card className="MainScreenCard" elevation={Elevation.THREE}>
                                        <div className="MainScreenCard__header">
                                            <div className="MainScreenCard__header__text">2. Duration</div>
                                        </div>
                                        <div className="MainScreenCard__content">
                                            <div className="durationSelectContainer">
                                                <p>After </p>
                                                <HTMLSelect>
                                                    <option>one second</option>
                                                    <option>one minute</option>
                                                    <option>one hour</option>
                                                    <option>one day</option>
                                                    <option>one month</option>
                                                    <option>one year</option>
                                                </HTMLSelect>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-xs-12 colMarginBottom">
                                    <Card className="MainScreenCard" elevation={Elevation.THREE}>
                                        <div className="MainScreenCard__header">
                                            <div className="MainScreenCard__header__text">3. Output</div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default MainScreen;
