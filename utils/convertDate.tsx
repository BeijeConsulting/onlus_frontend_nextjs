export const convertDate = (date:string,dateLng:string):string => {
    let convertedDate =  new Date(date)
    return convertedDate.toLocaleDateString(dateLng,{ year: 'numeric', month: 'long', day: 'numeric'  });     
}