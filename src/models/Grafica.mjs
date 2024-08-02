export default class Grafica {
    constructor() {
        this.chart = null;
        this.data = {
            labels: [],
            datasets: []
        };
    }

    setData(action, dataset) {
        const datasetIndex = this.data.datasets.findIndex(ds => ds.label === dataset.label);
        if (datasetIndex === -1) {
            this.data.datasets.push({
                label: dataset.label,
                data: Array(this.data.labels.length).fill(0).concat(dataset.data),
                backgroundColor: dataset.backgroundColor
            });
        } else {
            this.data.datasets[datasetIndex].data.push(dataset.data[0]);
        }
        if (!this.data.labels.includes(action)) {
            this.data.labels.push(action);
        }
    }

    getData() {
        return this.data;
    }

    actualizarGrafica() {
        let ctx = document.getElementById("MiGrafica").getContext("2d");
        let chartData = this.getData();

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }
}