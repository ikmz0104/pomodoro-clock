import { Bar } from 'react-chartjs-2';

const Graph = () => {

    const data = {
        labels: ['React','みーたん'],
        datasets: [{
            label: '作業時間',
            data: [10, 20],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    }

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    return (
        <Bar
            data={data}
            width={100}
            height={50}
            options={options}
        />
    );
};

export default Graph;