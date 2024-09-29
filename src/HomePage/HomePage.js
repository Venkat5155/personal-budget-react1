import axios from 'axios';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';


function HomePage() {

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/budget');

                if (response && response.data && response.data.myBudget) {
                    const myBudgetData = response.data.myBudget;

                    const labels = myBudgetData.map((item) => item.title);
                    const data = myBudgetData.map((item) => item.budget);

                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }

                    const chartContext = chartRef.current.getContext('2d');
                    const newChartInstance = new Chart(chartContext, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: data,
                                    backgroundColor: [
                                        '#ffcd56',
                                        '#b71b75',
                                        '#36a2ef',
                                        '#d2bc19',
                                        '#CC0006',
                                        '#45818h',
                                        '#6a1cb9',
                                        '#2c9923',
                                        '#f6b26c'
                                    ],
                                },
                            ],
                        },
                    });

                    chartInstanceRef.current = newChartInstance;

                    drawD3DonutChart(myBudgetData);

                }
            } catch (error) {
                console.error('Fetching error data:', error);
            }
        };

        fetchData();
    }, []);








  return (
    <main className="container center">

        <section className="page-area">


            <article className="text-box" aria-labelledby="stay-on-track">
                <h2 id="stay-on-track">Stay on Track</h2>
                <p>
                    Do you know where you are spending your money? Proper budget management depends on real data, and this app will help you track every expense to stay on top of your budget!
                </p>
                
                <a href="/learn-more" aria-label="Learn more about tracking expenses">Learn More</a>
            </article>
    
            <article className="text-box" aria-labelledby="get-alerts">
                <h2 id="get-alerts">Get Alerts on Overspending</h2>
                <p>
                    What if your clothing budget exceeded? You will get an alert. The goal is to never go over the budget, and this app helps you achieve that.
                </p>
                
                <a href="/alerts-info" aria-label="Find out more about budget alerts">Find Out More</a>
            </article>
    
            <article className="text-box" aria-labelledby="see-results">
                <h2 id="see-results">See the Results</h2>
                <p>
                    People who stick to a financial plan and budget every expense get out of debt faster! They live happier lives as they spend without guilt or fear, knowing it is all accounted for.
                </p>
                
                <a href="/results" aria-label="Read success stories of financial planning">Read Success Stories</a>
            </article>
    
            <div className="charts">

                
            <article className="text-box">
                <h1>Charts</h1>
                <h2>ChartJS</h2>
                <p>
                    <canvas id="myChart" width="400" height="400" ref={chartRef}></canvas>
                </p>
            </article>

            <article className="text-box">
                <h2>D3JS Chart</h2>
                
                    <div id="d3DonutChart"></div>
                
            </article>
            </div>

        </section>

    </main>
  );
}


function drawD3DonutChart(data) {
    const width = 700;
    const height = 700;
    const radius = (Math.min(width, height) / 3);

    const existingChart = d3.select('#d3DonutChart svg');
    if (!existingChart.empty()) {

        return;
    }

    const svg = d3.select('#d3DonutChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.title))
        .range(['#ffcd56', '#d98eff', '#8affa4', '#6dc5ff','#CC0000','#45818e','#c90076','#783f04','#d2bc14']);

    const pie = d3.pie()
        .value(d => d.budget);

    const arc = d3.arc()
        .outerRadius(radius * 0.9)
        .innerRadius(radius * 0.4);

    const outerArc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.3);

    const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.title));

    const labelLines = arcs.append('line')
        .attr('x1', d => outerArc.centroid(d)[0])
        .attr('y1', d => outerArc.centroid(d)[1])
        .attr('x2', d => {
            const pos = outerArc.centroid(d);
            const midAngle = Math.atan2(pos[1], pos[0]);
            return Math.cos(midAngle) * (radius + 10);
        })
        .attr('y2', d => {
            const pos = outerArc.centroid(d);
            const midAngle = Math.atan2(pos[1], pos[0]);
            return Math.sin(midAngle) * (radius + 10);
        })
        .attr('stroke', 'black');

    arcs.append('text')
        .attr('transform', d => {
            const pos = outerArc.centroid(d);
            const midAngle = Math.atan2(pos[1], pos[0]);
            return `translate(${Math.cos(midAngle) * (radius + 20)},${Math.sin(midAngle) * (radius + 20)})`;
        })
        .attr('dy', '0.75em')
        .style('text-anchor', d => {
            const pos = outerArc.centroid(d);
            return (Math.cos(Math.atan2(pos[1], pos[0])) > 0) ? 'start' : 'end';
        })
        .text(d => `${d.data.title} (${d.data.budget})`);
}
export default HomePage;
