const getLikes = async () => {
  try {
    const response = await fetch("http://localhost:3030/book/getLikes");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = getLikes;
