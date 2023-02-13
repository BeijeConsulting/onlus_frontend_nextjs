import { events } from "./type";

export const checkText = (value: string): boolean => {
  const re = /^[a-z ,.'-]+$/i;
  let ok = re.exec(value);
  return !!ok ? true : false;
};

export const checkEmail = (email: string): boolean => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let ok = re.exec(email);
  return !!ok ? true : false;
};

export const checkPhone = (phone: string): boolean => {
  const re = /^(([+]|00)39)?((3[1-6][0-9]))(\d{7})$/g;
  let ok = re.exec(phone);
  return !!ok ? true : false;
};

export const checkCF = (cf: string): boolean => {
  const re =
    /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$|([0-9]{11})$/g;
  let ok = re.exec(cf);
  return !!ok ? true : false;
};

export const checkConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const checkPassword = (password: string): boolean => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
  let ok = re.exec(password);
  return !!ok ? true : false;
};

export const checkEventDate = (
  data: Array<events>,
  today: Date
): Array<events> => {
  let future: events[] = [];

  data.forEach((event: events) => {
    var dateTokens = event.eventDate.split("-");
    let tempDate = new Date(
      parseInt(dateTokens[0]),
      parseInt(dateTokens[1]) - 1,
      parseInt(dateTokens[2])
    );
    let eventDate: number = tempDate.getTime();
    let todaySec: number = today.getTime();
    if (eventDate >= todaySec) {
      future.push(event);
    }
  });
  return future;
};
