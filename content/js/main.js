import { API_PHAN_TICH } from "./config/ApiUrls.js";
import { CreateUUID, EMPTY } from "./utils/Utilities.js";
import { getListCSDL, phanTichCSDL } from "./api/ApiCSDL.js";
// Sử dụng apiListCSDL và apiPhanTich

async function start() {
  // handListCSDL(API_LIST_CSDL);
  handlePhanTichCSDL(API_PHAN_TICH);
}

start();

// Render
function renderListCSDL(response) {
  var listCSDlExample = document.getElementById("csdl-block");
  console.log(response.resultCode);
  if (response.resultCode === "000") {
    let data = response.data;
    var html = data.map(function (item) {
      return `<div>
                <h2 class='title-name'>${item.name}</h2>      
                <p>Tập thuộc tính: ${item.attributeSet}</p>     
                <span>Tập phụ thuộc hàm: ${item.dependencyChain}</span>       
            </div>`;
    });

    var content = html.join("");
    listCSDlExample.innerHTML = content;
  } else {
    alert("Có lỗi: ");
  }
}

function renderhanTichCSDL(response) {
  if (response.resultCode === "000") {
    var hrElement = document.createElement("hr");
    const informationList = document.querySelector(".information-list");

    const titleInformationList = document.createElement("legend");
    titleInformationList.classList.add(
      "scheduler-border",
      "mb-0",
      "font-weight-bold",
      "text-uppercase"
    );
    titleInformationList.textContent = "THÔNG TIN LƯỢC ĐỒ QUAN HỆ";

    informationList.appendChild(titleInformationList);

    const listItem = document.createElement("div");
    const information = response.data.information.dataInfo;
    const html = information.map(function (item) {
      return `<p>${item.description}: <b> ${item.info}</b></p> <hr />`;
    });

    listItem.innerHTML = html.join("");

    informationList.appendChild(listItem);

    // Step 1: Tìm khóa chính
    const primaryKeyContainer = document.getElementById("primaryKey");
    const primaryKeyData = response.data.primaryKey;

    const titlePrimary = document.createElement("p");
    titlePrimary.classList.add(
      "indigo-text",
      "font-weight-bold",
      "text-uppercase"
    );
    titlePrimary.textContent = primaryKeyData.title;

    const valueListPrimary = document.createElement("div");
    primaryKeyData.value.forEach((stepData) => {
      const stepElement = document.createElement("b");
      stepElement.textContent = stepData.step;

      const stepTextListElement = document.createElement("ul");
      stepData.text.forEach((text) => {
        const stepTextElement = document.createElement("li");
        stepTextElement.textContent = text;
        stepTextElement.classList.add("text-content");
        stepTextListElement.appendChild(stepTextElement);
      });

      valueListPrimary.appendChild(stepElement);
      valueListPrimary.appendChild(stepTextListElement);
    });

    const resultPrimary = document.createElement("b");
    resultPrimary.textContent = primaryKeyData.result;

    // // Thêm các phần tử HTML vào container
    primaryKeyContainer.appendChild(titlePrimary);

    primaryKeyContainer.appendChild(hrElement);
    primaryKeyContainer.appendChild(valueListPrimary);
    primaryKeyContainer.appendChild(resultPrimary);

    // Step 2: Tìm phụ thuộc hàm
    const minimalCoveContainer = document.getElementById(
      "minimalCove-container"
    );
    const minimalCoveData = response.data.minimalCove;

    const titleMinimalCove = document.createElement("p");
    titleMinimalCove.classList.add(
      "indigo-text",
      "font-weight-bold",
      "text-uppercase"
    );
    titleMinimalCove.textContent = minimalCoveData.title;

    const valueListMinimalCove = document.createElement("div");
    minimalCoveData.value.forEach((stepData) => {
      const stepElement = document.createElement("b");
      stepElement.textContent = stepData.step;

      const stepTextListElement = document.createElement("ul");
      stepData.text.forEach((text) => {
        const stepTextElement = document.createElement("li");
        stepTextElement.textContent = text;
        stepTextElement.classList.add("text-content");
        stepTextListElement.appendChild(stepTextElement);
      });

      valueListMinimalCove.appendChild(stepElement);
      valueListMinimalCove.appendChild(stepTextListElement);
    });

    const resultMinimalCove = document.createElement("b");
    resultMinimalCove.textContent = minimalCoveData.result;

    // // Thêm các phần tử HTML vào container
    minimalCoveContainer.appendChild(titleMinimalCove);
    minimalCoveContainer.appendChild(valueListMinimalCove);
    minimalCoveContainer.appendChild(resultMinimalCove);

    // Step 3: Tìm dạng chuẩn
    const normalFormContainer = document.getElementById("normalForm");
    const normalFormData = response.data.normalForm;

    const titleNormalForm = document.createElement("p");
    titleNormalForm.classList.add(
      "indigo-text",
      "font-weight-bold",
      "text-uppercase"
    );
    titleNormalForm.textContent = normalFormData.title;

    const valueListNormalForm = document.createElement("div");
    normalFormData.value.forEach((stepData) => {
      const stepElement = document.createElement("b");
      stepElement.textContent = stepData.step;

      const stepTextListElement = document.createElement("ul");
      stepData.text.forEach((text) => {
        const stepTextElement = document.createElement("li");
        stepTextElement.textContent = text;
        stepTextElement.classList.add("text-content");
        stepTextListElement.appendChild(stepTextElement);
      });

      valueListNormalForm.appendChild(stepElement);
      valueListNormalForm.appendChild(stepTextListElement);
    });

    const resultNormalForm = document.createElement("b");
    resultNormalForm.textContent = normalFormData.result;

    // // Thêm các phần tử HTML vào container
    normalFormContainer.appendChild(titleNormalForm);
    normalFormContainer.appendChild(valueListNormalForm);
    normalFormContainer.appendChild(resultNormalForm);

    document.querySelector(".container-result").style.display = "block";
  } else {
    var resultMessage = document.querySelector(".message-error");
    resultMessage.innerHTML = response.resultMessage;
    resultMessage.style.visibility = "initial";
    document.querySelector(".container-result").style.display = "none";
  }
}

async function handListCSDL(apiCall) {
  renderListCSDL(await getListCSDL(apiCall));
}

function handlePhanTichCSDL(apiCall) {
  var check = document.getElementById("button-start");
  check.onclick = async function () {
    document.querySelector(".information-list").innerHTML = EMPTY;
    document.getElementById("primaryKey").innerHTML = EMPTY;
    document.getElementById("minimalCove-container").innerHTML = EMPTY;
    document.getElementById("normalForm").innerHTML = EMPTY;
    document.querySelector(".message-error").innerHTML = EMPTY;

    var attributeSet = document.querySelector(
      'input[name="attributeSet"]'
    ).value;
    var dependencyChain = document.querySelector(
      'input[name="dependencyChain"]'
    ).value;

    var formData = {
      requestId: CreateUUID(),
      attributeSet: attributeSet,
      dependencyChain: dependencyChain,
    };

    console.log(formData);

    renderhanTichCSDL(await phanTichCSDL(formData, apiCall));
  };
}
