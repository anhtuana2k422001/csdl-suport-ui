import { API_LIST_CSDL, API_PHAN_TICH } from './apiUrls.js';
import { CreateUUID, EMPTY} from './common.js';
// Sử dụng apiListCSDL và apiPhanTich

async function start() {
    // handListCSDL(API_LIST_CSDL);
    handlePhanTichCSDL(API_PHAN_TICH);
}

 start();

 // Functions
async function getListCSDL(apiCall) {
    try {
        const response = await fetch(apiCall);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
 }

 async function phanTichCSDL(data, apiCall) {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
        const response = await fetch(apiCall, options);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần
        console.error('Lỗi:', error);
        throw error;
    }
 }


// Render 
 function renderListCSDL(response) {
    var listCSDlExample = document.getElementById('csdl-block');
    console.log(response.resultCode);
    if(response.resultCode === '000'){
        let data = response.data;
        var html = data.map(function(item) {
            return `<div>
                <h2 class='title-name'>${item.name}</h2>      
                <p>Tập thuộc tính: ${item.attributeSet}</p>     
                <span>Tập phụ thuộc hàm: ${item.dependencyChain}</span>       
            </div>`;
        });

        var content = html.join('');
        listCSDlExample.innerHTML = content;
       
    }else{
        alert("Có lỗi: ");
    }
 }

 function renderhanTichCSDL(response) {

    if(response.resultCode === '000'){
        const informationList = document.getElementById('information-list');

        const titleInformationList = document.createElement('h2');
        titleInformationList.textContent = "Thông tin lược đồ quan hệ";
        informationList.appendChild(titleInformationList);
        
        const information = response.data.information; 
        for (const key in information) {
            if (information.hasOwnProperty(key)) {
                const value = information[key];
                const listItem = document.createElement('li');
                listItem.textContent = `${key}: ${value}`;
                informationList.appendChild(listItem);
            }
        }
        // Step 1: Tìm khóa chính
        const primaryKeyContainer = document.getElementById('primaryKey');
        const primaryKeyData = response.data.primaryKey;

        const titlePrimary = document.createElement('h2');
        titlePrimary.textContent = primaryKeyData.title;
        
        const valueListPrimary = document.createElement('ul');
        primaryKeyData.value.forEach((stepData) => {
            const stepElement = document.createElement('li');
            const stepTitleElement = document.createElement('p');
            stepTitleElement.textContent = stepData.step;

            const stepTextListElement = document.createElement('ul');
            stepData.text.forEach((text) => {
                const stepTextElement = document.createElement('li');
                stepTextElement.textContent = text;
                stepTextListElement.appendChild(stepTextElement);
            });

            stepElement.appendChild(stepTitleElement);
            stepElement.appendChild(stepTextListElement);
            valueListPrimary.appendChild(stepElement);
        });

        const resultPrimary = document.createElement('p');
        resultPrimary.textContent = "Kết luận: " + primaryKeyData.result;

        // Thêm các phần tử HTML vào container
        primaryKeyContainer.appendChild(titlePrimary);
        primaryKeyContainer.appendChild(valueListPrimary);
        primaryKeyContainer.appendChild(resultPrimary);

        // Step 2: Tìm phụ thuộc hàm
        const minimalCoveContainer = document.getElementById('minimalCove-container');
        const minimalCoveData = response.data.minimalCove;

        const titleElement = document.createElement('h2');
        titleElement.textContent = minimalCoveData.title;

        const valueListElement = document.createElement('ul');
        minimalCoveData.value.forEach((stepData) => {
            const stepElement = document.createElement('li');
            const stepTitleElement = document.createElement('p');
            stepTitleElement.textContent = stepData.step;

            const stepTextListElement = document.createElement('ul');
            stepData.text.forEach((text) => {
                const stepTextElement = document.createElement('li');
                stepTextElement.textContent = text;
                stepTextListElement.appendChild(stepTextElement);
            });

            stepElement.appendChild(stepTitleElement);
            stepElement.appendChild(stepTextListElement);
            valueListElement.appendChild(stepElement);
        });

        const resultElement = document.createElement('p');
        resultElement.textContent = minimalCoveData.result;

          // Thêm các phần tử HTML vào container
          minimalCoveContainer.appendChild(titleElement);
          minimalCoveContainer.appendChild(valueListElement);
          minimalCoveContainer.appendChild(resultElement);


        // Step 3: Tìm dạng chuẩn
        const normalFormContainer = document.getElementById('normalForm');
        const normalFormData = response.data.normalForm;
        const titleNormalForm = document.createElement('h2');
        titleNormalForm.textContent = normalFormData.title;

        const valueListNormalForm = document.createElement('ul');
        normalFormData.value.forEach((stepData) => {
            const stepElement = document.createElement('li');
            const stepTitleElement = document.createElement('p');
            stepTitleElement.textContent = stepData.step;

            const stepTextListElement = document.createElement('ul');
            stepData.text.forEach((text) => {
                const stepTextElement = document.createElement('li');
                stepTextElement.textContent = text;
                stepTextListElement.appendChild(stepTextElement);
            });

            stepElement.appendChild(stepTitleElement);
            stepElement.appendChild(stepTextListElement);
            valueListNormalForm.appendChild(stepElement);
        });

        const resultNormalForm = document.createElement('p');
        resultNormalForm.textContent = normalFormData.result;

        // Thêm các phần tử HTML vào container
        normalFormContainer.appendChild(titleNormalForm);
        normalFormContainer.appendChild(valueListNormalForm);
        normalFormContainer.appendChild(resultNormalForm);


    }else{
        var resultMessage = document.querySelector('.message-error');
        resultMessage.innerHTML = response.resultMessage
    }
 }

async function handListCSDL(apiCall) {
    renderListCSDL(await getListCSDL(apiCall));
 }

 function handlePhanTichCSDL(apiCall){
    var check = document.getElementById('submit-csdl');
    check.onclick = async function(){
        document.getElementById('information-list').innerHTML = EMPTY;
        document.getElementById('primaryKey').innerHTML = EMPTY;
        document.getElementById('minimalCove-container').innerHTML = EMPTY;
        document.getElementById('normalForm').innerHTML = EMPTY;
        document.querySelector('.message-error').innerHTML = EMPTY
        
        var attributeSet = document.querySelector('input[name="attributeSet"]').value;
        var dependencyChain = document.querySelector('textarea[name="dependencyChain"]').value;

        var formData = {
            requestId: CreateUUID(),
            attributeSet: attributeSet,
            dependencyChain: dependencyChain
        }
        
        renderhanTichCSDL(await phanTichCSDL(formData, apiCall))
    };
}

