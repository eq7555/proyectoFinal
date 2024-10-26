function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

function formatTime(timeInMs) {
    return `${timeInMs.toFixed(2)} ms`;
}

function generateRandomArray(size, minValue, maxValue) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    return arr;
}

let chart; // Variable global para el gráfico

// Iniciar pruebas con botón
document.getElementById('startBtn').addEventListener('click', () => {
    const minValue = parseInt(document.getElementById('minValue').value);
    const maxValue = parseInt(document.getElementById('maxValue').value);

    if (isNaN(minValue) || isNaN(maxValue) || minValue >= maxValue) {
        alert("Por favor, ingresa valores válidos donde el valor mínimo sea menor que el valor máximo.");
        return;
    }

    let numTests = 10;
    let increment = Math.floor((maxValue - minValue) / (numTests - 1));

    let testSizes = [];
    let times = [];
    let resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = '';

    for (let i = 1; i <= numTests; i++) {
        let arraySize;

        if (i === numTests) {
            arraySize = maxValue;
        } else {
            arraySize = minValue + (i - 1) * increment;
        }

        let arr = generateRandomArray(arraySize, minValue, maxValue);

        let startTime = performance.now();
        insertionSort(arr);
        let endTime = performance.now();
        let timeTaken = endTime - startTime;
        let formattedTime = formatTime(timeTaken);

        let row = `<tr>
                    <td>${i}</td>
                    <td>${arraySize}</td>
                    <td>${formattedTime}</td> 
                  </tr>`;
        resultTable.innerHTML += row;

        testSizes.push(i);
        times.push(timeTaken); // Mantener en milisegundos para la gráfica
    }

    renderChart(testSizes, times);
});

// Limpiar resultados con botón
document.getElementById('cleanBtn').addEventListener('click', () => {
    document.getElementById('resultTable').innerHTML = '';
    if (chart) {
        chart.destroy(); // Destruir el gráfico existente
    }

    // Limpiar las cajas de texto
    document.getElementById('minValue').value = '';
    document.getElementById('maxValue').value = '';
});

function renderChart(labels, data) {
    const ctx = document.getElementById('timeChart').getContext('2d');
    if (chart) {
        chart.destroy(); // Destruir el gráfico existente antes de crear uno nuevo
    }
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tiempo de ejecución (ms)',
                data: data,
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Número de Prueba'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tiempo (ms)'
                    }
                }
            }
        }
    });
}

function navigateTo(page) {
    window.location.href = page;
}
