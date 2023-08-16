import { initialState, userReducer } from "./reducer";
import { loginUser, logoutUser, registerUser, getUserWithToken, getEditedUser, checkUserAuth } from "./actions";

const user = {
  email: 'anna@mail.ru',
  name: 'Anna',
};

describe("user reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  //LOGIN
  it("should handle login user fulfilled", () => {
    const result = userReducer(initialState, loginUser.fulfilled(user));
    expect(result).toEqual({
      ...initialState,
      user,
      isAuthChecked: true,
    });
  });

  it("should handle login user rejected", () => {
    const result = userReducer(initialState, loginUser.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });

  it("should handle login user pending", () => {
    const result = userReducer(initialState, loginUser.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });

  //LOGOUT
  it("should handle logout user fulfilled", () => {
    const result = userReducer(initialState, logoutUser.fulfilled(user));
    expect(result).toEqual(initialState);
  });

  it("should handle logout user rejected", () => {
    const result = userReducer(initialState, logoutUser.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });

  it("should handle logout user pending", () => {
    const result = userReducer(initialState, logoutUser.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });

  //REGISTER
  it("should handle register user fulfilled", () => {
    const result = userReducer(initialState, registerUser.fulfilled(user));
    expect(result).toEqual({
        ...initialState,
        user,
        isAuthChecked: true,
      });
  });

  it("should handle register user rejected", () => {
    const result = userReducer(initialState, registerUser.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });

  it("should handle register user pending", () => {
    const result = userReducer(initialState, registerUser.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });

  //GET EDITED USER
  it("should handle get edited user fulfilled", () => {
    const result = userReducer(initialState, getEditedUser.fulfilled(user));
    expect(result).toEqual({
        ...initialState,
        user,
      });
  });

  it("should handle get edited rejected", () => {
    const result = userReducer(initialState, getEditedUser.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });

  it("should handle get edited pending", () => {
    const result = userReducer(initialState, getEditedUser.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });

  //CHECK USER AUTH
  it("should handle check user auth fulfilled", () => {
    const result = userReducer(initialState, checkUserAuth.fulfilled());
    expect(result).toEqual({
        ...initialState,
        isAuthChecked: true,
      });
  });

  it("should handle check user auth rejected", () => {
    const result = userReducer(initialState, checkUserAuth.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
      isAuthChecked: true,
    });
  });

  it("should handle check user auth pending", () => {
    const result = userReducer(initialState, checkUserAuth.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });

  //GET USER WITH TOKEN
  it("should handle get user with token fulfilled", () => {
    const result = userReducer(initialState, getUserWithToken.fulfilled(user));
    expect(result).toEqual({
        ...initialState,
        user,
      });
  });

  it("should handle get user with token rejected", () => {
    const result = userReducer(initialState, getUserWithToken.rejected());
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });

  it("should handle get user with token pending", () => {
    const result = userReducer(initialState, getUserWithToken.pending());
    expect(result).toEqual({
      ...initialState,
      loading: true,
    });
  });
});
