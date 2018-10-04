import { store } from "../store";
import { ASYNC_START, ASYNC_END } from "../modules/app";

const startRequest = () => {
  store.dispatch({type: ASYNC_START});
};

const endRequest = () => {
  store.dispatch({type: ASYNC_END});
};

const handleError = (reject: (reason: any) => any, err: any): any => {
  reject(err);
  endRequest();
};

const handleResponse = (response, resolve, reject) => {
  endRequest();

  if (response.ok) {
    response.json().then(payload => {
      if (payload.succeded !== undefined && payload.errors !== undefined) {
        if (payload.succeded) {
          if (payload.value) {
            resolve(payload.value);
            return;
          }
          resolve();
        } else {
          reject(payload.errors);
        }
      }
      resolve(payload);
    });
  } else {
    reject("Network response was not ok.");
  }
};

const get = (dataURL: string): Promise<any> => {
  startRequest();
  return new Promise<any>((resolve, reject) => {
    fetch(dataURL, {
      credentials: "include"
    })
      .then((response) => handleResponse(response, resolve, reject))
      .catch((err) => handleError(reject, err));
  });
};

const post = (url: string, data: any): Promise<any> => {
  startRequest();

  return new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
      .then((response) => handleResponse(response, resolve, reject))
      .catch(err => handleError(reject, err));
  });
};

const remove = (url: string): Promise<void> => {
  startRequest();
  
  return new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      credentials: "include"
    })
      .then((response) => handleResponse(response, resolve, reject))
      .catch(err => handleError(reject, err));
  });
};

export {
  get,
  post,
  remove,
};
