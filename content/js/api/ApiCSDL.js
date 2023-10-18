import * as Constants  from '../common/Constants.js';

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
        "Content-Type": Constants.APPLICATION_jJSON,
      },
      body: JSON.stringify(data),
    };

    try {
        const response = await fetch(apiCall, options);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Lỗi:', error);
        throw error;
    }
 }

export {getListCSDL, phanTichCSDL};