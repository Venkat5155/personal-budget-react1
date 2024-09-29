import React from 'react';

function HomePage() {
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
              
                <article className="text-box d3js" id="d3jsChart">
                    <h1>D3js Chart</h1>
                </article>
                
                <article className="text-box">
                    <h1>Pie Chart</h1>
                    <p>
                        <canvas id="myChart" min-width="400" min-height="400"></canvas>
                    </p>
                </article>
            </div>

        </section>

    </main>
  );
}

export default HomePage;
