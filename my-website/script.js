document.addEventListener('DOMContentLoaded', function () {

    const creditUtilization = document.getElementById('creditUtilization');
    const paymentHistory = document.getElementById('paymentHistory');
    const creditHistoryLength = document.getElementById('creditHistoryLength');
    const typesOfCredit = document.getElementById('typesOfCredit');
    const newCreditInquiries = document.getElementById('newCreditInquiries');

    const simulatedScoreElement = document.getElementById('simulatedScore');
    const scoreMessageElement = document.getElementById('scoreMessage');
    const guessButton = document.getElementById('guessRangeButton');
    const scoreGuess = document.getElementById('scoreGuess');

    function calculateScore() {
        const utilization = parseInt(creditUtilization.value) || 0;
        const paymentHistoryValue = parseInt(paymentHistory.value) || 0;
        const creditHistoryYears = parseInt(creditHistoryLength.value) || 0;
        const creditTypes = parseInt(typesOfCredit.value) || 0;
        const inquiries = parseInt(newCreditInquiries.value) || 0;

        let score = 850;
        const utilizationPenalty = utilization * 1.1;
        const paymentHistoryPenalty = (100 - paymentHistoryValue) * 3;
        const historyPenalty = Math.max(0, (10 - creditHistoryYears) * 15);
        const inquiryPenalty = inquiries * 10;
        const typesBonus = Math.min(creditTypes * 4, 20);

        score -= (utilizationPenalty + paymentHistoryPenalty + historyPenalty + inquiryPenalty - typesBonus);
        return Math.round(Math.max(300, Math.min(score, 850)));
    }


    function updateExplanation(elementId, explanation) {
        document.getElementById(elementId).innerText = explanation;
    }


    function addInputListener(inputElement, explanationElement, explanationCallback) {
        inputElement.addEventListener('input', function () {
            updateExplanation(explanationElement, explanationCallback(inputElement.value));
            simulatedScoreElement.innerText = 'Estimated Score: ???';
            scoreMessageElement.innerHTML = '';
        });
    }


    function updateScoreDisplay() {
        const estimatedScore = calculateScore();
        simulatedScoreElement.innerText = `Estimated Score: ${estimatedScore}`;
    }


    addInputListener(creditUtilization, 'utilizationDisplay', (value) => `${value}% - Aim to keep this below 30% for a healthier score.`);
    addInputListener(paymentHistory, 'historyDisplay', (value) => `${value}% - Higher payment history percentages improve your score.`);
    addInputListener(creditHistoryLength, 'historyLengthDisplay', (value) => `${value} years - Longer credit history shows reliability.`);
    addInputListener(typesOfCredit, 'typesDisplay', (value) => `${value} - A mix of credit types can boost your score.`);
    addInputListener(newCreditInquiries, 'inquiriesDisplay', (value) => `${value} - Fewer recent inquiries positively impact your score.`);


guessButton.addEventListener('click', function () {
    const selectedRange = scoreGuess.value.split('-');
    const lowerBound = parseInt(selectedRange[0]);
    const upperBound = parseInt(selectedRange[1]);
    const estimatedScore = calculateScore();

    let resultMessage;
    if (estimatedScore >= lowerBound && estimatedScore <= upperBound) {
        resultMessage = `<p>Correct! The estimated score is ${estimatedScore}, which falls within your guessed range.</p>`;
    } else {
        resultMessage = `<p>Incorrect. The estimated score is ${estimatedScore}, which is outside your guessed range of ${lowerBound} - ${upperBound}.</p>`;


        if (estimatedScore < lowerBound) {
            resultMessage += `<p>Your guessed range was too high. Here are possible reasons why the score might be lower than expected:</p><ul>`;


            if (parseInt(creditUtilization.value) > 30) {
                resultMessage += `<li>High credit utilization (over 30%) can significantly lower your score.</li>`;
            }
            if (parseInt(paymentHistory.value) < 100) {
                resultMessage += `<li>Less-than-perfect payment history (under 100%) negatively impacts your score.</li>`;
            }
            if (parseInt(creditHistoryLength.value) < 5) {
                resultMessage += `<li>A short credit history (under 5 years) might result in a lower score.</li>`;
            }
            if (parseInt(newCreditInquiries.value) > 0) {
                resultMessage += `<li>Recent credit inquiries can temporarily reduce your score.</li>`;
            }
            if (parseInt(typesOfCredit.value) < 2) {
                resultMessage += `<li>A limited mix of credit types can also result in a lower score.</li>`;
            }

            resultMessage += `</ul>`;
        } else if (estimatedScore > upperBound) {
            resultMessage += `<p>Your guessed range was too low. Here are possible reasons why the score might be higher than expected:</p><ul>`;

     
            if (parseInt(creditUtilization.value) <= 30) {
                resultMessage += `<li>Low credit utilization (30% or below) positively impacts your score.</li>`;
            }
            if (parseInt(paymentHistory.value) === 100) {
                resultMessage += `<li>A perfect payment history (100%) boosts your score.</li>`;
            }
            if (parseInt(creditHistoryLength.value) >= 10) {
                resultMessage += `<li>A long credit history (10+ years) can increase your score.</li>`;
            }
            if (parseInt(newCreditInquiries.value) === 0) {
                resultMessage += `<li>No recent credit inquiries can positively impact your score.</li>`;
            }
            if (parseInt(typesOfCredit.value) >= 2) {
                resultMessage += `<li>A diverse mix of credit types is beneficial for a higher score.</li>`;
            }

            resultMessage += `</ul>`;
        }
    }

    simulatedScoreElement.innerText = `Estimated Score: ${estimatedScore}`;
    scoreMessageElement.innerHTML = resultMessage;
});

// Enhanced Credit Card Comparison Tool
document.getElementById('findCardBtn').addEventListener('click', function () {
    const studentStatus = document.getElementById('studentStatus').value;
    const spendingCategories = [
        { element: document.getElementById('dining'), label: 'Dining & Fast Food' },
        { element: document.getElementById('groceries'), label: 'Groceries' },
        { element: document.getElementById('transportation'), label: 'Transportation' },
        { element: document.getElementById('streaming'), label: 'Streaming Services' },
        { element: document.getElementById('travel'), label: 'Travel (Study Abroad)' },
        { element: document.getElementById('books'), label: 'Books & School Supplies' }
    ].filter(category => category.element.checked).map(category => category.label);

    const income = parseFloat(document.getElementById('studentIncome').value) || 0;
    const spending = parseFloat(document.getElementById('expectedSpending').value) || 0;
    const creditScore = document.getElementById('studentCreditScore').value;
    const selectedFeatures = [
        { element: document.getElementById('noAnnualFee'), label: 'No Annual Fee' },
        { element: document.getElementById('cashback'), label: 'Cashback Rewards' },
        { element: document.getElementById('lowAPR'), label: 'Low APR' },
        { element: document.getElementById('creditBuilding'), label: 'Credit Building' },
        { element: document.getElementById('travelRewards'), label: 'Travel Rewards' }
    ].filter(feature => feature.element.checked).map(feature => feature.label);

    let recommendations = [];


    if (creditScore === 'no-credit' && selectedFeatures.includes('Credit Building')) {
        recommendations.push({
            card: 'Discover it® Secured Credit Card',
            description: 'Ideal for building credit with cashback rewards and no annual fee.',
            link: 'https://www.discover.com',
            rewardEstimate: calculateRewards(spending, 2, 1)
        });
    }
    if (creditScore === 'fair' && selectedFeatures.includes('Credit Building')) {
        recommendations.push({
            card: 'Capital One Platinum Credit Card',
            description: 'A simple, no-fee card designed to help build or rebuild credit over time.',
            link: 'https://www.capitalone.com',
            rewardEstimate: calculateRewards(spending, 1, 0)
        });
    }
    if (creditScore === 'good' && spendingCategories.includes('Dining & Fast Food') && selectedFeatures.includes('Cashback Rewards')) {
        recommendations.push({
            card: 'Capital One SavorOne® Student Cash Rewards Card',
            description: '3% cashback on dining, entertainment, and streaming services with no annual fee.',
            link: 'https://www.capitalone.com',
            rewardEstimate: calculateRewards(spending, 3, 1)
        });
    }
    if (creditScore === 'good' && spendingCategories.includes('Groceries') && selectedFeatures.includes('Cashback Rewards')) {
        recommendations.push({
            card: 'Blue Cash Everyday® Card from American Express',
            description: '3% cashback on groceries and 2% cashback at gas stations with no annual fee.',
            link: 'https://www.americanexpress.com',
            rewardEstimate: calculateRewards(spending, 3, 1)
        });
    }
    if (creditScore === 'excellent' && selectedFeatures.includes('Travel Rewards')) {
        recommendations.push({
            card: 'Chase Sapphire Preferred® Card',
            description: '2x points on travel and dining, with valuable travel perks and flexible points.',
            link: 'https://www.chase.com',
            rewardEstimate: calculateRewards(spending, 2, 1.25)
        });
    }
    if (creditScore === 'excellent' && selectedFeatures.includes('Travel Rewards') && spendingCategories.includes('Travel (Study Abroad)')) {
        recommendations.push({
            card: 'Capital One Venture Rewards Credit Card',
            description: 'Earn 2 miles per dollar on every purchase with no foreign transaction fees, great for international travel.',
            link: 'https://www.capitalone.com',
            rewardEstimate: calculateRewards(spending, 2, 2)
        });
    }
    if (creditScore === 'excellent' && selectedFeatures.includes('Cashback Rewards')) {
        recommendations.push({
            card: 'Citi® Double Cash Card',
            description: 'Earn 2% cashback on every purchase (1% when you buy, 1% when you pay) with no annual fee.',
            link: 'https://www.citi.com',
            rewardEstimate: calculateRewards(spending, 2, 2)
        });
    }
    if (creditScore === 'good' && selectedFeatures.includes('Low APR')) {
        recommendations.push({
            card: 'BankAmericard® Credit Card',
            description: 'Low APR card with no annual fee, ideal for those looking to minimize interest charges.',
            link: 'https://www.bankofamerica.com',
            rewardEstimate: calculateRewards(spending, 0, 0)
        });
    }
    if (selectedFeatures.includes('No Annual Fee') && selectedFeatures.includes('Credit Building') && creditScore === 'fair') {
        recommendations.push({
            card: 'Petal® 2 "Cash Back, No Fees" Visa® Credit Card',
            description: 'No annual fee, no fees of any kind, and cashback up to 1.5% after 12 on-time payments.',
            link: 'https://www.petalcard.com',
            rewardEstimate: calculateRewards(spending, 1.5, 1)
        });
    }


    if (recommendations.length === 0) {
        recommendations.push(
            {
                card: 'Discover it® Student Cash Back',
                description: '5% cashback on rotating categories, no annual fee, and a good choice for students starting with credit.',
                link: 'https://www.discover.com',
                rewardEstimate: calculateRewards(spending, 5, 1)
            },
            {
                card: 'Chase Freedom Flex℠',
                description: '1% to 5% cashback on purchases with rotating bonus categories, no annual fee, ideal for general cashback.',
                link: 'https://www.chase.com',
                rewardEstimate: calculateRewards(spending, 5, 1)
            }
        );
    }


    while (recommendations.length < 3) {
        recommendations.push(recommendations[recommendations.length % 2]);
    }

    displayRecommendations(recommendations);
});

function calculateRewards(spending, categoryRate, baseRate) {
    const categorySpending = spending * 0.4;
    const baseSpending = spending * 0.6;
    const rewards = (categorySpending * categoryRate / 100) + (baseSpending * baseRate / 100);
    return rewards.toFixed(2);
}

function displayRecommendations(recommendations) {
    const studentCardResults = document.getElementById('studentCardResults');
    studentCardResults.innerHTML = recommendations.slice(0, 3).map(rec => `
        <div class="card-recommendation">
            <h4>${rec.card}</h4>
            <p>${rec.description}</p>
            <p><strong>Estimated Monthly Rewards:</strong> $${rec.rewardEstimate}</p>
            <a href="${rec.link}" target="_blank">Apply for ${rec.card}</a>
        </div>
    `).join('');
}


document.getElementById("calculateBudgetBtn").onclick = function() {

    const jobIncome = parseFloat(document.getElementById("jobIncome").value) || 0;
    const scholarships = parseFloat(document.getElementById("scholarships").value) || 0;
    const allowance = parseFloat(document.getElementById("allowance").value) || 0;
    const totalIncome = jobIncome + scholarships + allowance;


    const rent = parseFloat(document.getElementById("rent").value) || 0;
    const utilities = parseFloat(document.getElementById("utilities").value) || 0;
    const subscriptions = parseFloat(document.getElementById("subscriptions").value) || 0;
    const totalFixedExpenses = rent + utilities + subscriptions;


    const groceries = parseFloat(document.getElementById("groceries").value) || 0;
    const transportation = parseFloat(document.getElementById("transportation").value) || 0;
    const entertainment = parseFloat(document.getElementById("entertainment").value) || 0;
    const totalVariableExpenses = groceries + transportation + entertainment;


    const emergencyFund = parseFloat(document.getElementById("emergencyFund").value) || 0;
    const investments = parseFloat(document.getElementById("investments").value) || 0;
    const totalSavings = emergencyFund + investments;

    const totalExpenses = totalFixedExpenses + totalVariableExpenses + totalSavings;
    const remainingBudget = totalIncome - totalExpenses;


    let resultsHTML = `<h4>Your Budget Results:</h4>`;
    resultsHTML += `<p><strong>Total Income:</strong> $${totalIncome}</p>`;
    resultsHTML += `<p><strong>Total Fixed Expenses:</strong> $${totalFixedExpenses}</p>`;
    resultsHTML += `<p><strong>Total Variable Expenses:</strong> $${totalVariableExpenses}</p>`;
    resultsHTML += `<p><strong>Total Savings & Investments:</strong> $${totalSavings}</p>`;
    resultsHTML += `<p><strong>Remaining Budget:</strong> $${remainingBudget}</p>`;

    if (remainingBudget > 0) {
        resultsHTML += `<p style="color: green;">Great job! You’re within your budget. Consider adding more to your savings or investments.</p>`;
    } else if (remainingBudget === 0) {
        resultsHTML += `<p style="color: orange;">You've balanced your budget exactly, but leave room for unexpected expenses.</p>`;
    } else {
        resultsHTML += `<p style="color: red;">You’re over budget by $${Math.abs(remainingBudget)}. Review your expenses to reduce costs.</p>`;
    }
    document.getElementById("budgetResults").innerHTML = resultsHTML;

    const detailedData = {
        labels: [
            `Rent: $${rent} (${((rent / totalIncome) * 100).toFixed(1)}%)`,
            `Utilities: $${utilities} (${((utilities / totalIncome) * 100).toFixed(1)}%)`,
            `Subscriptions: $${subscriptions} (${((subscriptions / totalIncome) * 100).toFixed(1)}%)`,
            `Groceries: $${groceries} (${((groceries / totalIncome) * 100).toFixed(1)}%)`,
            `Transportation: $${transportation} (${((transportation / totalIncome) * 100).toFixed(1)}%)`,
            `Entertainment: $${entertainment} (${((entertainment / totalIncome) * 100).toFixed(1)}%)`,
            `Emergency Fund: $${emergencyFund} (${((emergencyFund / totalIncome) * 100).toFixed(1)}%)`,
            `Investments: $${investments} (${((investments / totalIncome) * 100).toFixed(1)}%)`
        ],
        datasets: [{
            data: [rent, utilities, subscriptions, groceries, transportation, entertainment, emergencyFund, investments],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#7FFFD4", "#FFD700", "#FF7F50", "#00BFFF"],
            hoverOffset: 6
        }]
    };

 const detailedConfig = {
    type: 'pie',
    data: detailedData,
    options: {
        responsive: true,
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Detailed Budget Breakdown',
                font: { size: 18 }
            },
            legend: {
                position: 'top',
                labels: {
                    font: { size: 12 },
                    padding: 15,
                    boxWidth: 10 
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: $${value.toFixed(2)}`;
                    }
                }
            },
            datalabels: {
                color: '#fff',
                anchor: 'end', 
                align: 'start',
                formatter: (value, ctx) => {
                    let label = ctx.chart.data.labels[ctx.dataIndex].split(':')[0];
                    return `${label}: $${value}`; // Show category and value only
                },
                font: {
                    weight: 'bold',
                    size: 10 
                },
                clip: false 
            }
        }
    }
    };

    const summaryData = {
        labels: [
            `Fixed Expenses: $${totalFixedExpenses} (${((totalFixedExpenses / totalIncome) * 100).toFixed(1)}%)`,
            `Variable Expenses: $${totalVariableExpenses} (${((totalVariableExpenses / totalIncome) * 100).toFixed(1)}%)`,
            `Savings & Investments: $${totalSavings} (${((totalSavings / totalIncome) * 100).toFixed(1)}%)`
        ],
        datasets: [{
            data: [totalFixedExpenses, totalVariableExpenses, totalSavings],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverOffset: 6
        }]
    };

    const summaryConfig = {
        type: 'pie',
        data: summaryData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Budget Breakdown by Category',
                    font: { size: 18 }
                },
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 14 },
                        padding: 20
                    }
                },
                datalabels: {
                    color: '#fff',
                    formatter: (value, ctx) => {
                        let label = ctx.chart.data.labels[ctx.dataIndex];
                        return label.split(":")[1];
                    },
                    font: {
                        weight: 'bold',
                        size: 12
                    }
                }
            }
        }
    };

    const detailedCtx = document.getElementById('budgetChart').getContext('2d');
    const summaryCtx = document.getElementById('summaryChart').getContext('2d');

    if (window.budgetChart instanceof Chart) {
        window.budgetChart.destroy();
    }
    if (window.summaryChart instanceof Chart) {
        window.summaryChart.destroy();
    }

    window.budgetChart = new Chart(detailedCtx, detailedConfig);
    window.summaryChart = new Chart(summaryCtx, summaryConfig);
}

document.getElementById("trackSavingsBtn").onclick = function() {
    const savingsTarget = parseFloat(document.getElementById("savingsTarget").value) || 0;
    const currentSavings = parseFloat(document.getElementById("currentSavings").value) || 0;
    const monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value) || 0;

    const remainingAmount = savingsTarget - currentSavings;
    const progressPercent = Math.min((currentSavings / savingsTarget) * 100, 100);
    const monthsToGoal = monthlyContribution > 0 ? Math.ceil(remainingAmount / monthlyContribution) : "∞";

    let savingsHTML = `<h4>Your Savings Progress:</h4>`;
    savingsHTML += `<p><strong>Total Goal:</strong> $${savingsTarget}</p>`;
    savingsHTML += `<p><strong>Current Savings:</strong> $${currentSavings}</p>`;
    savingsHTML += `<p><strong>Remaining Amount:</strong> $${remainingAmount}</p>`;
    savingsHTML += `<p><strong>Estimated Time to Reach Goal:</strong> ${monthsToGoal} months</p>`;

    document.getElementById("savingsResults").innerHTML = savingsHTML;

    renderProgressBar(progressPercent);
    renderSavingsLineChart(savingsTarget, currentSavings, monthlyContribution, monthsToGoal);

    displayLearningTips(progressPercent);
};

function renderProgressBar(progressPercent) {
    const progressContainer = document.getElementById("progressContainer");
    progressContainer.innerHTML = `<h4>Progress to Goal:</h4>
        <div style="width: 100%; background: #eee; border-radius: 10px; border: 1px solid #000; height: 20px; position: relative;">
            <div style="width: ${progressPercent}%; background: ${
        progressPercent >= 80 ? "green" : progressPercent >= 50 ? "orange" : "red"
    }; color: #fff; text-align: center; border-radius: 10px; height: 100%;">${Math.round(progressPercent)}%</div>
        </div>`;
}

function renderSavingsLineChart(savingsTarget, currentSavings, monthlyContribution, monthsToGoal) {
    const ctx = document.getElementById("savingsLineChart").getContext("2d");

    const months = [];
    const projectedSavings = [];
    let cumulativeSavings = currentSavings;

    for (let i = 1; i <= Math.min(monthsToGoal, 12); i++) {
        cumulativeSavings += monthlyContribution;
        months.push(`Month ${i}`);
        projectedSavings.push(cumulativeSavings);
    }

    if (window.savingsChart instanceof Chart) {
        window.savingsChart.destroy();
    }

    window.savingsChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: months,
            datasets: [{
                label: "Projected Savings",
                data: projectedSavings,
                fill: false,
                borderColor: "blue",
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: savingsTarget * 1.1
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Projected Monthly Savings Progress"
                }
            }
        }
    });
}

function displayLearningTips(progressPercent) {
    const tipsList = document.getElementById("tipsList");
    tipsList.innerHTML = ""; 

    const beginnerTips = [
        "Start tracking your spending to see where your money goes each month.",
        "Set small weekly savings goals and celebrate meeting them to build a savings habit."
    ];
    const intermediateTips = [
        "Look for small expenses to cut back on, like takeout or entertainment, to save more.",
        "Consider setting up an automatic transfer to your savings account each month."
    ];
    const advancedTips = [
        "As you approach your goal, think about setting a new goal to keep building your savings!",
        "If you have a solid emergency fund, look into low-risk investments to grow your savings."
    ];

    if (progressPercent < 30) {
        beginnerTips.forEach(tip => addTipToList(tip));
    } else if (progressPercent < 70) {
        intermediateTips.forEach(tip => addTipToList(tip));
    } else {
        advancedTips.forEach(tip => addTipToList(tip));
    }
}

function addTipToList(tip) {
    const tipItem = document.createElement("li");
    tipItem.textContent = tip;
    document.getElementById("tipsList").appendChild(tipItem);
}

document.getElementById('calculateGrowthButton').addEventListener('click', calculateInvestmentGrowth);

function calculateInvestmentGrowth() {
    
    const initialInvestment = parseFloat(document.getElementById("initialInvestment").value) || 0;
    const monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value) || 0;
    const annualInterestRate = parseFloat(document.getElementById("annualInterestRate").value) || 0;
    const yearsInvested = parseFloat(document.getElementById("yearsInvested").value) || 0;

    
    if (initialInvestment < 0 || monthlyContribution < 0 || annualInterestRate < 0 || yearsInvested <= 0) {
        alert("Please ensure all fields have positive values. Years invested must be greater than 0.");
        return;
    }

    const months = yearsInvested * 12;
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    let futureValue = initialInvestment; 
    let totalContributions = initialInvestment; 
    let yearByYearData = [];

    document.getElementById("growthTableBody").innerHTML = "";
    if (window.myChart) window.myChart.destroy();

    for (let year = 1; year <= yearsInvested; year++) {
        let yearStartValue = futureValue;
        let yearlyContribution = 0; 

        for (let month = 1; month <= 12; month++) {
            futureValue += monthlyContribution;
            totalContributions += monthlyContribution;
            yearlyContribution += monthlyContribution;

            futureValue *= (1 + monthlyInterestRate);
        }

        const interestEarned = futureValue - yearStartValue - yearlyContribution;


        yearByYearData.push({
            year: year,
            contributions: totalContributions,
            interest: interestEarned,
            total: futureValue
        });


        const row = document.createElement("tr");
        row.innerHTML = `<td>${year}</td><td>${totalContributions.toFixed(2)}</td><td>${interestEarned.toFixed(2)}</td><td>${futureValue.toFixed(2)}</td>`;
        document.getElementById("growthTableBody").appendChild(row);
    }


    document.getElementById("investmentValue").textContent = futureValue.toFixed(2);
    document.getElementById("totalContributions").textContent = totalContributions.toFixed(2);
    document.getElementById("totalInterest").textContent = (futureValue - totalContributions).toFixed(2);


    generateChart(yearByYearData);
}


function generateChart(data) {
    const ctx = document.getElementById("growthChart").getContext("2d");
    const labels = data.map(item => `Year ${item.year}`);
    const contributions = data.map(item => item.contributions);
    const interest = data.map(item => item.interest);
    const total = data.map(item => item.total);

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total Contributions",
                    data: contributions,
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.1)",
                    fill: true
                },
                {
                    label: "Cumulative Interest Earned",
                    data: interest,
                    borderColor: "#28a745",
                    backgroundColor: "rgba(40, 167, 69, 0.1)",
                    fill: true
                },
                {
                    label: "Total Value",
                    data: total,
                    borderColor: "#6f42c1",
                    backgroundColor: "rgba(111, 66, 193, 0.1)",
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Investment Growth Over Time'
                }
            }
        }
    });
}


    document.getElementById('calculateRepaymentButton').addEventListener('click', calculateRepayment);


    function calculateRepayment() {
        const loanAmount = parseFloat(document.getElementById('loan-amount').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12; // Monthly interest rate
        const monthlyPayment = parseFloat(document.getElementById('monthly-payment').value);

        if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(monthlyPayment) || monthlyPayment <= loanAmount * interestRate) {
            document.getElementById('repayment-result').innerText = "Please enter valid numbers. Monthly payment must be greater than the monthly interest.";
            return;
        }

        let balance = loanAmount;
        let months = 0;
        let totalInterest = 0;
        const balances = []; 

        while (balance > 0) {
            const interest = balance * interestRate;
            totalInterest += interest;
            balance = balance + interest - monthlyPayment;
            balance = balance < 0 ? 0 : balance; 
            balances.push(balance);
            months++;
        }


        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        document.getElementById('repayment-result').innerText = `Repayment Timeline: ${years} years and ${remainingMonths} months`;
        document.getElementById('total-interest').innerText = `Total Interest Paid: $${totalInterest.toFixed(2)}`;


        displayDebtChart(balances);
    }


    function displayDebtChart(balances) {
        const ctx = document.getElementById('debtChart').getContext('2d');

       
        if (window.debtChart instanceof Chart) {
            window.debtChart.destroy();
        }


        window.debtChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: balances.map((_, index) => `Month ${index + 1}`),
                datasets: [{
                    label: 'Remaining Loan Balance ($)',
                    data: balances,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: { display: true, text: 'Months' }
                    },
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Remaining Balance ($)' }
                    }
                },
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }


    function updateDebtInfo() {
        const debtType = document.getElementById('debt-type').value;
        const infoElement = document.getElementById('debt-type-info');
        let infoText = '';

        if (debtType === 'studentLoan') {
            infoText = `
                <strong>Student Loan Tips:</strong>
                <ul>
                    <li>Consider income-driven repayment plans to reduce monthly payments based on your income.</li>
                    <li>Federal loans generally offer more flexible repayment options than private loans.</li>
                    <li>Paying interest while in school can save you money in the long run.</li>
                    <li><a href="https://studentaid.gov" target="_blank">Learn more about federal student loan options.</a></li>
                </ul>`;
        } else if (debtType === 'creditCard') {
            infoText = `
                <strong>Credit Card Debt Tips:</strong>
                <ul>
                    <li>Try to pay your balance in full each month to avoid high interest charges.</li>
                    <li>Limit credit card use to essential purchases and emergencies only.</li>
                    <li>Avoid making only minimum payments, as this can increase the overall interest you pay.</li>
                    <li><a href="https://www.consumerfinance.gov" target="_blank">Read more about managing credit card debt effectively.</a></li>
                </ul>`;
        } else if (debtType === 'personalLoan') {
            infoText = `
                <strong>Personal Loan Tips:</strong>
                <ul>
                    <li>Personal loans usually have higher interest rates; consider refinancing if you qualify for a lower rate.</li>
                    <li>Use personal loans for necessary expenses only, and avoid taking on additional debt.</li>
                    <li>Consolidating multiple loans may help reduce monthly payments.</li>
                    <li><a href="https://www.bankrate.com" target="_blank">Find more resources on managing personal loans.</a></li>
                </ul>`;
        }

        infoElement.innerHTML = infoText;
    }

 
    updateDebtInfo();
});