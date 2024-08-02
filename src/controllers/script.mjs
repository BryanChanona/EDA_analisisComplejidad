import ArrayList from "../models/ArrayList.mjs";
import LinkedList from "../models/LinkedList.mjs";
import Grafica from "../models/Grafica.mjs";

let arrayList = new ArrayList();
let linkedList = new LinkedList();
let grafica = new Grafica();

document.addEventListener("DOMContentLoaded", () => {
    const addLinkedListBtn = document.getElementById("add-linked-list-btn");
    const addArrayBtn = document.getElementById("add-array-btn");
    const searchArrayBtn = document.getElementById("search-array-btn");
    const searchLinkedListBtn = document.getElementById("search-linked-list-btn");
    const searchInput = document.getElementById("search-input");
    const numItemsInput = document.getElementById("num-items-input");
    const bubbleSortArrayBtn = document.getElementById("bubble-sort-array-btn");
    const mergeSortArrayBtn = document.getElementById("merge-sort-array-btn");
    const radixSortArrayBtn = document.getElementById("radix-sort-array-btn");
    const bubbleSortLinkedBtn = document.getElementById("bubble-sort-linked-btn");
    const mergeSortLinkedBtn = document.getElementById("merge-sort-linked-btn");
    const radixSortLinkedBtn = document.getElementById("radix-sort-linked-btn");
    const resultsTableBody = document.getElementById("results-table").getElementsByTagName('tbody')[0];

    const calculateTime = (start, end) => {
        return ((end - start) / 1000).toFixed(4); 
    };

    const updateChart = () => {
        grafica.actualizarGrafica();
    };

    const addRowToTable = (operation, structure, time) => {
        let newRow = resultsTableBody.insertRow();
        let cellOperation = newRow.insertCell(0);
        let cellStructure = newRow.insertCell(1);
        let cellTime = newRow.insertCell(2);
        cellOperation.textContent = operation;
        cellStructure.textContent = structure;
        cellTime.textContent = time;
    };

    const getNumItems = () => {
        const numItems = parseInt(numItemsInput.value, 10);
        return isNaN(numItems) || numItems <= 0 ? 100 : numItems;
    };

    const fetchData = async () => {
        try {
            const response = await fetch("bussines.json");
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
            Swal.fire("Error al cargar los datos.");
            return [];
        }
    };

    addLinkedListBtn.addEventListener("click", async () => {
        const data = await fetchData();
        const numItems = getNumItems();
        if (data.length === 0) return;

        const start = performance.now();
        for (let x = 0; x < Math.min(numItems, data.length); x++) {
            linkedList.push(data[x].name);
        }
        const end = performance.now();
        const time = calculateTime(start, end);
        console.log(`Tiempo total para agregar en LinkedList: ${time} segundos`);
        Swal.fire("Agregado a la LinkedList");

        grafica.setData(
            'Inserción LinkedList',
            { label: 'LinkedList', data: [time], backgroundColor: '#ff6384' }
        );
        updateChart();
        addRowToTable('Inserción', 'LinkedList', time);
    });

    addArrayBtn.addEventListener("click", async () => {
        const data = await fetchData();
        const numItems = getNumItems();
        if (data.length === 0) return;

        const start = performance.now();
        for (let x = 0; x < Math.min(numItems, data.length); x++) {
            arrayList.push(data[x].name);
        }
        const end = performance.now();
        const time = calculateTime(start, end);
        console.log(`Tiempo total para agregar en ArrayList: ${time} segundos`);
        Swal.fire("Agregado al Array");

        grafica.setData(
            'Inserción Array',
            { label: 'Array', data: [time], backgroundColor: '#36a2eb' }
        );
        updateChart();
        addRowToTable('Inserción', 'Array', time);
    });

    searchArrayBtn.addEventListener("click", () => {
        const searchValue = searchInput.value;
        const start = performance.now();
        const found = arrayList.busquedaLineal(searchValue); // Corrección aquí
        const end = performance.now();
        const time = calculateTime(start, end);

        Swal.fire(`Valor ${found ? "encontrado" : "no encontrado"} en el Array. Tiempo de búsqueda: ${time} segundos.`);

        grafica.setData(
            'Búsqueda Array',
            { label: 'Búsqueda Array', data: [time], backgroundColor: '#FFCE56' }
        );
        updateChart();
        addRowToTable('Búsqueda', 'Array', time);

        console.log(`Tiempo total para búsqueda en Array: ${time} segundos`);
    });

    searchLinkedListBtn.addEventListener("click", () => {
        const searchValue = searchInput.value;
        const start = performance.now();
        const found = linkedList.busquedaLinea(searchValue); // Corrección aquí
        const end = performance.now();
        const time = calculateTime(start, end);

        Swal.fire(`Valor ${found ? "encontrado" : "no encontrado"} en la LinkedList. Tiempo de búsqueda: ${time} segundos.`);

        grafica.setData(
            'Búsqueda LinkedList',
            { label: 'Búsqueda LinkedList', data: [time], backgroundColor: '#FF6384' }
        );
        updateChart();
        addRowToTable('Búsqueda', 'LinkedList', time);

        console.log(`Tiempo total para búsqueda en LinkedList: ${time} segundos`);
    });

    bubbleSortArrayBtn.addEventListener("click", () => {
        const start = performance.now();
        arrayList.bubbleSort();
        const end = performance.now();
        const time = calculateTime(start, end);
        Swal.fire(`Bubble Sort en Array completado. Tiempo de ordenamiento: ${time} segundos.`);

        grafica.setData(
            'Bubble Sort Array',
            { label: 'Bubble Sort Array', data: [time], backgroundColor: '#FF6384' }
        );
        updateChart();
        addRowToTable('Bubble Sort', 'Array', time);

        console.log(`Tiempo total para Bubble Sort en Array: ${time} segundos`);
    });

    mergeSortArrayBtn.addEventListener("click", () => {
        const start = performance.now();
        arrayList.mergeSort();
        const end = performance.now();
        const time = calculateTime(start, end);
        Swal.fire(`Merge Sort en Array completado. Tiempo de ordenamiento: ${time} segundos.`);

        grafica.setData(
            'Merge Sort Array',
            { label: 'Merge Sort Array', data: [time], backgroundColor: '#36a2eb' }
        );
        updateChart();
        addRowToTable('Merge Sort', 'Array', time);

        console.log(`Tiempo total para Merge Sort en Array: ${time} segundos`);
    });

    radixSortArrayBtn.addEventListener("click", () => {
        const start = performance.now();
        arrayList.radixSort();
        const end = performance.now();
        const time = calculateTime(start, end);
        Swal.fire(`Radix Sort en Array completado. Tiempo de ordenamiento: ${time} segundos.`);

        grafica.setData(
            'Radix Sort Array',
            { label: 'Radix Sort Array', data: [time], backgroundColor: '#FF6384' }
        );
        updateChart();
        addRowToTable('Radix Sort', 'Array', time);

        console.log(`Tiempo total para Radix Sort en Array: ${time} segundos`);
    });

    bubbleSortLinkedBtn.addEventListener("click", () => {
        const start = performance.now();
        linkedList.bubbleSort();
        const end = performance.now();
        const time = calculateTime(start, end);
        Swal.fire(`Bubble Sort en LinkedList completado. Tiempo de ordenamiento: ${time} segundos.`);

        grafica.setData(
            'Bubble Sort LinkedList',
            { label: 'Bubble Sort LinkedList', data: [time], backgroundColor: '#FF6384' }
        );
        updateChart();
        addRowToTable('Bubble Sort', 'LinkedList', time);

        console.log(`Tiempo total para Bubble Sort en LinkedList: ${time} segundos`);
    });

    mergeSortLinkedBtn.addEventListener("click", () => {
        const start = performance.now();
        linkedList.mergeSort();
        const end = performance.now();
        const time = calculateTime(start, end);
        Swal.fire(`Merge Sort en LinkedList completado. Tiempo de ordenamiento: ${time} segundos.`);

        grafica.setData(
            'Merge Sort LinkedList',
            { label: 'Merge Sort LinkedList', data: [time], backgroundColor: '#36a2eb' }
        );
        updateChart();
        addRowToTable('Merge Sort', 'LinkedList', time);

        console.log(`Tiempo total para Merge Sort en LinkedList: ${time} segundos`);
    });

    radixSortLinkedBtn.addEventListener("click", () => {
        const start = performance.now();
        linkedList.radixSort();
        const end = performance.now();
        const time = calculateTime(start, end);
        Swal.fire(`Radix Sort en LinkedList completado. Tiempo de ordenamiento: ${time} segundos.`);

        grafica.setData(
            'Radix Sort LinkedList',
            { label: 'Radix Sort LinkedList', data: [time], backgroundColor: '#FF6384' }
        );
        updateChart();
        addRowToTable('Radix Sort', 'LinkedList', time);

        console.log(`Tiempo total para Radix Sort en LinkedList: ${time} segundos`);
    });
});
