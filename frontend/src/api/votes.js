import { get } from "./fetch.js";

export const getVotesList = () => get(`/votes`);
