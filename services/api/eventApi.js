import { deleteApi, getApi, getApiNoAuth, postApi } from "../genericServices";

export async function getEvents() {
  return await getApiNoAuth("/event/list-events");
}

export async function bookEventApi(id) {
  return await postApi(`/event/new-attendant/${id}/0`);
}

export async function deleteAttendantApi(id) {
  return await deleteApi(`/event/delete-self-attendant/${id}`);
}

export async function getUserEventsApi() {
  return await getApi(`/event/attendant-events`)
}
