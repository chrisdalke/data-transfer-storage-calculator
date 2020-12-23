import {Drawer} from "@blueprintjs/core";
import './HelpDrawer.scss';

function HelpDrawer({ isOpen, onClose, className }) {
    return (<Drawer
        title="Help"
        isOpen={isOpen}
        onClose={onClose}
        className={className}
        usePortal={false}
    >
        <div className="HelpDrawer__content">
            <p>
                This calculator estimates the quantity and throughput of data ingested
                into a system.
            </p>
            <br />
            <h4>1. Add Inputs</h4>
            <p>
                Add one or more data inputs. Each input will contribute to the total data through the system.
                For each input, you must choose a quantity and interval. For example, 1 megabyte of data every
                30 seconds.
            </p>
            <h4>Output Duration</h4>
            <p>
                In the output panel, choose a duration to calculate.
            </p>
            <h4>Interpreting the Output</h4>
            <p>

            </p>
        </div>
    </Drawer>);
}

export default HelpDrawer;
