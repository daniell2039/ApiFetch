document.addEventListener("DOMContentLoaded", () => {
    const showApiButton = document.getElementById("showApi");
    const cleanDataButton = document.getElementById("cleanData");

    const cacheTime = 60000; // un minuto en milisegundos

    showApiButton.addEventListener("click", async () => {
        try {
            const savedUserData = localStorage.getItem("userData");
            const savedTime = localStorage.getItem("userDataTime");
            const currentTime = new Date().getTime();
            showApiButton.disabled = true;
            cleanDataButton.disabled = false;

            if (savedUserData && savedTime) {
                if (currentTime - Number(savedTime) < cacheTime) {
                    const parsedData = JSON.parse(savedUserData);
                    userDataArray = parsedData;
                    printUserData(userDataArray);
                    displayDataInTable(userDataArray);
                    return;
                }
            }

            const responseJson = await fetch("https://reqres.in/api/users?delay=3");
            const response = await responseJson.json();
            userDataArray = response.data;
            printUserData(userDataArray);
            displayDataInTable(userDataArray);

            localStorage.setItem("userData", JSON.stringify(userDataArray));
            localStorage.setItem("userDataTime", currentTime.toString());
        } catch (error) {
            alert("Ha ocurrido un error.");
        }
    });

    const printUserData = (data) => {
        console.log(data);
    };

    const displayDataInTable = (data) => {
        const dataContainer = document.getElementById("data");
        let rows = '';

        for (const user of data) {
            rows += `
                <tr class="tableData">
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td><img src="${user.avatar}" alt="Avatar" class="imgRedonda" /></td>
                </tr>`;
        }

        dataContainer.innerHTML = rows;
    };

    cleanDataButton.addEventListener("click", () => {
        document.getElementById("data").innerHTML = '';
        showApiButton.disabled = false;
        cleanDataButton.disabled = true;
    });
});