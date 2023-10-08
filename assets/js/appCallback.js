// API -> Application programming language
// Backend -> API -> Fetch -> JSON/XML
// Sử dụng callback 
var apiListCSDL = 'https://csdl.hoanhtuan.online/api/v1/danh-sach-luoc-do-mau';
var apiTimBaoDong = 'https://csdl.hoanhtuan.online/api/v1/tim-bao-dong';
var apiPhanTich = 'https://csdl.hoanhtuan.online/api/v1/phan-tich-csdl';

function start() {
    getListCSDL(renderListCSDL, apiListCSDL);
    handlePhanTichCSDL(apiPhanTich);
 }   

 start();

 // Functions
 function getListCSDL(callback, apiCall) {
    fetch(apiCall)
    .then(function (response) {
        return response.json();  // JSON.parse: JSON -> Javascript types
    })
    .then(callback);
 }

 function phanTichCSDL(data, apiCall, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(apiCall, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
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
    var resultHtml = document.getElementById('csdl-phan-tich');
    if(response.resultCode === '000'){
        const information = response.data.information;
       
        // const dataContainer = document.querySelector('normalForm');
        const informationList = document.getElementById('information-list');
        
        for (const key in information) {
            if (information.hasOwnProperty(key)) {
                const value = information[key];
                const listItem = document.createElement('li');
                listItem.textContent = `${key}: ${value}`;
                informationList.appendChild(listItem);
            }
        }
        console.log(information)
    }else{
        var resultMessage = document.querySelector('.message');
        resultMessage.innerHTML = response.resultMessage
    }
 }

 function handlePhanTichCSDL(apiCall){
    var check = document.getElementById('submit');
    check.onclick = function(){
        var attributeSet = document.querySelector('input[name="attributeSet"]').value;
        var dependencyChain = document.querySelector('textarea[name="dependencyChain"]').value;
        var formData = {
            requestId: generateRandomRequestId(36),
            attributeSet: attributeSet,
            dependencyChain: dependencyChain
        }
        phanTichCSDL(formData, apiCall, function(response){
            renderhanTichCSDL(response)
        })
    };
}

function generateRandomRequestId(length) {
    const characters = 'ab-0123456789cd-0123456789ef-0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}