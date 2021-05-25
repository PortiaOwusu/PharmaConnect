const axios = require("axios");

export const url = "http://localhost:4000/products";

export const multipleFilesUpload = async (data, token) => {
  try {
    // await axios({
    //   method: "POST",
    //   url,
    //   data,
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // });
    await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
