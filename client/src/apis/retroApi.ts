import { Retro } from "../modules/retroTabs";
import { get, post, remove } from "../services/HttpService";
import { CreateRetro } from "../modules/retroList";
import config from "../config";

const getRetros = (): Promise<Retro[]> => {
  return get(`${config.apiUrl}/api/retros`);
};

const createRetro = (request: CreateRetro): Promise<Retro> => {
  return post(`${config.apiUrl}/api/retros`, request);
};

const deleteRetro = (retroId: string): Promise<void> => {
  return remove(`${config.apiUrl}/api/retros/${retroId}`);
};

export const RetroApi = {
  getRetros,
  createRetro,
  deleteRetro
};