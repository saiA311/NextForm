export const initialState = {
  jwts: "",
  username: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return {
        ...state,
        jwts: action.item.jsonwt,
        username: action.item.username,
      };
    case "DELETE_TOKEN":
      return { ...state, jwts: "", username: "" };
    default:
      return state;
  }
};
