import { createSlice } from "@reduxjs/toolkit";

// Action Creator
export const setGeneral = (obj) => (dispatch) => {
  try {
    return dispatch(setGeneralAction(obj));
  } catch (e) {
    return console.error(e.message);
  }
};

// Slice
const generalDuck = createSlice({
  name: "generalDuck",
  initialState: {
    websiteName: "Panda",
    logoContent: "nomeImmagine", //nome immagine da abbinare a path predefinito
    palette: [
      {
        id: 0,
        name: "primary",
        bgColor: "#262E36",
        textColor: "#fff",
      },
      {
        id: 0,
        name: "secondary",
        bgColor: "#B12009",
        textColor: "#000",
      },
      {
        id: 0,
        name: "tertiary",
        bgColor: "#CFC36F",
        textColor: "#000",
      },
    ],
    contacts: {
      id: 0,
      site: "3395039550",
      email: "panda@gmail.com",
      address: "Via Ticino 7, Milano",
      vatNumber: "0000000034345345345",
      fiscalCode: "1111111134345345345",
    },
    sectionWork: {
      text: "Lorem esgrasegareg",
      email: "panda.info@gmail.com",
    },
    banner: {
      id: 0,
      title: "Titolo del banner",
      subtitle: "Sottotitolo del banner",
      btnText1: "testo1",
      btnText2: "testo2",
      link: "panda.com",
    },
    social: [],
  },
  reducers: {
    setGeneralAction: (state, action) => {
      state.websiteName = action.payload.websiteName;
      state.logoContent = action.payload.logoContent;
      state.palette = action.payload.palette;
      state.contacts = action.payload.contacts;
      state.sectionWork = action.payload.sectionWork;
      state.banner = action.payload.banner;
      state.social = action.payload.social;
    },
  },
});

export default generalDuck.reducer;

// Actions
const { setGeneralAction } = generalDuck.actions;
