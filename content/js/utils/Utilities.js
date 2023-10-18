export function moveOut() {
    var parent = $('#application-form');
    var child = parent.find('.move-out')[0];
    if (child) {
        var form = document.createElement('form');
        form.appendChild(child);
        form.id = 'subForm';
        $(form).insertAfter(parent);
        subForm = $('#subForm');s
    }
}

export function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

export function base64ToImage(base64) {
    var image = new Image();
    image.src = base64;
    return image;
}

export function CreateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export function CreateUUID_V1() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

export const EMPTY = '';