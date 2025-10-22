export function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  

  export function selectArray(initial,array){
    let optionsArray = [{ key: initial, value: "" }];
    array?.map((item) => {
      return optionsArray.push({ key: item?.name, value: item?.name });
    });
  
    return optionsArray
  }

  export function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }