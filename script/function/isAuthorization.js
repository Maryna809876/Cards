
export function isAuthorization(result, selectorAdd,selectorRemove){
    if(result){
        selectorAdd.forEach(item=> document.querySelector(item).classList.add('d-none'))
        selectorRemove.forEach(item=> document.querySelector(item).classList.remove('d-none'))
    }else{
        alert('not valid password')
    }
}