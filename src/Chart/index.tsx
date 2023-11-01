import * as React from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-plugin-annotation';
import {v4 as uuidv4} from 'uuid';
import clone from 'lodash-es/clone';
import { Button } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    graphicData: any;
}

const Chart:React.FC<Props> = ({ graphicData: graphicDataPassed }) => {

    const { useRef, useState, useEffect } = React;

    const [ dataState, setDataState] = useState(graphicDataPassed);
    const chartRef = useRef();

    const changeGraphicVisibility = (isVisible: boolean, exception?: number) => {
        const graphic = clone(dataState);
        // @ts-ignore
        graphic.data.datasets.forEach((d,index) => {
            if (!(exception === index)) {
                // @ts-ignore
                d.hidden = !isVisible;;
            }
        });
        setDataState(graphic);
    }

    useEffect(() => {
        if (chartRef.current) {
            changeGraphicVisibility(false, 1);
        }
    }, [chartRef]);

    const { name, data: graphicData, options: graphicOptions } = dataState;

    return (
        <div id={uuidv4()} style={{ height: 500, width: '100%' }}>

            <div className='btn-container'>
                <Button className='btn' variant="success" onClick={() => changeGraphicVisibility(true)}>Show All</Button>
                <Button className='btn' variant="warning" onClick={() => changeGraphicVisibility(false)}>Hide All</Button>
            </div>
            <Bar
                redraw
                ref={chartRef}
                // @ts-ignore
                data={graphicData}
                // @ts-ignore
                options={{
                    ...graphicOptions,
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: false
                }}
            />
            <div className='help'>Click on the technology you are interested in to view</div>
        </div>
    );
};

export default React.memo(Chart);
