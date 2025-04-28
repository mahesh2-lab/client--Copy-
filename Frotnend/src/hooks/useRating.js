const usereport = () => {
  const load = false;

  const SendRating = async (locationId, rating) => {
    try {
      const response = await fetch(`/api/locations/${locationId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { load, SendRating };
};

export default usereport;
